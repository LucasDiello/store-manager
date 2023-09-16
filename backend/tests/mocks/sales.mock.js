const dates = '2023-09-15T03:37:38.000Z';

const sales = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: dates,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: dates,
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: dates,
    },
  ];

const salesById = [
    {
      date: dates,
      productId: 1,
      quantity: 5,
    },
    {
      date: dates,
      productId: 2,
      quantity: 10,
    },
  ];

const createSaleRequest = [
  {
    productId: 1,
    quantity: 1,
  },

];

const createSaleResponse = {
  
    id: 1,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },

    ],
};

const failedCreateSaleRequest = [
  {
    productId: 99,
    quantity: 1,
  },
];

const failedQuantityCreateSaleRequest = [{ productId: 1, quantity: 0 }];

module.exports = {
    sales,
    salesById,
    createSaleRequest,
    createSaleResponse,
    failedCreateSaleRequest,
    failedQuantityCreateSaleRequest,
};