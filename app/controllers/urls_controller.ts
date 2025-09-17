import { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'
import Url from '#models/url'

export default class UrlsController {
  async index({ view }: HttpContext) {
    return view.render('index')
  }

  async shorten({ request, view }: HttpContext) {
    const originalUrl = request.input('url')
    const shortCode = this.generateShortCode() // Appelle la méthode pour générer le code court

    // Crée une nouvelle entrée dans la base de données
    const url = await Url.create({ original_url: originalUrl, short_code: shortCode })

    // Génère le QR code
    const qr = await QRCode.toDataURL(`${request.hostname()}/${shortCode}`)

    return view.render('index', { shortUrl: `${request.hostname()}/${shortCode}`, qr })
  }

  async redirect({ params, response }: HttpContext) {
    const url = await Url.findBy('short_code', params.code)
    if (!url) return response.redirect('/')

    return response.redirect(url.original_url)
  }

  private generateShortCode(length = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let shortCode = ''
    for (let i = 0; i < length; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return shortCode
  }
}