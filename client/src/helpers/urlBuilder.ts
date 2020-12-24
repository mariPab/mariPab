export type getAttributes = {
  [key: string]: any;
};
export type ArrayInUrlType = {
  name?: string;
  values: ValuesFilterType;
};
export type ValuesFilterType = Array<{ title: string; value: string }>;

class UrlBuilder {
  public build = (path: string, attributes: getAttributes): string => {
    const converted: Array<string> = [];
    for (const attribute in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
        const element = attributes[attribute];
        const key: string = attribute;
        if (element && typeof element === 'string') converted.push(`${attribute}=${element}`);
        else if (element && typeof element === 'object' && Array.isArray(element)) {
          const isArrayOfStrings = element.reduce((prev: any, current: any) => (typeof prev && typeof current === 'string'), true);
          const isArrayOfObject = element.reduce((prev: any, current: any) => (typeof prev && typeof current === 'object'), true);

          if (isArrayOfStrings) {
            if (element.length) {
              converted.push(this.buildStringArray(element, key));
            }
          }
          else if (isArrayOfObject) {
            if (element.length) {
              for (const singleFilterGroup in element) {
                if (Object.prototype.hasOwnProperty.call(element, singleFilterGroup)) {
                  converted.push(this.buildArray(element[singleFilterGroup], key));
                }
              }
            }
          }
        }
      }
    }
    return this.concat(converted, path);
  }
  private buildArray = ({ values, name }: ArrayInUrlType, key: string): string => {
    return values && values.length === 0 ? '' :
      values.reduce((previousValue, currentValue, index) => {
        return `${previousValue}${index === 0 ? '' : '&'}${key}%5B${name}%5D=${currentValue}`;
      }, '');
  }
  private buildStringArray = (array: Array<string>, key: string): string => {
    return array && array.length === 0 ? '' :
      array.reduce((previousValue, currentValue, index) => {
        return `${previousValue}${index === 0 ? '' : '&'}${key}%5B%5D=${currentValue}`;
      }, '');
  }
  private concat = (array: Array<string>, path: string): string => {
    // concat łączy wszystkie elementy tablicy wprowadzając odpowiednie znaki łączenia parametrów
    return array.reduce((previousValue, currentValue, index) => {
      return currentValue === '' ? previousValue : `${previousValue}${index === 0 ? '' : '&'}${currentValue}`;
    }, `${path}?`);
  }
}

export default new UrlBuilder();
