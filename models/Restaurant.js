const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const RestaurantSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, 
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
     },
     first_name:{
         type:String,
         required:true
     },
     last_name:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     },
     password:{
        type:String,
        required:true
     },
     dishes:[{
        type: Schema.Types.ObjectId,
		ref: "Dishes"
     }],
     typeuser:{
         type:Number,
         default:2
     }

});
RestaurantSchema.pre('save', function(next){
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;