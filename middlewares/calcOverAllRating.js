const Order = require('../models/order.model');


const calculateBakerOverallRating = async (bakerId) => {
    try {
        const orders = await Order.find({ baker: bakerId, rating: { $exists: true } });

        if (orders.length === 0) {
            return 0;
        }
        const totalRatings = orders.reduce((sum, order) => sum + order.rating, 0);
        const averageRating = totalRatings / orders.length;

        const roundedRating = Math.round(averageRating * 10) / 10; 

        return roundedRating;
    } catch (error) {
        console.error('Error calculating baker\'s overall rating:', error);
        return 0; 
    }
};

module.exports = calculateBakerOverallRating;
