module.exports = class UserController {

    static login(req, res) {
        res.render('user/login')
    }

    static register(req, res) {
        res.render('user/register')
    }
}