import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { LightenDarkenColor } from '../services/util/colorUtils';
import { MomentInput } from 'moment';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { State, actionCreators } from '../state';
import { TransitionProps } from '@mui/material/transitions';
import { bindActionCreators } from 'redux';
import { calculateBrightness } from '../services/util/colorUtils';
import { useColor } from 'color-thief-react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import CryptocurrencyDetail from '../components/CryptocurrencyDetail';
import CryptocurrencyDeveloperData from '../components/CryptocurrencyDeveloperData';
import CryptocurrencyLinks from '../components/CryptocurrencyLinks';
import CryptocurrencyScores from '../components/CryptocurrencyScores';
import Grid from '@mui/material/Grid';
import ICryptocurrencyHistoryData from '../interfaces/cryptocurrency/ICryptocurrencyHistoryData';
import Paper from '@mui/material/Paper';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
import config from '../config/Config';
import moment from 'moment';

const priceChange = (history: number[]) => {
  const lastElement = history[history.length - 1];
  const lastButOneElement = history[history.length - 2];
  return lastElement - lastButOneElement;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dateFormat = 'D MMMM, YYYY';

const CryptocurrencyDetails: React.FC<RouteComponentProps<any>> = (props) => {
  const coinId = props.match.params.number;

  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);

  const dispatch = useDispatch();
  const {
    getCryptocurrency,
    getCryptocurrencyHistory,
    buyCryptocurrency,
    sellCryptocurrency,
    getWallet,
  } = bindActionCreators(actionCreators, dispatch);

  const [buyAmount, setBuyAmount] = useState(0.0);
  const [sellAmount, setSellAmount] = useState(0.0);

  const [timeframe, setTimeframe] = useState('7d');

  const createNameFromTimeframe = (tf: string) => {
    switch (tf) {
      case '24h':
        return '24 hours';
      case '7d':
        return '7 days';
      case '30d':
        return '30 days';
      case '1y':
        return '1 year';
      case 'max':
        return 'Max';
    }
  };

  const getDataByTimeframe = (tf: string) => {
    switch (tf) {
      case '24h':
        return history?.history_24h;
      case '7d':
        return history?.history_7d;
      case '30d':
        return history?.history_30d;
      case '1y':
        return history?.history_1y;
      case 'max':
        return history?.history_max;
    }
  };

  const numberPrecision = 7;
  const locale = 'en-GB';

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);
  const baseCurrency = config.defaults.baseCurrency;
  const coin = cryptocurrencies.coin;
  const history = cryptocurrencies.history;
  const wallet = cryptocurrencies.wallet;

  // Calculate dominant color from image
  const originalColor = useColor(config.urls.proxy + coin?.image, 'hex', {
    crossOrigin: 'anonymous',
  }).data;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const infoMessage = useSelector((state: State) => state.MESSAGE.info);

  useEffect(() => {
    getCryptocurrencyHistory(coinId, timeframe);
  }, [timeframe]);

  useEffect(() => {
    getWallet();
  }, [infoMessage]);

  useEffect(() => {
    getWallet();
  }, []);

  useLayoutEffect(() => {
    getCryptocurrency(coinId);
    getCryptocurrencyHistory(coinId, timeframe);
  }, [coinId]);

  const interval = 20000;
  useInterval(() => {
    getCryptocurrency(coinId);
    (timeframe === '24h' || timeframe === '7d') && getCryptocurrencyHistory(coinId, timeframe);
  }, interval);

  function formatXAxis(tickItem: MomentInput) {
    return moment(tickItem).format(dateFormat);
  }

  const getNumberMagnitude = (n: number): number => {
    return Math.floor(Math.log10(n) + 1);
  };

  const getMaxNumber = (
    maxGapPercent: number,
    data: ICryptocurrencyHistoryData[] | undefined
  ): number => {
    if (data) {
      return (
        Math.max(
          ...data.map((o) => {
            return o.price;
          })
        ) *
        ((100 + maxGapPercent) / 100)
      );
    } else {
      return 0;
    }
  };

  function formatYAxis(tickItem: number) {
    const data = getDataByTimeframe(timeframe);
    const averageValue =
      data && data[data.length - 1] && data[data.length - 2] ? data[data.length - 1].price : 1;
    const lastElement = averageValue;
    let precision = 0;
    if (getNumberMagnitude(lastElement) < 0) {
      precision = Math.abs(getNumberMagnitude(lastElement));
    }

    return tickItem.toLocaleString(locale, {
      minimumFractionDigits: precision + 2,
    });
  }

  const walletEntry =
    wallet?.cryptocurrencies &&
    Object.entries(wallet?.cryptocurrencies).find(([key]) => {
      return key === coin?.id;
    });

  const walletAmount = walletEntry ? walletEntry[1] : 0.0;

  const walletAmountFormatted = walletAmount.toLocaleString(locale, {
    minimumFractionDigits: numberPrecision,
  });

  const tooltipLabelFormatter = (value: number) => {
    return 'Date : ' + moment(value).format(dateFormat);
  };

  const formatTooltipNumber = (value: string): string => {
    return (
      Number(parseFloat(value)).toLocaleString(locale, {
        minimumFractionDigits: numberPrecision,
      }) +
      ' ' +
      baseCurrency.symbol
    );
  };

  const tooltipFormatter = (value: string) => [formatTooltipNumber(value), 'Price'];

  const handleBuyDialogOpen = () => {
    setOpenBuyDialog(true);
  };

  const handleBuyDialogClose = () => {
    setOpenBuyDialog(false);
  };

  const handleBuyDialogCloseYes = () => {
    setOpenBuyDialog(false);
    coin &&
      coin.id &&
      coin.name &&
      coin.current_price &&
      buyCryptocurrency(coin.id, buyAmount, buyAmount * coin.current_price, coin.name);
  };

  const handleSellDialogOpen = () => {
    setOpenSellDialog(true);
  };

  const handleSellDialogClose = () => {
    setOpenSellDialog(false);
  };

  const handleSellDialogCloseYes = () => {
    setOpenSellDialog(false);
    coin &&
      coin.id &&
      coin.name &&
      coin.current_price &&
      sellCryptocurrency(coin.id, sellAmount, sellAmount * coin.current_price, coin.name);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mt: 2, pb: '2em' }}>
              {/*
               *
               * * * * Heading * * * *
               *
               */}
              <Grid container>
                <Grid item xs={5} sx={{ height: 350 }}>
                  <Box
                    component="img"
                    alt="Cryptocurrency logo"
                    src={coin?.image}
                    sx={{ width: 350, height: 'auto', maxHeight: 350, maxWidth: 350 }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Grid container justifyContent="flex-bottom">
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '450' }}>
                        Name
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h4" sx={{ fontWeight: '500', color: color }}>
                        {coin?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '450', lineHeight: 1.2, mt: 3 }}>
                        Sign
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h4" sx={{ fontWeight: '400', mt: 3, color: color }}>
                        {coin && coin.symbol && coin?.symbol.toLocaleUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '350', lineHeight: 1.2, mt: 3 }}>
                        Rank
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: '350', lineHeight: 1.2, mt: 3, color: '#a3a3a3' }}
                      >
                        {'#' + coin?.market_cap_rank}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '450', lineHeight: 1.2, mt: 3 }}>
                        Price
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h4" sx={{ fontWeight: '450', lineHeight: 1.2, mt: 3 }}>
                        {coin &&
                          coin.current_price &&
                          coin.current_price.toLocaleString(locale, {
                            minimumFractionDigits: numberPrecision,
                          }) +
                            ' ' +
                            baseCurrency.symbol}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '450', lineHeight: 1.2, mt: 3 }}>
                        Price change
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Box sx={{ mt: 3 }}>
                        {coin &&
                          coin.sparkline_in_7d &&
                          coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] &&
                          coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 2] &&
                          (priceChange(coin.sparkline_in_7d.price) > 0 ? (
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: '450',
                                color: 'green',
                                display: 'inline',
                              }}
                            >
                              {'+ '}
                              {Number(priceChange(coin.sparkline_in_7d.price)).toLocaleString(
                                locale,
                                {
                                  minimumFractionDigits: numberPrecision,
                                }
                              )}
                              {' ' + baseCurrency.symbol}
                            </Typography>
                          ) : (
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: '450',
                                color: 'red',
                                display: 'inline',
                              }}
                            >
                              {'- '}
                              {coin &&
                                coin.sparkline_in_7d &&
                                Number(
                                  Math.abs(priceChange(coin.sparkline_in_7d.price))
                                ).toLocaleString(locale, {
                                  minimumFractionDigits: numberPrecision,
                                })}
                              {' ' + baseCurrency.symbol}
                            </Typography>
                          ))}
                        {coin &&
                          coin.sparkline_in_7d &&
                          coin.sparkline_in_7d.price &&
                          (!coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] ||
                            !coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 2]) && (
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: '450',
                                color: 'red',
                                display: 'inline',
                              }}
                            >
                              No data!
                            </Typography>
                          )}
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '350', lineHeight: 1.2, mt: 3 }}>
                        Max price
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: '350', lineHeight: 1.2, mt: 3, color: '#a3a3a3' }}
                      >
                        {coin &&
                          coin.ath &&
                          coin.ath.toLocaleString(locale, {
                            minimumFractionDigits: numberPrecision,
                          }) +
                            ' ' +
                            baseCurrency.symbol}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: '350', lineHeight: 1.2, color: '#a3a3a3', mt: 1 }}
                      >
                        {'(' + moment(coin?.ath_date).format(dateFormat) + ')'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/*
               *
               * * * * Trading * * * *
               *
               */}
              <Box id="trade">
                <Typography variant="h3" sx={{ mt: 8, mb: 3 }}>
                  {'Buy or sell ' + coin?.name}
                </Typography>
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ mr: 2, mt: 5, display: 'inline' }}>
                    Your current wealth:
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: '600',
                      color: 'green',
                      display: 'inline',
                    }}
                  >
                    {Number(wallet?.referenceCurrency).toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    }) +
                      ' ' +
                      baseCurrency.symbol}
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ mr: 2, mt: 5, display: 'inline' }}>
                    Your current <strong>{coin?.name}</strong> stock:
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: '600',
                      color: color,
                      display: 'inline',
                    }}
                  >
                    {walletAmountFormatted}
                  </Typography>
                </Box>
                <Box sx={{ mt: 5, mb: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ mt: 3, mr: 2, display: 'inline' }}>
                    Buy:
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!buyAmount}
                    sx={{
                      mr: '1em',
                      display: 'inline',
                      width: 200,
                      color: 'white',
                      backgroundColor: color,
                      borderColor: color,
                      ':hover': {
                        color: 'white',
                        backgroundColor: color,
                        borderColor: color,
                      },
                    }}
                    onClick={handleBuyDialogOpen}
                  >
                    {'Buy ' + coin?.name}
                  </Button>
                  <TextField
                    value={buyAmount}
                    type="number"
                    variant="standard"
                    sx={{ ml: 2, display: 'inline' }}
                    InputProps={{ inputProps: { step: 0.000001, min: 0.0 } }}
                    onChange={(e) => {
                      e.target.value === ''
                        ? setBuyAmount(0)
                        : setBuyAmount(parseFloat(e.target.value));
                    }}
                  />
                  {!!buyAmount && (
                    <Box sx={{ display: 'inline' }}>
                      <Typography
                        sx={{ ml: 1, display: 'inline', fontWeight: '450', fontSize: 20 }}
                      >
                        for
                      </Typography>
                      <Typography
                        sx={{
                          ml: 1,
                          display: 'inline',
                          fontWeight: '450',
                          fontSize: 20,
                          color: 'red',
                        }}
                      >
                        {'- '}
                        {coin?.current_price &&
                          (coin?.current_price * buyAmount).toLocaleString(locale, {
                            minimumFractionDigits: numberPrecision,
                          }) +
                            ' ' +
                            baseCurrency.symbol}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ mt: 3, mr: 2, display: 'inline' }}>
                    Sell:
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!sellAmount}
                    sx={{
                      mr: '1em',
                      display: 'inline',
                      width: 200,
                      color: 'white',
                      backgroundColor: color,
                      borderColor: color,
                      ':hover': {
                        color: 'white',
                        backgroundColor: color,
                        borderColor: color,
                      },
                    }}
                    onClick={handleSellDialogOpen}
                  >
                    {'Sell ' + coin?.name}
                  </Button>
                  <TextField
                    value={sellAmount}
                    type="number"
                    variant="standard"
                    sx={{ ml: 2, display: 'inline' }}
                    InputProps={{ inputProps: { step: 0.000001, min: 0.0 } }}
                    onChange={(e) => {
                      e.target.value === ''
                        ? setSellAmount(0)
                        : setSellAmount(parseFloat(e.target.value));
                    }}
                  />
                  {!!sellAmount && (
                    <Box sx={{ display: 'inline' }}>
                      <Typography
                        sx={{ ml: 1, display: 'inline', fontWeight: '450', fontSize: 20 }}
                      >
                        for
                      </Typography>
                      <Typography
                        sx={{
                          ml: 1,
                          display: 'inline',
                          fontWeight: '450',
                          fontSize: 20,
                          color: 'green',
                        }}
                      >
                        {'+ '}
                        {coin?.current_price &&
                          (coin?.current_price * sellAmount).toLocaleString(locale, {
                            minimumFractionDigits: numberPrecision,
                          }) +
                            ' ' +
                            baseCurrency.symbol}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <div id="buy-dialog">
                  <Dialog
                    open={openBuyDialog}
                    TransitionComponent={Transition}
                    onClose={handleBuyDialogClose}
                    aria-describedby="alert-dialog-buy-cryptocurrency"
                  >
                    <DialogTitle>{'Please confirm cryptocurrency purchase'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-buy-cryptocurrency">
                        Are you sure that you want to buy{' '}
                        <strong>
                          {buyAmount} {coin?.name}
                        </strong>{' '}
                        {'for '}
                        <strong>
                          {coin?.current_price &&
                            (coin?.current_price * buyAmount).toLocaleString(locale, {
                              minimumFractionDigits: numberPrecision,
                            }) +
                              ' ' +
                              baseCurrency.symbol}
                        </strong>
                        {' ?'}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="contained" color="success" onClick={handleBuyDialogCloseYes}>
                        Yes
                      </Button>
                      <Button variant="contained" color="error" onClick={handleBuyDialogClose}>
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div id="sell-dialog">
                  <Dialog
                    open={openSellDialog}
                    TransitionComponent={Transition}
                    onClose={handleSellDialogClose}
                    aria-describedby="alert-dialog-sell-cryptocurrency"
                  >
                    <DialogTitle>{'Please confirm cryptocurrency sale'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-sale-cryptocurrency">
                        Are you sure that you want to sell{' '}
                        <strong>
                          {sellAmount} {coin?.name}
                        </strong>{' '}
                        {'for '}
                        <strong>
                          {coin?.current_price &&
                            (coin?.current_price * sellAmount).toLocaleString(locale, {
                              minimumFractionDigits: numberPrecision,
                            }) +
                              ' ' +
                              baseCurrency.symbol}
                        </strong>
                        {' ?'}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleSellDialogCloseYes}
                      >
                        Yes
                      </Button>
                      <Button variant="contained" color="error" onClick={handleSellDialogClose}>
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Box>
              {/*
               *
               * * * * Price Graph * * * *
               *
               */}
              {history?.history_7d?.length !== 0 && (
                <Box>
                  <Typography variant="h3" sx={{ mb: 3, mt: 8 }}>
                    Price history
                  </Typography>
                  <Box sx={{ textAlign: 'right', mr: 6 }}>
                    {['24h', '7d', '30d', '1y', 'max'].map((tf) => {
                      return (
                        <Button
                          key={tf}
                          variant={timeframe === tf ? 'contained' : 'outlined'}
                          sx={{
                            mr: '1em',
                            mb: 2,
                            color: timeframe === tf ? 'white' : color,
                            backgroundColor: timeframe === tf ? color : 'white',
                            borderColor: color,
                            ':hover': {
                              color: timeframe === tf ? 'white' : color,
                              backgroundColor: timeframe === tf ? color : 'white',
                              borderColor: color,
                            },
                          }}
                          onClick={() => {
                            setTimeframe(tf);
                          }}
                        >
                          {createNameFromTimeframe(tf)}
                        </Button>
                      );
                    })}
                  </Box>
                  <Box width="100%" height={500}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        width={1070}
                        height={400}
                        data={getDataByTimeframe(timeframe)}
                        margin={{ top: 10, right: 80, left: 50, bottom: 10 }}
                      >
                        <XAxis
                          dataKey="timestamp"
                          padding={{ left: 50 }}
                          tickFormatter={formatXAxis}
                          tickSize={10}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          dataKey="price"
                          domain={[0, getMaxNumber(10, getDataByTimeframe(timeframe))]}
                          tickFormatter={formatYAxis}
                          unit={baseCurrency.symbol}
                          allowDataOverflow={true}
                        />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="price" stroke={color} strokeWidth={3} />
                        <Tooltip
                          labelFormatter={tooltipLabelFormatter}
                          formatter={tooltipFormatter}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              )}
              {/*
               *
               * * * * Description * * * *
               *
               */}
              <Box id="description">
                {coin?.description && (
                  <Typography variant="h3" sx={{ mb: 3, mt: 8 }}>
                    Description
                  </Typography>
                )}
                <Typography
                  sx={{ lineHeight: 2 }}
                  dangerouslySetInnerHTML={{
                    __html: coin?.description ?? '',
                  }}
                />
              </Box>
              <CryptocurrencyLinks
                {...coin?.links}
                {...coin?.community_data}
                color={color ?? '#000000'}
              />
              <CryptocurrencyScores {...coin} color={color ?? '#000000'} />
              <CryptocurrencyDeveloperData
                {...coin?.developer_data}
                color={color ?? '#000000'}
                githubRepos={coin?.links?.github_repos ?? []}
              />
              <Box id="description">
                <Typography variant="h3" sx={{ mt: 8 }}>
                  Details
                </Typography>
                <CryptocurrencyDetail {...coin} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default withRouter(CryptocurrencyDetails);
