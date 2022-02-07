import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';

import MainCard from '../../../components/Card/MainCard';
import InfoCard from './InfoCard';
import CurrentImage from './CurrentImage';

import { Grid } from '@mui/material';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fafafa',
  position: 'relative',
  // width: '100%',
  // height: '330px',
  border: 'none',
  margin: '30px 0px 40px 0px',
  padding: '5px 30px 5px 30px',
}));
// 캐러셀 참고 사이트
// https://codesandbox.io/examples/package/react-material-ui-carousel
const FarmPicture = () => {
  return (
    <CardWrapper>
      <Grid container direction="row" spacing={2}>
        <Grid
          item
          lg={8}
          md={8}
          sm={8}
          xs={8}
          style={{
            backgroundImage: `url(https://blog.beautifulfund.org/wp-content/uploads/171111W012-1-720x405.jpg)`,
            backgroundSize: 'cover',
          }}
        ></Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <InfoCard />
          <CurrentImage />
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

export default FarmPicture;
