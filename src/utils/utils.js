export default {
    setLocalStorageWithExpiry(key, value) {
        const now = new Date()
        const item = {
            value: value,
            expiry: now.getTime() + (1000 * 60)
        }
        localStorage.setItem(key, JSON.stringify(item))
    },
    getLocalStorageWithExpiry(key) {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }
  }
