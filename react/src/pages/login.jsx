import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { access_token, token_type, user } = response.data;

      if (user && user.name) {
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('tokenType', token_type);
        localStorage.setItem('userName', user.name);

        console.log(response.data);
        navigate('/index');
      } else {
        console.error('User information is missing in the response.');
        setError('User information is missing in the response.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid login details');

      if (error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: `url('/assets/background/overlay_4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
        <Typography variant="h4" gutterBottom>
          Sign in to CTMs
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} href="#">
            Get started
          </Link>
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover" href="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          color="inherit"
          onClick={handleClick}
          loading={loading}
        >
          Login
        </LoadingButton>
      </Card>
    </Box>
  );
}
