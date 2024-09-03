import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare type: string

  @column()
  declare amount: number

  @column()
  declare description: string

  @column()
  declare date: DateTime

  @column()
  declare recurrent: boolean

  @column()
  declare userId: string

  @column()
  declare categoryId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(transaction: Transaction) {
    transaction.id = randomUUID()
  }
}
