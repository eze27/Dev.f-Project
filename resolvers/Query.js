const actions = require("../actions");


//obtiene todos los usuarios
const getUsers = () =>{
	
	return actions.getUsers().then(users => users).catch((err)=>{
		console.log(err);
	})
}
//obtiene todos los restaurantes
const getRestaurants = (_,args,context,info) =>{
	
	
	return actions.getRestaurants().then(users =>  users).catch((err)=>{
		console.log(err);
	})
}
// obtiene restaurant por nombre 
const getByNameRestaurant = (_,args,context,info) =>{
	
	return actions.getByNameRestaurant( args )
				.then(restaurants => restaurants)
				.catch(err => console.log(err));
}
// obtiene todos los platillos
const getDishes =  (_,args,context,info) =>{
	return actions.getDishes().then(dishes => dishes).catch((err)=>{
		console.log(err);
	})
}
//obtiene platillo por nombre
const getByNameDish = (_,args,context,info) =>{
	return actions.getByNameDish( args )
	.then(dish => dish)
	.catch(err => console.log(err));
}
module.exports = {
	getUsers,
	getRestaurants,
	getByNameRestaurant,
	getDishes,
	getByNameDish
};
