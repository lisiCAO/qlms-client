import { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import ApiService from "../../../services/ApiService";

const DashboardPropertiesCount = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    ApiService.fetchLandlordDashboard()
      .then((data) => {
        setValue(data.propertiesCount[0].propertiesCount);
      })
      .catch((error) => {
        console.error("Error fetching DashboardPropertiesCount:", error);
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Properties Count
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardPropertiesCount;
