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
import axiosInstance from "../../services/AxiosInstance";
import { Dashboard } from "../../services/API";
import { useDispatch } from "react-redux";
import { setProgress } from "../../redux/slice/AuthSlice";
import { ConfirmModalType } from "./DataTable";
import { removeModule } from "../../redux/slice/ModuleSlice";
import { ErrorResponseType } from "../../page/SingIn";
import axios from "axios";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const handleDelete = async (id: number) => {
    dispatch(setProgress(30));
    try {
      const response = await axiosInstance.delete(`${Dashboard.MODULE}/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(removeModule(id));
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResponse: ErrorResponseType = error.response?.data;
        toast.error(errResponse.message);
      }
    }
    modalData.onCancle();
    dispatch(setProgress(100));
  };
  return (
    <div>
      <Dialog
        open={!!modalData}
        onClose={() => {
          modalData.onCancle();
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
          <Button autoFocus onClick={modalData.onCancle}>
            {modalData.cancelBtnText}
          </Button>
          <Button onClick={() => handleDelete(modalData.onDelete())}>
            {modalData.confirmBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
