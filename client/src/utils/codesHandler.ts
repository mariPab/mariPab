import { codes, errorCodes } from '../settings/codes';
import { NotificationManager } from 'react-notifications';

type ExecuteCode = (code: number) => void;

class CodesHandler {
  public executeSuccessCode: ExecuteCode = code => {
    switch(code) {
      case (codes.SUCCESSFUL_ORDER_SUBMISSION):
        NotificationManager.success('Dziękujemy! Zamówienie zostało złożone');
    }
  }
    public executeErrorCodes: ExecuteCode = code => {
    switch(code) {
      case (errorCodes.NO_PRODUCTS_IN_CART):
        NotificationManager.warning('Najpierw dodaj produkty do koszyka');
        break;
      case (errorCodes.INVALID_FIRSTNAME):
        NotificationManager.error('Imię jest wymagane');
        break;
      case (errorCodes.INVALID_LASTNAME):
        NotificationManager.error('Nazwisko jest wymagane');
        break;
      case (errorCodes.INVALID_ADDRESS):
        NotificationManager.error('Nieprawidłowy adres wysyłki');
        break;
      case (errorCodes.INVALID_PLACE):
        NotificationManager.error('Miejscowość jest wymagana');
        break;
      case (errorCodes.INVALID_EMAIL_ADDRESS):
        NotificationManager.error('Nieprawidłowy adres e-mail');
        break;
      case (errorCodes.INVALID_POSTCODE):
        NotificationManager.error('Nieprawidłowy kod pocztowy');
        break;
            case (errorCodes.INVALID_CHAR_FIRSTNAME):
        NotificationManager.error('Pole "Imię" zawiera niepoprawne znaki');
        break;
      case (errorCodes.INVALID_CHAR_LASTNAME):
        NotificationManager.error('Pole "Nazwisko" zawiera niepoprawne znaki');
        break;
      case (errorCodes.INVALID_CHAR_PLACE):
        NotificationManager.error('Pole "Miejscowość" zawiera niepoprawne znaki');
        break;
    }
  }
}

export default new CodesHandler();
