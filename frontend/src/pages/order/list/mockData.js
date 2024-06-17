import mongoose from 'mongoose';

const mockOrders = [
  {
    _id: new mongoose.Types.ObjectId(),
    username: "JohnDoe",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 45.24,
    createdAt: new Date('2022-09-01'),
    status: "PENDING"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "JaneDoe",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId()],
    total: 30.00,
    createdAt: new Date('2022-09-02'),
    status: "CONFIRMED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "AliceSmith",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 78.50,
    createdAt: new Date('2022-09-03'),
    status: "DELIVERED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "BobJohnson",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId()],
    total: 22.00,
    createdAt: new Date('2022-09-04'),
    status: "CANCELLED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "CharlieBrown",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 55.00,
    createdAt: new Date('2022-09-05'),
    status: "PENDING"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "DavidWilson",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 42.50,
    createdAt: new Date('2022-09-06'),
    status: "CONFIRMED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "EvaGreen",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId()],
    total: 25.75,
    createdAt: new Date('2022-09-07'),
    status: "DELIVERED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "FrankBlack",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 63.00,
    createdAt: new Date('2022-09-08'),
    status: "CANCELLED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "GraceHopper",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 85.00,
    createdAt: new Date('2022-09-09'),
    status: "PENDING"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "HankPym",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId()],
    total: 19.99,
    createdAt: new Date('2022-09-10'),
    status: "CONFIRMED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "IvyStone",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    total: 60.00,
    createdAt: new Date('2022-09-11'),
    status: "DELIVERED"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "JackSparrow",
    restaurantId: new mongoose.Types.ObjectId(),
    cartItems: [new mongoose.Types.ObjectId()],
    total: 35.00,
    createdAt: new Date('2022-09-12'),
    status: "CANCELLED"
  }
];

export default mockOrders;
