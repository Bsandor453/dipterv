import { Alert, AlertColor, TextField } from '@mui/material';
import { Redirect, RouteComponentProps } from 'react-router';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Copyright from '../components/Copyright';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

const Login: React.FC<RouteComponentProps<any>> = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);

  const { isLoggedIn } = useSelector((state: State) => state.AUTH);
  const loginMessage = useSelector((state: State) => state.MESSAGE.login);

  useEffect(() => {
    loginMessage && setLoading(false);
  }, [loginMessage]);

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    setDisabled(!(username && password));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    setLoading(true);
    username && password && login(username, password);
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/featured/?cryptocurrency)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onChange={handleChange}
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {loginMessage.text && (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Alert severity={loginMessage.type as AlertColor}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      color: loginMessage.type === 'error' ? 'red' : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {loginMessage.text}
                  </Typography>
                </Alert>
              </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              {loading ? <CircularProgress /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <MuiLink href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
