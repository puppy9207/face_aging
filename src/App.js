import './App.css';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import MainContainerTemplate from './components/MainContainer';
import LeftContainerTemplate from './components/LeftContainer';
import RightContainerTemplate from './components/RightContainer';
import CropTemplate from './components/CropImage';
import imgA from './static/logo.png';
import Grid from '@material-ui/core/Grid';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const TopBarTemplateBlock = styled.div`

  position: fixed; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: #978875;
  width:100%;
  height:3rem;
  color:white;
  margin-top:-5rem;
  padding:8px 12px 12px 2.5rem;
  display:flex;
  z-index:10;
`;
const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }));
function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <GlobalStyle />
    <TopBarTemplateBlock>
      <Grid container justify="space-between">
        <Grid item xs={9} sm={2}><a href="#"><img src={ imgA } style={{height:"3rem"}}/></a></Grid>
        <Grid item xs={3} sm={1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          </Grid>
      </Grid>
      
    </TopBarTemplateBlock>
        <MainContainerTemplate>
          <LeftContainerTemplate>
            <CropTemplate></CropTemplate>
            </LeftContainerTemplate>
          <RightContainerTemplate></RightContainerTemplate>
        </MainContainerTemplate>
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      ><div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
      {['메인페이지', '이미지 자르기', '저시기'].map((text, index) => ( 
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
  </Drawer>
    </>
  );
}

export default App;
