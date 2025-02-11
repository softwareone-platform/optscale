// Hystax palette: https://cdn.hystax.com/Hystax/Hystax-Guideline-2020.pdf
// Material design color tool: https://material.io/resources/color/

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { common } from "@mui/material/colors";
import { createTheme, alpha, darken, lighten } from "@mui/material/styles";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { customResponsiveFontSizes } from "utils/fonts";
import { isEmpty as isEmptyObject } from "utils/objects";
import {
  MPT_GRAY_2,
  MPT_GRAY_3,
  MPT_GRAY_4,
  MPT_BRAND_WHITE,
  MPT_BRAND_PRIMARY,
  MPT_BOX_SHADOW,
  MPT_SPACING_1,
  MPT_SPACING_2,
  MPT_SPACING_3,
  MPT_ALERTS_SUCCESS_2,
  MPT_ALERTS_SUCCESS_4,
  MPT_ALERTS_WARNING_2,
  MPT_ALERTS_WARNING_3,
  MPT_ALERTS_WARNING_4,
  MPT_ALERTS_DANGER_1,
  MPT_ALERTS_DANGER_2,
  MPT_ALERTS_DANGER_3,
  MPT_ALERTS_DANGER_4,
  MPT_GRADIENT,
  MPT_BRAND_TYPE,
  MPT_ALERTS_SUCCESS_3
} from "./utils/layouts";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    header: true;
    property: true;
  }
}

const getLighten = (color, lightenAlpha = 0.2) => lighten(color, lightenAlpha);
const getDarken = (color, darkenAlpha = 0.3) => darken(color, darkenAlpha);

const getWebkitAutofillBackgroundColor = (theme) => lighten(theme.palette.lightBlue.main, 0.9);

export const isMedia = (property) => property.startsWith("@media");

const applyPaletteSettings = (settings) => {
  const isEmptySetting = (name) => isEmptyObject(settings.palette?.[name] ?? {});

  const mergeIfSettingIsNotEmpty = (target, settingName) => ({
    ...target,
    ...(isEmptySetting(settingName) ? {} : settings.palette[settingName])
  });

  const primary = mergeIfSettingIsNotEmpty(
    {
      main: MPT_BRAND_PRIMARY,
      white: MPT_BRAND_WHITE,
      gray2: MPT_GRAY_2,
      gradient: MPT_GRADIENT,
      card: MPT_BRAND_TYPE
    },
    "primary"
  );

  const info = mergeIfSettingIsNotEmpty(
    {
      main: "#5E6A7F",
      header: getLighten("#5E6A7F", 0.93)
    },
    "info"
  );

  const secondary = mergeIfSettingIsNotEmpty(
    {
      main: MPT_BRAND_PRIMARY
    },
    "secondary"
  );

  const success = mergeIfSettingIsNotEmpty(
    {
      main: MPT_ALERTS_SUCCESS_4,
      secondary: MPT_ALERTS_SUCCESS_2,
      card: MPT_ALERTS_SUCCESS_3
    },
    "success"
  );

  const error = mergeIfSettingIsNotEmpty(
    {
      main: MPT_ALERTS_DANGER_4,
      primary: MPT_ALERTS_DANGER_1,
      secondary: MPT_ALERTS_DANGER_2,
      text: MPT_ALERTS_DANGER_3,
      card: MPT_ALERTS_DANGER_3
    },
    "error"
  );

  const warning = mergeIfSettingIsNotEmpty(
    {
      main: MPT_ALERTS_WARNING_4,
      secondary: MPT_ALERTS_WARNING_2,
      card: MPT_ALERTS_WARNING_3
    },
    "warning"
  );

  const text = mergeIfSettingIsNotEmpty(
    {
      primary: getDarken(info.main),
      secondary: primary.main
    },
    "text"
  );

  return {
    primary,
    secondary,
    info,
    success,
    error,
    warning,
    text
  };
};
const applyChartPaletteSettings = (settings) => {
  const isEmptySetting = (name) => isEmptyArray(settings.chartPalette?.[name] ?? []);

  // MPT_TODO: change colors palette
  // Original:
  // [
  //         "#4AB4EE",
  //         "#FFC348",
  //         "#30D5C8",
  //         "#9950B1",
  //         "#4A63EE",
  //         "#FF6648",
  //         "#30D575",
  //         "#B19950",
  //         "#834AEE",
  //         "#48E1FF",
  //         "#D53090",
  //         "#99B150"
  //       ]

  const chart = isEmptySetting("chart")
    ? [
        "#959BFF",
        "#EAECFF",
        "#3520BF",
        "#CAE4FF",
        "#4DA6FF",
        "#2775C4",
        "#E87D1E",
        "#F1B178",
        "#733F11",
        "#007D8C",
        "#004A59",
        "#80E1AE"
      ]
    : settings.chartPalette.chart;

  const monoChart = isEmptySetting("monoChart") ? ["#959BFF"] : settings.chartPalette.monoChart;

  return {
    chart,
    monoChart
  };
};

const applyGoogleMapPaletteSettings = (basicColorsPalette) => [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: basicColorsPalette.info.main
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#DEE1E5"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

export const getThemeSpacingCoefficient = (theme) => {
  const coefficient = theme.spacing(1).match(/[-]?[0-9]+\.?[0-9]*/g);

  if (coefficient !== null) {
    return Number(coefficient[0]);
  }

  return 0;
};

// Main theme config
const getThemeConfig = (settings = {}) => {
  const baseColorsPalette = applyPaletteSettings(settings);
  const { primary, secondary, info, success, error, warning, text } = baseColorsPalette;

  const { chart, monoChart } = applyChartPaletteSettings(settings);

  const googleMapPalette = applyGoogleMapPaletteSettings(baseColorsPalette);

  // Actions
  const ACTION_HOVER = getLighten(info.main, 0.9);
  const ACTION_ACTIVE = primary.main;
  const ACTION_SELECTED = secondary.main;

  // Misc
  const BACKGROUND = getLighten(info.main, 0.95);
  const SKELETON_COLOR = getLighten(info.main, 0.8);

  return Object.freeze({
    typography: {
      fontFamily: "'Arial', sans-serif",
      mono: {
        fontFamily: "'Ubuntu Mono', monospace"
      }
    },
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            "&:before": {
              // disable border between accordions
              display: "none"
            },
            "&:first-of-type": {
              borderTopLeftRadius: MPT_SPACING_1,
              borderTopRightRadius: MPT_SPACING_1
            }
          }
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          content: {
            maxWidth: "100%",
            margin: 0,
            "&.Mui-expanded": {
              margin: 0
            }
          },
          root: {
            "&.Mui-expanded": {
              minHeight: "48px"
            }
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            fontSize: "14px",
            color: "black",
            paddingLeft: MPT_SPACING_2,
            paddingRight: MPT_SPACING_3,
            paddingTop: "6px",
            paddingBottom: "6px"
          },

          root: {
            "& .MuiSvgIcon-fontSizeSmall": {
              fontSize: MPT_SPACING_2
            }
          },
          iconOutlined: {
            fontSize: "16px" // Set font size for MuiSelect-iconOutlined
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: MPT_SPACING_1,
            backgroundColor: "#FFFFFF",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              color: "black"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: MPT_BRAND_PRIMARY
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: MPT_BRAND_PRIMARY
            }
          }
        }
      },
      MuiAutocomplete: {
        styleOverrides: {
          option: ({ theme }) => ({
            "&.MuiAutocomplete-option": {
              /*
                Make option font styles similar to the MuiMenuItem
              */
              ...theme.typography.body2,
              /*
                When options are selected, Autocomplete does not add any Mui classes,
                so we need to rely on the aria-selected element property instead.
              */
              "&[aria-selected='true']": {
                backgroundColor: ACTION_SELECTED,
                color: secondary.contrastText,
                "&.Mui-focused": {
                  backgroundColor: ACTION_SELECTED
                }
              }
            }
          })
        }
      },
      MuiButton: {
        defaultProps: {
          size: "small",
          color: "primary"
        },
        variants: [
          {
            props: { variant: "contained", color: "lightYellow" },
            style: ({ theme }) => ({
              padding: `6px ${MPT_SPACING_2}`,
              borderRadius: MPT_SPACING_1,
              color: theme.palette.lightYellow.contrastText,
              "&:hover": {
                backgroundColor: lighten(theme.palette.lightYellow.main, 0.08)
              }
            })
          },
          {
            props: { variant: "contained", color: "lightBlue" },
            style: ({ theme }) => ({
              color: theme.palette.lightBlue.contrastText,
              "&:hover": {
                backgroundColor: lighten(theme.palette.lightBlue.main, 0.08)
              }
            })
          },
          {
            props: { variant: "text", color: "info" },
            style: ({ theme }) => ({
              color: theme.palette.text.primary
            })
          }
        ],
        styleOverrides: {
          root: {
            padding: `6px ${MPT_SPACING_2}`,
            borderRadius: MPT_SPACING_1
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            "& .MuiChip-label > .MuiTypography-root": {
              fontSize: "13px"
            }
          }
        }
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            padding: "2px",
            background: "#fff",
            borderRadius: MPT_SPACING_1,
            border: `1px solid ${MPT_GRAY_3}`,
            "& .MuiTypography-root": {
              color: MPT_GRAY_4
            }
          },
          firstButton: {
            borderRadius: MPT_SPACING_1
          },
          grouped: {
            borderRadius: MPT_SPACING_1,
            border: `1px solid transparent`,
            color: MPT_GRAY_4,
            "& + button": {
              marginLeft: "4px"
            }
          }
        },
        defaultProps: {
          color: "info"
        }
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          li: {
            whiteSpace: "nowrap"
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          content: {
            overflow: "hidden"
          }
        }
      },
      MuiCard: {
        defaultProps: {
          variant: "outlined"
        },
        variants: [
          {
            props: { variant: "clean" },
            style: () => ({
              border: "none",
              borderRadius: 0,
              boxShadow: "none",
              "& .MuiCardContent-root": {
                padding: 0
              }
            })
          },
          {
            props: { variant: "shadow" },
            style: () => ({
              borderRadius: MPT_SPACING_2,
              boxShadow: MPT_BOX_SHADOW
            })
          }
        ],
        styleOverrides: {
          root: {
            borderRadius: "16px" // Set your desired border-radius value
          }
        }
      },
      MuiCheckbox: {
        defaultProps: {
          color: "secondary"
        },
        styleOverrides: {
          colorSecondary: {
            color: secondary.main
          },
          root: {
            "& .MuiTableRowCheckbox-root": {
              // Only apply to table row checkboxes
              color: "gray",
              "&.Mui-checked": {
                color: "#000000"
              },
              "& .MuiSvgIcon-root": {
                fontSize: "16px"
              }
            }
          }
        }
      },
      MuiCssBaseline: {
<<<<<<< HEAD
        styleOverrides: {
          "#root": {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
          },
          ".MTPBoxShadow.MuiBox-root": {
            boxShadow: MPT_BOX_SHADOW,
            background: "#FFFFFF",
            padding: MPT_SPACING_3,
            borderRadius: MPT_SPACING_1,
            width: "100%"
          },
          ".MTPBoxShadowRoot": {
            "> .MuiBox-root": {
              boxShadow: MPT_BOX_SHADOW,
              background: "#FFFFFF",
              padding: MPT_SPACING_3,
              borderRadius: MPT_SPACING_1
            }
          },
          ".MuiBox-WhiteCard": {
            boxShadow: MPT_BOX_SHADOW,
            background: MPT_BRAND_WHITE,
            padding: MPT_SPACING_3,
            borderRadius: MPT_SPACING_1
          }
        }
=======
        styleOverrides: (theme) => ({
          "#root": { display: "flex", flexDirection: "column", minHeight: "100vh" },
          // https://github.com/mui/material-ui/issues/33519
          "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active": {
            WebkitBoxShadow: `0 0 0 30px ${getWebkitAutofillBackgroundColor(theme)} inset !important`
          }
        })
>>>>>>> upstream/integration
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            justifyContent: "center"
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            textAlign: "center"
          }
        }
      },
      MuiFormControl: {
        defaultProps: {
          margin: "dense"
        }
      },
      MuiFormHelperText: {
        defaultProps: {
          margin: "dense"
        },
        styleOverrides: {
          contained: () => ({
            marginLeft: 0,
            marginRight: 0
          })
        }
      },
      MuiIconButton: {
        defaultProps: {
          size: "small"
        },
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
            padding: 4,
            "&:hover": {
              backgroundColor: alpha(ACTION_HOVER, 0.5),
              borderRadius: MPT_SPACING_2
            }
          },
          sizeSmall: {
            padding: "10px", // Adjust padding to control button size
            "& .MuiSvgIcon-root": {
              fontSize: "20px"
            }
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "black"
          }
        },
        defaultProps: {
          size: "small"
        }
      },
      MuiInputBase: {
        defaultProps: {
          size: "small"
        },
        styleOverrides: {
          root: ({ theme }) => ({
            // https://github.com/mui/material-ui/issues/33519
            "&:has(> input:-webkit-autofill)": {
              backgroundColor: getWebkitAutofillBackgroundColor(theme)
            }
          })
        }
      },
      MuiLink: {
        defaultProps: {
          underline: "hover"
        }
      },
      MuiSwitch: {
        defaultProps: {
          color: "secondary"
        }
      },
      MuiListItem: {
        defaultProps: {
          dense: true
        },
        styleOverrides: {
          dense: {
            paddingTop: "0.375rem",
            paddingBottom: "0.375rem"
          },
          root: {
            "&.Mui-selected": {
              color: secondary.contrastText
            },
            "&.Mui-focusVisible": {
              backgroundColor: getLighten(secondary.main),
              color: secondary.contrastText
            }
          }
        }
      },
      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            right: "0.2rem"
          }
        }
      },
      MuiMenuItem: {
        defaultProps: {
          dense: true
        },
        styleOverrides: {
          root: {
            // https://github.com/mui-org/material-ui/issues/29842
            "&.Mui-selected": {
              backgroundColor: ACTION_SELECTED,
              color: MPT_BRAND_WHITE,
              "&.Mui-focusVisible": { background: ACTION_SELECTED },
              "&:hover": {
                backgroundColor: ACTION_SELECTED
              }
            }
          }
        }
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: SKELETON_COLOR
          }
        }
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            color: text.primary
          },
          labelContainer: {
            color: text.primary
          }
        }
      },
      MuiTable: {
        defaultProps: {
          size: "small"
        },
        styleOverrides: {
          root: {
            // Add any additional styles for the table root here
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {}
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: "black",
            ".MuiTypography-caption": {
              fontSize: "13px"
            },
            "&.MuiTableCell-head": {
              borderLeft: `1px solid ${MPT_GRAY_2}`,
              borderBottom: "1px solid black",
              "&:last-of-type": {
                borderRight: `1px solid ${MPT_GRAY_2}`
              }
            },
            "& .MuiIconButton-root": {
              padding: 0
            },
            "&.tableRowSelection svg": {
              fill: "black",
              width: "19px",
              height: "19px"
            }
          }
        }
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.6)"
          }
        }
      },
      MuiTableSortLabel: {
        defaultProps: {
          IconComponent: KeyboardArrowDownOutlinedIcon // Default icon for descending
        },
        styleOverrides: {
          root: {
            "&.Mui-active": {
              color: "black", // Ensure active label color is black
              "&[aria-sort='asc'] .MuiTableSortLabel-icon": {
                transform: "rotate(0deg)", // Rotate icon for ascending
                content: "''" // Clear any default content
              },
              "&[aria-sort='desc'] .MuiTableSortLabel-icon": {
                transform: "rotate(180deg)", // Rotate icon for descending
                content: "''" // Clear any default content
              }
            }
          }
        },
        slotProps: {
          icon: ({ direction }) => {
            if (direction === "asc") {
              return {
                component: KeyboardArrowUpOutlinedIcon
              };
            }
            return {
              component: KeyboardArrowDownOutlinedIcon
            };
          }
        }
      },
      MuiAlert: {
        styleOverrides: {
          action: {
            paddingTop: 0
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: "3rem",
            fontSize: "1rem",
            textTransform: "none",
            padding: `20px 12px`,
            margin: "0 12px 0 4px",
            color: "inherit"
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: "2rem"
          },
          indicator: {
            borderRadius: "4px",
            height: "4px"
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          size: "small"
        }
      },
      MuiToolbar: {
        defaultProps: {
          variant: "dense"
        },
        styleOverrides: {
          dense: {
            paddingRight: 0,
            ".MuiButton-root": {
              fontSize: "14px"
            }
          }
        }
      },
      MuiTypography: {
        defaultProps: {
          variant: "body2"
        },
        styleOverrides: {
          h6: {
            color: "black",
            fontSize: "24px"
          }
        },
        variants: [
          {
            props: { variant: "header" },
            style: ({ theme }) => ({
              ...theme.typography.subtitle1,
              marginBottom: "20px"
            })
          },
          {
            props: { variant: "property" },
            style: () => ({
              marginBottom: MPT_SPACING_1,
              fontWeight: "bold"
            })
          }
        ]
      },
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true
        }
      }
    },
    palette: {
      action: {
        hover: ACTION_HOVER,
        active: ACTION_ACTIVE,
        selected: ACTION_SELECTED
      },
      primary,
      secondary,
      info,
      success,
      error,
      warning,
      common,
      background: {
        default: BACKGROUND
      },
      text,
      lightYellow: {
        main: "#FFC348"
      },
      lightBlue: {
        main: "#4AB4EE",
        contrastText: common.white
      },
      gold: {
        main: "#FFD700"
      },
      silver: {
        main: "#C0C0C0"
      },
      bronze: {
        main: "#CD7F32"
      },
      chart,
      monoChart,
      googleMap: googleMapPalette,
      json: {
        default: text.primary,
        error: error.main,
        background: BACKGROUND,
        background_warning: BACKGROUND,
        string: text.primary,
        number: text.primary,
        colon: text.primary,
        keys: text.primary,
        keys_whiteSpace: text.primary,
        primitive: text.primary
      }
    }
  });
};

const PDF_THEME = {
  fontSizes: {
    summaryBig: 20,
    summarySmall: 10,
    h1: 17,
    h2: 16,
    text: 12,
    footerNote: 10
  },
  colors: {
    // TODO: Make this color configurable, get PRIMARY (`getLighten(PRIMARY)`) from `theme`
    link: getLighten("#004C74")
  },
  logoWidth: 120
};

// TODO: applyChartPaletteSettings needs to be rewritten, adding one one chart palette affects multiple files,
// hard to support and maintain.
export const RI_SP_CHART_PALETTE = ["#9950B1", "#4AB4EE", "#FFC348", "#30D5C8"];

export default (settings = {}) => customResponsiveFontSizes(createTheme(getThemeConfig(settings)), settings);

export { PDF_THEME };
