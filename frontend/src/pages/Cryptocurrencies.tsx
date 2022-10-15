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
import Copyright from '../components/Copyright';
import Cryptocurrency from '../components/CryptocurrencyCard';
import IPage from '../interfaces/IPage';
import IPageParams from '../interfaces/IPageParams';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useEffect, useState } from 'react';
import config from '../config/Config';

const Cryptocurrencies: React.FC<IPage> = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { getCryptocurrencies } = bindActionCreators(actionCreators, dispatch);

  const searchParams = new URLSearchParams(location.search);

  const pushHistory = () => {
    history.push({
      pathname: location.pathname,
      search: '?' + searchParams.toString(),
    });
  };

  const setParams = (p: IPageParams) => {
    searchParams.set('page', p.page ?? '1');
    searchParams.set('sortBy', p.sortBy ?? 'market_cap');
    searchParams.set('sortDirection', p.sortDirection ?? 'desc');
    history.replace({
      pathname: location.pathname,
      search: '?' + searchParams.toString(),
    });
  };

  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ?? 'ranking');
  const [sortDirection, setSortDirection] = useState(searchParams.get('sortDirection') ?? 'desc');
  const asc = sortDirection === 'asc';
  const page = parseInt(searchParams.get('page') || '1');

  const pageSize = 30;

  useEffect(() => {
    getCryptocurrencies(page, pageSize, sortBy, asc);
    setParams({ page: searchParams.get('page') ?? '1', sortBy, sortDirection });
  }, []);

  useEffect(() => {
    getCryptocurrencies(page, pageSize, sortBy, asc);
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
    getCryptocurrencies(page, pageSize, sortBy, asc);
  }, interval);

  const coins = useSelector((state: State) => state.CRYPTOCURRENCY).coins;

  const PaginationController = () => {
    return (
      coins &&
      coins?.length !== 0 && (
        <Grid container sx={{ mb: 3, mt: 5 }}>
          <Grid item xs={6}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={Math.ceil(config.defaults.currencyCount / pageSize)}
              page={page}
              onChange={(_event, page) => {
                getCryptocurrencies(page, pageSize, sortBy, asc);
                searchParams.set('page', page.toString());
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
                <MenuItem value="ranking">{'Ranking'}</MenuItem>
                <MenuItem value="price">{'Price'}</MenuItem>
                <MenuItem value="marketCap">{'Market cap'}</MenuItem>
                <MenuItem value="change">{'Change'}</MenuItem>
              </Select>
              <Button
                variant="outlined"
                sx={{
                  height: 40,
                  mb: 1,
                  color: 'rgba(0, 0, 0, 0.87)',
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
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Trade cryptocurrencies
              </Typography>
              {
                <>
                  <p>TODO: Backend DB</p>
                  <p>TODO: Search feature</p>
                  <p>TODO: Sort feature</p>
                  <p>TODO: Test navigation with filter and sort (navigation sets the sort!)</p>
                  <p>TODO: Rank to my rank</p>
                  {PaginationController()}
                  <Grid container spacing={2}>
                    {coins
                      ?.sort((a, b) => {
                        if (a.market_cap_rank > b.market_cap_rank) return 1;
                        if (a.market_cap_rank < b.market_cap_rank) return -1;
                        return 0;
                      })
                      .map((cryptocurrency) => (
                        <Cryptocurrency
                          key={cryptocurrency.id}
                          baseSymbol={config.defaults.baseCurrency.symbol}
                          baseCode={config.defaults.baseCurrency.code}
                          {...cryptocurrency}
                        />
                      ))}
                  </Grid>
                  {PaginationController()}
                </>
              }
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Cryptocurrencies;
