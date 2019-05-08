import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";

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
                color:"black"
            }
        }
    }
});
