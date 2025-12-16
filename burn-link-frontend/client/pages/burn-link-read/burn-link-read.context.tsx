import { useHandleErrorContext } from "@client/contexts/handle-error-context";
import { useToastContext } from "@client/contexts/toast-context";
import { HttpError, processFetch } from "@client/utils/process-fetch";
import { GetBurnLinkResponse } from "@shared/interfaces/burn-link.api";
import { FE } from "@shared/util/ts-util";
import * as openpgp from "openpgp";
import { createContext, ReactNode, use, useState } from "react";

export interface BurnLinkReadPageContextProps {
  decryptedMessage: string;

  // methods
  decryptMessage: () => Promise<void>;
}

const BurnLinkReadPageContext = createContext<BurnLinkReadPageContextProps | undefined>(undefined);

export const BurnLinkReadPageProvider = ({ children }: { readonly children: ReactNode }) => {
  const { addToast } = useToastContext();
  const handleError = useHandleErrorContext();

  const [decryptedMessage, setDecryptedMessage] = useState("");

  // methods:

  const decryptMessage = async () => {
    const [id, passwords] = window.location.hash.slice(1).split("/");
    if (!id || !passwords) {
      addToast("Invalid URL", "error");
      return;
    }

    let burnLinkData: FE<GetBurnLinkResponse>;
    try {
      burnLinkData = await fetch(`/api/burn-link/${id}`).then(processFetch<FE<GetBurnLinkResponse>>);
      await fetch(`/api/burn-link/${id}`, { method: "DELETE" }).then(processFetch);
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        addToast("Message has been Destroyed!", "error");
        return;
      }
      handleError(e);
      return;
    }

    try {
      const message = await openpgp.readMessage({ armoredMessage: burnLinkData.message });
      const { data: messageData } = await openpgp.decrypt({ message, passwords });
      setDecryptedMessage(messageData as string);
    } catch (error) {
      handleError(new Error("Failed to decrypt message", { cause: error }));
    }
  };

  return <BurnLinkReadPageContext value={{ decryptedMessage, decryptMessage }}>{children}</BurnLinkReadPageContext>;
};

export const useBurnLinkReadPageContext = (): BurnLinkReadPageContextProps => {
  const context = use(BurnLinkReadPageContext);
  if (!context) {
    throw new Error("useBurnLinkReadPageContext must be used within a BurnLinkReadPageProvider");
  }
  return context;
};
