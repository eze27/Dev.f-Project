const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { getUserById } = require('../actions');
const cloudinary =  require("cloudinary");
// puedo crear platillos, solo si tengo login activo.
const authUserById = (context) => {
    const Authorization = context.request.get("Authorization");
    // { Auth: "JWT KADK82kjdbafk83eb"};
    if (Authorization) {
        const token = Authorization.replace("JWT ", "");
        const { _id } = jwt.verify(token, SECRET_KEY);
        return getUserById(_id);
    }

    throw new Error("No estás autenticado");
}
function storeUpload(stream){
	cloudinary.config({
		cloud_name:'ezedev1994',
		api_key:'946358928719253',
		api_secret:'rhrm-yImQNePw53Xbp48VsdRojs'
	});

	return new Promise((resolve,reject) => {
		const buffer =  cloudinary.v2.uploader.upload_stream((error,result) => {
			if(error) reject(error);
			resolve(result);
		});

		stream.pipe(buffer);
	});
}

module.exports = {
    authUserById,
    storeUpload
}