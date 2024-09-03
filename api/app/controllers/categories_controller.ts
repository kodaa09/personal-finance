import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const categories = await Category.query().where('userId', user.id).preload('transactions')

    if (categories) return response.status(200).json(categories)
    else return response.status(404).json({ error: 'Categories not found or unauthorized' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { name, color } = request.only(['name', 'color'])
    const user = await auth.authenticate()
    const category = await Category.create({ name, color, userId: user.id })

    return response.status(200).json(category)
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()

    const category = await Category.query()
      .where('id', id)
      .andWhere('userId', user.id)
      .preload('transactions')
      .firstOrFail()

    if (category) return response.status(200).json(category)
    else return response.status(404).json({ error: 'Category not found or unauthorized' })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()
    const { name, color } = request.only(['name', 'color'])
    const category = await Category.findOrFail(id)

    if (category.userId === user.id) {
      await category.merge({ name, color }).save()
      return response.status(200).json({ message: 'Category updated successfully' })
    } else {
      return response.status(404).json({ error: 'Category not found or unauthorized' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()
    const category = await Category.findOrFail(id)

    if (category.userId === user.id) {
      await category.delete()
      return response.status(200).json({ message: 'Category deleted successfully' })
    } else {
      return response.status(404).json({ error: 'Category not found or unauthorized' })
    }
  }
}
