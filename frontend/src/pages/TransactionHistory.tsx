import { Box, Button, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import Transaction from '../components/Transaction';
import TransactionHeader from '../components/TransactionHeader';

const TransactionHistory: React.FC<RouteComponentProps<any>> = () => {
  const dispatch = useDispatch();
  const { getCryptocurrencies, getTransactions } = bindActionCreators(actionCreators, dispatch);

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);
  const transactions = cryptocurrencies.transactions;

  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    getCryptocurrencies();
  }, []);

  useEffect(() => {
    getTransactions(transactions?.currentPage ?? 0, 10, sortBy, sortDirection === 'asc');
  }, [sortBy, sortDirection]);

  const PaginationController = () => {
    return (
      transactions?.transactions &&
      (transactions?.transactions).length !== 0 && (
        <Grid container sx={{ mb: 3, mt: 5 }}>
          <Grid item xs={6}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={transactions?.pageCount}
              page={transactions?.currentPage + 1}
              onChange={(_event, page) => {
                getTransactions(page - 1, 10, sortBy, sortDirection === 'asc');
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
                <MenuItem value="date">{'Date'}</MenuItem>
                <MenuItem value="type">{'Type'}</MenuItem>
                <MenuItem value="cryptocurrencyId">{'Cryptocurrency'}</MenuItem>
                <MenuItem value="amount">{'Amount'}</MenuItem>
                <MenuItem value="price">{'Price'}</MenuItem>
              </Select>

              <Button
                variant="outlined"
                color="info"
                sx={{ height: 40, mb: 1 }}
                onClick={() => {
                  sortDirection === 'asc' ? setSortDirection('desc') : setSortDirection('asc');
                }}
              >
                {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
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
                Transaction History
              </Typography>
              {PaginationController()}
              {transactions?.transactions && (transactions?.transactions).length !== 0 && (
                <TransactionHeader />
              )}
              {transactions?.transactions.map((transaction, index) => {
                return (
                  <Transaction
                    key={index}
                    iconUrl={
                      cryptocurrencies.all.coins?.find((coin) => {
                        return coin.id === parseInt(transaction.cryptocurrencyId);
                      })?.iconUrl ?? '/dollar.svg'
                    }
                    cryptocurrencyName={
                      cryptocurrencies.all.coins?.find((coin) => {
                        return coin.id === parseInt(transaction.cryptocurrencyId);
                      })?.name ?? 'Fiat money (' + cryptocurrencies.all.base.symbol + ')'
                    }
                    baseSymbol={cryptocurrencies.all.base.symbol}
                    baseSign={cryptocurrencies.all.base.sign}
                    {...transaction}
                  />
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

export default TransactionHistory;
