'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserDetails extends Model {

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
        return ['id','user_id', 'name','gender','phone','address','city','country',
                'image','is_verified','is_approved','lat','long','created_at']
    }
}

module.exports = UserDetails
