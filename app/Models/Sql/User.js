'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {

    static get table () {
        return 'users'
    }

    static get primaryKey () {
        return 'id'
    }

    static get hidden () {
        return ['password']
    }
    
    static get visible () {
        return ['id','name','username','email','created_at']
    }

    getCreatedAtAgo({created_at}) {
        let formatted_date = moment(created_at, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss', 'YYYY-MM-DD']).format('YYYY-MM-DD')
        return moment(formatted_date, 'YYYY-MM-DD').fromNow()
    }

	details () {
        return this.hasOne('App/Models/Sql/UserDetails','id','user_id')
    }

}
module.exports = User
