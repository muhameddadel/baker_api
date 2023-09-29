const { validationResult } = require("express-validator");
const Product = require("../models/product.model");
const Order = require("../models/order.model"); 
const httpStatus = require("../utils/httpStatus");
const asyncWarpper = require("../middlewares/asyncWarpper");
const calculateBakerOverallRating = require("../middlewares/calcOverAllRating");
const BakerProfile = require("../models/bakerProfile.model")
const appError = require("../utils/appError");


const getAvailableCollectionTimes = asyncWarpper(async (req, res, next) => {
    const bakerId = req.params.id;
    const requestedDate = new Date(req.query.date);
  
    const baker = await BakerProfile.findById(bakerId);
  
    if (!baker) {
      const error = appError.create('Baker not found', 404, httpStatus.FAIL);
      return next(error);
    }
  
    const availableTimes = baker.collectionTimeRange;
  
    const matchingTimes = availableTimes.filter((time) => {
      return (
        time.getDate() === requestedDate.getDate() &&
        time.getMonth() === requestedDate.getMonth() &&
        time.getFullYear() === requestedDate.getFullYear()
      );
    });
  
    res.json({ status: httpStatus.SUCCESS, data: { collectionTimeRange: matchingTimes } });
  });
  

const placeOrder = asyncWarpper(async (req, res) => {
    const { bakerId, collectionTime, otherOrderDetails } = req.body;
  
    const baker = await BakerProfile.findById(bakerId);
  
    if (!baker) {
      const error = appError.create('Baker not found', 404, httpStatus.FAIL);
      return next(error);
    }
  
    if (!baker.collectionTimeRange.includes(collectionTime)) {
      const error = appError.create('Baker is not available at the requested collection time', 400, httpStatus.ERROR);
      return next(error);
    }

    const newOrder = new Order({
      baker: bakerId,
      collectionTime,
      ...otherOrderDetails,
    });
  
    await newOrder.save();
  
    res.json({ status: httpStatus.SUCCESS, data: { order: newOrder } });
  });


const rateOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        const error = appError.create('Invalid rating value. Rating must be between 1 and 5 stars.', 400, httpStatus.ERROR);
        return next(error);
    }

    const order = await Order.findById(orderId);

    if (!order || order.status !== 'fulfilled') {
        const error = appError.create('Order not found or not fulfilled', 404, httpStatus.FAIL);
        return next(error);
    }

    order.rating = rating;
    await order.save();

    const bakerOverallRating = await calculateBakerOverallRating(order.baker);

    res.json({
        status: httpStatus.SUCCESS,
        data: { order, bakerOverallRating },
    });
};


  module.exports = {
    placeOrder, 
    getAvailableCollectionTimes, 
    rateOrder
}