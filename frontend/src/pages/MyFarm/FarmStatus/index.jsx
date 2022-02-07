import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import StatusCard from './StatusCard';

import { Grid } from '@mui/material';

const FarmInfo = () => {
  const gridSpacing = 3;
  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <h2>차트</h2>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StatusCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FarmInfo;
