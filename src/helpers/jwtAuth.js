const jwt = require('jsonwebtoken');

exports.encodeToken = (email, user_id) => {
    let KEY = process.env.JWT_KEY;
    let EXPIRE = {expiresIn: '60' * '60' * '24' * '30'};
    let PAYLOAD = {email, user_id};

    return jwt.sign(PAYLOAD, KEY, EXPIRE);
};



exports.decodeToken = (token) => {
    try {
        let KEY = process.env.JWT_KEY;
        return jwt.verify(token, KEY);
    }
    catch (e) {
        return null;
    }
}

