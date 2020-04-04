export const initialState = {
  products: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  cart: {
    products: [
      {
        _id: '5e8395e36069de24bd154a76',
        manufacturer: 'Sylveco',
        name: 'duetus Krem na noc',
        images: ['photo_3gbh2F5nl.jpg', 'photo_f5nqlB6Gk9.jpg'],
        price: 27,
        amount: 1,
      },
      {
        _id: '5e8395e36069de24bd154a77',
        manufacturer: 'Sylveco',
        name: 'BIOLAVEN Płyn micelarny',
        images: ['photo_h27H94B8g2.jpg'],
        price: 12,
        amount: 2,
      },
    ],
    total: 0,
  },
};
