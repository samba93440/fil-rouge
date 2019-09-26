//importation
const mongoose      = require("mongoose");
const Joi           = require("@hapi/joi");

//schema de mes commentaires qui construit mes propriétés
const _commentaireSchema = new mongoose.Schema(
{
    contenu         : String,
    dateCreation    : Date,
    nomAuteur       : String
});

//modèle de mes commentaires via la collection créee
const Commentaire   = mongoose.model("commentaires", _commentaireSchema);


//fonction de validation de mes commentaires pour creer mes  "règles"
function validationCommentaire(commentaire)
{
    
    const schema    = 
    {   
        contenu         : Joi.string().min(5).max(500).required(),
        nomAuteur       : Joi.string().min(2).max(27).required(),
        dateCreation    : Joi.date().required()
    };
    const verif         = Joi.validate(commentaire , schema);
    return verif ;
}

module.exports.Commentaire              = Commentaire ;
module.exports.validationCommentaire    = validationCommentaire;