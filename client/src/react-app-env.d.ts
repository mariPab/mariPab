/// <reference types="react-scripts" />
/// <reference path="./types/product/product.d.ts" />
/// <reference path="./types/cart/cart.d.ts" />
declare module 'react-router-transition';
declare module 'react-notifications';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
