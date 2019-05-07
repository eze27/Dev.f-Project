const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { getUserById } = require('../actions');

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

module.exports = {
    authUserById,
}