import { ComponentProps } from "react";
import { FormattedMessage } from "react-intl";

export * from "@main/utils/types";

export type IntlFormatValues = ComponentProps<typeof FormattedMessage>["values"];
