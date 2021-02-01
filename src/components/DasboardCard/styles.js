import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "270px",
    height: "340px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    height: "150px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    maxHeight: "57px",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    position: "absolute",
    right: "16px",
    bottom: "24px",
    width: "100px",
  },
});
