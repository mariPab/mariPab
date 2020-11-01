import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
// import { getViewportMode } from '../../../redux/viewportRedux.js';
import { connect } from 'react-redux';
import Cart from '../../features/Cart';
// import { Button } from '../../common/Button/Button';
// import MenuIcon from '@material-ui/icons/Menu';
// import manageCartStorageHOC from '../../../HOC/manageCartStorage';
import { RootState } from "../../../redux/store";

// const CartWithStorageMngmt = manageCartStorageHOC(Cart);

const Nav: React.FunctionComponent = (/* { mobile  }*/) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={`${styles.root} ${expanded ? styles.expanded : ''}`} >
      {/* {mobile ?
        <Button
          variant="fab"
          className={`${styles.navlink} ${mobile ? styles.openMenu : ''}`}
          onClick={() => handleExpandClick()}
        >
          <MenuIcon />
        </Button> : ''} */}
      <div
        className={`${styles.navLinkList} ${/* mobile ? styles.mobileOnly : '' */''} ${expanded ? styles.expandMenu : ''}`}
      >
        <NavLink
          className={styles.navlink}
          exact to='/'
          // onClick={mobile ? () => handleExpandClick() : null}
          onClick={handleExpandClick}

        >
          Strona główna
        </NavLink>
        <NavLink
          className={styles.navlink} exact to='/'
          // onClick={mobile ? () => handleExpandClick() : null}
          onClick={handleExpandClick}
        >
          Wyprzedaż
        </NavLink>
        <NavLink
          className={styles.navlink}
          exact to='/'
          //  onClick={mobile ? () => handleExpandClick() : null}
          onClick={handleExpandClick}

        >
          O&nbsp;nas
        </NavLink>
      </div>
      <Cart />
    </nav >
  );
};

const mapStateToProps = (state: RootState) => ({
  // mobile: getViewportMode(state),
});

export default connect(mapStateToProps, null)(Nav);
