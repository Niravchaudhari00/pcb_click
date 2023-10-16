import { Box, Button, Container, Typography } from "@mui/material";

const Permission = () => {
  const HandleAddAndCancel = () => {
    // setIsEdit(false);
    // setExpanded((prev) => !prev);
    // reset();
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
            {/* <SearchKeyword moduleData={moduleDataRows} /> */}
            {/* Add Button when you click open form  */}
            <Button onClick={HandleAddAndCancel} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Permission;
