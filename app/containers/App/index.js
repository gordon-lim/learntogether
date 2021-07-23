/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Footer from '../../components/Footer/Loadable';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import Routes from './routes';

function App() {
  return (
    <>
      <Header />
      <Routes />
      <Footer />
      <GlobalStyle />
    </>
  );
}

export default App;
