import React from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

class Status extends React.Component {
  render() {
    const temp = this.props.curSensorData.temp;
    const humi = this.props.curSensorData.humi;
    const sensor_date = this.props.curSensorData.sensor_date;
    const isGood = this.props.isGood;

    return (
      <Box sx={{ px: 2 }}>
        <div
          className={
            isGood == 1
              ? 'status-card status-card-color1'
              : 'status-card status-card-color2'
          }
        >
          <Box sx={{ px: 4, py: 3 }}>
            <Grid container direction="row">
              <Grid item>
                <Grid container>
                  <Grid item>
                    <img
                      className="emoji_img"
                      src={isGood == 1 ? 'images/smile.png' : 'images/bad.png'}
                      alt="logo"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        fontWeight: 700,
                        color: '#ffffff',
                        mb: 0.75,
                      }}
                    >
                      온도 : {parseFloat(temp).toFixed(1)}°C
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        fontWeight: 700,
                        color: '#ffffff',
                        mb: 0.75,
                      }}
                    >
                      습도 : {parseFloat(humi).toFixed(1)}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Grid container justifyContent="flex-end">
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 300,
              color: '#333333',
              mt: 0.75,
            }}
          >
            {sensor_date} 갱신
          </Typography>
        </Grid>
      </Box>
    );
  }
}

export default Status;
