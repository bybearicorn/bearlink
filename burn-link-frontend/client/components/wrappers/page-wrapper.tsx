import cn from "classnames";
import { ReactNode } from "react";

interface PageWrapperProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly isLoading?: boolean;
}

export const PageWrapper = ({ children, className, isLoading }: PageWrapperProps) => (
  <page-wrapper
    className={cn(
      "flex justify-center",
      {
        "h-screen items-center": isLoading,
        "pt-[76px]": !isLoading,
      },
      className,
    )}>
    {isLoading ? "Loading..." : children}
  </page-wrapper>
);
