import { SUCCESS, WARNING, ERROR } from "utils/constants";

export const SPACING_1 = 1;
export const SPACING_2 = 2;
export const SPACING_3 = 3;
export const SPACING_4 = 4;
export const SPACING_5 = 5;
export const SPACING_6 = 6;

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

export const scrolledToBottom = (target) => target.scrollTop + target.clientHeight >= target.scrollHeight;

/**
 * Calculate the approximate width of the provided text
 *
 * @param { string } text - The text whose width we want to calculate
 * @param { string } font - Font string (e.g. "12px sans-serif")
 *
 * @description
 * Calculates text width using the canvas "measureText" function
 *
 * @returns Rounded up to the next largest integer width
 */
export const getTextWidth = (text, font) => {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const { width } = context.measureText(text);
  return Math.ceil(width);
};

export const getPoolColorStatus = (percent = 0) => {
  if (percent >= 90 && percent < 100) {
    return WARNING;
  }
  if (percent >= 100) {
    return ERROR;
  }
  return SUCCESS;
};

export const getPoolColorStatusByLimit = (value: number, limit: number, threshold: number = 0.9) => {
  const warningLimit = limit * threshold;
  if (value > warningLimit && value <= limit) {
    return WARNING;
  }
  if (value > limit) {
    return ERROR;
  }

  return SUCCESS;
};

/**
 * Calculate border styles for n*2 cards/nodes layouts (home page, integrations)
 *
 * @param count - The number of cards/nodes
 * @param index - The current card/node index. Cards are iterated in a loop.
 *
 * TODO - improve to add a dynamic number of columns, more breakpoints
 * @returns The border styles object, ready to use for `sx`
 */
export const getSquareNodesStyle = (count: number, index: number) => ({
  borderRight: {
    xs: "0",
    lg: index % 2 === 0 ? "1px solid" : "0px solid"
  },
  borderBottom: {
    xs: index + 1 === count ? "0" : "1px solid",
    lg: index + 2 >= count ? "0" : "1px solid"
  },
  borderColor: {
    xs: "divider",
    lg: "divider"
  }
});
