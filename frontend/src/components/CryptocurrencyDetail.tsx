import { Divider, Grid } from '@mui/material';
import { default as dayjs } from 'dayjs';
import ICryptoCoin from '../interfaces/cryptocurrency/ICryptoCoin';
import React from 'react';
import Typography from '@mui/material/Typography';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const numberPrecision = 7;
const locale = 'en-GB';

const dateFormat = 'YYYY.MM.DD. HH:mm:ss';

const CryptocurrencyDetail: React.FC<ICryptoCoin & { baseSymbol: string; baseSign: string }> = (
  props
) => {
  dayjs.extend(customParseFormat);
  const firstSeenDate = dayjs(props.firstSeen).format(dateFormat);

  return (
    <Grid item xs={12} sx={{ mt: 5, p: 3 }}>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '500', fontSize: 24, color: '#242424' }}>Name</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '500', fontSize: 24, color: '#242424' }}>Value</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '500', fontSize: 24, color: '#242424' }}>
            Description
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Confirmed supply</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.confirmedSupply ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Coins without a confirmed supply are ranked below coins with a confirmed supply.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Number of markets</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.numberOfMarkets ?? '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The number of markets that contain the this coin.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Number of exchanges</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.numberOfExchanges ?? '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The number of exchanges that trade this coin.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Type</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>{props.type ?? '-'}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The type of the coin can be either coin (BTC, ETH, etc.), fiat (USD, EUR, etc.) or
            denominator (Satoshi, Wei, etc.).
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Volume</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.volume?.toLocaleString(locale, {
              minimumFractionDigits: numberPrecision,
            }) ?? '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            24h trade volume.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Market cap</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.marketCap
              ? props.marketCap?.toLocaleString(locale, {
                  minimumFractionDigits: numberPrecision,
                }) +
                ' ' +
                props.baseSign
              : '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Market capitalization. Price times circulating supply.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Circulating supply</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.circulatingSupply?.toLocaleString(locale, {
              minimumFractionDigits: numberPrecision,
            }) ?? '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Number of coins that are circulating in the public market.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Total supply</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.totalSupply?.toLocaleString(locale, {
              minimumFractionDigits: numberPrecision,
            }) ?? '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Number of coins that are in existence.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>First seen</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {firstSeenDate.toString() !== 'Invalid Date' ? firstSeenDate.toString() : '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Time when the first price was calculated.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Change</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.change !== null ? props.change + ' %' : '-'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Percentage of price change over the last 24h.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Low trade volume penalty</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.penalty ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The application gives coins with a very low 24h trade volume a penalty and lists these
            coins below non-penalised coins.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CryptocurrencyDetail;
