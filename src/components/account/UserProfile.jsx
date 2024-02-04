import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import AccountProfile from "./AccountProfile";
import AccountProfileDetails from "./AccountProfileDetails";
import ApiService from "../../services/ApiService";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshUserData = async () => {
    try {
      setLoading(true); 
      const data = await ApiService.fetchProfile();
      setUserData(data); 
      setError(''); 
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    refreshUserData(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Account</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <AccountProfile userData={userData} refreshUserData={refreshUserData} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AccountProfileDetails userData={userData} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default UserProfile;
