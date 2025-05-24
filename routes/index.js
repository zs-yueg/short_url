import express from 'express'
import UrlController from '../controllers/urlController.js'
import bodyParser from 'body-parser'

const router = express.Router()

router.use(bodyParser.json())

// 添加路由调试中间件
router.use((req, res, next) => {
    console.log(`收到请求: ${req.method} ${req.path}`)
    next()
})

router.post('/api/shorten', UrlController.createShortUrl)
router.get('/api/urls', UrlController.getAllUrls)
router.get('/api/urls/:shortCode', UrlController.getUrlDetail)
router.delete('/api/urls/:shortCode', (req, res, next) => {
    console.log('尝试删除短链接:', req.params.shortCode)
    next()
}, UrlController.deleteUrl)
router.get('/:shortCode', UrlController.redirectToOriginalUrl)

export default router
