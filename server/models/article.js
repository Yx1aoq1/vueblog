const front = require('hexo-front-matter')
const path = require('path')
const fs = require('hexo-fs')
const md5 = require('../utils/md5')
const { SUFFIX } = require('../const')

module.exports = class Article {
  constructor (_path) {
    try {
      this.rawContent = fs.readFileSync(_path, ['utf8', 'r', true])
      this.filename = path.basename(_path, SUFFIX)
    } catch (e) {
      this.rawContent = this.constructor.getRawContent({
        'title': 'Untitled',
        'date': +new Date(),
        'tags': [],
        'categories': '',
        'content': ''
      })
    }
  }

  static getRawContent (article, opt = {}) {
    let result = front.stringify({
      title: article.title,
      date: article.date,
      tags: article.tags,
      categories: article.categories
    }, {
      mode: 'yaml',
      separator: '---',
      prefixSeparator: true,
      ...opt
    })
    result += `${article.content}`
    return result
  }

  static saveTo (dir) {
    let path = null
    if (this.filename) {
      path = dir + this.filename + SUFFIX
    } else {
      path = dir + this.title + SUFFIX
    }
    try {
      fs.writeFileSync(path, this.rawContent, ['utf8', '438', 'w'])
    } catch (e) {
      console.error('save file failed.', e)
    }
  }

  static parse (content) {
    this.rawContent = content
    return this.toJson()
  }

  static parseJson (article) {
    this.filename = article.filename
    this.title = article.title
    this.date = article.date
    this.tags = article.tags
    this.categories = article.categories
    this.rawContent = this.getRawContent(article)
    return this
  }

  toJson () {
    const article = front.parse(this.rawContent)
    return {
      'title': article.title,
      'date': +article.date,
      'tags': article.tags,
      'categories': article.categories,
      'content': article._content, // 去掉首行换行
      'key': this.hashCode(),
      'filename': this.filename
    }
  }

  hashCode () {
    return md5(this.rawContent)
  }
}