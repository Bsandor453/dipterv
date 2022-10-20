import { CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
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

const calculateBrightness = (hexColor: string) => {
  const c = hexColor.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma;
};

function LightenDarkenColor(hexColor: string, amount: number) {
  let usePound = false;
  if (hexColor[0] == '#') {
    hexColor = hexColor.slice(1);
    usePound = true;
  }

  const num = parseInt(hexColor, 16);

  let r = (num >> 16) + amount;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amount;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amount;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

const numberPrecision = 7;
const locale = 'en-GB';
const dateFormat = 'DD MMMM, YYYY';

const CryptocurrencyCard: React.FC<ICryptocurrency & { baseSymbol: string; baseCode: string }> = (
  props
) => {
  // Calculate dominant color from image
  const color = useColor(config.urls.proxy + props.image, 'hex', {
    crossOrigin: 'anonymous',
  }).data;

  const brightness = calculateBrightness(color ?? '#000000');
  const darkerColor =
    brightness > 160 ? LightenDarkenColor(color ?? '#000000', 160 - brightness) : color;

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
              <SparklinesLine style={{ stroke: darkerColor, fill: darkerColor, strokeWidth: 2 }} />
            </Sparklines>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
};

export default CryptocurrencyCard;
