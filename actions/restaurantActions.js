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




module.exports = {
    createRestaurant
}