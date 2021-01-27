import React, { useState } from 'react';
import UI from '../../ui/UI.style';
import { Menu, LocalMall } from '@material-ui/icons';
import { useViewport } from '../../../context/viewport';
import Navi from './Nav.style';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useCartProducts } from '../../../helpers/useCartProducts';

const links = [
  { title: 'Strona główna', path: '/'},
  { title: 'Produkty', path: '/products'},
  { title: `O nas`, path: '/aboutus'},
];

interface MapStateToProps {
  products: Cart.CartProduct[];
}
interface Props extends MapStateToProps {
  toggleCart: () => void;
}

const Nav: React.FunctionComponent<Props> = ({ products, toggleCart }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { viewport } = useViewport();
  const { total } = useCartProducts(products);
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
        <span>{total}&nbsp;zł</span>
        <UI.Button
          iconButton
          icon={<LocalMall fontSize="large" />}
          noBorder
          onClick={toggleCart}
        />
      </Navi.CartNav>
    </Navi.Root>
  );
};

const mapStateToProps = ({ cart }: RootState): MapStateToProps => ({
  products: cart.products,
});

export default connect(
  mapStateToProps,
  null
)(Nav) as React.ComponentType<any>;
