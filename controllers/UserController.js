const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {

    static login(req, res) {
        res.render('user/login')
    }

    static async loginPost(req, res) {
        const { login, password } = req.body

        //Encontrar Usuario
        const user = await User.findOne({ where: { login: login } })
        if (!user) {
            req.flash('message', 'Usuario não foi encontrado.')
            res.render('user/login')
            return
        }
        //Validação de senha do usuario
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) {
            req.flash('message', 'Senhas não coincidem. Tente Novamente')
            res.render('user/login')
            return
        }

        //Inicializar a Sessão
        req.session.userid = user.id
        req.flash('message', 'Login efetuado com sucesso.')
        req.session.save(() => {
            res.redirect('/trips/dashboard')
        })
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
        const user = {
            login,
            password: hashedPassword
        }

        await User.create(user)
            .then((user) => {
                // Inicializando A Sessão
                req.session.userid = user.id
                req.flash('message', 'Cadastro realizado com sucesso!')
                req.session.save(() => {
                    res.redirect('/trips/dashboard')
                })
            })
            .catch((err) => console.log(err))

    }

    static async logout(req, res) {
        await req.session.destroy()
        res.redirect('/')
    }
}