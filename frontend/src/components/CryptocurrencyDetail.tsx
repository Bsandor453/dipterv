import { Divider, Grid } from '@mui/material';
import { default as dayjs } from 'dayjs';
import ICryptocurrencyDetails from '../interfaces/cryptocurrency/ICryptocurrencyDetails';
import React from 'react';
import Typography from '@mui/material/Typography';
import config from '../config/Config';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const baseCurrency = config.defaults.baseCurrency;
const locale = 'en-GB';

const dateFormat = 'D MMMM, YYYY';

const CryptocurrencyDetail: React.FC<ICryptocurrencyDetails> = (props) => {
  dayjs.extend(customParseFormat);
  const genesisDate = props.genesis_date ? dayjs(props.genesis_date).format(dateFormat) : '?';
  const athDate = props.ath_date ? dayjs(props.ath_date).format(dateFormat) : '?';
  const atlDate = props.atl_date ? dayjs(props.atl_date).format(dateFormat) : '?';

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
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Market capitalization</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.market_cap !== 0 ? props.market_cap?.toLocaleString(locale) ?? '?' : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            In Crypto, market cap is measured by multiplication of the circulating supply of tokens
            or currency and its current price.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Fully diluted valuation</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.fully_diluted_valuation !== 0
              ? props.fully_diluted_valuation?.toLocaleString(locale) ?? '?'
              : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Fully Diluted Valuation (FDV) is the market capitalization if the max supply of a coin
            is in circulation. The common mathematical formula used to calculate FDV is Current
            Price x Max Supply. Note that it can take 3, 5, 10 or more years before the FDV can be
            reached, depending on how the emission schedule is designed.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Total volume</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.total_volume !== 0 ? props.total_volume?.toLocaleString(locale) ?? '?' : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The total trading volume tracked by coinecko.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>24h high</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.high_24h !== 0 ? props.high_24h?.toLocaleString(locale) ?? '?' : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The highest price in the last 24 hours.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>24h low</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.low_24h !== 0 ? props.low_24h?.toLocaleString(locale) ?? '?' : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The lowest price in the last 24 hours.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            1h price change percentage
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.price_change_percentage_1h_in_currency !== 0
              ? props.price_change_percentage_1h_in_currency?.toLocaleString(locale) ?? '?'
              : '?'}
            {' %'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Price change given as a percentage in the last 1 hour.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>24h price change </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.price_change_24h !== 0
              ? props.price_change_24h?.toLocaleString(locale) ?? '?'
              : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Price change in dollars in the last 24 hours.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            7d price change percentage
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.price_change_percentage_7d_in_currency !== 0
              ? props.price_change_percentage_7d_in_currency?.toLocaleString(locale) ?? '?'
              : '?'}
            {' %'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Price change given as a percentage in the last 7 days.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            24h price change percentage
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.price_change_percentage_24h !== 0
              ? props.price_change_percentage_24h?.toLocaleString(locale) ?? '?'
              : '?'}
            {' %'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Price change given as a percentage in the last 24 hours.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>24h market cap change </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.market_cap_change_24h !== 0
              ? props.market_cap_change_24h?.toLocaleString(locale) ?? '?'
              : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Market capitalization change in dollars in the last 24 hours.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            24h market cap change percentage
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.market_cap_change_percentage_24h !== 0
              ? props.market_cap_change_percentage_24h?.toLocaleString(locale) ?? '?'
              : '?'}
            {' %'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            Market capitalization change given as a percentage in the last 24 hours.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Circulating supply</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.circulating_supply !== 0
              ? props.circulating_supply?.toLocaleString(locale) ?? '?'
              : '?'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            An approximation of the number of coins or tokens that are currently not locked and
            available for public transactions.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Total supply</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.total_supply !== 0 ? props.total_supply?.toLocaleString(locale) ?? '?' : '?'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            All the tokens and coins that will exist in a cryptocurrency network. Total supply does
            not account for coins or tokens that have been burned or destroyed.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Max supply</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.max_supply !== 0 ? props.max_supply?.toLocaleString(locale) ?? '?' : '?'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The best approximation of the maximum amount of coins that will ever exist in the
            lifetime of the cryptocurrency. Refers to all the coins that will ever come into
            existence.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>All time high</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.ath !== 0 ? props.ath?.toLocaleString(locale) ?? '?' : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The highest point (in price, in market capitalization) that a cryptocurrency has been in
            history.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            All time high change percentage
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.ath_change_percentage !== 0
              ? props.ath_change_percentage?.toLocaleString(locale) ?? '?'
              : '?'}
            {' %'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The current price compared to the highest price given as a percentage.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>All time high date</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>{athDate}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The day when the price was the highest.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>All time low</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.atl !== 0 ? props.atl?.toLocaleString(locale) ?? '?' : '?'}
            {' ' + baseCurrency.symbol}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The lowest point (in price, in market capitalization) that a cryptocurrency has been in
            history.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            All time low change percentage
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>
            {props.atl_change_percentage !== 0
              ? props.atl_change_percentage?.toLocaleString(locale) ?? '?'
              : '?'}
            {' %'}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The current price compared to the lowest price given as a percentage.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>All time low date</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>{atlDate}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The day when the price was the lowest.
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>Genesis date</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: '400', fontSize: 18 }}>{genesisDate}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ fontWeight: '400', fontSize: 16, color: '#242424' }}>
            The day when the cryptocurrency was created.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CryptocurrencyDetail;
