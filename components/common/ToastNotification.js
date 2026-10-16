import { forwardRef, useEffect } from "react";
import { IconButton, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "@/utils/store";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ToastNotification() {
  const store = Store();
  const snackbar = store.getSnackbarDetails();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    store.setSnackbarDetails({
      status: false,
      message: "",
      color: "error",
      vertical: "top",
      horizontal: "center"
    });
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    setTimeout(() => {
      store.setSnackbarDetails({
        status: false,
        message: "",
        color: "error",
        vertical: "top",
        horizontal: "center"
      });
    }, 6000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {snackbar.message ? (
        <Snackbar
          open={snackbar.status}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
          anchorOrigin={{
            vertical: snackbar.vertical,
            horizontal: snackbar.horizontal
          }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.color}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}
