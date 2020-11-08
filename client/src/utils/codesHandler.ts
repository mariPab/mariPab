import { codes/* , errorCodes */ } from '../settings/codes';
import { NotificationManager } from 'react-notifications';

type ExecuteCode = (code: number) => void;

class CodesHandler {
  public executeSuccessCode: ExecuteCode = code => {
    switch(code) {
      case (codes.SUCCESSFUL_ORDER_SUBMISSION):
        NotificationManager.success('Dziękujemy! Zamówienie zostało złożone');
    }
  }
}

export default new CodesHandler();
