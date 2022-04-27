import { Grid } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

const CryptocurrencyWalletHeader: React.FC = () => {
  return (
    <Grid item xs={12} sx={{ mb: 1, p: 1 }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Name</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Amount</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Worth</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Price</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Change</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Sparkline</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CryptocurrencyWalletHeader;
