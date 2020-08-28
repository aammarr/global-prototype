'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserDetail extends Model {
    static get table () {
        return 'user_details'
    }

    static get primaryKey () {
        return 'id'
    }

    static get hidden () {
        return ['']
    }
    
    static get visible () {
        return ['id','user_id', 'first_name','first_name','phone','created_at']
    }
}

module.exports = UserDetail
