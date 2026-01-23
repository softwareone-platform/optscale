export * from "@main/utils/layouts";

export const MPT_BRAND_PRIMARY = "#472AFF";

export const MPT_BRAND_TYPE = "#000000";
export const MPT_BRAND_WHITE = "#FFFFFF";
export const MPT_GRAY_1 = "#F4F6F8";
export const MPT_GRAY_2 = "#E0E5E8";
export const MPT_GRAY_3 = "#AEB1B9";
export const MPT_GRAY_4 = "#6B7180";

export const MPT_SPACING_1 = "8px";
export const MPT_SPACING_2 = "16px";
export const MPT_SPACING_3 = "24px";
export const MPT_SPACING_4 = "32px";
export const MPT_SPACING_5 = "40px";
export const MPT_SPACING_6 = "48px";

export const MPT_ALERTS_INFO_1 = `#EAECFF`;
export const MPT_ALERTS_INFO_2 = `#959BFF`;
export const MPT_ALERTS_DANGER_1 = `#FCE8EA`;
export const MPT_ALERTS_DANGER_2 = `#EE8C96`;
export const MPT_ALERTS_DANGER_3 = `#BB1425`;
export const MPT_ALERTS_DANGER_4 = `#8F101D`;
export const MPT_ALERTS_WARNING_2 = `#F1B178`;
export const MPT_ALERTS_WARNING_3 = `#E87D1E`;
export const MPT_ALERTS_WARNING_4 = `#F1B178`;

export const MPT_ALERTS_SUCCESS_2 = `#80E1AE`;
export const MPT_ALERTS_SUCCESS_3 = `#00784D`;
export const MPT_ALERTS_SUCCESS_4 = `#005838`;
export const MPT_TERTIARY_PRIMARY = `#EBEDFF`;
export const MPT_TERTIARY_BLUE_1 = `#CAE4FF`;
export const MPT_TERTIARY_BLUE_2 = `#4DA6FF`;

export const MPT_BOX_SHADOW = `0 1px 6px #83879257`;
export const MPT_BOX_SHADOW_HOVER = `0 0 0 2px ${MPT_ALERTS_INFO_2} inset, 0 1px ${MPT_SPACING_1} #6b718057`;

export const MPT_GRADIENT = "linear-gradient(270deg, #00c9cd, #472aff, #392d9c)";

export const DEFAULT_BUTTON_FONT_UPPERCASE = false;

export const MPT_BOX_WHITE = {
  background: MPT_BRAND_WHITE,
  padding: MPT_SPACING_3,
  borderRadius: MPT_SPACING_1
} as const;

export const MPT_BOX_WHITE_SHADOW_RADIUS_2 = {
  ...MPT_BOX_WHITE,
  boxShadow: MPT_BOX_SHADOW,
  borderRadius: MPT_SPACING_2
} as const;

export const MPT_PAGE_WRAPPER_STYLES = {
  padding: MPT_SPACING_3,
  display: "flex",
  flexDirection: "column",
  paddingTop: MPT_SPACING_3
} as const;

export const MPT_SEMICOLON = {
  "&::after": { content: '":"', marginLeft: "-3px" }
} as const;
