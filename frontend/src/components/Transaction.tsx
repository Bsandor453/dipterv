import { CardActionArea, Grid } from '@mui/material';
import { default as dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import ITransaction from '../interfaces/ITransaction';
import React from 'react';
import Typography from '@mui/material/Typography';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const numberPrecision = 7;
const locale = 'en-GB';

const Transaction: React.FC<
  ITransaction & {
    iconUrl: string;
    cryptocurrencyName: string;
    baseSymbol: string;
    baseSign: string;
  }
> = (props) => {
  const sourceDateFormat = 'YYYY-MM-DDTHH:mm:ss';
  const goalDateFormat = 'YYYY.MM.DD. HH:mm:ss';
  dayjs.extend(customParseFormat);
  const date = dayjs(props.date.substring(0, 19), sourceDateFormat).format(goalDateFormat);

  const greenFilter =
    'invert(24%) sepia(94%) saturate(5203%) hue-rotate(118deg) brightness(93%) contrast(106%);';
  const redFilter =
    'invert(30%) sepia(98%) saturate(6759%) hue-rotate(355deg) brightness(99%) contrast(123%);';
  const calculateFilter = () => {
    if (props.type === 'DEPOSIT_MONEY') return greenFilter;
    if (props.type === 'RESET_MONEY') return redFilter;
    return 'none';
  };

  const mapActionName = () => {
    switch (props.type) {
      case 'BUY_CRYPTOCURRENCY':
        return 'Cryptocurrency purchase';
      case 'SELL_CRYPTOCURRENCY':
        return 'Cryptocurrency sale';
      case 'DEPOSIT_MONEY':
        return 'Money deposit';
      case 'RESET_MONEY':
        return 'Money reset';
    }
  };

  const formatAmount = (n: number) => {
    return n.toLocaleString(locale, {
      minimumFractionDigits: numberPrecision,
    });
  };

  const mapAmountText = () => {
    switch (props.type) {
      case 'BUY_CRYPTOCURRENCY':
        return formatAmount(props.amount);
      case 'SELL_CRYPTOCURRENCY':
        return formatAmount(props.amount);
      case 'DEPOSIT_MONEY':
        return formatAmount(props.amount) + ' ' + props.baseSign;
      case 'RESET_MONEY':
        return '-';
    }
  };

  const mapPriceText = () => {
    switch (props.type) {
      case 'BUY_CRYPTOCURRENCY':
        return '- ' + formatAmount(props.price) + ' ' + props.baseSign;
      case 'SELL_CRYPTOCURRENCY':
        return '+ ' + formatAmount(props.price) + ' ' + props.baseSign;
      case 'DEPOSIT_MONEY':
        return '-';
      case 'RESET_MONEY':
        return '-';
    }
  };

  const mapAmountColor = () => {
    switch (props.type) {
      case 'BUY_CRYPTOCURRENCY':
        return '#242424';
      case 'SELL_CRYPTOCURRENCY':
        return '#242424';
      case 'DEPOSIT_MONEY':
        return 'green';
      case 'RESET_MONEY':
        return '#242424';
    }
  };

  const mapPriceColor = () => {
    switch (props.type) {
      case 'BUY_CRYPTOCURRENCY':
        return 'red';
      case 'SELL_CRYPTOCURRENCY':
        return 'green';
      case 'DEPOSIT_MONEY':
        return '#242424';
      case 'RESET_MONEY':
        return '#242424';
    }
  };

  return (
    <Grid item xs={12} sx={{ mb: 2 }}>
      <CardActionArea
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
              sx={{
                width: 60,
                height: 'auto',
                maxHeight: 60,
                maxWidth: 60,
                filter: calculateFilter(),
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '400', lineHeight: 1.2, fontSize: 16 }}>
              {date.toString()}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: '400', fontSize: 18, color: '#242424', ml: 2 }}>
              {mapActionName()}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '450', fontSize: 18, color: '#242424' }}>
              {props.cryptocurrencyName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '400', fontSize: 20, color: mapAmountColor() }}>
              {mapAmountText()}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: '400', fontSize: 20, color: mapPriceColor() }}>
              {mapPriceText()}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Grid>
  );
};

export default Transaction;
