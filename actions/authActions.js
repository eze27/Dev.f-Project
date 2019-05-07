const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('./userActions');

const createToken = (args) => {
    const payload = {
        _id: args._id,
        email: args.email,
        password: args.password,
    }

    const token = jwt.sign(payload, "micodiguinsecretin");

    return token;
};

const signup = (data) => {
    // Englobamos el código en una promesa para manejarlo asíncronamente
    return new Promise( (resolve, reject) => {

        //Crear un usuario nuevo...
        createUser(data)
            .then( user => {
                //Crear un token con la info del usuario nuevo...
                const token = createToken(user);
                resolve(token); // <- devuelve el token
            })
            .catch( err => reject(err));
    });
};

const login = ({ email, password }) => {

    return new Promise((resolve, reject) => {
        // Verificar si existe el usuario con el email proporcionado...
        getUserByEmail(email).then( user => {
            // Comparar contraseñas para validar la entrada
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) reject(err);
                isValid 
                ? resolve(createToken(user))
                : reject(new Error('Las contraseñas no coinciden'));
            })
        }).catch( err => reject(err));
    });
};

module.exports = { 
    createToken,
    signup, 
    login,
};