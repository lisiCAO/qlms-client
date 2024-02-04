import { useState, useEffect } from "react";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ApiService from "../../../services/ApiService";

export const DashboardPropertiesList = (props) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    ApiService.fetchLandlordDashboard()
      .then((data) => {
        setProperties(data.propertiesResult);
      })
      .catch((error) => {
        console.error("Error fetching DashboardPropertiesList:", error);
      });
  }, []);

  return (
    <Card>
      <CardHeader title="Recent Lease End" />

      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property Id</TableCell>
              <TableCell>Tenant</TableCell>
              <TableCell>Address</TableCell>
              <TableCell sortDirection="desc">Lease End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.property_id}>
                <TableCell>{property.property_id}</TableCell>
                <TableCell>{property.tenant_name}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.lease_endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

export default DashboardPropertiesList;
