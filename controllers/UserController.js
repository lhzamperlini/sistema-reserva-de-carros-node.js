const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {

    static login(req, res) {
        res.render('user/login')
    }

    static register(req, res) {
        res.render('user/register')
    }

    static async registerPost(req, res) {

        const { user, password, confirmpassword } = req.body

        //Validando Senha
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não batem.')
            res.render('user/register')
            return
        }
    }
}