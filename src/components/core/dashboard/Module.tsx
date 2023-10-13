import axiosInstance from "../../../services/AxiosInstance";
import { Dashboard } from "../../../services/API";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setProgress } from "../../../redux/slice/AuthSlice";
import { useLocation } from "react-router-dom";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NotifyError from "../../common/NotifyError";
import { toast } from "react-toastify";
import axios from "axios";
import { ErrorResponseType } from "../../../page/SingIn";
import { ModuleTypes, addModule } from "../../../redux/slice/ModuleSlice";
import DataTable from "../../common/DataTable";
import SearchKeyword from "../../common/SearchKeyword";
import { useEffect, useState } from "react";

// module interface
interface ModuleType {
  module_name: string;
}

export interface UpdateModuleType {
  id: number;
  name: string;
}

const schema = yup.object({
  module_name: yup.string().required(),
});

const Module = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // use form hook
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<ModuleType>({ resolver: yupResolver(schema) });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Accordion
  const [expanded, setExpanded] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<ModuleTypes | undefined>();

  // Edit Effect
  useEffect(() => {
    if (isEdit) {
      setValue("module_name", updateValue?.name as string);
    }
  }, [isEdit]);

  // Data fetch Effect
  // useEffect(() => {
  //   const fetchPermissionData = async () => {
  //     dispatch(setProgress(30));
  //     try {
  //       const response = await axiosInstance.get(Dashboard.MODULE);
  //       const data: ModuleTypes = response.data;
  //       dispatch(addModule(data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     dispatch(setProgress(100));
  //   };

  //   fetchPermissionData();
  // }, []);

  // Handle AddBtn Toggle
  const handleAdd = (x: boolean, y: boolean, value?: ModuleTypes) => {
    setIsEdit(x);
    setExpanded(y);
    setUpdateValue(value);

    if (!x) {
      reset();
    }
  };

  // Handle cancel
  const handleCancle = () => {
    setExpanded(false);
    setIsEdit(false);
    reset({
      module_name: "",
    });
  };

  // Module Save
  const onSubmit: SubmitHandler<ModuleType> = async (data) => {
    // If Mode Edit
    if (isEdit) {
      const currentValue = getValues();
      const id = updateValue?.id;

      const updateData = {
        name: currentValue.module_name,
      };
      dispatch(setProgress(30));
      try {
        const response = await axiosInstance.put(
          `${Dashboard.MODULE}/${id}`,
          updateData
        );
        dispatch(addModule(response.data.data));
        console.log(`Update Response`, response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errResponse: ErrorResponseType = error.response?.data;
          toast.error(errResponse.message);
        }
      }
      dispatch(setProgress(100));
    } else {
      // Data Add
      const addData = {
        name: data.module_name,
      };

      // save API call
      dispatch(setProgress(30));
      try {
        const response = await axiosInstance.post(Dashboard.MODULE, addData);
        console.log(response);
        toast.success(response.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errResponse: ErrorResponseType = error.response?.data;
          toast.error(errResponse.message);
        }
      }
      dispatch(setProgress(100));

      reset({
        module_name: "",
      });
    }

    setExpanded(false);
  };

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginBottom: 3,
            display: "flex",
            justifyContent: "space-between",
            placeItems: "center",
            height: 100,
          }}
        >
          <Typography
            fontWeight="bold"
            variant="h5"
            sx={{ textTransform: "capitalize" }}
          >
            {location.pathname.split("/").join("")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              placeItems: "center",
              gap: 3,
            }}
          >
            {/* <SearchKeyword /> */}
            <Button onClick={() => handleAdd(false, true)} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
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
        </Box>
        <Box>
          <DataTable setValue={handleAdd} />
        </Box>
      </Container>
    </div>
  );
};

export default Module;
