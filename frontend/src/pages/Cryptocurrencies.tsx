import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useInterval } from 'usehooks-ts';
import Copyright from '../components/Copyright';
import CryptocurrencyCard from '../components/CryptocurrencyCard';
import IPage from '../interfaces/IPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import config from '../config/Config';
import useEffectOnlyOnUpdate from '../hooks/useEffectOnlyOnUpdate';

const Cryptocurrencies: React.FC<IPage> = () => {
  const sortByProperties = [
    {
      id: 'marketCap',
      name: 'Market capitalization',
    },
    {
      id: 'currentPrice',
      name: 'Current price',
    },
    {
      id: 'priceChange24h',
      name: 'Price change in 24 hours',
    },
  ];

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { getCryptocurrencies } = bindActionCreators(actionCreators, dispatch);

  const searchParams = new URLSearchParams(location.search);

  const pushCurrentLocationToHistory = () => {
    history.push({
      pathname: location.pathname,
      search: '?' + searchParams.toString(),
    });
  };

  // The URL is always the source of pagination data
  // This is why the state is calculated from the query parameters and not the other way around
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1'));
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ?? sortByProperties[0].id);
  const [sortDirection, setSortDirection] = useState(searchParams.get('sortDirection') ?? 'desc');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [searchText, setSearchText] = useState(search);
  const asc = sortDirection === 'asc';
  const pageSize = 30;

  const setParamAndReplaceHistory = (name: string, value: string) => {
    searchParams.set(name, value);
    history.replace({
      pathname: location.pathname,
      search: '?' + searchParams.toString(),
    });
  };

  useEffect(() => {
    getCryptocurrencies(page, pageSize, sortBy, asc, search);
  }, []);

  useEffectOnlyOnUpdate(() => {
    getCryptocurrencies(page, pageSize, sortBy, asc, search);
  }, [page, sortBy, sortDirection, search]);

  useEffectOnlyOnUpdate(() => {
    setPage(parseInt(searchParams.get('page') ?? '1'));
    setSortBy(searchParams.get('sortBy') ?? sortByProperties[0].id);
    setSortDirection(searchParams.get('sortDirection') ?? 'desc');
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

  const interval = 20000;
  useInterval(() => {
    getCryptocurrencies(page, pageSize, sortBy, asc, search);
  }, interval);

  const coins = useSelector((state: State) => state.CRYPTOCURRENCY).coins;

  const PaginationController = (page: number, count: number) => {
    return (
      coins && (
        <Grid container sx={{ mb: 3, mt: 5 }}>
          {coins.pageCount > 1 ? (
            <Grid item xs={6}>
              <Pagination
                variant="outlined"
                shape="rounded"
                page={page}
                count={count}
                onChange={(_event, page) => {
                  pushCurrentLocationToHistory();
                  setParamAndReplaceHistory('page', page.toString());
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={6}></Grid>
          )}
          {coins.elementCount > 2 ? (
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
                    pushCurrentLocationToHistory();
                    setParamAndReplaceHistory('sortBy', e.target.value);
                  }}
                >
                  {sortByProperties.map((property) => (
                    <MenuItem key={property.id} value={property.id}>
                      {property.name}
                    </MenuItem>
                  ))}
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
                    pushCurrentLocationToHistory();
                    setParamAndReplaceHistory('sortDirection', asc ? 'desc' : 'asc');
                  }}
                >
                  {asc ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )}
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={6}></Grid>
          )}
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
              <Box component="form" sx={{ m: 1, mt: 0 }} noValidate autoComplete="off">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 400, display: 'inline', mr: 2 }}
                >
                  Search by name:
                </Typography>
                <TextField
                  id="margin-dense"
                  placeholder="For example: coin"
                  margin="dense"
                  hiddenLabel
                  type="search"
                  size="small"
                  sx={{ mr: 2, width: 300, mt: 0.65 }}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      pushCurrentLocationToHistory();
                      setParamAndReplaceHistory('search', searchText);
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    height: 45,
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
                    pushCurrentLocationToHistory();
                    setParamAndReplaceHistory('search', searchText);
                  }}
                >
                  <SearchIcon fontSize="large" />
                </Button>
              </Box>
              {coins && PaginationController(page, coins.pageCount)}
              <Grid container spacing={2}>
                {coins?.content.map((cryptocurrency) => (
                  <CryptocurrencyCard
                    key={cryptocurrency.id}
                    baseSymbol={config.defaults.baseCurrency.symbol}
                    baseCode={config.defaults.baseCurrency.code}
                    {...cryptocurrency}
                  />
                ))}
              </Grid>
              {coins && PaginationController(page, coins.pageCount)}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Cryptocurrencies;
