import { Box, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Grid from '@mui/material/Grid';
import React from 'react';

const Summary: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ ml: 2, mt: 2, mb: '2em' }}>
              <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                Summary page
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Summary;
