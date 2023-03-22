import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, Outlet } from 'react-router-dom';
import { routeAdmin } from '../../router/routeAdmin';
import MenuSidebar from './components/MenuSidebar';
import { routeKitchen } from '../../router/routeKitchen';
import { routeEmployee } from '../../router/routeEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setOpenDrawer, setCloseDrawer } from '../../store/features/drawer';
import ProfileAvatar from './components/ProfileAvatar';
import { ThemeProvider } from '@emotion/react';
import { customTheme } from '../../utils/theme';
import { Close } from '@mui/icons-material';
import DrawerHeader from './components/DrawerHeader';
import TitleGroup from './components/TitleGroup';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const { drawer } = useSelector((state: RootState) => ({ ...state }))
  const dispatch = useDispatch()
  const theme = useTheme();

  const handleDrawerOpen = () => {
    // setOpen(true);
    dispatch(setOpenDrawer())
  };

  const handleDrawerClose = () => {
    // setOpen(false);
    dispatch(setCloseDrawer())

  };

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      handleDrawerClose()

    }
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={drawer.open}>
          <Toolbar>
            {drawer.open ?
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
              >
                <Close />
              </IconButton>
              : <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            }

            <Box sx={{ flexGrow: 1 }} />
            <ProfileAvatar />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={drawer.open}>
          <DrawerHeader />


          {routeAdmin.map((item, index) => (item.path && item.icon)
            ? <MenuSidebar item={item} key={item.name + index} />
            : item.group && <TitleGroup group={item.group} key={item.group + index + 'group'} />
          )}
          {routeEmployee.map((item, index) => (item.path && item.icon)
            ? <MenuSidebar item={item} key={item.name + index} />
            : item.group && <TitleGroup group={item.group} key={item.group + index + 'group'} />
          )}
          {routeKitchen.map((item, index) => (item.path && item.icon)
            ? <MenuSidebar item={item} key={item.name + index} />
            : item.group && <TitleGroup group={item.group} key={item.group + index + 'group'} />
          )}
        </Drawer >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ height: "3.5rem" }} />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
