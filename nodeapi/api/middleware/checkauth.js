const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //Get token from headers authorization value
  try{
    console.log(req.headers);
    console.log(req.headers.Authorization)
    const token = req.headers.Authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  }
  catch(error) {
    return res.status(401).json({message: 'Auth failed'})
  }

};
