import React, { useState } from 'react';
import UI from '../../ui/UI.style';
import { Menu, LocalMall } from '@material-ui/icons';
import { useViewport } from '../../../context/viewport';
import Navi from './Nav.style';
import { connect } from 'react-redux';
import { getTotalPrice } from '../../../redux/cart/reducer';
import { RootState } from '../../../redux/store';

const links = [
  { title: 'Strona główna', path: '/'},
  { title: 'Produkty', path: '/products'},
  { title: `O nas`, path: '/aboutus'},
];

interface MapStateToProps {
  total: number;
}
interface Props extends MapStateToProps {
  toggleCart: () => void;
}

const Nav: React.FunctionComponent<Props> = (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { viewport } = useViewport();
  return (
    <Navi.Root expanded={expanded}>
      {viewport === 'mobile' ?
        <UI.Button
          iconButton
          icon={<Menu fontSize="large" />}
          noBorder
          onClick={setExpanded.bind(null, !expanded)}
        /> : null}
      <Navi.LinkList
        mobile={viewport === 'mobile'}
        expanded={expanded}
      >
        {links.map((link, idx) =>
          <li key={idx}>
            <Navi.Link
              exact
              to={link.path}
              mobile={viewport === 'mobile'}
              onClick={setExpanded.bind(null, !expanded)}
              activeClassName='active'
            >
              {link.title}
            </Navi.Link>
          </li>
        )}
      </Navi.LinkList>
      <Navi.CartNav>
        <span>{props.total}&nbsp;zł</span>
        <UI.Button
          iconButton
          icon={<LocalMall fontSize="large" />}
          noBorder
          onClick={props.toggleCart}
        />

      </Navi.CartNav>
    </Navi.Root>
  );
};

const mapStateToProps = (state: RootState): MapStateToProps => ({
  total: getTotalPrice(state),
});

export default connect(
  mapStateToProps,
  null
)(Nav) as React.ComponentType<any>;
