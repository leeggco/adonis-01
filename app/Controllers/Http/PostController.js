'use strict'

// 使用数据库
const Database = use('Database')
// 使用模型
const Post = use('App/Models/Post')
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   */
  async index ({ request, response, view }) {
    const posts = await Post.all()
    // return posts
    return view.render('post.index', { posts: posts.toJSON() })
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   */
  async create ({ request, response, view }) {
    return view.render('post.create')
  }

  /**
   * Create/save a new post.
   * POST posts
   */
  async store ({ request, response }) {
    const newPost = request.only(['title', 'content'])
    // 普通方法
    // const postID = await Database.insert(newPost).into('posts')
    // 模型方法
    const post = await Post.create(newPost)
    // 重定向
    return response.redirect(`posts/${ post.id }`)
  }

  /**
   * Display a single post.
   * GET posts/:id
   */
  async show ({ params, request, response, view }) {
    // 普通方法
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()
    // 模型方法
    const post = await Post.findOrFail(params.id)
    return view.render('post.show', {
      post
    })
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   */
  async edit ({ params, request, response, view }) {
    // 普通方法
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()
    // 模型方法
    const post = await Post.findOrFail(params.id)
    return view.render('post.edit', { post: post.toJSON() })
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   */
  async update ({ params, request, response }) {
    const updatePost = request.only(['title', 'content'])
    // 普通方法
    // const postID = await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .update(updatePost)
    // 模型方法
    const post = await Post.findOrFail(params.id)
    post.merge(updatePost)
    post.save()
    
    // return response.redirect(`posts/${ postID }`)
    // return view.render('post.show', { newPost })
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   */
  async destroy ({ params, request, response }) {
    // 普通方法
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .delete()
    // 模型方法
    const post = await Post.find(params.id)
    post.delete()

    return 'success'
  }
}

module.exports = PostController
