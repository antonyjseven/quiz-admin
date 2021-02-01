import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  wrapper: {
    padding: "8px",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  contentWrapper: {
    position: "relative",
    padding: "8px 0",
    marginTop: "16px",
    display: "flex",
    minHeight: "calc(100vh - 96px)",
  },
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  },
  fab: {
    position: "fixed",
    bottom: "50px",
    right: "50px",
  },
});
