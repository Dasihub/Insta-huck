const {IgApiClient} = require('instagram-private-api')
const userModel = require('../model/userModel')

const ig = new IgApiClient()
// ____agent_47
class Controller {
    async checkAccount(req, res) {
        try {
            const {login, password} = req.body

            ig.state.generateDevice(login);
            const {username} = await ig.account.login(login, password);
            console.log(username)
            if (username.length) {
                const user = new userModel({login: login.toString(), password: password.toString(), username: username.toString()})
                user.save()

                return res.status(201).json({
                    auth: true
                })
            }
            return res.status(404).json({
                auth: false
            })
        } catch (e) {
            return res.status(404).json({
                auth: false
            })
        }
    }
}

module.exports = new Controller()