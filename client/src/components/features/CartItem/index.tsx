import React, { useState } from "react";
import { IMAGES_URL } from "../../../config";
import Button from "../../common/Button";
import { NumberInput } from "../../common/NumberInput/NumberInput";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./CartItem.module.scss";
import { connect } from "react-redux";
import {
  changeProductAmount,
  removeFromCart,
  addComments,
} from "../../../redux/cart/actions";
import EditIcon from "@material-ui/icons/Edit";
import { CartProduct } from "../../../redux/cart/types";

interface MapDispatchToProps {
  changeAmount: (id: string, amount: number) => void;
  removeProduct: (id: string) => void;
  addNotes: (id: string, notes: string) => void;
}
interface Props extends MapDispatchToProps {
  product: CartProduct;
}
export const CartItem: React.FunctionComponent<Props> = ({
  product,
  changeAmount,
  removeProduct,
  addNotes,
}: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);
  return (
    <div className={styles.root}>
      <div className={styles.productItem}>
        <div className={styles.image}>
          <img src={`${IMAGES_URL}/${product.images[0]}`} alt={product.name} />
        </div>
        <div className={styles.productData}>
          <div className={styles.productInfo}>
            <span>{product.name}</span>
            <small>{product.price}&nbsp;zł</small>
          </div>
          <div>
            <small>Ilość:&nbsp;</small>
            <NumberInput
              value={product.amount}
              onChange={(e) => changeAmount(product.id, parseInt(e.target.value))}
            />
            <Button
              onClick={handleExpandClick}
              variant="fab"
              aria-label="add-notes"
            >
              <EditIcon color="primary" />
            </Button>
            <Button
              onClick={removeProduct.bind(null, product.id)}
              variant="fab"
              aria-label="delete"
            >
              <DeleteIcon color="primary" />
            </Button>
          </div>
        </div>
      </div>
      <div className={`${styles.notes} ${expanded ? styles.expanded : ""}`}>
        <textarea
          value={product.notes}
          onChange={(e) => addNotes(product.id, e.target.value)}
          placeholder="Jeśli masz uwagi do zamówienia - umieść je tutaj"
        ></textarea>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  changeAmount: (id, amount) => dispatch(changeProductAmount(id, amount)),
  removeProduct: (id) => dispatch(removeFromCart(id)),
  addNotes: (id, notes) => dispatch(addComments(id, notes)),
});

export default connect(null, mapDispatchToProps)(CartItem);
