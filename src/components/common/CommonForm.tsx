import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import NotifyError from "./NotifyError";

const CommonForm = () => {
  return (
    <div>
      <Accordion expanded={expanded}>
        <AccordionSummary
          style={{ cursor: "default" }}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography>Module Details</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Box>
              <Controller
                name="module_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    defaultChecked
                    value={field.value || ""}
                    error={!!errors.module_name}
                    label="Module Name"
                    id="outlined-basic"
                    placeholder="Enter Module Name"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <NotifyError error={errors?.module_name?.message} />
            </Box>
            <Box sx={{ display: "flex", gap: 2, height: 40 }}>
              <Button onClick={handleCancle} variant="outlined">
                cancel
              </Button>
              <Button type="submit" variant="contained">
                {isEdit ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CommonForm;
