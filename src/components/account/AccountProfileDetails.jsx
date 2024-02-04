import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import ApiService from "../../services/ApiService";

// Tenant specific fields configuration
const tenantFields = [
  { name: "first_name", label: "First Name", required: true },
  { name: "last_name", label: "Last Name", required: true },
  { name: "national_id", label: "National ID", required: false },
  { name: "employer_info", label: "Employer Info", required: false },
  { name: "phone_number", label: "Phone Number", required: true },
  { name: "email", label: "Email", required: true },
  { name: "street_number", label: "Street Number", required: false },
  { name: "street_name", label: "Street Name", required: false },
  { name: "city_name", label: "City", required: false },
  { name: "postcode", label: "Postal Code", required: false },
  { name: "province", label: "Province", required: false },
  { name: "date_of_birth", label: "Date of Birth", required: false },
  {
    name: "emerge_contact_name",
    label: "Emergency Contact Name",
    required: false,
  },
  {
    name: "emerge_contact_number",
    label: "Emergency Contact Number",
    required: false,
  },
  { name: "bank_info", label: "Bank Info", required: false },
  { name: "reference_url", label: "Reference URL", required: false },
  // More fields can be added or removed as needed
];

// Landlord specific fields configuration
const landlordFields = [
  { name: "first_name", label: "First Name", required: true },
  { name: "last_name", label: "Last Name", required: true },
  { name: "phone_number", label: "Phone Number", required: true },
  { name: "email", label: "Email", required: true },
  { name: "street_number", label: "Street Number", required: false },
  { name: "street_name", label: "Street Name", required: false },
  { name: "city_name", label: "City", required: false },
  { name: "postcode", label: "Postal Code", required: false },
  { name: "province", label: "Province", required: false },
  { name: "date_of_birth", label: "Date of Birth", required: false },
  // More fields can be added or removed as needed
];

const AccountProfileDetails = ({ userData }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    if (userData) {
      setValues(userData);
    }
  }, [userData]);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await ApiService.updateProfile(userData.id, values);
        console.log(response);
        setSuccess("User data updated successfully");
      } catch (error) {
        setMessage(error.message || "Failed to update user data");
      }
    },
    [values, userData.id]
  );

  // Display different fields based on user role
  const fieldsConfig =
    userData.role === "tenant" ? tenantFields : landlordFields;

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {fieldsConfig.map((field) => (
                <Grid item xs={12} md={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    onChange={handleChange}
                    required={field.required}
                    value={values[field.name] || ""}
                    helperText={
                      field.required
                        ? `Please specify the ${field.label.toLowerCase()}`
                        : ""
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
