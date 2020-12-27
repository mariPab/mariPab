import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { Provider } from 'react-redux';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import store from './redux/store';
import MainLayout from './components/layout/MainLayout';
import Homepage from './components/views/Homepage';
import Products from './components/views/Products';
import ProductDetails from './components/views/ProductDetails';
import OrderSummary from './components/views/OrderSummary';
import AboutUs from './components/views/AboutUs';
import { NotFound } from './components/views/NotFound/NotFound';
import styles from './App.module.scss';
import { GlobalStyle } from './styles/global';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#212121' },
    secondary: { main: '#a72456' },
  },
});

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className={styles.switchWrapper}
            >
              <Route exact path='/' component={Homepage} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/product/:id' component={ProductDetails} />
              <Route exact path='/order' component={OrderSummary} />
              <Route exact path='/aboutus' component={AboutUs} />
              <Route path='*' component={NotFound} />
            </AnimatedSwitch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
