const actions = require('../actions');
const { authUserById, storeUpload} = require('../utils'); 

//! registrar usuario
const signup = (_, args, context, info) => {

    return actions.signup(args.data)
                  .then( token => {
                      return { token, mensaje: "¡usuario creado exitosamente!" }
                  })
                  .catch(err => {
                      return { token:err, mensaje: "Hubo un error al generar el token..." }
                  });                
};
// login para restaurant && usuario
const login = (_, args, context, info) => {
    
    return actions.login(args)
            .then( token => {
                return { token, mensaje: "¡inicio de sesión exitoso!" }
            })
            .catch(err => {
                return { token:err, mensaje: "Hubo un error al iniciar sesión..." }
            }); 
};

const createUser = async (_, { data }, context, info) => {

    return authUserById(context)
    .then( user => actions.createUser(data)
                          .then(newUser => newUser))
    // .then( newUser => newUser )
    .catch( err => console.log(err));
};
const registerRestaurant =  async (_,args,context,info)=>{
    // save image to cloudinary
    const { createReadStream } = await args.data.image;
	const stream = createReadStream();
    const { url } = await storeUpload(stream);   
	args.data.image = url;
    return actions.createRestaurant(args.data)
                  .then((token)=>{
                    return { token, mensaje: "¡Restaurant creado exitosamente!" }
                  })
                  .catch(err => {
                    return { token:err, mensaje: "Hubo un error al generar el token..." }
                  })
}

const createDish = async (_,args,context,info)=>{
    // validar que usuario tenga login activo.
    // save image to cloudinary
    const { createReadStream } = await args.data.image;
	const stream = createReadStream();
    const { url } = await storeUpload(stream);
    console.log('url ', url);
    
	args.data.image = url;
    const restaurantUserId = await authUserById(context);
    console.log(restaurantUserId)
	args.data.restaurantUserId = restaurantUserId._id;
	if (!restaurantUserId) throw new Error("User does not exist");
	return actions.createDish(args.data).then((dish) => {
		return actions.addDishToRestaurant(restaurantUserId._id, dish._id).then((user) => {
			return dish;
		}).catch(e => e);
	}).catch(e => e);
}
const  updateDish = async (_, args, context, info) => {
	await authUserById(context);
	return actions.updateDishById(args.id, args.data).then((post) => {
		if (!post) throw new Error("Dish does not exist");
		return post;
	}).catch(e => e);
};
const deleteDish = async (_, args, context, info) => {
	await authUserById(context);
	return actions.deleteDishById(args.id).then((post) => {
		if (!post) throw new Error("Dish does not exist");
		return "Dish deleted seccessfully";
	}).catch((e) => e);
};

module.exports = {
    signup,
    login,
    createUser,
    registerRestaurant,
    createDish,
    updateDish,
    deleteDish
};