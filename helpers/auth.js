// Helper que impede usuario de acessar a dashboard sem estar logado.
module.exports.checkAuth = function (req, res) {
    const userId = req.session.userId
    if (!userId) {
        res.redirect('/login')
        return
    }
    next()
}