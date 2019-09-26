//importation
const {Parametre, validationParametre}  = require("../model/parametres"); // déconstruction objet
const express                           = require ("express");
const router                            = express.Router();


//lire tout mes paramètres
router.get("/",async (req, resp) =>
{
    const parametres    = await Parametre.find();

    resp.send(parametres);
});

//lire un seul paramètre
router.get("/:id",async (req,resp)=>
{
    const id            = req.params.id;
    
    const parametre     = await Parametre.findById(id);

   //si pas de paramètres
   if(!parametre) return resp.status(404).send(`aucun parametre pour l'id ${id}`);

   resp.send(parametre);
});

//ajouter paramètre
router.post("/", async (req, resp) => 
{
    let parametre      = req.body ;

    // est ce que ces informations sont valides(envoyé par Postman)
    const verif        = validationParametre(parametre);
    

    // si vérification OK alors ajouter un nouvel enregistrement dans le JSON parametres + envoyer des datas
    if(verif.error) return resp.status(400).send("requête non conforme");
    
    //save
    parametre   = new Parametre(parametre);
    parametre   = await parametre.save();

    resp.send(parametre);
});

//supprimer paramètre
router.delete("/:id", async (req,resp)=>
{
    //recuperer l'id donnée
    const id        = req.params.id;

    //est ce que la personne existe
    const parametre = await Parametre.findByIdAndDelete(id);

    if (!parametre) return resp.status(404).send(`Aucun parametre avec l'id ${id} `)
    resp.send(parametre)
});

//modifier paramètre
router.put("/:id",async (req,resp)=>
{
    //id
    const id        = req.params.id;
    let parametre   = req.body;

    parametre       = await Parametre.findById(id);

    //est ce que le paramètre avec cet id existe ? si non erreur 404
    
    if(!parametre)return resp.status(404).send(`aucun paramètre trouvé pour l'id ${id}`);

    const verif     = validationParametre(req.body);
    if (verif.error) return resp.status(400).send(`erreur dans la requete ${id}`);

    //alors on fait la mise à jour
    parametre.information   = req.body.information;
    
    parametre               = await parametre.save();

    resp.send(parametre);
});

//exportation
module.exports      = router;