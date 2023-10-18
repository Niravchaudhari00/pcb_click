import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import WarningIcon from "@mui/icons-material/Warning";
import { grey, red } from "@mui/material/colors";

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
        <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <WarningIcon
            fontSize="large"
            sx={{
              borderRadius: 50,
              bgcolor: red[100],
              padding: 1,
              color: red[900],
            }}
          />
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            {modalData.title}
            <DialogContentText>{modalData.description}</DialogContentText>
          </DialogTitle>
        </Box>
        <DialogActions sx={{ marginTop: 2, bgcolor: grey[100], paddingY: 2 }}>
          <Button
            sx={{
              bgcolor: grey[300],
              borderRadius: 50,
              color: "black",
              paddingX: 2,
            }}
            autoFocus
            onClick={modalData.cancelHandler}
          >
            {modalData.btnCancelTxt}
          </Button>
          <Button
            sx={{
              bgcolor: red[600],
              "&:hover": { bgcolor: red[400] },
              borderRadius: 50,
              color: "white",
              paddingX: 2,
            }}
            onClick={modalData.confirmHandler}
          >
            {modalData.btnConfirmTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
