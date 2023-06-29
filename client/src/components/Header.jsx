import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setOpenState] = useState(false);
  const toggleOpenState = () => {
    setOpenState(!isOpen);
  };
  const isFullWidth = useMediaQuery('(min-width:450px)');

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mb={10}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleOpenState}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                支出管理アプリ
              </Link>
            </Typography>
            <Button color="inherit">ログアウト</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            top: isFullWidth ? '64px' : '56px',
          },
        }}
        anchor="left"
        open={isOpen}
        onClose={toggleOpenState}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemText>
                <Link to="/home" onClick={toggleOpenState}>
                  HOME
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <Link to="/report" onClick={toggleOpenState}>
                収入・支出レポート
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/addincome" onClick={toggleOpenState}>
                収入データ追加
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/addspend" onClick={toggleOpenState}>
                支出データ追加
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
