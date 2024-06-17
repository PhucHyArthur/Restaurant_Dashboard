// mockData.js
import mongoose from 'mongoose';

const mockOrderDetail = {
  _id: new mongoose.Types.ObjectId(),
  orderId: "13432",
  customerName: "David Kent",
  email: "david89@gmail.com",
  shippingAddress: "180 North King Street, Northampton MA 1060",
  items: [
    {
      name: "Chicken KFC",
      quantity: 2,
      price: 50.00,
      imageUrl: "https://theartisticcook.com/wp-content/uploads/2023/06/kfc-1.jpg"
    },
    {
      name: "Burger King",
      quantity: 1,
      price: 30.00,
      imageUrl: "https://theartisticcook.com/wp-content/uploads/2023/06/burger-king.jpg"
    }
  ],
  orderDate: new Date('2021-03-21T22:34:00'),
  subtotal: 80.00,
  shipping: 8.00,
  total: 88.00,
};

export default mockOrderDetail;
