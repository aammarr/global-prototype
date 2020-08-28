'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserDetailsSchema extends Schema {
  up () {
    this.create('user_details', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 60).nullable()
      table.string('gender', 60).nullable()
      table.string('phone', 60).nullable()
      table.string('address', 60).nullable()
      table.string('city', 60).nullable()
      table.string('country', 60).nullable()
      table.string('image', 60).nullable()
      table.double('lat', 60).nullable()
      table.double('long', 60).nullable()
      table.integer('email_updates', 60).nullable()
      table.integer('is_social_login', 60).nullable()
      table.integer('is_verified', 60).nullable()
      table.integer('is_approved', 60).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_details')
  }
}

module.exports = UserDetailsSchema
