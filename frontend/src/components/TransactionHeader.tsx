import { Grid } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

const TransactionHeader: React.FC = () => {
  return (
    <Grid item xs={12} sx={{ mb: 1, p: 1 }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Date</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '500', fontSize: 20, ml: 2 }}>Transaction type</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Currency</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Amount</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Price</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionHeader;
