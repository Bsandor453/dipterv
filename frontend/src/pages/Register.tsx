import * as React from 'react';
import * as yup from 'yup';
import { Alert, AlertColor } from '@mui/material';
import { RouteComponentProps } from 'react-router';
import { State, actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const validationSchema = yup.object({
  userName: yup
    .string()
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Username must contain only letters from the english alphabet and numbers!'
    )
    .min(5, 'Username must contain at least 5 characters!')
    .max(50, 'Username must contain fewer than 50 characters'),
  fullName: yup
    .string()
    .required('Full name is required!')
    .max(100, 'Username must contain fewer than 100 characters'),
  email: yup
    .string()
    .email('Must be a valid email!')
    .required('Email is required!')
    .max(100, 'Email must contain fewer than 100 characters'),
  password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character!'
    )
    .max(100, 'Password must contain fewer than 100 characters'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required!')
    .oneOf([yup.ref('password'), null], 'Passwords must match!'),
});

const Register: React.FC<RouteComponentProps<any>> = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { register } = bindActionCreators(actionCreators, dispatch);

  const registerMessage = useSelector((state: State) => state.MESSAGE.register);

  useEffect(() => {
    registerMessage && setLoading(false);
  }, [registerMessage]);

  const formik = useFormik({
    initialValues: { userName: '', fullName: '', password: '', confirmPassword: '', email: '' },
    onSubmit: (values) => {
      setLoading(true);

      register({
        userName: values.userName,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
    },
    validationSchema: validationSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
                onBlur={formik.handleBlur}
                autoComplete="username"
                name="userName"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                onBlur={formik.handleBlur}
                required
                fullWidth
                autoComplete="name"
                id="fullName"
                label="Full Name"
                name="fullName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                onBlur={formik.handleBlur}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
            {registerMessage.text && (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Alert severity={registerMessage.type as AlertColor}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      color: registerMessage.type === 'error' ? 'red' : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {registerMessage.type === 'success' ? (
                      <div>
                        Registration successful! You can <Link href="/login">sing in </Link>.
                      </div>
                    ) : (
                      registerMessage.text
                    )}
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress /> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Register;
