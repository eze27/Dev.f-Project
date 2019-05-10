const NODE_ENV = process.env.NODE_ENV || "dev"

const ENVS = {
    dev: {
        SECRET_KEY: "micodiguinsecretin",
        DB_URI: "mongodb+srv://Ezedev:cafl6W02twGrhQMY@cluster0-cfyli.mongodb.net/test?retryWrites=true",
    },

    production: {
        SECRET_KEY: process.env.SECRET_KEY,
        DB_URI: process.env.DB_URI,
    },
};

module.exports = ENVS[NODE_ENV];