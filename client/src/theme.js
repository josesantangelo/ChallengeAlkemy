import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    styles: {
        global: {
            body: {
                bg: "whitesmoke",
            }
        }
    },
    colors: {
        boxesBorders: theme.colors.green[700],
        boxes: theme.colors.green[800],
        bgHome: theme.colors.white[900],
        income: theme.colors.green[600],
        expense: theme.colors.red[600],
    },
});
