import db from '../config/db.js'

class Url {
  static async create(originalUrl, shortCode) {
    await db.read()
    db.data.urls.push({
      originalUrl,
      shortCode,
      createdAt: new Date().toISOString(),
      clicks: 0
    })
    await db.write()
    return db.data.urls[db.data.urls.length - 1]
  }

  static async findByShortCode(shortCode) {
    await db.read()
    return db.data.urls.find(url => url.shortCode === shortCode)
  }

  static async incrementClicks(shortCode) {
    await db.read()
    const url = db.data.urls.find(url => url.shortCode === shortCode)
    if (url) {
      url.clicks++
      await db.write()
    }
    return url
  }

  static async getAll() {
    await db.read()
    return db.data.urls
  }

  static async delete(shortCode) {
    await db.read()
    const index = db.data.urls.findIndex(url => url.shortCode === shortCode)
    if (index !== -1) {
      db.data.urls.splice(index, 1)
      await db.write()
      return true
    }
    return false
  }
}

export default Url
