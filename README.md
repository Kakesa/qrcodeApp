# Details du projet

# Installation

    1. Clone the repository "git push -u kakesa main" 

    git clone https://github.com/kadea-academy-learners/2025-janv-dev-matin-exercice-mini-raccourcisseur-d-url-Kakesa.git

    2. Install the dependencies

    npm install

    3. Create a new .env file

    cp .env.example .env

    4. Start the server

    npm run dev


## Config DB(database) on .Env file

 1. changer le nom de la db dans le fichier .env qui est par defaut en app
 2. si vous utilisez mysql, supprimer 'root' dans mot de passe puis laisser vide 
 3. executer la commande "node ace migration:run" pour pousser les migrations dans la base db