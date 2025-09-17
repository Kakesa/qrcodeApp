import { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'
import Url from '#models/url'

export default class UrlsController {
  /**
   * Page d'accueil avec le formulaire
   */
  async index({ view }: HttpContext) {
    return view.render('index')
  }

  /**
   * Raccourcir une URL et générer un QR code
   */
  async shorten({ request, view }: HttpContext) {
    const originalUrl = request.input('url')
    const shortCode = this.generateShortCode() // Génère un code court unique

    // Sauvegarde en base de données
    await Url.create({ original_url: originalUrl, short_code: shortCode })

    // Construit l'URL complète (avec http:// + host + port)
    const shortUrl = `http://${request.host()}/${shortCode}`

    // Debug pour vérifier dans le terminal
    console.log('Short URL générée :', shortUrl)

    // Génère un QR Code encodé en DataURL (base64)
    const qr = await QRCode.toDataURL(shortUrl)

    // Renvoie vers la vue avec shortUrl + QR
    return view.render('index', { shortUrl, qr })
  }

  /**
   * Rediriger depuis un short code vers l'URL originale
   */
  async redirect({ params, response }: HttpContext) {
    const url = await Url.findBy('short_code', params.code)
    if (!url) return response.redirect('/')

    return response.redirect(url.original_url)
  }

  /**
   * Générateur de code court aléatoire
   */
  private generateShortCode(length = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let shortCode = ''
    for (let i = 0; i < length; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return shortCode
  }
}
