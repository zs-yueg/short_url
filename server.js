import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// 中间件
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// 路由
app.use('/', routes)

// 启动服务器
const PORT = 3000
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`)
})
