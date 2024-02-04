import React, { useState } from 'react';
import { Modal, Box, Button, Avatar, Typography, Card, CardActions, CardContent, Divider } from '@mui/material';
import ApiService from '../../services/ApiService'; // 确保正确导入ApiService

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AccountProfile = ({ userData, refreshUserData }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(userData.profile_picture_url || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('imagefile', selectedFile);
  
    try {
      const { fileUrl } = await ApiService.uploadImage(formData);
      
      if (fileUrl) {

        const updatedProfile = {
          profile_picture_url: fileUrl,
          username: userData.username, 
          email: userData.email, 
          role: userData.role, 
        };
        await ApiService.updateProfile(userData.id, updatedProfile);
        refreshUserData(); 
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  
    handleClose();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Avatar src={preview} sx={{ height: 80, mb: 2, width: 80 }} />
          <Typography gutterBottom variant="h5">
            {userData.username}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {userData.city_name} {userData.province}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {userData.role}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" onClick={handleOpen}>
          Upload picture
        </Button>
      </CardActions>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Profile Picture
          </Typography>
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload} sx={{ mt: 2 }}>
            Upload
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default AccountProfile;
