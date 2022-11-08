import { Box, Button, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import CryptocurrencyWallet from '../components/CryptocurrencyWallet';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import config from '../config/Config';

const pageSize = 10;
const numberPrecision = 3;
const locale = 'en-GB';

const Summary: React.FC = () => {
  const dispatch = useDispatch();
  const { getSummary, getWallet, getCryptocurrenciesInTransactions } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const baseCurrency = config.defaults.baseCurrency;

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);
  const summary = cryptocurrencies.summary;
  const profit = summary?.profit ?? 0;
  const mostProfitableCoinProfit = summary?.mostProfitableCoin.profit ?? 0;
  const leastProfitableCoinProfit = summary?.leastProfitableCoin.profit ?? 0;
  const summaryPage = summary?.profitOnCryptocurrencyPage;
  const wallet = cryptocurrencies.wallet;
  const coinsTransactions = cryptocurrencies.coinsTransactions;

  const [sortBy, setSortBy] = useState('profit');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    getWallet();
    getCryptocurrenciesInTransactions();
  }, []);

  const interval = 20000;

  useInterval(() => {
    getSummary(summaryPage?.currentPage ?? 1, pageSize, sortBy, sortDirection === 'asc');
  }, interval);

  useEffect(() => {
    getSummary(summaryPage?.currentPage ?? 1, pageSize, sortBy, sortDirection === 'asc');
  }, [sortBy, sortDirection]);

  const PaginationController = () => {
    return (
      summary &&
      summary.profitOnCryptocurrencyPage.content.length !== 0 && (
        <Grid container sx={{ mb: 3, mt: 5 }}>
          <Grid item xs={6}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={summaryPage?.pageCount}
              page={summaryPage?.currentPage}
              onChange={(_event, page) => {
                getSummary(page, 10, sortBy, sortDirection === 'asc');
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 400, display: 'inline', mr: 2 }}
              >
                Sort by
              </Typography>

              <Select
                id="sortBy"
                value={sortBy}
                sx={{ height: 35, mr: 2 }}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
              >
                <MenuItem value="name">{'Name'}</MenuItem>
                <MenuItem value="profit">{'Profit'}</MenuItem>
              </Select>
              <Button
                variant="outlined"
                sx={{
                  height: 40,
                  mb: 1,
                  color: 'rgba(0, 0, 0, 0.7)',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  ':hover': {
                    color: 'initial',
                    backgroundColor: 'initial',
                    borderColor: 'initial',
                  },
                }}
                onClick={() => {
                  sortDirection === 'asc' ? setSortDirection('desc') : setSortDirection('asc');
                }}
              >
                {sortDirection === 'asc' ? (
                  <KeyboardArrowUpIcon fontSize="large" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="large" />
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mr: 2, mt: 2, pb: '2em' }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Summary page
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                Profit
              </Typography>
              <Box id="wallet-summary">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Profit:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    mt: 0.5,
                    color: profit >= 0 ? 'green' : 'red',
                    display: 'inline',
                  }}
                >
                  {profit > 0 ? '+' : ''}
                  {profit.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    baseCurrency.symbol}
                </Typography>
              </Box>
              <Box id="most-profitable-coin">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Most profitable cryptocurrency:
                </Typography>
                <Box
                  component="img"
                  alt="Not found image"
                  src={summary?.mostProfitableCoin.imageUrl}
                  sx={{
                    width: 40,
                    height: 'auto',
                    maxHeight: 40,
                    maxWidth: 40,
                    ml: 2,
                    mr: 2,
                    display: 'inline',
                    mt: -2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {summary?.mostProfitableCoin.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    mt: 0.5,
                    ml: 2,
                    color: mostProfitableCoinProfit >= 0 ? 'green' : 'red',
                    display: 'inline',
                  }}
                >
                  {'(' +
                    summary?.mostProfitableCoin.profit.toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    }) +
                    ' ' +
                    baseCurrency.symbol +
                    ')'}
                </Typography>
              </Box>
              <Box id="most-profitable-coin">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Least profitable cryptocurrency:
                </Typography>
                <Box
                  component="img"
                  alt="Not found image"
                  src={summary?.leastProfitableCoin.imageUrl}
                  sx={{
                    width: 40,
                    height: 'auto',
                    maxHeight: 40,
                    maxWidth: 40,
                    ml: 2,
                    mr: 2,
                    display: 'inline',
                    mt: -2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {summary?.leastProfitableCoin.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    mt: 0.5,
                    ml: 2,
                    color: leastProfitableCoinProfit >= 0 ? 'green' : 'red',
                    display: 'inline',
                  }}
                >
                  {'(' +
                    summary?.leastProfitableCoin.profit.toLocaleString(locale, {
                      minimumFractionDigits: numberPrecision,
                    }) +
                    ' ' +
                    baseCurrency.symbol +
                    ')'}
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                Trade statistics
              </Typography>
              <Box id="deposit-count">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total number of deposits:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {summary?.depositCount ?? 0}
                </Typography>
              </Box>
              <Box id="purchase-count">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total number of purchases:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {summary?.purchaseCount ?? 0}
                </Typography>
              </Box>
              <Box id="sale-count">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total number of sales:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {summary?.saleCount ?? 0}
                </Typography>
              </Box>
              <Box id="money-reset-count">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total number of money resets:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {summary?.moneyResetCount ?? 0}
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                Money statistics
              </Typography>
              <Box id="wallet-summary">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Money in wallet:
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
                  {wallet?.referenceCurrency.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    baseCurrency.symbol}
                </Typography>
              </Box>
              <Box id="total-money-deposited">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total money deposited:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    mt: 0.5,
                    display: 'inline',
                  }}
                >
                  {summary?.totalMoneyDeposited.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    baseCurrency.symbol}
                </Typography>
              </Box>
              <Box id="total-purchase-amount">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total purchase amount:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '600',
                    mt: 0.5,
                    display: 'inline',
                  }}
                >
                  {summary?.totalPurchaseAmount.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    baseCurrency.symbol}
                </Typography>
              </Box>
              <Box id="total-sale-amount">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 2, mr: 2, display: 'inline-block' }}
                >
                  Total sale amount:
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
                  {summary?.totalSaleAmount.toLocaleString(locale, {
                    minimumFractionDigits: numberPrecision,
                  }) +
                    ' ' +
                    baseCurrency.symbol}
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                Profit by cryptocurrencies
              </Typography>
              {PaginationController()}
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
                      <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Profit</Typography>
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
              {summaryPage?.content.map((coinProfit) => {
                const cryptocurrency = coinsTransactions?.find((coin) => coin.id === coinProfit.id);
                const walletAmount =
                  cryptocurrency &&
                  wallet?.cryptocurrencies &&
                  Object.entries(wallet?.cryptocurrencies).find(([key]) => {
                    return key === cryptocurrency.id;
                  })?.[1];
                return (
                  cryptocurrency && (
                    <CryptocurrencyWallet
                      key={coinProfit.id}
                      baseSymbol={baseCurrency.symbol}
                      baseCode={baseCurrency.code}
                      amount={walletAmount ?? 0}
                      showProfit={true}
                      profit={coinProfit.profit}
                      {...cryptocurrency}
                    />
                  )
                );
              })}
              {PaginationController()}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Summary;
