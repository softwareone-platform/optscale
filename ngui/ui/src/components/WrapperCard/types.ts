import { ReactNode } from "react";
import type { CardProps } from "@mui/material";
import { ButtonProps } from "components/Button/Button";
import { IconButtonProps } from "components/IconButton/IconButton";
import { TODO } from "utils/types";

type ButtonConfig =
  | {
      type: "icon";
      buttonProps: IconButtonProps;
    }
  | {
      type: "button";
      buttonProps: ButtonProps;
    };

type TitleButtonOptions = {
  tooltip?: { title: ReactNode };
} & ButtonConfig;

type DataTestIdsOptions = {
  wrapper?: string;
  title?: string;
  titleCaption?: string;
  button?: string;
};

type ButtonOptions = {
  show: boolean;
  href?: string;
  link?: string;
  messageId: string;
};

export type TitleProps = {
  title: ReactNode;
  titleButton?: TitleButtonOptions;
  dataTestId?: string;
};

export type WrapperCardProps = Omit<CardProps, "title"> & {
  title: ReactNode;
  titleCaption?: ReactNode;
  titleButton?: TitleButtonOptions;
  dataTestIds?: DataTestIdsOptions;
  children?: ReactNode;
  className?: string;
  button?: ButtonOptions;
  needAlign?: boolean;
  titlePdf?: {
    id: string;
    renderData: () => TODO;
  };
};
