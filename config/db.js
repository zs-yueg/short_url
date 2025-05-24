import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('db.json')
const db = new Low(adapter, { urls: [] })

// 初始化数据库
await db.read()
if (!db.data) {
  db.data = { urls: [] }
  await db.write()
}

export default db
