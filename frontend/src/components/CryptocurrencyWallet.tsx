import { CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import ICryptoCoin from '../interfaces/cryptocurrency/ICryptoCoin';
import React from 'react';
import Typography from '@mui/material/Typography';

const priceChange = (history: string[]) => {
  const lastElement = history[history.length - 1];
  const lastButOneElement = history[history.length - 2];
  return parseFloat(lastElement) - parseFloat(lastButOneElement);
};

const numberPrecision = 7;
const locale = 'en-GB';

const CryptocurrencyWallet: React.FC<
  ICryptoCoin & { baseSymbol: string; baseSign: string; amount: number }
> = (props) => {
  return (
    <Grid item xs={12} sx={{ mb: 2 }}>
      <CardActionArea
        component={Link}
        to={{ pathname: '/cryptocurrencies/' + props.id }}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          p: 1,
          boxShadow: '3px 3px 3px 1px rgba(0,0,0,0.1)',
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={1} sx={{ height: 60 }}>
            <Box
              component="img"
              alt="Not found image"
              src={props.iconUrl}
              sx={{ width: 60, height: 'auto', maxHeight: 60, maxWidth: 60 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '450', lineHeight: 1.2, fontSize: 16 }}>
              {props.name + ' (' + props.symbol + ')'}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '400', fontSize: 20, color: '#242424' }}>
              {props.amount.toLocaleString(locale, {
                minimumFractionDigits: numberPrecision,
              })}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '450', fontSize: 20, color: 'green' }}>
              {Number(parseFloat(props.price) * props.amount).toLocaleString(locale, {
                minimumFractionDigits: numberPrecision,
              }) +
                ' ' +
                props.baseSign}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '350', fontSize: 18, color: '#242424' }}>
              {Number(parseFloat(props.price)).toLocaleString(locale, {
                minimumFractionDigits: numberPrecision,
              }) +
                ' ' +
                props.baseSign}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={12}>
                {priceChange(props.history) > 0 ? (
                  <ArrowUpwardIcon sx={{ fontSize: 40, color: 'green' }} />
                ) : (
                  <ArrowDownwardIcon color="error" sx={{ fontSize: 40, color: 'red' }} />
                )}
                {priceChange(props.history) > 0 ? (
                  <Typography
                    sx={{
                      fontWeight: '400',
                      mt: 0.5,
                      fontSize: 15,
                      color: 'green',
                      display: 'inline',
                    }}
                  >
                    {'+ '}
                    {Number(priceChange(props.history)).toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    })}
                    {' ' + props.baseSign}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: '400',
                      mt: 0.5,
                      fontSize: 15,
                      color: 'red',
                      display: 'inline',
                    }}
                  >
                    {'- '}
                    {Number(Math.abs(priceChange(props.history))).toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    })}
                    {' ' + props.baseSign}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Sparklines data={props.history.map((v) => parseFloat(v))}>
              <SparklinesLine style={{ stroke: props.color, fill: props.color, strokeWidth: 5 }} />
            </Sparklines>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
};

export default CryptocurrencyWallet;
