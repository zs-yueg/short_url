import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('db.json')
const defaultData = { urls: [] }
const db = new Low(adapter, defaultData)

// 确保数据初始化
await db.read()
if (!db.data) {
  db.data = defaultData
  await db.write()
}

export default db
