import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { CommonContext } from '../../../../context/CommonContext';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  CardActionArea,
  DialogTitle,
  Dialog,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// project imports
import MainCard from '../../../../components/Card/MainCard';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // Dialog
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>현재 농장 사진</DialogTitle>
      사진보여주기~
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#E3F2FD',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '10px',
}));

const CurrentImage = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <CardWrapper border={false} content={false}>
        <CardActionArea onClick={handleClickOpen}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="row">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar variant="rounded">
                      <PhotoCameraIcon />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: '20px',
                        fontWeight: 700,
                      }}
                    >
                      실시간 농장 사진
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardActionArea>
      </CardWrapper>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default CurrentImage;
