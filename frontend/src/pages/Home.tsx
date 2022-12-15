import {} from 'redux';
import { Box, Typography } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';
import { State } from '../state';
import { useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import React from 'react';

const Home: React.FC<RouteComponentProps<any>> = () => {
  const user = useSelector((state: State) => state.USER);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mt: 2, pb: '5em' }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Home
              </Typography>
              <Typography variant="h4" gutterBottom>
                Welcome to <strong>Stock Simulator</strong>, {user.userName}!
              </Typography>
              <Box id="application-features" sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Application features
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Browse</strong> through different kinds of{' '}
                  <strong>cryptocurrencies</strong>!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Analyse</strong> cryptocurrency details and
                  historical price <strong>data</strong>!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Deposit</strong> virtual <strong>money</strong>{' '}
                  (USD)!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Trade</strong> with almost 1000{' '}
                  <strong>cryptocurrencies</strong>!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Check</strong> your logs about{' '}
                  <strong>transactions</strong>!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Summarize</strong> and evaluate{' '}
                  <strong>trading</strong>!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                  <ArrowForwardIosIcon /> <strong>Have fun</strong> and <strong>get profit</strong>{' '}
                  always from the trading experience!
                </Typography>
              </Box>

              <Box id="cryptocurrency-summary" sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                  What are cryptocurrencies?
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Cryptocurrencies are digital or virtual currencies that
                  use cryptography for security and are decentralized, meaning they are not
                  controlled by any single entity or government. They are often based on blockchain
                  technology, which is a decentralized, distributed ledger that records transactions
                  across multiple computers. This makes cryptocurrencies difficult to counterfeit
                  and highly secure.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Some of the most well-known cryptocurrencies are Bitcoin,
                  Ethereum, and Litecoin. These currencies allow for anonymous transactions and are
                  often used as a store of value or a means of exchange. They are traded on online
                  exchanges and stored in digital wallets.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> The value of cryptocurrencies is highly volatile and can
                  fluctuate greatly in a short period of time. This, combined with their lack of
                  regulation, makes them a high-risk investment. It is important to carefully
                  research and assess the risks before investing in cryptocurrencies.
                </Typography>
              </Box>

              <Box id="pages-summary" sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                  What are the different pages on this website?
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Check your account data and profile settings on the{' '}
                  <Link href="/profile">
                    <strong>Profile page</strong>
                  </Link>
                  .
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Browse and trade with cryptocurrencies on the{' '}
                  <Link href="/cryptocurrencies">
                    <strong>Browse & Trade page</strong>
                  </Link>
                  .
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Check out what currencies you own on the{' '}
                  <Link href="/wallet">
                    <strong>Wallet page</strong>
                  </Link>
                  .
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Check out your transactions on the{' '}
                  <Link href="/history">
                    <strong>Transaction history page</strong>
                  </Link>
                  .
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> Get profit calculation and other trading statistics on the{' '}
                  <Link href="/summary">
                    <strong>Summary page</strong>
                  </Link>
                  .
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <ArrowForwardIosIcon /> You can{' '}
                  <Link href="/logout">
                    <strong>sign out</strong>
                  </Link>{' '}
                  if you are done with your tasks.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Home;
