import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    colors: {
        boxesBorders: theme.colors.green[500],
        boxes: theme.colors.green[800],
        bgHome: theme.colors.white,
        income: theme.colors.green[600],
        expense: theme.colors.red[600],
    },
});
