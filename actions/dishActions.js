const { Dish,Restaurant } = require('../models');
const { createToken } = require('./authActions');

const createDish = (data) => {
	return Dish.create(data);
};
const addDishToRestaurant = (id,dish) => {
	return Restaurant.findByIdAndUpdate(id,{$push:{dishes:dish}},{new:true});
};
const updateDishById = (id,data) =>{
   return Dish.findByIdAndUpdate(id,{$set:data},{new:true});
}
const  deleteDishById = (id) => {
	return Dish.findByIdAndRemove({_id:id});
};

module.exports = {
   createDish,
   addDishToRestaurant,
   updateDishById,
   deleteDishById
}
