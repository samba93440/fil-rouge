//importation
const {User, validationUser}    = require("../model/users"); // déconstruction objet
const express                   = require ("express");
const router                    = express.Router();


// lire tout mes utilisateurs
router.get("/",async (req, resp) =>
{
    const users = await User.find();

    resp.send(users);
});

// lire un seul utilisateur
router.get("/:id",async (req,resp)=>
{
    const id    = req.params.id;
    
   const user   = await User.findById(id);

   //si pas de users
   if(!user) return resp.status(404).send(`aucun user pour l'id ${id}`);

   resp.send(user);
});

//ajouter un utilisateur
router.post("/", async (req, resp) => 
{
    let user    = req.body ;

    // est ce que ces informations sont valides(envoyé par Postman)
    const verif = validationUser(user);
    

    // si vérification OK alors ajouter un nouvel enregistrement dans le JSON users + envoyer des datas
    if(verif.error) return resp.status(400).send("requête non conforme");
    
    //save
    user    = new User(user);
    user    = await user.save();

    resp.send(user);
});

//supprimer un utilisateur
router.delete("/:id", async (req,resp)=>
{
    //recuperer l'id donnée
    const id    = req.params.id;

    //est ce que la personne existe
    const user = await User.findByIdAndDelete(id);

    if (!user) return resp.status(404).send(`Aucun user avec l'id ${id} `)
    resp.send(user)
});

//modifier un utilisateur
router.put("/:id",async (req,resp)=>
{
    //id
    const id = req.params.id;
    let user = req.body;

    user = await User.findById(id);

    //est ce que l'user avec cet id existe ? si non erreur 404
    
    if(!user)return resp.status(404).send(`aucun utilisateur trouvé pour l'id ${id}`);

    const verif = validationUser(req.body);
    if (verif.error) return resp.status(400).send(`erreur dans la requete ${id}`);

    //alors on fait la mise à jour
    user.nom        = req.body.nom;
    user.prenom     = req.body.prenom;
    user.email      = req.body.email;
    user.password   = req.body.password;
    user.role       = req.body.role;
    user.isOnline   = req.body.isOnline;

    user    = await user.save();

    resp.send(user);
});

//exportation
module.exports  = router;