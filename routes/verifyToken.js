const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
    const token = req.header('auth_token');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET_USER);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
function verifyDoctor(req, res, next) {
    const token = req.header('auth_token');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET_DOCTOR);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

module.exports.verifyDoctor = verifyDoctor;
module.exports.verifyUser = verifyUser;
