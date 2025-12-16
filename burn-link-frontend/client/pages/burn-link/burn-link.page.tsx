import { Button } from "@client/components/atoms/button";
import { Switch } from "@client/components/atoms/switch";
import { TextArea } from "@client/components/atoms/text-area";
import { RadioGroup } from "@client/components/molecules/radio-group";
import { PageWrapper } from "@client/components/wrappers/page-wrapper";
import { useToastContext } from "@client/contexts/toast-context";
import { copyTextToClipboard } from "@client/utils/utils";
import { keyBy } from "lodash-es";
import { Fragment } from "react";
import { EXPIRE_INTERVALS, useBurnLinkPageContext } from "./burn-link.context";

const EXPIRE_INTERVALS_BY_VAL = keyBy(EXPIRE_INTERVALS, ({ value }) => value);
const EXPIRE_INTERVALS_BY_EXP = keyBy(EXPIRE_INTERVALS, ({ expiration }) => expiration);

export const BurnLinkPage = () => {
  const { burnLink } = useBurnLinkPageContext();
  return (
    <PageWrapper className="h-full w-full flex-col items-center px-2 text-center md:px-0 md:pt-60 md:pb-20">
      {burnLink ? <BurnLinkResult /> : <BurnLinkForm />}
    </PageWrapper>
  );
};

// Subcomponents

const BurnLinkResult = () => {
  const { addToast } = useToastContext();

  const { burnLink, createNew } = useBurnLinkPageContext();

  const copyToClipboard = () => {
    copyTextToClipboard(burnLink);
    addToast("Secure Link Copied!", "info");
  };

  return (
    <Fragment>
      <h2>Your burn link has been generated</h2>
      <p className="font-epilogue mt-4 text-lg md:w-[700px]">
        Your message has been encrypted and saved. Only someone with this link can decrypt and view it. Once the message
        has been viewed it will self-destruct.
      </p>
      <input
        className="mt-12 h-12 w-full cursor-pointer rounded-sm bg-gray-200 p-3 focus:outline-none md:w-[520px]"
        onClick={copyToClipboard}
        readOnly={true}
        value={burnLink}
      />
      <section className="mt-8 flex flex-col items-center gap-x-6 gap-y-4 md:flex-row">
        <Button className="px-8" onClick={copyToClipboard} title="Copy Secure Link" variant="primary" />
        <Button className="px-[27px]" onClick={() => createNew()} title="Create new" />
      </section>
    </Fragment>
  );
};

const BurnLinkForm = () => {
  const {
    burnLinkData: { autoDestructEnabled, message, expirationMin },
    updateBurnLinkData,
    createBurnLink,
  } = useBurnLinkPageContext();
  return (
    <Fragment>
      <h2>Burn Link</h2>
      <p className="text-text-secondary font-epilogue mt-3 mb-10 text-lg md:w-[522px]">
        Share an end-to-end encrypted secret via a URL. Once the recipient opens it, the secret is permanently deleted.
      </p>

      <TextArea
        className="mt-[5px] min-h-[201px] w-full rounded-2xl border border-[#F1EFE8] bg-[#F7F9F6] p-7 text-lg shadow"
        id="burn-link-textarea"
        onChange={(e) => updateBurnLinkData({ message: e.target.value })}
        placeholder="Type your secret message ..."
        value={message}
        variant="custom"
      />

      <Switch
        className="mt-12"
        isChecked={autoDestructEnabled}
        onChange={(e) => updateBurnLinkData({ autoDestructEnabled: !autoDestructEnabled })}
        title="Auto Self-Destruction"
      />

      {autoDestructEnabled ? (
        <section className="mt-5">
          <p className="text-lg">When should we remove the link, in case it wasn't clicked?</p>
          <RadioGroup
            className="mt-3 flex w-full justify-center"
            itemChecked={EXPIRE_INTERVALS_BY_EXP[expirationMin || 0].value}
            items={EXPIRE_INTERVALS}
            setItemChecked={(val: string) =>
              updateBurnLinkData({ expirationMin: EXPIRE_INTERVALS_BY_VAL[val]?.expiration })
            }
          />
        </section>
      ) : null}

      <Button
        className="mt-8 block rounded px-10 py-3 text-xl font-bold"
        disabled={!message}
        onClick={() => createBurnLink()}
        title="Generate Burn Link"
        variant="primary"
      />
    </Fragment>
  );
};
