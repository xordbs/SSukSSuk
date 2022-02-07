// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// project imports
import MainCard from '../../../../components/Card/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#E3F2FD',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '10px',
}));

const CurrentImage = () => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={false} content={false}>
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
      </CardWrapper>
    </>
  );
};

export default CurrentImage;
