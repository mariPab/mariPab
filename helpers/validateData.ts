import { codes, errorCodes } from '../client/src/settings/codes';
import { CustomerData } from '../interfaces';

type Validate = (data: CustomerData) => number[];
type ValidateStrings = (input: string) => number;

class ValidateData {
  private invalidSigns = /[-[\]{}()*+?.,\\^$|#\s]/g;
  private validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private validAddress = /^([^\\u0000-\u007F]|\w)+,?\s\d+[A-z]?(\/\d+[A-z]?)?$/;
  private validPostCode = /[0-9]{2}-[0-9]{3}/;

  public validate: Validate = data => {
    const validationCodes = [];
    validationCodes.push(this.validateFirstName(data.firstName));
    validationCodes.push(this.validateLastName(data.lastName));
    validationCodes.push(this.validatePlace(data.place));
    validationCodes.push(this.validateEmail(data.email));
    validationCodes.push(this.validateAddress(data.address));
    validationCodes.push(this.validatePostCode(data.postCode));
    return validationCodes.filter(code => code !== codes.SUCCESSFUL_VALIDATION);
  }  
  public validateFirstName: ValidateStrings = firstname => {
    if (!this.invalidSigns.test(firstname)) return errorCodes.INVALID_CHAR_FIRSTNAME;
    else if (!firstname || firstname.length < 3) return errorCodes.INVALID_FIRSTNAME;
    return codes.SUCCESSFUL_VALIDATION;
  }
  public validateLastName: ValidateStrings = lastname => {
    if (!this.invalidSigns.test(lastname)) return errorCodes.INVALID_CHAR_LASTNAME;
    else if (!lastname || lastname.length < 3) return errorCodes.INVALID_LASTNAME;
    return codes.SUCCESSFUL_VALIDATION;
  }
  public validatePlace: ValidateStrings = place => {
    if (!this.invalidSigns.test(place)) return errorCodes.INVALID_CHAR_PLACE;
    else if (!place || place.length < 3) return errorCodes.INVALID_PLACE;
    return codes.SUCCESSFUL_VALIDATION;
  }
  public validateEmail: ValidateStrings = email => {
    if (!this.validEmail.test(email)) return errorCodes.INVALID_EMAIL_ADDRESS;
    return codes.SUCCESSFUL_VALIDATION;
  }
  public validateAddress: ValidateStrings = address => {
  if (!this.validAddress.test(address)) return errorCodes.INVALID_ADDRESS;
    return codes.SUCCESSFUL_VALIDATION;
  }
  public validatePostCode: ValidateStrings = postcode => {
    if (!this.validPostCode.test(postcode)) return errorCodes.INVALID_POSTCODE;
    return codes.SUCCESSFUL_VALIDATION;
  }
}

export default new ValidateData();
