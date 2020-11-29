import Card from "@material-ui/core/Card";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { darken, fade } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const createShadow = (pv, pb, ps, uv, ub, us, av, ab, as) =>
  [
    `0 ${pv}px ${pb}px ${ps}px rgba(0, 0, 0, 0.2)`,
    `0 ${uv}px ${ub}px ${us}px rgba(0, 0, 0, 0.14)`,
    `0 ${av}px ${ab}px ${as}px rgba(0, 0, 0, 0.12)`
  ].join(",");

export const ICONBUTTON_SIZE = 48;

const fontFamily = '"roboto", "Inter", "sans-serif"';

export default (colors) =>
  createMuiTheme({
    overrides: {
      MuiButton: {
        
        contained: {
          "&$disabled": {
            color: colors.dark,
            backgroundColor: "grey"
          },
          "&:active": {
            boxShadow: null
          },
          "&:hover": {
            boxShadow: null
          },
          boxShadow: null,
          height: 30,
          fontSize: 14,
          borderRadius: 6,
          textTransform: 'none'
        },
        containedPrimary: {
          backgroundColor: fade(colors.primary, 0.75),
          "&:active": {
            backgroundColor: fade(colors.primary, 0.75)
          },
          "&:hover": {
            backgroundColor: darken(colors.primary, 0.1)
          }
        },

        label: {
          color: colors.font.button,
          fontWeight: 600
        },
        root: {
          "&$disabled": {
            color: fade(colors.font.black, .4)
          },
          "& svg": {
            marginLeft: 8
          },
          borderRadius: 4
        },
        text: {
          "& span": {
            color: colors.font.default
          }
        },
        textPrimary: {
          "& span": {
            color: colors.black
          }
        },
      },
      MuiIconButton:{
        root:{
          color:colors.primary,
          padding: 0
        },
        "& :focus":{
          outline:"none"
        }
      },
      MuiCard: {
        root: {
          borderRadius: 6,
          overflow: "visible",
          padding: "20px 30px 20px 30px",
          boxShadow: "1px 3px 4px rgba(255, 255, 255, 0.1)",
        }
      },
      MuiCardContent:{
        root: {
          padding: 0
        }
      },
      MuiCardActions: {
        root: {
          flexDirection: "row-reverse" ,
         
        }
      },
      MuiDialogTitle:{
        root:{
          fontSize: 24,
          lineHeight: "28px",
          backgroundColor: colors.primary,
          color: colors.white
        }
      },
      MuiDialogContent:{
        root:{
          backgroundColor: fade(colors.primary, 0.75),
         
        }
      },
      MuiDialogActions:{
        root:{
          backgroundColor: fade(colors.primary, 0.75),
        }
      },
      MuiTypography:{
        colorTextSecondary:{
          color:colors.black
        },
        colorPrimary:{
          color:colors.black
        }
      },
      MuiFormLabel:{
        root:{
          color:colors.white
        }
      },
      MuiTable: {
        root: {
          fontFamily,
          fontFeatureSettings: '"tnum"'
        }
      },
      MuiTableCell: {
        body: {
          fontSize: 14,
          paddingBottom: 21,
          paddingTop:21,
          color: colors.font.dark,
        },
        footer: {
          fontSize: 14,
          color: colors.font.dark,
        },
        head: {
          fontSize: "1rem",
          color: colors.font.dark
        },
     
        root: {
          "&:first-child": {
            "&:not($paddingCheckbox)": {
              paddingLeft: 24 + "px",
              textAlign: "left" 
            }
          },
          borderBottomColor: colors.paperBorder,
         
          padding: "4px 0px",
          fontWeight:  "normal",
          lineHeight: `16px`
        }
      },
      MuiTableRow: {
        footer: {
          "$root$hover&:hover": {
            background: "none"
          }
        },
        head: {
          "$root$hover&:hover": {
            background: "none"
          }
        },
        hover: {
          "$root&:hover": {
            backgroundColor: fade(colors.primary, 0.1)
          }
        },
      
        root: {
          "&$selected": {
            backgroundColor: fade(colors.primary, 0.1)
          }
        }
      },
     
      MuiInputBase: {
        input: {
        
          "&$disabled": {
            color: colors.input.disabledText
          },
          "&::placeholder": {
            color: colors.font.gray,
            opacity: "1 !important" 
          },
          zIndex: 2
        },  
        root:{
          position: 'relative',
          //backgroundColor: colors.background.paper,
          lineHeight: 1.25,
          //padding: '0px 12px',
          fontSize: 14,
          height: 25,
          color: `${colors.font.dark} !important`,
        }
      },
      MuiOutlinedInput:{
       
        root:{
          borderRadius: 6,
          border: `0px solid ${colors.primary}`,
          background: colors.white,
          marginTop: 21
        }
      }
      
    },
    palette: {
      action: {
        active: colors.checkbox.default
      },
      background: colors.background,
      divider: colors.divider,
      error: {
        main: colors.error
      },
      primary: {
        contrastText: "#ffffff",
        dark: colors.font.textDisabled,
        main: colors.primary
      },
      secondary: {
        contrastText: "#ffffff",
        main: colors.secondary
      },
      text: {
        disabled: colors.font.gray,
        hint: colors.font.gray,
        primary: colors.font.default,
        primaryDark: colors.font.dark,
        secondary: colors.font.gray,
        dark: colors.font.black,
        white: colors.font.white
      },
      common:{
        white: '#ffffff'
      },
      type: colors.theme
    },
    props: {
      MuiFormControl: {
        variant: "filled"
      }
    },
    shadows: [
      "none",
      createShadow(1, 1, 0, 2, 1, -2, 1, 3, 0),
      createShadow(2, 2, 0, 3, 1, -2, 1, 5, 0),
      createShadow(3, 4, 0, 3, 3, -2, 1, 8, 0),
      createShadow(4, 5, 0, 1, 10, 0, 2, 4, -1),
      createShadow(5, 8, 0, 1, 14, 0, 3, 4, -1),
      createShadow(6, 10, 0, 1, 18, 0, 3, 5, -1),
      createShadow(7, 10, 0, 2, 16, 1, 4, 5, -2),
      createShadow(8, 10, 1, 3, 14, 2, 5, 5, -3),
      createShadow(9, 12, 1, 3, 16, 3, 5, 6, -4),
      createShadow(10, 14, 1, 4, 18, 3, 6, 7, -4),
      createShadow(11, 16, 1, 4, 20, 3, 6, 7, -4),
      createShadow(12, 17, 1, 5, 22, 4, 7, 8, -4),
      createShadow(13, 19, 1, 5, 24, 4, 7, 8, -4),
      createShadow(14, 21, 1, 5, 26, 4, 7, 9, -5),
      createShadow(15, 22, 1, 5, 28, 4, 7, 9, -5),
      createShadow(16, 24, 2, 6, 30, 5, 8, 10, -5),
      createShadow(15, 27, 3, 7, 28, 3, 10, 14, -4),
      createShadow(14, 30, 4, 8, 26, 1, 12, 17, -3),
      createShadow(13, 33, 4, 8, 24, -1, 14, 20, -1),
      createShadow(12, 36, 5, 9, 22, -2, 16, 24, 1),
      createShadow(11, 39, 6, 10, 20, -4, 18, 28, 1),
      createShadow(10, 41, 7, 10, 18, -5, 20, 31, 2),
      createShadow(9, 44, 7, 11, 16, -6, 22, 35, 2),
      createShadow(9, 46, 8, 11, 15, -7, 24, 38, 3)
    ],
    typography: {
      allVariants: {
        fontFamily
      },
      body1: {
        color: colors.font.default
      },
      fontFamily,
      h4: {
        color: colors.font.default
      },
      h5: {
        fontSize: "1.3125rem"
      },
      caption:{
        color: colors.white
      }
    }
  });

TextField.defaultProps = {
  ...TextField.defaultProps,
  variant: "outlined"
};

Card.defaultProps = {
  ...Card.defaultProps,
  elevation: 0
};

Typography.defaultProps = {
  component: "div"
};
