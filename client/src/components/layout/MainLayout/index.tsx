import React/* , { useEffect }  */from 'react';
import Footer from '../Footer';
import { NotificationContainer } from 'react-notifications';
import Nav from '../Nav';
import { PageContainer, ContentContainer } from './MainLayout.style';
import { ViewportProvider } from "../../../context/viewport";

import 'react-notifications/lib/notifications.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const MainLayout: React.FunctionComponent = ({ children }) => (
    <ViewportProvider>
      <PageContainer>
        <NotificationContainer />
        <Nav />
        <ContentContainer>
          {children}
        </ContentContainer>
        <Footer />
      </PageContainer>
    </ViewportProvider>
  );

export default MainLayout;
