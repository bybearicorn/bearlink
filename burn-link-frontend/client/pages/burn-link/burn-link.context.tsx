import { useHandleErrorContext } from "@client/contexts/handle-error-context";
import { generatePassword } from "@client/utils/password/generate-password";
import { processFetch } from "@client/utils/process-fetch";
import { CreateBurnLinkRequest, CreateBurnLinkResponse } from "@shared/interfaces/burn-link.api";
import { FE } from "@shared/util/ts-util";
import * as openpgp from "openpgp";
import { createContext, ReactNode, use, useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface BurnLinkData {
  message: string;
  autoDestructEnabled: boolean;
  expirationMin: number | null;
}

export const EXPIRE_INTERVALS = [
  { value: "1m", expiration: 1 },
  { value: "5m", expiration: 5 },
  { value: "15m", expiration: 15 },
  { value: "1h", expiration: 60 },
  { value: "24h", expiration: 24 * 60 },
];

export interface BurnLinkPageContextProps {
  burnLinkData: BurnLinkData;
  burnLink: string;

  // methods
  updateBurnLinkData: (data: Partial<BurnLinkData>) => void;
  createBurnLink: () => Promise<void>;
  createNew: () => void;
}

const BurnLinkPageContext = createContext<BurnLinkPageContextProps | undefined>(undefined);

export const BurnLinkPageProvider = ({ children }: { readonly children: ReactNode }) => {
  const navigate = useNavigate();
  const handleError = useHandleErrorContext();
  const { hash, pathname } = useLocation();

  const [burnLinkData, setBurnLinkData] = useState<BurnLinkData>({
    message: "",
    autoDestructEnabled: true,
    expirationMin: EXPIRE_INTERVALS.at(-1)!.expiration,
  });
  const [burnLink, setBurnLink] = useState(hash ? `${origin}${pathname}/read#${hash}` : "");

  // methods:
  const updateBurnLinkData = (partial: Partial<BurnLinkData>) => setBurnLinkData({ ...burnLinkData, ...partial });

  const createNew = () => {
    navigate(`/`, { replace: true });
    setBurnLinkData({
      message: "",
      autoDestructEnabled: true,
      expirationMin: EXPIRE_INTERVALS.at(-1)!.expiration,
    });
    setBurnLink("");
  };

  const createBurnLink = async () => {
    try {
      const password = generatePassword();
      const pgpMessage = await openpgp.createMessage({ text: burnLinkData.message });
      const message = await openpgp.encrypt({ message: pgpMessage, passwords: password });

      const body: CreateBurnLinkRequest = {
        message,
        expirationMin: burnLinkData.autoDestructEnabled ? burnLinkData.expirationMin : null,
      };
      const res = await fetch("/api/burn-link/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }).then(processFetch<FE<CreateBurnLinkResponse>>);

      updateBurnLinkData({ message: "" });
      const origin = window.location.origin;
      const hashStr = `${res.id}/${password}`;

      setBurnLink(`${origin}/read#${hashStr}`);
      navigate(`/#${hashStr}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BurnLinkPageContext value={{ burnLinkData, burnLink, updateBurnLinkData, createBurnLink, createNew }}>
      {children}
    </BurnLinkPageContext>
  );
};

export const useBurnLinkPageContext = (): BurnLinkPageContextProps => {
  const context = use(BurnLinkPageContext);
  if (!context) {
    throw new Error("useBurnLinkPageContext must be used within a BurnLinkPageProvider");
  }
  return context;
};
