import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.enu('type', ['in', 'out']).notNullable()
      table.integer('amount').notNullable()
      table.string('description')
      table.timestamp('date').notNullable()
      table.boolean('recurrent')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
