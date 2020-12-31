const Manager = require('./models/file-mamager')
const Article = require('./models/article')

class MDatabasePlugin {
  constructor (options) {
    this.manager = new Manager(options.path)
  }

  async getList (workspace) {
    const files = await this.manager.getItems(workspace)
    let items = []
    for (let i = 0; i < files.length; i++) {
      const article = new Article(this.manager.getPathByWorkspace(workspace) + files[i])
      items.push(article.toJson())
    }
    return items
  }

  apply (compiler) {
    compiler.plugin('emit', async (compilation, callback) => {
      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中
      const posts = await this.getList('posts')
      const source = `window.database = ${JSON.stringify(posts)}`
      compilation.assets['database.js'] = {
        source: function() {
          return source
        },
        size: function() {
          return source.length
        }
      }
      callback()
    })
  }
}

module.exports = MDatabasePlugin