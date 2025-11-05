/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UrlsController from '#controllers/urls_controller'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'

// Créer une instance du contrôleur
const urlsController = new UrlsController()

// -------------------
// URLs
// -------------------
router.get('/', (ctx) => urlsController.index(ctx))
router.post('/shorten', (ctx) => urlsController.shorten(ctx))

// 🟢 Mettre /stats AVANT /:code
router.get('/stats', (ctx) => urlsController.stats(ctx))

// Cette route doit venir à la fin car elle capture tous les codes courts
router.get('/:code', (ctx) => urlsController.redirect(ctx))

// -------------------
// Auth
// -------------------
router.get('/login', (ctx) => new AuthController().showLogin(ctx))
router.post('/login', (ctx) => new AuthController().login(ctx))

router.get('/register', (ctx) => new AuthController().showRegister(ctx)).as('register.show')
router.post('/register', (ctx) => new AuthController().register(ctx)).as('register')

router.post('/logout', (ctx) => new AuthController().logout(ctx)).middleware([middleware.auth()])
