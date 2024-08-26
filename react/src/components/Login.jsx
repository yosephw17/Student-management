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
  Divider,
  IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify'; // Make sure Iconify is correctly imported

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard');
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
        <Typography variant="h4">Sign in to Minimal</Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>

        <Stack spacing={3}>
          <TextField name="email" label="Email address" />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
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
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          color="inherit"
          onClick={handleClick}
        >
          Login
        </LoadingButton>
      </Card>
    </Box>
  );
}
