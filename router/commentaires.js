//importation
const {Commentaire, validationCommentaire}  = require("../model/commentaires"); // déconstruction objet
const express                               = require ("express");
const router                                = express.Router();


//lire tout mes commentaires
router.get("/",async (req, resp) =>
{
    const commentaires  = await Commentaire.find();

    resp.send(commentaires);
});

//lire un seul commentaire 
router.get("/:id",async (req,resp)=>
{
    const id            = req.params.id;
    
    const commentaire   = await Commentaire.findById(id);

   //si pas de commentaires
   if(!commentaire) return resp.status(404).send(`aucun commentaire pour l'id ${id}`);

   resp.send(commentaire);
});

//ajouter commentaire
router.post("/", async (req, resp) => 
{
    let commentaire     = req.body ;

    // est ce que ces informations sont valides(envoyé par Postman)
    const verif         = validationCommentaire(commentaire);
    

    // si vérification OK alors ajouter un nouvel enregistrement dans le JSON commentaires + envoyer des datas
    if(verif.error) return resp.status(400).send("requête non conforme");
    
    //save
    commentaire     = new Commentaire(commentaire);
    commentaire     = await commentaire.save();

    resp.send(commentaire);
});

//supprimer commentaire
router.delete("/:id", async (req,resp)=>
{
    //recuperer l'id
    const id            = req.params.id;

    //est ce que la personne existe
    const commentaire   = await Commentaire.findByIdAndDelete(id);

    if (!commentaire) return resp.status(404).send(`Aucun commentaire avec l'id ${id} `)
    resp.send(commentaire)
});

//modifier commentaires
router.put("/:id",async (req,resp)=>
{
    //récuperer id
    const id        = req.params.id;
    let commentaire = req.body;

    commentaire     = await Commentaire.findById(id);

    //est ce que le commentaire avec cet id existe ? si non erreur 404
    
    if(!commentaire)return resp.status(404).send(`aucun commentaire trouvé pour l'id ${id}`);

    const verif = validationCommentaire(req.body);
    if (verif.error) return resp.status(400).send(`erreur dans la requete ${id}`);

    //alors on fait la mise à jour
    commentaire.contenu     = req.body.contenu;
    commentaire.date        = req.body.date;
    commentaire.nomAuteur   = req.body.nomAuteur;
    
    commentaire             = await commentaire.save();

    resp.send(commentaire);
});

//exportation
module.exports = router;