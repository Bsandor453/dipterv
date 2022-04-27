import { Box, Button, Chip, FormControl, TextField, Typography } from '@mui/material';
import { RouteComponentProps } from 'react-router';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import DateAdapter from '@mui/lab/AdapterMoment';
import Grid from '@mui/material/Grid';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';

const Profile: React.FC<RouteComponentProps<any>> = () => {
  const user = useSelector((state: State) => state.USER);

  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);

  const dispatch = useDispatch();
  const { editUserData, saveUserDataEdit } = bindActionCreators(actionCreators, dispatch);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ ml: 2, mt: 2, pb: '5em' }}>
                <Typography variant="h2" sx={{ mt: 3, mb: 8 }}>
                  Profile
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>
                  <Grid item xs={3}>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'right' }}>
                      Username:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth disabled>
                      <TextField
                        value={user.userName}
                        variant="standard"
                        disabled={!editing}
                        onChange={(e) => {
                          setEdited(true);
                          editUserData({
                            name: 'userName',
                            value: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={3}>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'right' }}>
                      Full name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth disabled>
                      <TextField
                        value={user.fullName}
                        variant="standard"
                        disabled={!editing}
                        onChange={(e) => {
                          setEdited(true);
                          editUserData({
                            name: 'fullName',
                            value: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={3}>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'right' }}>
                      Role:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {user.roles?.map((role) => (
                      <Chip
                        key={role}
                        label={role.substring(5)}
                        variant="outlined"
                        sx={{ mr: 1, opacity: 0.7 }}
                      />
                    ))}
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={3}>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'right' }}>
                      Email address:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={user.email}
                        variant="standard"
                        disabled={!editing}
                        onChange={(e) => {
                          setEdited(true);
                          editUserData({
                            name: 'email',
                            value: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={3} sx={{ textAlign: 'right', mt: '4em' }}>
                    <Button variant="contained" size="large" onClick={() => setEditing(!editing)}>
                      {editing ? 'Stop editing' : 'Edit profile'}
                    </Button>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: 'left', mt: '4em' }}>
                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      onClick={() => {
                        saveUserDataEdit(user);
                        setEditing(false);
                      }}
                      disabled={!edited || !editing}
                    >
                      Save modifications
                    </Button>
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </LocalizationProvider>
  );
};

export default Profile;
