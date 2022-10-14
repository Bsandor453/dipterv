import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import Copyright from '../components/Copyright';
import Cryptocurrency from '../components/CryptocurrencyCard';
import IPage from '../interfaces/IPage';
import React, { useEffect } from 'react';
import config from '../config/Config';

const Cryptocurrencies: React.FC<IPage> = () => {
  const dispatch = useDispatch();
  const { getCryptocurrencies } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getCryptocurrencies(0, 0, 'test', false);
  }, []);

  const interval = 20000;

  useInterval(() => {
    getCryptocurrencies(0, 0, 'test', false);
  }, interval);

  const cryptocurrencies = useSelector((state: State) => state.CRYPTOCURRENCY);

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
                  <p>TODO: Merge pages</p>
                  <p>TODO: Calculate number of digits</p>
                  <p>TODO: Filter and search</p>
                  <p>TODO: Sort</p>
                  <Grid container spacing={2}>
                    {cryptocurrencies.coins
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
