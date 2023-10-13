import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const NotifyError = ({ error }: { error?: string }) => {
  return (
    <div>
      <Typography color={red[400]}>{error}</Typography>
    </div>
  );
};

export default NotifyError;
