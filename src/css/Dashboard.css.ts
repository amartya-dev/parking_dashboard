import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: 120,
      flexGrow: 1,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    parkingCardAvailable: {
      backgroundColor: `${green[500]} !important`,
      maxWidth: 250,
    },
    parkingCardNotAvailable: {
      backgroundColor: `${red[500]} !important`,
      maxWidth: 250,
    },
    whiteColor: {
      color: "white",
    },
    avatarNotAvailable: {
      backgroundColor: `${red[500]} !important`,
    },
    avatarAvailable: {
      backgroundColor: `${green[500]} !important`,
    },
    gridContainer: {
      paddingRight: 0,
      paddingLeft: theme.spacing(32),
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
);
