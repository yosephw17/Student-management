import PropTypes from 'prop-types';
import { useState } from 'react';

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Here you can add your routing logic
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
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="primary"
                aria-label="navigation tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#001f3f', // Deep blue-black color for the indicator
                    height: '3px', // Make the indicator slightly thick
                    borderRadius: '2px', // Rounded indicator edges
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none', // Keep the text normal
                    fontWeight: '500', // Medium weight text
                    fontSize: '16px', // Set a comfortable font size
                    marginRight: '20px', // Add space between tabs
                    color: '#001f3f', // Deep blue-black color for tab labels
                    transition: 'color 0.4s ease, transform 0.3s ease', // Smooth color and scale transition
                    '&.Mui-selected': {
                      color: '#001f3f', // Same color for the selected tab
                      transform: 'scale(1.15)', // Slightly enlarge the selected tab
                    },
                    '&:hover': {
                      color: '#001f3f', // Same deep blue-black color on hover
                      transform: 'scale(1.1)', // Slightly enlarge on hover
                    },
                  },
                }}
              >
                <Tab label="Home" />
                <Tab label="Projects" />
                <Tab label="Notifications" />
              </Tabs>
            </Box>
          </Box>
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
