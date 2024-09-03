import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'

export default class TransactionsController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const transactions = await Transaction.query().where('userId', user.id).preload('category')

    if (transactions) return response.status(200).json(transactions)
    else return response.status(404).json({ error: 'Transactions not found or unauthorized' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { type, amount, description, date, recurrent } = request.only([
      'type',
      'amount',
      'description',
      'date',
      'recurrent',
    ])
    const user = await auth.authenticate()
    const transaction = await Transaction.create({
      type,
      amount,
      description,
      date,
      recurrent,
      userId: user.id,
    })

    return response.status(200).json(transaction)
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()

    const transaction = await Transaction.query()
      .where('id', id)
      .andWhere('userId', user.id)
      .preload('category')
      .firstOrFail()

    if (transaction) return response.status(200).json(transaction)
    else return response.status(404).json({ error: 'Transaction not found or unauthorized' })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()
    const { type, amount, description, date, recurrent } = request.only([
      'type',
      'amount',
      'description',
      'date',
      'recurrent',
    ])
    const transaction = await Transaction.findOrFail(id)

    if (transaction.userId === user.id) {
      await transaction
        .merge({
          type,
          amount,
          description,
          date,
          recurrent,
        })
        .save()
      return response.status(200).json({ message: 'Transaction updated successfully' })
    } else {
      return response.status(404).json({ error: 'Transaction not found or unauthorized' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    const id = params.id
    const user = await auth.authenticate()
    const transaction = await Transaction.findOrFail(id)

    if (transaction.userId === user.id) {
      await transaction.delete()
      return response.status(200).json({ message: 'Transaction deleted successfully' })
    } else {
      return response.status(404).json({ error: 'Transaction not found or unauthorized' })
    }
  }
}
