'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Testing Routes
 */
Route.on('/').render('welcome')


/**
 * Api Routes
 */
Route.group(() => {  

    Route.get('/test-api-route','Api/TestApiController.index')
    Route.get('/signin','Api/UserController.signin')
    Route.get('/login','Api/UserController.login')
    Route.get('/logout','Api/UserController.logout')

}).prefix('api/v1')



 /**
 * Web Routes
 */
