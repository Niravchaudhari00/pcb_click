import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

export interface ConfirmModalType {
  title: string;
  description: string;
  btnCancelTxt: string;
  btnConfirmTxt: string;
  cancelHandler: () => void;
  confirmHandler: () => void;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const ConfirmModal = ({ modalData }: { modalData: ConfirmModalType }) => {
  return (
    <div>
      <Dialog
        open={!!modalData}
        onClose={() => {
          modalData.cancelHandler;
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {modalData.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{modalData.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={modalData.cancelHandler}>
            {modalData.btnCancelTxt}
          </Button>
          <Button onClick={modalData.confirmHandler}>
            {modalData.btnConfirmTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
