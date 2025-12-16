import { useIsMobile } from "@client/hooks/use-breakpoint";
import { ReactNode } from "react";

import { Header } from "./header";

interface Props {
  readonly children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const isMobile = useIsMobile();

  return (
    <main className="relative w-full">
      {!isMobile && <Header />}
      <main className="flex items-center justify-center">
        <section className="w-[1040px]">{children}</section>
      </main>
    </main>
  );
};
