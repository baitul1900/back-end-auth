const jwt = require('jsonwebtoken');

// Manually created secret key
const SECRET_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5zA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z';

exports.encodeToken = (email, user_id) => {
    let EXPIRE = { expiresIn: '1d' }; // Token expiration set to 30 days
    let PAYLOAD = { email, user_id };

    return jwt.sign(PAYLOAD, SECRET_KEY, EXPIRE);
};

exports.decodeToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (e) {
        return null;
    }
};
