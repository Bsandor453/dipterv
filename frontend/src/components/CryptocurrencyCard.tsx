import { CardActionArea, Grid } from '@mui/material';
import { LightenDarkenColor } from '../services/util/colorUtils';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { calculateBrightness } from '../services/util/colorUtils';
import { default as dayjs } from 'dayjs';
import { useColor } from 'color-thief-react';
import Box from '@mui/material/Box';
import ICryptocurrency from '../interfaces/cryptocurrency/ICryptocurrency';
import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Typography from '@mui/material/Typography';
import config from '../config/Config';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const priceChange = (history: number[]) => {
  const lastElement = history[history.length - 1];
  const lastButOneElement = history[history.length - 2];
  return lastElement - lastButOneElement;
};

const numberPrecision = 7;
const locale = 'en-GB';
const dateFormat = 'DD MMMM, YYYY';
const CryptocurrencyCard: React.FC<ICryptocurrency & { baseSymbol: string; baseCode: string }> = (
  props
) => {
  // Calculate dominant color from image
  const originalColor = useColor(config.urls.proxy + props.image, 'hex', {
    crossOrigin: 'anonymous',
  }).data;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const nameFontSize = props.name.length + props.symbol.length > 30 ? 16 : 18;

  dayjs.extend(customParseFormat);
  const allTimeHighDate = dayjs(props.ath_date).format(dateFormat);

  const priceChangeIcon = () => {
    return priceChange(props.sparkline_in_7d.price) > 0 ? (
      <TrendingUpIcon sx={{ fontSize: 40, color: 'green' }} />
    ) : (
      <TrendingDownIcon color="error" sx={{ fontSize: 40, color: 'red' }} />
    );
  };

  const priceChangeText = () => {
    return priceChange(props.sparkline_in_7d.price) > 0 ? (
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
        {Number(priceChange(props.sparkline_in_7d.price)).toLocaleString(locale, {
          minimumFractionDigits: numberPrecision,
        })}
        {' ' + props.baseSymbol}
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
        {Number(Math.abs(priceChange(props.sparkline_in_7d.price))).toLocaleString(locale, {
          minimumFractionDigits: numberPrecision,
        })}
        {' ' + props.baseSymbol}
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
        <Grid container sx={{ height: 220 }}>
          <Grid item xs={6} sx={{ height: 140 }}>
            <Box
              component="img"
              alt="Not found image"
              src={props.image}
              sx={{ width: 140, height: 'auto', maxHeight: 140, maxWidth: 140 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: '550', lineHeight: 1.2, fontSize: nameFontSize }}>
                  {props.name + ' (' + props.symbol.toUpperCase() + ')'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ mt: 1, color: '#696969', fontWeight: '200', fontSize: 15 }}>
                  {'CoinGecko Rank' + ' #' + props.market_cap_rank}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: '450', mt: 1, fontSize: 18, color: '#242424' }}>
                  {props.current_price.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    props.baseSymbol}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: '300', mt: 0.5, fontSize: 13, color: '#a3a3a3' }}>
                  {'MAX: ' +
                    props.ath.toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    }) +
                    ' ' +
                    props.baseSymbol}
                </Typography>
                <Typography sx={{ fontWeight: '300', mt: 0.5, fontSize: 13, color: '#a3a3a3' }}>
                  {'(On ' +
                    (allTimeHighDate.toString() !== 'Invalid Date'
                      ? allTimeHighDate.toString()
                      : '-') +
                    ')'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs={12}>
                {props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 1] &&
                  props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 2] &&
                  priceChangeIcon()}
                {props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 1] &&
                props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 2] ? (
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
            <Sparklines
              data={props.sparkline_in_7d.price.map((v) =>
                typeof v === 'number' ? v : Number(0.0)
              )}
            >
              <SparklinesLine style={{ stroke: color, fill: color, strokeWidth: 2 }} />
            </Sparklines>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
};

export default React.memo(CryptocurrencyCard);
