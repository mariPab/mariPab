import React, { useEffect } from 'react';
import Footer from '../Footer';
import { changeViewport } from '../../../redux/viewportRedux';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import Nav from '../Nav';
import { PageContainer, ContentContainer } from './MainLayout.style';

import 'react-notifications/lib/notifications.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

interface MapDispatchToProps {
  changeViewportMode: (newMode: boolean) => void;
}
type Props = MapDispatchToProps;

const isMobileViewport = (): boolean => {
  const mobile = '(max-width: 576px)';
  if (window.matchMedia(`${mobile}`).matches) return true;
  else return false;
};

const MainLayout: React.FunctionComponent<Props> = ({ children, changeViewportMode }) => {
  useEffect(() => {
    changeViewportMode(isMobileViewport());
    window.addEventListener('resize', () => changeViewportMode(isMobileViewport()));
  });
  return (
      <PageContainer>
      <NotificationContainer />
      <Nav />
      <ContentContainer>
        {children}
      </ContentContainer>
      <Footer />
      </PageContainer>
  );
};

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  changeViewportMode: newMode => dispatch(changeViewport(newMode)),
});
export default connect(null, mapDispatchToProps)(MainLayout);
