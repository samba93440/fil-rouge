//loader (charger les différentes librairie)
//le point d'entrée de notre application
//mes require
const helmet            = require("helmet");
const compress          = require("compress")
const mongoose          = require("mongoose");
const articleRouter     = require("./router/articles");
const userRouter        = require("./router/users");
const commentaireRouter = require("./router/commentaires");
const parametreRouter   = require("./router/parametres");
const express           = require("express");
const cors              = require("cors");
const app               = express();


//middleware

app.use(express.json());
app.use(helmet());
app.use(cors());

//chemin
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.use("/api/commentaires", commentaireRouter);
app.use("/api/parametres", parametreRouter);

// 1 se connecter à la base de données MongoDB
mongoose.connect("mongodb+srv://ifocop:zE70C3Dg04kLWISB@cluster0-gkmim.mongodb.net/filRouge?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(()=>
    {
        console.log("Connecté à la base MongoDB");
    })

    .catch((err)=>
    {
        //mieux le nex Error car ça va donner plus d'information sur l'erreur: login/mdp/port
        //base non démarrée
        console.log(new Error(err));
    });

//spécial pour l'hébergement
mongoose.set('useFindAndModify', true);

// ici on implante la constante port pour qu'elle soit lisible en local ou lors de l'hebergement 
const port  = process.env.PORT || 1989 ;

//http://localhost:1989
app.listen (port, () => 
{
    console.log(`serveur écoute sur le port ${port}`);
});