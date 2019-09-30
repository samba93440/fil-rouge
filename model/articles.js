//importation
const mongoose  = require("mongoose");
const Joi       = require("@hapi/joi");


//schema de mes articles qui construit mes propriétés
const _articleSchema = new mongoose.Schema(
{
    titre           : String,
    contenu         : String,
    dateCreation    : Date,
    nomAuteur       : String,
    categories      : Array,
    emailAuteur     : String,
    isPublic        : Boolean
});


//modèle de mes articles via la collection créee
const Article       = mongoose.model("articles", _articleSchema);


//fonction de validation de mes articles qui permet de créer mes "règles"
function validationArticle(article)
{
    
    const schema    = 
    {
        titre           : Joi.string().min(5).max(20).required(),
        contenu         : Joi.string().min(5).max(500).required(),
        dateCreation    : Joi.date().required(),
        nomAuteur       : Joi.string().min(2).max(20).required(),
        categories      : Joi.array().items(Joi.string().min(2).max(20)).required(),
        emailAuteur     : Joi.string().min(5).max(40).email().required(), 
        isPublic        : Joi.boolean().required(),   
    };
    //constante qui verifie bien que les propriétés soient respectées 
    const verif         = Joi.validate(article , schema);
    return verif ;
};

// exportation 
module.exports.Article              = Article ;
module.exports.validationArticle    = validationArticle;