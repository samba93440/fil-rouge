//loader 
const mongoose  = require("mongoose");
const Joi       = require("@hapi/joi");

//schema
const _userSchema = new mongoose.Schema(
{
    nom         : String,
    prenom      : String,
    email       : String,
    password    : String,
    role        : String,
    isOnline    : Boolean
});

//modèle
const User = mongoose.model("users", _userSchema);

function validationUser(user)
{
    
    const schema = 
    {
        nom         : Joi.string().min(2).max(27).required(),
        prenom      : Joi.string().min(2).max(27).required(),
        email       : Joi.string().min(5).max(40).email().required(),
        password    : Joi.string().min(8).max(12).required(),
        role        : Joi.string().min(4).max(40), 
        isOnline    : Joi.boolean().required(),
    
    };

    const verif     = Joi.validate(user , schema);
    return verif;
}
//exportation
module.exports.User             = User ;
module.exports.validationUser   = validationUser;