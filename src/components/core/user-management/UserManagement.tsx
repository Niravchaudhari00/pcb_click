import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { GridColDef, GridDeleteIcon, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserManagementResponsType,
  getUserManagement,
} from "../../../redux/slice/UserManagementSlice";
import { rootState, useAppDispatch } from "../../../redux/store";
import Table from "../../common/Table";
import { PaginationModel } from "../module/Module";

const UserManagement = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userManagementDataForTbl, setUserManagementDataForTbl] =
    useState<UserManagementResponsType>();

  console.log("userManagementDataForTbl: ", userManagementDataForTbl?.rows);
  const [paginationModel, setPaginationModel] =
    useState<PaginationModel | null>({
      page: 0,
      pageSize: 10,
    });

  const [sortModel, setSortModel] = useState<GridSortModel>();

  const [searchText, setSearchText] = useState<string | undefined>("");
  const dispatch = useAppDispatch();

  const { permissionModule } = useSelector((state: rootState) => state.module);
  const { userManagementData, loading } = useSelector(
    (state: rootState) => state.user
  );

  // set user data in state
  useEffect(() => {
    userManagementData && setUserManagementDataForTbl(userManagementData);
  }, [userManagementData]);

  useEffect(() => {
    dispatch(getUserManagement(handleGenerateQuery()));
  }, [sortModel, searchText, paginationModel]);

  // handlePaginationModel
  const handlePaginationModel = (changePage: PaginationModel) => {
    setPaginationModel(changePage);
    console.log("changePage: ", changePage);
  };

  // handleChangeSortModel
  const handlChangeSortModel = (model: GridSortModel) => setSortModel(model);

  const handleGenerateQuery = (): string => {
    let obj = {
      searchText: searchText,
      pageIndex: paginationModel ? paginationModel.page : "",
      pageSize: paginationModel ? paginationModel.pageSize : "",
      sortColumn: sortModel ? sortModel[0].field : "",
      sortDirection: sortModel ? sortModel[0].sort : "",
    };

    let query = "?";
    for (const [key, value] of Object.entries(obj)) {
      query += `${key}=${value}&`;
    }
    query = query.slice(0, -1);
    return query;
  };

  const HandleAddAndCancel = () => {
    setExpanded((prev) => !prev);
  };

  const handleCancel = () => {
    setExpanded(false);
    // setIsEdit(false);
    // reset();
  };

  // column
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 100,
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Name",
      disableColumnMenu: true,
      flex: 2,
    },

    {
      field: "email_address",
      headerName: "Email",
      disableColumnMenu: true,
      flex: 3,
    },

    {
      field: "role",
      headerName: "Role",
      disableColumnMenu: true,
      flex: 1,
      valueGetter: (params) => {
        return params.row.tbl_role.name;
      },

      renderCell: (params) => {
        return <>{params.row.tbl_role.name}</>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      disableColumnMenu: true,
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      sortable: false,
      flex: 1,

      renderCell: (params) => {
        return (
          <Box>
            <IconButton sx={{ color: blue[900] }}>
              <Tooltip title="Edit" placement="left">
                <ModeEditOutlineIcon />
              </Tooltip>
            </IconButton>

            <IconButton>
              <Tooltip title="Delete" placement="right">
                <GridDeleteIcon sx={{ color: red[900] }} />
              </Tooltip>
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <div className="w-[500px] md:w-[768px] lg:w-full">
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
            <TextField
              id="outlined-basic"
              placeholder="Search here..."
              variant="outlined"
              size="small"
              autoComplete={"false"}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {/* Add Button when you click open form  */}
            {permissionModule?.write ? (
              <Button
                startIcon={!expanded ? <AddIcon /> : <ClearIcon />}
                onClick={HandleAddAndCancel}
                variant="contained"
              >
                {!expanded ? "Add" : "Cancel"}
              </Button>
            ) : (
              <Button
                sx={{
                  cursor: "not-allowed",
                  bgcolor: blue[100],
                  "&:hover": { bgcolor: blue[100] },
                }}
                startIcon={!expanded ? <AddIcon /> : <ClearIcon />}
                variant="contained"
              >
                {!expanded ? "Add" : "Cancel"}
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Accordion expanded={expanded}>
            <AccordionSummary
              style={{ cursor: "default" }}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>User Details</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                component="form"
                // onSubmit={handleSubmit(onSubmit)}
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box>
                  {/* <Controller
                    name="name"
                    // control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        defaultChecked
                        value={field.value || ""}
                        // error={!!errors.name}
                        label="Module Name"
                        id="outlined-basic"
                        placeholder="Enter Module Name"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  /> */}
                  {/* <NotifyError error={errors?.name?.message} /> */}
                </Box>
                <Box sx={{ display: "flex", gap: 2, height: 40 }}>
                  {/* cancel Button when you click form reset and close accordion */}
                  <Button onClick={handleCancel} variant="outlined">
                    cancel
                  </Button>
                  {/* Submit  */}
                  <Button type="submit" variant="contained">
                    {isEdit ? "Update" : "Add"}
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {userManagementDataForTbl?.rows && (
          <Table
            columns={columns}
            page={paginationModel}
            sortModel={sortModel}
            rows={userManagementDataForTbl?.rows}
            loading={loading}
            rowCount={userManagementDataForTbl.count}
            handlePaginationModel={handlePaginationModel}
            handleSortModelChange={handlChangeSortModel}
          />
        )}
      </Container>

      {/* {confirmModal && <ConfirmModal modalData={confirmModal} />} */}
    </div>
  );
};

export default UserManagement;
