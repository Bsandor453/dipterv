import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useInterval } from 'usehooks-ts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Copyright from '../components/Copyright';
import Cryptocurrency from '../components/Cryptocurrency';
import IPage from '../interfaces/IPage';
import IPageParams from '../interfaces/IPageParams';
import React, { useEffect, useState } from 'react';

const CryptocurrenciesAll: React.FC<IPage> = () => {
  const dispatch = useDispatch();
  const { getCryptocurrenciesAll } = bindActionCreators(actionCreators, dispatch);

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const pushHistory = () => {
    history.push({
      pathname: location.pathname,
      search: '?' + searchParams.toString(),
    });
  };

  const setParams = (p: IPageParams) => {
    searchParams.set('page', p.page ?? '0');
    searchParams.set('sortBy', p.sortBy ?? 'coinranking');
    searchParams.set('sortDirection', p.sortDirection ?? 'desc');
    history.replace({
      pathname: location.pathname,
      search: '?' + searchParams.toString(),
    });
  };

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);
  const allCoins = cryptocurrencies.global;

  const pageSize = 60;

  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ?? 'coinranking');
  const [sortDirection, setSortDirection] = useState(searchParams.get('sortDirection') ?? 'desc');
  const asc = sortDirection === 'asc';
  const page = parseInt(searchParams.get('page') || '0');

  useEffect(() => {
    1;
    getCryptocurrenciesAll(page, pageSize, sortBy, asc);
    setParams({ page: searchParams.get('page') ?? '0', sortBy, sortDirection });
  }, []);

  useEffect(() => {
    getCryptocurrenciesAll((allCoins?.stats?.offset ?? 0) / pageSize ?? 0, pageSize, sortBy, asc);
  }, [sortBy, sortDirection]);

  useEffect(() => {
    searchParams.set('sortBy', sortBy);
    pushHistory();
  }, [sortBy]);

  useEffect(() => {
    sortDirection === 'asc'
      ? searchParams.set('sortDirection', 'asc')
      : searchParams.set('sortDirection', 'desc');
    pushHistory();
  }, [sortDirection]);

  const interval = 20000;

  useInterval(() => {
    getCryptocurrenciesAll((allCoins?.stats?.offset ?? 0) / pageSize ?? 0, pageSize, sortBy, asc);
  }, interval);

  const PaginationController = () => {
    return (
      allCoins &&
      allCoins.stats &&
      allCoins.coins?.length !== 0 && (
        <Grid container sx={{ mb: 3, mt: 5 }}>
          <Grid item xs={6}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={Math.ceil(allCoins.stats?.total / pageSize)}
              page={allCoins.stats.offset / pageSize + 1}
              onChange={(_event, page) => {
                getCryptocurrenciesAll(page - 1, pageSize, sortBy, asc);
                searchParams.set('page', (page - 1).toString());
                pushHistory();
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
                <MenuItem value="coinranking">{'Ranking'}</MenuItem>
                <MenuItem value="price">{'Price'}</MenuItem>
                <MenuItem value="marketCap">{'Market cap'}</MenuItem>
                <MenuItem value="change">{'Change'}</MenuItem>
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
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Browse cryptocurrencies
              </Typography>
              {PaginationController()}
              <Grid container spacing={2}>
                {allCoins.coins?.map((cryptocurrency) => (
                  <Cryptocurrency
                    key={cryptocurrency.id}
                    baseSymbol={allCoins.base.symbol}
                    baseSign={allCoins.base.sign}
                    {...cryptocurrency}
                  />
                ))}
              </Grid>
              {PaginationController()}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default CryptocurrenciesAll;
