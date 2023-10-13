import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",

        gap: 3,
        padding: 1,
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          sx={{ width: 500, bgcolor: "#e0e7ff", display: "flex" }}
          key={index}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                textAlign="center"
                gutterBottom
                variant="h3"
                component="div"
              >
                100
              </Typography>
              <Typography
                textAlign={"center"}
                variant="h5"
                color="text.secondary"
              >
                garbage
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
};

export default Dashboard;
