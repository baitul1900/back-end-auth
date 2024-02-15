const { decode } = require('jsonwebtoken');
const {decodeToken} = require('../helpers/jwtAuth');


module.exports = async (req, res, next)=> {
    let token = req.headers['token'];
    if(!token) {
        token = req.cookies['token']
    }

    let decoded = decodeToken(token);

    if (decoded === null) {
        return res.status(401).json({status:"fail",data:"Unauthorized"})
    }

    else {
        let email = decoded['email'];
        let user_id = decoded['user_id'];

        req.headers.email = email;
        req.headers.user_id = user_id;
        next()
    };
}