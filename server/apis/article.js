const Manager = require('../models/file-mamager')
const Article = require('../models/article')
const cache = require('../models/cache')
const responseClient = require('../utils/responseClient')
const { CACHE_NAME } = require('../const')
const manager = new Manager('.')

module.exports = function (app) {
  
  /**
   * 查询post列表
   */
  app.get('/list/:workspace', (req, res) => {
    const { workspace } = req.params
    const itemsPromise = manager.getItems(workspace)
    itemsPromise
      .then(files => {
        let items = []
        for (let i = 0; i < files.length; i++) {
          const article = new Article(manager.getPathByWorkspace(workspace) + files[i])
          items.push(article.toJson())
          cache.put(article.hashCode(), article.toJson())
        }
        responseClient(res, 200, 'Success.', items)
      })
      .catch(err => {
        responseClient(res, 500, err)
      })
  })

  /**
   * 查询post详情
   */
  app.get('/detail/:id', (req, res) => {
    const { id } = req.params
    cache.get(id, (article) => {
      if (!article) {
        article = {
          'title': 'Untitled',
          'date': +new Date(),
          'tags': [],
          'categories': '',
          'content': '',
          'key': ''
        }
      }
      responseClient(res, 200, 'Success.', article)
    })
  })

  /**
   * 移动post所在目录
   */
  app.post('/move', (req, res) => {
    const { id, origin, target } = req.body
    if (id) {
      cache.get(id, (article) => {
        manager.movePost(article, origin, target)
      })
    }
    responseClient(res, 200, `Already move to ${target}.`)
  })

  /**
   * 新增/修改post
   */
  app.post('/save', (req, res) => {
    const { id, origin, target } = req.body
    if (id) { // 文件已存在
      cache.get(CACHE_NAME + id, (article) => {
        manager.savePost(article, origin) // 覆盖原文件
        manager.movePost(article, origin, target)
      })
    } else {
      cache.get(CACHE_NAME, (article) => {
        manager.savePost(article, target)
      })
    }
    responseClient(res, 200, 'Success.')
  })

  /**
   * 删除post源文件
   */
  app.get('/deleteSource', (req, res) => {
    const { id } = req.query
    cache.get(id, (article) => {
      manager.deletePost(article)
    })
    responseClient(res, 200, 'Success.')
  })
}