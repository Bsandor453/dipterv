import { Box, Button, Typography } from '@mui/material';
import { Link, RouteComponentProps } from 'react-router-dom';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';

const Home: React.FC<RouteComponentProps<any>> = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mt: 2, pb: '5em' }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Home
              </Typography>
              <Typography variant="h6" gutterBottom>
                Welcome to the home page!
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                See your profile settings on the Profile page:
              </Typography>
              <Button variant="outlined" sx={{ mr: '1em' }} component={Link} to={'/profile'}>
                Profile
              </Button>
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Browse cryptocurrencies on the Browse page:
              </Typography>
              <Button
                variant="outlined"
                sx={{ mr: '1em' }}
                component={Link}
                to={'/cryptocurrencies/all'}
              >
                Browse coins
              </Button>
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Trade cryptocurrencies on the Trade page:
              </Typography>
              <Button
                variant="outlined"
                sx={{ mr: '1em' }}
                component={Link}
                to={'/cryptocurrencies'}
              >
                Trade coins
              </Button>
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Check out what currencies you own on the Wallet page:
              </Typography>
              <Button variant="outlined" sx={{ mr: '1em' }} component={Link} to={'/wallet'}>
                Wallet
              </Button>
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Check out your transaction history on the Transaction history page:
              </Typography>
              <Button variant="outlined" sx={{ mr: '1em' }} component={Link} to={'/history'}>
                Transaction history
              </Button>
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Are you done with your task? Sign out:
              </Typography>
              <Button variant="outlined" sx={{ mr: '1em' }} component={Link} to={'/logout'}>
                Sign out
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Home;
