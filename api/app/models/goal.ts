import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import GoalTransaction from '#models/goal_transaction'

export default class Goal extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare color: string

  @column()
  declare target: number

  @column()
  declare deadline: DateTime

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => GoalTransaction)
  declare goalTransactions: HasMany<typeof GoalTransaction>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(goal: Goal) {
    goal.id = randomUUID()
  }
}
