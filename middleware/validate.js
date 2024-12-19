
const yup = require("yup");
//Importation du module yup, 
//qui est une bibliothèque de validatione schémas 
//pour les données JavaScript.


const validate = async (req, res, next) => {
  /*
        *** const validate = async (req, res, next) => {   ***
Définit une fonction asynchrone nommée validate qui prend trois paramètres :
 req, res, et next, qui sont respectivement la requête, la réponse et
 la fonction next utilisée pour passer au middleware suivant dans la pile de middleware Express.

*/
  try {
    const schema = yup.object().shape({
     /*
          ***const schema = yup.object().shape({ µµµ
Définit un schéma de validation en utilisant yup.object().shape(). 
Cela indique que nous attendons un objet avec certaines clés et des valeurs spécifiques.
      */
      msg: yup.string().required(),
     
      /* Définit une règle de validation pour la clé name dans l'objet. 
      Il utilise yup.string().required() pour indiquer 
      que la valeur de name doit être une chaîne non vide. */
     
     
     // email: yup.string().email().required(),
      /*Définit une règle de validation pour la clé email dans l'objet. 
      Il utilise yup.string().email().required()
       pour indiquer que la valeur de email doit être une chaîne non vide représentant une adresse e-mail.
      */
      //code: yup.number().required(),
      //pareil

    });
  
    await schema.validate(req.body, { abortEarly: false });
    /*
Valide les données de la requête (req.body) par rapport au schéma défini. 
L'option { abortEarly: false } 
permet de collecter toutes les erreurs de validation, au lieu de s'arrêter à la première erreur rencontrée.
    */
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });

  }
};


module.exports = validate;
/*
Exporte la fonction validate afin 
qu'elle puisse être utilisée ailleurs dans votre application.
*/