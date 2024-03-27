const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        const decoded = jwt.verify(token, "masai")
        if (decoded) {
            // req.body.user=decoded.userID
            // req.body.author=decoded.author
            next()
        } else {
            res.send({ "msg": "you are not authorised!,or token expired" })
        }
    } else {
        res.send({ "msg": "you are not authorised!, Please Login" })
    }
}

module.exports = {
    auth
}