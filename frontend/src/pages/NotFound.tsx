import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Grid from '@mui/material/Grid';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mt: 2, mb: '2em' }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Not found (404)
              </Typography>

              <Typography variant="h5" gutterBottom component="div">
                Page not found!
              </Typography>
              <Box component="img" alt="Not found image" src="/not-found.gif" />
              <Button variant="contained" sx={{ mr: '1em' }} component={Link} to={'/home'}>
                Go to home page
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default NotFound;
