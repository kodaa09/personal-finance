import type { HttpContext } from '@adonisjs/core/http'
import Goal from '#models/goal'

export default class GoalsController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const goals = await Goal.query().where('userId', user.id).preload('goalTransactions')

    if (goals) return response.status(200).json(goals)
    else return response.status(404).json({ error: 'Goals not found or unauthorized' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { name, description, color, target, deadline } = request.only([
      'name',
      'description',
      'color',
      'target',
      'deadline',
    ])
    const user = await auth.authenticate()
    const goal = await Goal.create({
      name,
      description,
      color,
      target,
      deadline,
      userId: user.id,
    })

    return response.status(200).json(goal)
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()

    const goal = await Goal.query()
      .where('id', id)
      .andWhere('userId', user.id)
      .preload('goalTransactions')
      .firstOrFail()

    if (goal) return response.status(200).json(goal)
    else return response.status(404).json({ error: 'Goal not found or unauthorized' })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()
    const { name, description, color, target, deadline } = request.only([
      'name',
      'description',
      'color',
      'target',
      'deadline',
    ])
    const goal = await Goal.findOrFail(id)

    if (goal.userId === user.id) {
      await goal
        .merge({
          name,
          description,
          color,
          target,
          deadline,
        })
        .save()
      return response.status(200).json({ message: 'Goal updated successfully' })
    } else {
      return response.status(404).json({ error: 'Goal not found or unauthorized' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()
    const goal = await Goal.findOrFail(id)

    if (goal.userId === user.id) {
      await goal.delete()
      return response.status(200).json({ message: 'Goal deleted successfully' })
    } else {
      return response.status(404).json({ error: 'Goal not found or unauthorized' })
    }
  }
}
