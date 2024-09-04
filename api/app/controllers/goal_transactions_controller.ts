import type { HttpContext } from '@adonisjs/core/http'
import GoalTransaction from '#models/goal_transaction'

export default class GoalTransactionsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const goalTransactions = await GoalTransaction.query().preload('goal')

    return response.status(200).json(goalTransactions)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { description, type, amount, goalId } = request.only([
      'description',
      'type',
      'amount',
      'goalId',
    ])
    const goalTransaction = await GoalTransaction.create({ description, type, amount, goalId })

    return response.status(200).json(goalTransaction)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const id = params.id

    const goalTransaction = await GoalTransaction.query()
      .where('id', id)
      .preload('goal')
      .firstOrFail()

    return response.status(200).json(goalTransaction)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const id = params.id
    const { description, type, amount } = request.only(['description', 'type', 'amount'])
    const goalTransaction = await GoalTransaction.findOrFail(id)

    await goalTransaction.merge({ description, type, amount }).save()
    return response.status(200).json({ message: 'Goal updated successfully' })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const id = params.id
    const goal = await GoalTransaction.findOrFail(id)

    await goal.delete()
    return response.status(200).json({ message: 'Goal deleted successfully' })
  }
}
