import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Goal from '#models/goal'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class GoalTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare description: string

  @column()
  declare type: string

  @column()
  declare amount: number

  @column()
  declare goalId: string

  @belongsTo(() => Goal)
  declare goal: BelongsTo<typeof Goal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(goalTransaction: GoalTransaction) {
    goalTransaction.id = randomUUID()
  }
}
