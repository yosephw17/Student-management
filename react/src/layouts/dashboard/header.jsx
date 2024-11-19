import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import Iconify from 'src/components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine which tab should be active based on the current path
  const tabValue =
    currentPath === '/'
      ? 0
      : currentPath === '/sprojects'
      ? 1
      : currentPath === '/snotifications'
      ? 2
      : false;

  const handleChange = (event, newValue) => {
    // Handle tab change if needed
  };

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            aria-label="navigation tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#001f3f',
                height: '3px',
                borderRadius: '2px',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: '500',
                fontSize: '16px',
                marginRight: '20px',
                color: '#001f3f',
                transition: 'color 0.4s ease, transform 0.3s ease',
                '&.Mui-selected': {
                  color: '#001f3f',
                  transform: 'scale(1.15)',
                },
                '&:hover': {
                  color: '#001f3f',
                  transform: 'scale(1.1)',
                },
              },
            }}
          >
            <Tab label="Home" to="/students" component={Link} />
            <Tab label="MyProjects" to="/sprojects" component={Link} />
            <Tab label="Notifications" to="/snotifications" component={Link} />
          </Tabs>
        </Box>
      </Box>

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
