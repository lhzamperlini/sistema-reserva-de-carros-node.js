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

        const { login, password, confirmpassword } = req.body

        //Validando Senha
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não batem.')
            res.render('user/register')
            return
        }

        //Verificando Existencia de Usuario no DB
        const checkifUserExists = await User.findOne({ where: { login: login } })
        if (checkifUserExists) {
            req.flash('message', 'O usuario já existe')
            res.render('user/register')
            return
        }

        //Criptografando a Senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        //Registrando usuario com senha criptografada  no banco
        const usertoRegister = {
            login,
            password: hashedPassword
        }

        try {
            await User.create(usertoRegister)
            req.flash('message', 'Cadastro Realizado com Sucesso')
            res.render('user/register')
        }
        catch (err) {
            console.log(err)
        }


    }
}