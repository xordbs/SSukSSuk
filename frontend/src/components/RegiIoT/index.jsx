import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import { Grid,DialogTitle,DialogContent, Dialog, useMediaQuery, Typography } from '@material-ui/core';

const RegiIoT = () => {
  const { regiIoTDialogOpen, setRegiIotDialogOpen } = useContext(CommonContext);
  let history = useHistory();
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleClose = () => {
    setRegiIotDialogOpen(false);
    history.goBack();
  };

  return (
    <ViewContext.Provider value={{}}>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'md'}
        open={regiIoTDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            boxShadow: 'none',
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <DialogTitle id="responsive-dialog-title">
              <Typography>IoT 기기 신청</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid>아이디</Grid>
              <Grid>주소</Grid>
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </ViewContext.Provider>
  );
};

export default RegiIoT;
