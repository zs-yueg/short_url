import Url from '../models/Url.js'
import { nanoid } from 'nanoid'

class UrlController {
  static async createShortUrl(req, res) {
    const { originalUrl } = req.body
    const shortCode = nanoid(6)
    
    try {
      const url = await Url.create(originalUrl, shortCode)
      res.json({
        originalUrl,
        shortUrl: `http://localhost:3000/${shortCode}`,
        shortCode
      })
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  }

  static async redirectToOriginalUrl(req, res) {
    const { shortCode } = req.params
    const url = await Url.findByShortCode(shortCode)

    if (url) {
      await Url.incrementClicks(shortCode)
      return res.redirect(url.originalUrl)
    } else {
      return res.status(404).json({ error: 'URL not found' })
    }
  }

  static async getAllUrls(req, res) {
    const urls = await Url.getAll()
    res.json(urls)
  }

  static async getUrlDetail(req, res) {
    const { shortCode } = req.params
    const url = await Url.findByShortCode(shortCode)
    if (url) {
      res.json(url)
    } else {
      res.status(404).json({ error: 'URL not found' })
    }
  }

  static async deleteUrl(req, res) {
    const { shortCode } = req.params
    try {
      const success = await Url.delete(shortCode)
      if (success) {
        res.json({ message: 'URL deleted successfully' })
      } else {
        res.status(404).json({ error: 'URL not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  }
}

export default UrlController
