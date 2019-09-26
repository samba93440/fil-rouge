//loader
const mongoose      = require("mongoose");
const Joi           = require("@hapi/joi");

//schema
const _parametreSchema      = new mongoose.Schema(
{
    information     : String,
}
);

//modèle
const Parametre     = mongoose.model("parametres", _parametreSchema);

function validationParametre(parametre)
{
    
    const schema    = 
    {   
        information     : Joi.string().required(),
    };
    const verif     = Joi.validate(parametre , schema);
    return verif ;
}
//exportation
module.exports.Parametre            = Parametre ;
module.exports.validationParametre  = validationParametre;