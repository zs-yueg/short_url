import express from 'express'
import UrlController from '../controllers/urlController.js'
import bodyParser from 'body-parser'

const router = express.Router()

router.use(bodyParser.json())

router.post('/api/shorten', UrlController.createShortUrl)
router.get('/:shortCode', UrlController.redirectToOriginalUrl)
router.get('/api/urls', UrlController.getAllUrls)

export default router
