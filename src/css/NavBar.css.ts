import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingLeft: 0,
    },
    logo: {
      paddingRight: 16,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      paddingTop: 100,
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
      paddingRight: 0,
      paddingLeft: 0,
    },
    content: {
      paddingTop: 55,
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    noPadding: {
      padding: 0,
    },
  })
);
