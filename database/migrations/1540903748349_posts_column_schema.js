'use strict'

const Schema = use('Schema')

class PostsColumnSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.text('content', 'longtext')
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dorpColumn('content')
    })
  }
}

module.exports = PostsColumnSchema
