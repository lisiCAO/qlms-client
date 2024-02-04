import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import DashboardPropertiesCount from "./../../components/landlord/dashboard/DashboardPropertiesCount";
import DashboardPropertiesList from "./../../components/landlord/dashboard/DashboardPropertiesList";

// Dashboard page, presumably displaying user account information
const LandlordDashboard = () => {
  return (
    <>
      <title>Dashboard</title>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <DashboardPropertiesCount />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <DashboardPropertiesList />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default LandlordDashboard;
