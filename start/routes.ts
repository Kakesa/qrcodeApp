/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UrlsController from '#controllers/urls_controller' // Vérifiez la casse du nom du fichier
// import AuthController from '#controllers/auth_controller'

// Créer une instance du contrôleur
const urlsController = new UrlsController()

// router.on('/').render('pages/home')
router.get('/', (ctx) => urlsController.index(ctx))
router.post('/shorten', (ctx) => urlsController.shorten(ctx))
router.get('/:code', (ctx) => urlsController.redirect(ctx))
