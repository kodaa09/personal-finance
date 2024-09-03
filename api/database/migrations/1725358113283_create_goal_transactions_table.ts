import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'goal_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description').notNullable()
      table.enu('type', ['in', 'out']).notNullable()
      table.string('amount').notNullable()
      table.uuid('goal_id').unsigned().references('goals.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
