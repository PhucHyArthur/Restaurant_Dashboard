import mongoose from 'mongoose';

const mockOrders = [
  {
    _id: 1,
    username: "JohnDoe",
    restaurantName: "abc",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 45.24,
    createdAt: new Date('2022-09-01'),
    status: "PENDING"
  },
  {
    _id: 2,
    username: "JaneDoe",
    restaurantName: "cde",
    cartItems: [new mongoose.Types.ObjectId()],
    total: 30.00,
    createdAt: new Date('2022-09-02'),
    status: "CONFIRMED"
  },
  {
    _id: 3,
    username: "AliceSmith",
    restaurantName: "efg",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 78.50,
    createdAt: new Date('2022-09-03'),
    status: "DELIVERED"
  },
  {
    _id: 4,
    username: "BobJohnson",
    restaurantName: "hjkk",
    cartItems: [new mongoose.Types.ObjectId()],
    total: 22.00,
    createdAt: new Date('2022-09-04'),
    status: "CANCELLED"
  },
  {
    _id: 5,
    username: "CharlieBrown",
    restaurantName: "gkee",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 55.00,
    createdAt: new Date('2022-09-05'),
    status: "PENDING"
  },
  {
    _id: 6,
    username: "DavidWilson",
    restaurantName: "eseklklse",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 42.50,
    createdAt: new Date('2022-09-06'),
    status: "CONFIRMED"
  },
  {
    _id: 7,
    username: "EvaGreen",
    restaurantName: "efjsefs",
    cartItems: [new mongoose.Types.ObjectId()],
    total: 25.75,
    createdAt: new Date('2022-09-07'),
    status: "DELIVERED"
  },
  {
    _id: 8,
    username: "FrankBlack",
    restaurantName: "efklskfls",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 63.00,
    createdAt: new Date('2022-09-08'),
    status: "CANCELLED"
  },
  {
    _id: 9,
    username: "GraceHopper",
    restaurantName: "elkfnklf",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 85.00,
    createdAt: new Date('2022-09-09'),
    status: "PENDING"
  },
  {
    _id: 10,
    username: "HankPym",
    restaurantName: "opqweoq",
    cartItems: [new mongoose.Types.ObjectId()],
    total: 19.99,
    createdAt: new Date('2022-09-10'),
    status: "CONFIRMED"
  },
  {
    _id: 11,
    username: "IvyStone",
    restaurantName: "eieeoqq",
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 60.00,
    createdAt: new Date('2022-09-11'),
    status: "DELIVERED"
  },
  {
    _id: 12,
    username: "JackSparrow",
    restaurantName: "tyuiopoiuh",
    cartItems: [new mongoose.Types.ObjectId()],
    total: 35.00,
    createdAt: new Date('2022-09-12'),
    status: "CANCELLED"
  }
];

export default mockOrders;
