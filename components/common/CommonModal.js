import styled from "@emotion/styled";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommonModal = ({ open, children, handleClose, maxWidth, title }) => {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      PaperComponent={DialogWrapper}
    >
      <DialogTitle component="h2" variant="h2">
        <strong>{title}</strong>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        className="closeButton"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CommonModal;

const DialogWrapper = styled(Paper)`
  ${() => `
  &.MuiPaper-root {
    position: relative;
    overflow: visible;

    .MuiDialogContent-root {
      &::-webkit-scrollbar {
        width: 0;
      }
  
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px transparent;
      }
  
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
        outline: 0;
      }
    }
    

    .MuiDialogTitle-root {
      padding-bottom: 8px;
      width: 100%;
      background: #FFFFFF;
      border-bottom: 1px solid #F5F5F5;
      box-shadow: 0 0 10px #cecdcd;
    }

    .closeButton {
      position: absolute;
      background: #000;
      right: -10px;
      top: -10px;
      width: 30px;
      height: 30px;
    }
  }
`}
`;
