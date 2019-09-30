//importation
const {Article, validationArticle}      = require("../model/articles"); // déconstruction objet
const express                           = require ("express");
const router                            = express.Router();


//lire tout mes articles
router.get("/",async (req, resp) =>
{
    const articles      = await Article.find();

    resp.send(articles);
});

//lire un seul article
router.get("/:id",async (req,resp)=>
{
    const id            = req.params.id;
   
    const article       = await Article.findById(id);

   //si pas de articles
   if(!article) return resp.status(404).send(`aucun article pour l'id ${id}`);

   resp.send(article);
});

//ajouter article
router.post("/", async (req, resp) => 
{
    //req.body pas d'id !!!!!! auto-id mongoDB
    
    let article     = req.body ;

    // est ce que ces informations sont valides(envoyé par Postman)
    const verif     = validationArticle(article);
    

    // si vérification OK alors ajouter un nouvel enregistrement dans le JSON articles + envoyer des datas
    if(verif.error) return resp.status(400).send("requête non conforme");
    
    //save
    article     = new Article(article);
    article     = await article.save();

    resp.send(article);
});

//supprimer article
router.delete("/:id", async (req,resp)=>
{
    //recuperer l'id donnée
    const id    = req.params.id;

    //est ce que la personne existe
    const article   = await Article.findByIdAndDelete(id);

    if (!article) return resp.status(404).send(`Aucun article avec l'id ${id} `)

    resp.send(article)
});

//modifier article
router.put("/:id",async (req,resp)=>
{
    //id
    const id    = req.params.id;
    let article = req.body;

    article     = await Article.findById(id);

    //est ce que l'article avec cet id existe ? si non erreur 404
    
    if(!article)return resp.status(404).send(`aucun article trouvé pour l'id ${id}`);

    const verif = validationArticle(req.body);

    if (verif.error) return resp.status(400).send(`erreur dans la requete ${id}`);


    //alors on fait la mise à jour
    article.titre           = req.body.titre;
    article.contenu         = req.body.contenu;
    article.dateCreation    = req.body.dateCreation;
    article.nomAuteur       = req.body.nomAuteur;
    article.categories      = req.body.categories;
    article.emailAuteur     = req.body.emailAuteur;
    article.isPublic        = req.body.isPublic;

    article     = await article.save();

    resp.send(article);
});

//exportation
module.exports  = router;