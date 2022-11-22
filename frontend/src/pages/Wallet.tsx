import { Box, Button, TextField, Typography } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import CryptocurrencyWallet from '../components/CryptocurrencyWallet';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import config from '../config/Config';

const Wallet: React.FC<RouteComponentProps<any>> = () => {
  const dispatch = useDispatch();
  const { getWallet, getCryptocurrenciesInWallet, depositMoney, resetMoney } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [money, setMoney] = useState(0);

  const baseCurrency = config.defaults.baseCurrency;

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);
  const coinsWallet = cryptocurrencies.coinsWallet;
  const wallet = cryptocurrencies.wallet;

  const numberPrecision = 7;
  const locale = 'en-GB';

  useEffect(() => {
    getWallet();
    getCryptocurrenciesInWallet();
  }, []);

  const interval = 20000;

  useInterval(() => {
    getCryptocurrenciesInWallet();
  }, interval);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mr: 2, mt: 2, pb: '2em' }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Your wallet
              </Typography>
              <Typography variant="h4" gutterBottom>
                Reference money
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ mt: 2, mb: 3 }}>
                You can buy cryptocurrencies for the reference fiat money. The reference money is
                <strong>{' ' + baseCurrency.code + ' (' + baseCurrency.symbol + ')  .'}</strong>
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mt: 3, mr: 2, display: 'inline' }}>
                Your current wealth:
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: '600',
                  mt: 0.5,
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
              <Typography variant="h4" gutterBottom sx={{ mt: 5, mb: 3 }}>
                Deposit or reset money
              </Typography>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mt: 3, mr: 2, display: 'inline' }}>
                  Deposit:
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!money}
                  sx={{ mr: '1em', display: 'inline', width: 200 }}
                  onClick={() => {
                    depositMoney(money);
                  }}
                >
                  Deposit money
                </Button>
                <TextField
                  value={money}
                  variant="standard"
                  sx={{ ml: 2, display: 'inline' }}
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  onChange={(e) => {
                    e.target.value === '' ? setMoney(0) : setMoney(parseInt(e.target.value));
                  }}
                />
                <Typography variant="body1" sx={{ ml: 1, display: 'inline' }}>
                  {baseCurrency.symbol}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ mt: 3, mr: 2, display: 'inline' }}>
                  Reset:
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  disabled={!wallet?.referenceCurrency}
                  sx={{ ml: '1.5em', width: 200 }}
                  onClick={() => {
                    resetMoney();
                  }}
                >
                  Reset money
                </Button>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ mt: 5, mb: 3 }}>
                Cryptocurrencies
              </Typography>
              {wallet?.cryptocurrencies && Object.entries(wallet?.cryptocurrencies).length !== 0 && (
                <Grid item xs={12} sx={{ mb: 1, p: 1 }}>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Name</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Amount</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Worth</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Price</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Change</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Sparkline</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {wallet?.cryptocurrencies &&
                Object.entries(wallet?.cryptocurrencies).map(([key, value]) => {
                  const cryptocurrency = coinsWallet?.find((coin) => coin.id === key);
                  return (
                    cryptocurrency &&
                    value !== 0 && (
                      <CryptocurrencyWallet
                        key={key}
                        baseSymbol={baseCurrency.symbol}
                        baseCode={baseCurrency.code}
                        amount={value}
                        showProfit={false}
                        {...cryptocurrency}
                      />
                    )
                  );
                })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Wallet;
