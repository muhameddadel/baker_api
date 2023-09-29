const Order = require('../models/order.model'); 
const httpStatus = require('../utils/httpStatus');
const appError = require('../utils/appError');


const getBakerOrders = async (req, res, next) => {
  const bakerId = req.currentUser._id; 
  const orders = await Order.find({ baker: bakerId });
  res.json({ status: httpStatus.SUCCESS, data: { orders } });
};


const acceptOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findByIdAndUpdate(orderId, { status: 'accepted' }, { new: true });
  if (!order) {
    const error = appError.create('Order not found', 404, httpStatus.FAIL);
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: { order } });
};


const rejectOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findByIdAndUpdate(orderId, { status: 'rejected' }, { new: true });
  if (!order) {
    const error = appError.create('Order not found', 404, httpStatus.FAIL);
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: { order } });
};


const fulfillOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findByIdAndUpdate(orderId, { status: 'fulfilled' }, { new: true });
  if (!order) {
    const error = appError.create('Order not found', 404, httpStatus.FAIL);
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: { order } });
};

module.exports = {
  getBakerOrders,
  acceptOrder,
  rejectOrder,
  fulfillOrder,
};
