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

const Cryptocurrency: React.FC<ICryptoCoin & { baseSymbol: string; baseSign: string }> = (
  props
) => {
  const priceChangeIcon = () => {
    return priceChange(props.history) > 0 ? (
      <ArrowUpwardIcon sx={{ fontSize: 40, color: 'green' }} />
    ) : (
      <ArrowDownwardIcon color="error" sx={{ fontSize: 40, color: 'red' }} />
    );
  };

  const priceChangeText = () => {
    return priceChange(props.history) > 0 ? (
      <Typography
        sx={{
          fontWeight: '500',
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
          fontWeight: '500',
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
    );
  };

  return (
    <Grid item xs={4}>
      <CardActionArea
        component={Link}
        to={{ pathname: '/cryptocurrencies/' + props.id }}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          p: 2,
          boxShadow: '3px 3px 3px 1px rgba(0,0,0,0.1)',
        }}
      >
        <Grid container>
          <Grid item xs={6} sx={{ height: 140 }}>
            <Box
              component="img"
              alt="Not found image"
              src={props.iconUrl}
              sx={{ width: 140, height: 'auto', maxHeight: 140, maxWidth: 140 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: '550', lineHeight: 1.2, fontSize: 18 }}>
                  {props.name + ' (' + props.symbol + ')'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ mt: 1, color: '#696969', fontWeight: '200' }}>
                  {'Rank' + ' #' + props.rank}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: '450', mt: 1, fontSize: 18, color: '#242424' }}>
                  {Number(parseFloat(props.price)).toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    props.baseSign}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: '300', mt: 0.5, fontSize: 13, color: '#a3a3a3' }}>
                  {'(MAX: ' +
                    Number(parseFloat(props.allTimeHigh.price)).toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    }) +
                    ' ' +
                    props.baseSign +
                    ')'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs={12}>
                {props.history[props.history.length - 1] &&
                  props.history[props.history.length - 2] &&
                  priceChangeIcon()}
                {props.history[props.history.length - 1] &&
                props.history[props.history.length - 2] ? (
                  priceChangeText()
                ) : (
                  <Typography
                    sx={{
                      fontWeight: '500',
                      mt: 0.5,
                      fontSize: 18,
                      color: 'red',
                      display: 'inline',
                    }}
                  >
                    No price data!
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Sparklines data={props.history.map((v) => (v ? parseFloat(v) : Number(0.0)))}>
              <SparklinesLine style={{ stroke: props.color, fill: props.color, strokeWidth: 5 }} />
            </Sparklines>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
};

export default Cryptocurrency;
