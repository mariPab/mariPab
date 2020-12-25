import React, { useState } from 'react';
import Footer from '../Footer';
import { NotificationContainer } from 'react-notifications';
import Nav from '../Nav';
import { PageContainer, ContentContainer } from './MainLayout.style';
import { ViewportProvider } from '../../../context/viewport';
import Cart from '../../features/Cart';

import 'react-notifications/lib/notifications.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const MainLayout: React.FunctionComponent = ({ children }) => {
  const [openedCart, setCartOpened] = useState(false);

  return (
    <ViewportProvider>
      <PageContainer>
        <NotificationContainer />
        <Nav
          toggleCart={setCartOpened.bind(null, !openedCart)}
        />
        <Cart
          opened={openedCart}
          toggleCart={setCartOpened.bind(null, !openedCart)}
        />
        <ContentContainer>
          {children}
        </ContentContainer>
        <Footer />
      </PageContainer>
    </ViewportProvider>
  );
};
export default MainLayout;
