import { CardActionArea, Grid } from '@mui/material';
import { LightenDarkenColor, calculateBrightness } from '../services/util/colorUtils';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useColor } from 'color-thief-react';
import Box from '@mui/material/Box';
import ICryptocurrency from '../interfaces/cryptocurrency/ICryptocurrency';
import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Typography from '@mui/material/Typography';
import config from '../config/Config';

const priceChange = (history: number[]) => {
  const lastElement = history[history.length - 1];
  const lastButOneElement = history[history.length - 2];
  return lastElement - lastButOneElement;
};

const locale = 'en-GB';
const defaultNumberPrecision = 7;

const CryptocurrencyWallet: React.FC<
  ICryptocurrency & {
    baseSymbol: string;
    baseCode: string;
    amount: number;
    showProfit: boolean;
    profit?: number;
    profitNumberPrecision?: number;
  }
> = (props) => {
  const numberPrecision = props.profitNumberPrecision ?? defaultNumberPrecision;
  // Calculate dominant color from image
  const originalColor = useColor(config.urls.proxy + props.image, 'hex', {
    crossOrigin: 'anonymous',
  }).data;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

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
              src={props.image}
              sx={{ width: 60, height: 'auto', maxHeight: 60, maxWidth: 60 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '450', lineHeight: 1.2, fontSize: 16 }}>
              {props.name + ' (' + props.symbol.toLocaleUpperCase() + ')'}
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
            <Typography
              sx={{
                fontWeight: '450',
                fontSize: 20,
                color: props.profit && props.profit >= 0 ? 'green' : 'red',
              }}
            >
              {props.showProfit
                ? props.profit?.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                  ' ' +
                  props.baseSymbol
                : Number(props.current_price * props.amount).toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                  ' ' +
                  props.baseSymbol}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '350', fontSize: 18, color: '#242424' }}>
              {Number(props.current_price).toLocaleString(locale, {
                minimumFractionDigits: numberPrecision,
              }) +
                ' ' +
                props.baseSymbol}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={12}>
                {priceChange(props.sparkline_in_7d.price) > 0 ? (
                  <TrendingUpIcon sx={{ fontSize: 40, color: 'green' }} />
                ) : (
                  <TrendingDownIcon color="error" sx={{ fontSize: 40, color: 'red' }} />
                )}
                {priceChange(props.sparkline_in_7d.price) > 0 ? (
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
                    {Number(priceChange(props.sparkline_in_7d.price)).toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    })}
                    {' ' + props.baseSymbol}
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
                    {Number(Math.abs(priceChange(props.sparkline_in_7d.price))).toLocaleString(
                      locale,
                      {
                        minimumFractionDigits: numberPrecision,
                      }
                    )}
                    {' ' + props.baseSymbol}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Sparklines
              data={props.sparkline_in_7d.price.map((v) =>
                typeof v === 'number' ? v : Number(0.0)
              )}
            >
              <SparklinesLine style={{ stroke: color, fill: color, strokeWidth: 5 }} />
            </Sparklines>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
};

export default CryptocurrencyWallet;
