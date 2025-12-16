import cn from "classnames";

import { Button } from "@client/components/atoms/button";
import { TextArea } from "@client/components/atoms/text-area";
import { PageWrapper } from "@client/components/wrappers/page-wrapper";

import { useToastContext } from "@client/contexts/toast-context";

import { copyTextToClipboard } from "@client/utils/utils";
import { useBurnLinkReadPageContext } from "./burn-link-read.context";

const BLURRED_PLACEHOLDER =
  "Ah, Inspector DevTools, we meet again! Thought you could bypass the fancy blur filter, eh? Points for trying! But alas, this is merely placeholder text, meticulously crafted to reward your curiosity. The real message? Still encrypted. You'll have to click the button like a regular user, you clever sleuth.";

export const BurnLinkReadPage = () => {
  const { addToast } = useToastContext();
  const { decryptedMessage, decryptMessage } = useBurnLinkReadPageContext();

  const copyToClipboard = () => {
    copyTextToClipboard(decryptedMessage);
    addToast("Decrypted Message Copied!", "info");
  };

  return (
    <PageWrapper className="w-full flex-col items-center px-2 text-center md:px-0 md:pt-60 md:pb-20">
      <h2>Your message</h2>
      <p className="text-text-secondary font-epilogue mt-3 mb-10 text-lg md:w-[522px]">
        The secret below is end-to-end encrypted. Decrypt it to reveal the message.
      </p>

      <MessageBox decryptedMessage={decryptedMessage} onCopy={copyToClipboard} onDecrypt={decryptMessage} />
    </PageWrapper>
  );
};

// Subcomponents
interface MessageBoxProps {
  readonly decryptedMessage: string;
  readonly onDecrypt: () => void;
  readonly onCopy: () => void;
}

const MessageBox = ({ decryptedMessage, onDecrypt, onCopy }: MessageBoxProps) => (
  <section className="relative flex w-full flex-col items-center justify-center">
    <TextArea
      className={cn("mt-6 min-h-[250px] w-full cursor-default text-lg shadow duration-300", {
        "blur-sm": !decryptedMessage,
      })}
      id="burn-link-read-text-area"
      readOnly={true}
      value={decryptedMessage || BLURRED_PLACEHOLDER}
    />

    {decryptedMessage ? (
      <Button
        className="hover:bg-primary-dark mt-6 block rounded bg-black p-1.5 px-2 font-bold text-white"
        onClick={onCopy}
        title="Copy Message"
      />
    ) : (
      <Button
        className="hover:bg-primary-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-black p-1.5 px-2 font-bold text-white"
        onClick={onDecrypt}
        title="Decrypt Message"
      />
    )}
  </section>
);
