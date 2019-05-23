import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import styled from "styled-components";
import {Drawer} from "@material-ui/core";

export const backgroundColor = "#1e3c4a";
export const backgroundColorSecondary = "#607d8b";
export const backgroundColorTertiary = "#d4e7ef";


export const textColor = "#d4e7ef";

export const notificationColor = "#FFAB40";

export const drawerWidth = 240;

export const detailsWidth = "70%";

export const themeSsm = createMuiTheme({
    palette: {
        type: "light",
        text: {
            primary: textColor,
        }
    },
    overrides: {
        MuiDrawer: {
            paper: {
                background: backgroundColor
            }
        },
        MuiListItemIcon: {
            root :{
                color: textColor
            }
        },
        MuiToolbar: {
            root:{
                background: backgroundColorSecondary,
                color: textColor,
                borderBlockStart: "none"
            }
        },
        MuiBadge: {
            colorSecondary: {
                backgroundColor: notificationColor
            }
        },
        MuiTable: {
            root: {
                color:"black"
            }
        },
        MuiTableCell: {
            body: {
                color:"black",

            }
        },
        MuiTableSortLabel: {
            root: {
                "&:hover": {
                    color: "black"
                }
            },
            active: {
                color: "black",
                "&:hover": {
                    color: "black"
                },
                "&:focus": {
                    color: "black"
                }
            }
        }
    }
});

export const DrawerDetails = styled(Drawer).attrs(({ theme }) => ({
    classes: { paper: "paper" }
}))`
  width: ${detailsWidth};

  & .paper {
    width: ${detailsWidth};
  }
`;
