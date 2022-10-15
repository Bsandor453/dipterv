import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
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
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { MomentInput } from 'moment';
import { State, actionCreators } from '../state';
import { TransitionProps } from '@mui/material/transitions';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import CryptocurrencyDetail from '../components/CryptocurrencyDetail';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
import moment from 'moment';

const priceChange = (history: string[]) => {
  const lastElement = history[history.length - 1];
  const lastButOneElement = history[history.length - 2];
  return parseFloat(lastElement) - parseFloat(lastButOneElement);
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CryptocurrencyDetails: React.FC<RouteComponentProps<any>> = (props) => {
  //TODO

  /*
  const coinId = props.match.params.number;

  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);

  const dispatch = useDispatch();
  const {
    getCryptocurrency,
    getCryptocurrencies,
    getCryptocurrencyHistory,
    buyCryptocurrency,
    sellCryptocurrency,
    getWallet,
  } = bindActionCreators(actionCreators, dispatch);

  const [buyAmount, setBuyAmount] = useState(0.0);
  const [sellAmount, setSellAmount] = useState(0.0);

  const backupURL = true;

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
      case '5y':
        return '5 years';
    }
  };

  const numberPrecision = 7;
  const locale = 'en-GB';

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);
  const coinBase = cryptocurrencies.cryptoCoin?.base;
  const coin = cryptocurrencies.cryptoCoin?.coin;
  const wallet = cryptocurrencies.wallet;

  const infoMessage = useSelector((state: State) => state.MESSAGE.info);

  useEffect(() => {
    getCryptocurrencyHistory(coinId, timeframe);
  }, [timeframe]);

  useEffect(() => {
    getWallet();
  }, [infoMessage]);

  useEffect(() => {
    // TODO: Why do we need this here?
    //getCryptocurrencies();
    getWallet();
  }, []);

  useLayoutEffect(() => {
    getCryptocurrency(coinId);
    getCryptocurrencyHistory(coinId, timeframe);
  }, [coinId]);

  const interval = 5000;
  useInterval(() => {
    getCryptocurrency(coinId);
    (timeframe === '24h' || timeframe === '7d') && getCryptocurrencyHistory(coinId, timeframe);
  }, interval);

  function formatXAxis(tickItem: MomentInput) {
    return moment(tickItem).format('MMM Do YYYY');
  }

  const getNumberMagnitude = (n: number): number => {
    return Math.floor(Math.log10(n) + 1);
  };

  const getMaxNumber = (maxGapPercent: number): number => {
    const data = cryptocurrencies.cryptoHistory?.history;
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
    const coinHistory = coin?.history;
    const averageValue =
      coinHistory && coinHistory[coinHistory.length - 1] && coinHistory[coinHistory.length - 2]
        ? coinHistory[coinHistory.length - 1]
        : '1';
    const lastElement = parseFloat(averageValue);
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
      return parseInt(key) === coin?.id;
    });

  const walletAmount = walletEntry ? walletEntry[1] : 0.0;

  const walletAmountFormatted = walletAmount.toLocaleString(locale, {
    minimumFractionDigits: numberPrecision,
  });

  const tooltipLabelFormatter = (value: number) => {
    return 'Date : ' + moment(value).format('MMM Do YYYY');
  };

  const formatTooltipNumber = (value: string): string => {
    return (
      Number(parseFloat(value)).toLocaleString(locale, {
        minimumFractionDigits: numberPrecision,
      }) +
      ' ' +
      coinBase?.sign
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
      coin.price &&
      buyCryptocurrency(coin.id, buyAmount, buyAmount * parseFloat(coin.price), coin.name);
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
      coin.price &&
      sellCryptocurrency(coin.id, sellAmount, sellAmount * parseFloat(coin.price), coin.name);
  };
  */

  return (
    <p>TODO (Crypto details page)</p>
    /*
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mt: 2, pb: '2em' }}>
              <Grid container>
                <Grid item xs={5} sx={{ height: 350 }}>
                  <Box
                    component="img"
                    alt="Not found image"
                    src={coin?.iconUrl}
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
                      <Typography variant="h4" sx={{ fontWeight: '500', color: coin?.color }}>
                        {coin?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h4" sx={{ fontWeight: '450', lineHeight: 1.2, mt: 3 }}>
                        Sign
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: '400', mt: 3, color: coin?.color }}
                      >
                        {coin?.symbol}
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
                        {'#' + coin?.rank}
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
                          coinBase &&
                          Number(parseFloat(coin.price)).toLocaleString(locale, {
                            minimumFractionDigits: numberPrecision,
                          }) +
                            ' ' +
                            coinBase.sign}
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
                          coin.history[coin.history.length - 1] &&
                          coin.history[coin.history.length - 2] &&
                          (priceChange(coin.history) > 0 ? (
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: '450',
                                color: 'green',
                                display: 'inline',
                              }}
                            >
                              {'+ '}
                              {Number(priceChange(coin.history)).toLocaleString(locale, {
                                minimumFractionDigits: numberPrecision,
                              })}
                              {coinBase && ' ' + coinBase.sign}
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
                                Number(Math.abs(priceChange(coin.history))).toLocaleString(locale, {
                                  minimumFractionDigits: numberPrecision,
                                })}
                              {coinBase && ' ' + coinBase.sign}
                            </Typography>
                          ))}
                        {coin &&
                          coin.history &&
                          (!coin.history[coin.history.length - 1] ||
                            !coin.history[coin.history.length - 2]) && (
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
                          coinBase &&
                          Number(parseFloat(coin.allTimeHigh.price)).toLocaleString(locale, {
                            minimumFractionDigits: numberPrecision,
                          }) +
                            ' ' +
                            coinBase.sign}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: '350', lineHeight: 1.2, color: '#a3a3a3', mt: 1 }}
                      >
                        {'(' + moment(coin?.allTimeHigh?.timestamp).format('MMM Do YYYY') + ')'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {cryptocurrencies.cryptoHistory?.history.length !== 0 && (
                <Box>
                  <Typography variant="h3" sx={{ mb: 3, mt: 3 }}>
                    Price history
                  </Typography>
                  <Box sx={{ textAlign: 'right', mr: 6 }}>
                    {['24h', '7d', '30d', '1y', '5y'].map((tf) => {
                      return (
                        <Button
                          key={tf}
                          variant={timeframe === tf ? 'contained' : 'outlined'}
                          sx={{
                            mr: '1em',
                            mb: 2,
                            color: timeframe === tf ? 'white' : coin?.color,
                            backgroundColor: timeframe === tf ? coin?.color : 'white',
                            borderColor: coin?.color,
                            ':hover': {
                              color: timeframe === tf ? 'white' : coin?.color,
                              backgroundColor: timeframe === tf ? coin?.color : 'white',
                              borderColor: coin?.color,
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
                        data={cryptocurrencies.cryptoHistory?.history}
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
                          domain={[0, getMaxNumber(10)]}
                          tickFormatter={formatYAxis}
                          unit={coinBase?.sign}
                          allowDataOverflow={true}
                        />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={coin?.color}
                          strokeWidth={3}
                        />
                        <Tooltip
                          labelFormatter={tooltipLabelFormatter}
                          formatter={tooltipFormatter}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              )}
              {coin?.description && (
                <Typography variant="h3" sx={{ mb: 3, mt: 3 }}>
                  Description
                </Typography>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: cryptocurrencies.cryptoCoin?.coin?.description ?? '',
                }}
              />
              {coin?.socials.length !== 0 && (
                <Typography variant="h3" sx={{ mt: 3 }}>
                  Socials
                </Typography>
              )}
              <List dense={true}>
                {coin?.socials.map((social, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <PeopleIcon sx={{ color: coin?.color }} />
                      </ListItemIcon>
                      <Button
                        variant="text"
                        sx={{
                          textTransform: 'none',
                          mr: '2',
                          fontSize: 20,
                          color: coin?.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: coin?.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: social.url }}
                        target="_blank"
                      >
                        {social.name}
                      </Button>
                      <Typography variant="body1" sx={{ color: '#a3a3a3' }}>
                        ({social.type})
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
              {coin?.links.length !== 0 && <Typography variant="h3">Links</Typography>}
              <List dense={true}>
                {coin?.links.map((link, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <PublicIcon sx={{ color: coin?.color }} />
                      </ListItemIcon>
                      <Button
                        variant="text"
                        sx={{
                          textTransform: 'none',
                          mr: '2',
                          fontSize: 20,
                          color: coin?.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: coin?.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: link.url }}
                        target="_blank"
                      >
                        {link.name}
                      </Button>
                      <Typography variant="body1" sx={{ color: '#a3a3a3' }}>
                        ({link.type})
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
              <Typography variant="h3" sx={{ mt: 3 }}>
                Details
              </Typography>
              {coin && (
                <CryptocurrencyDetail
                  baseSymbol={cryptocurrencies.all.base.symbol}
                  baseSign={cryptocurrencies.all.base.sign}
                  {...coin}
                />
              )}
              {cryptocurrencies.all &&
                cryptocurrencies.all.coins &&
                cryptocurrencies.all.coins.filter((c) => c.id === coin?.id).length !== 0 && (
                  <Box id="trade">
                    <Typography variant="h3" sx={{ mt: 3, mb: 3 }}>
                      {'Buy or sell ' + coin?.name}
                    </Typography>
                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ mr: 2, mt: 5, display: 'inline' }}
                      >
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
                          coinBase?.sign}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ mr: 2, mt: 5, display: 'inline' }}
                      >
                        Your current <strong>{coin?.name}</strong> stock:
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: '600',
                          color: coin?.color,
                          display: 'inline',
                        }}
                      >
                        {walletAmountFormatted}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 5, mb: 3 }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ mt: 3, mr: 2, display: 'inline' }}
                      >
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
                          backgroundColor: coin?.color,
                          borderColor: coin?.color,
                          ':hover': {
                            color: 'white',
                            backgroundColor: coin?.color,
                            borderColor: coin?.color,
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
                            {coin?.price &&
                              (parseFloat(coin?.price) * buyAmount).toLocaleString(locale, {
                                minimumFractionDigits: numberPrecision,
                              }) +
                                ' ' +
                                coinBase?.sign}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ mt: 3, mb: 3 }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ mt: 3, mr: 2, display: 'inline' }}
                      >
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
                          backgroundColor: coin?.color,
                          borderColor: coin?.color,
                          ':hover': {
                            color: 'white',
                            backgroundColor: coin?.color,
                            borderColor: coin?.color,
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
                            {coin?.price &&
                              (parseFloat(coin?.price) * sellAmount).toLocaleString(locale, {
                                minimumFractionDigits: numberPrecision,
                              }) +
                                ' ' +
                                coinBase?.sign}
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
                              {coin?.price &&
                                (parseFloat(coin?.price) * buyAmount).toLocaleString(locale, {
                                  minimumFractionDigits: numberPrecision,
                                }) +
                                  ' ' +
                                  coinBase?.sign}
                            </strong>
                            {' ?'}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleBuyDialogCloseYes}
                          >
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
                              {coin?.price &&
                                (parseFloat(coin?.price) * sellAmount).toLocaleString(locale, {
                                  minimumFractionDigits: numberPrecision,
                                }) +
                                  ' ' +
                                  coinBase?.sign}
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
                )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
    */
  );
};

export default withRouter(CryptocurrencyDetails);
