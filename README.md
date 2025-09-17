# Details du projet

## Config DB(database) on .Env file

 1. changer le nom de la db dans le fichier .env qui est par defaut en app
 2. si vous utilisez mysql, supprimer 'root' dans mot de passe puis laisser vide 
 3. executer la commande "node ace migration:run" pour pousser les migrations dans la base db