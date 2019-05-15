const { Restaurant } = require('../models');
const { createToken } = require('./authActions');
const createRestaurant = (data)=>{
    return new Promise( (resolve, reject) => {

        //Crear un nuevo restaurant
        saveRestaurant(data)
            .then( restaurant => {
                //Crear un token con la info del restaurant
                const token = createToken(restaurant);
                resolve(token); // <- devuelve el token
            })
            .catch( err => reject(err));
    });
}
const saveRestaurant = (data) =>{
   return Restaurant.create(data);
};

const getRestaurants = ()=>{
    return Restaurant.find();
}

const getByNameRestaurant =  (fields)=>{
    let search = {};
  
    if ( fields.name ) { search.name = fields.name; }
    
    return Restaurant.find(search);
}

module.exports = {
    createRestaurant,
    getRestaurants,
    getByNameRestaurant
}