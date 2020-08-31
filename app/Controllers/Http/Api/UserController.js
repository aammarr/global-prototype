"use strict";

const BaseController = use("App/Controllers/BaseController");
const User = use("App/Models/Sql/User");
const UserDetails = use("App/Models/Sql/UserDetails");
const Database = use("Database");
const Hash = use("Hash");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController extends BaseController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    var data = request.all();
    console.log(data);
    return this.sendMyResponse(data);
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let user = await User.query()
      .with("details")
      .where("id", params.id)
      .first();

    return this.sendMyResponse(user);
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  // Signin
  async signin({ request, auth, response }) {
    let userData = request.only(["username", "email", "password"]);
    const safePassword = await Hash.make(request.input("password"));
    userData.password = safePassword;
    let userDetailsData = request.only(["name", "phone", "gender"]);
    let user = {};
    let userDetails = {};

    user = await User.create(userData);
    userDetailsData.user_id = user.id;
    userDetails = await UserDetails.create(userDetailsData);

    return this.sendMyResponse(user, "User Created Successfuly");
  }

  async getAuthUser({ request, auth, response }) {
    try {
      const user = await auth.getUser();
      return this.sendMyResponse(user);
    } catch (error) {
      response.send("Missing or invalid jwt token");
    }
  }

  // Login
  async login({ request, auth, response }) {
    let input = request.only(["email", "password"]);
    const user = await auth.attempt(input.email, input.password);
    // const user = await auth.getUser();

    return this.sendMyResponse(user);
  }

  async logout({ request, response, auth }) {
    const refreshToken = request.header("Authorization");
    const token = refreshToken.slice(7);

    if (!token) {
      // You can throw any exception you want here
      throw BadRequestException.invoke(`Refresh Token missing`);
    }

    const result = await auth.authenticator("jwt").revokeTokens([token], true);

    return this.sendMyResponse(result);
  }

  // Refresh Token
  async refreshToken({ request, auth, params }) {
    let data = await auth.withRefreshToken().attempt(uid, password);

    return this.sendMyResponse(data);
  }

  async me() {
    return this.sendMyResponse("data");
  }

  // Get All Users
  async getAllUsers({ params, request, response }) {
    let data = {};
    data = (await User.query().with("details").fetch()).toJSON();

    // return ctx.view.render('admin.tags', data)
    return this.sendMyResponse(data);
  }
}

module.exports = UserController;
