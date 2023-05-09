const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
  // console.log('middleware fired')
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // console.log(req)
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        // console.log('invalide token')
        return res.status(403).json({ message: 'Invalid token yo' });
      }
      req.authuser = decoded.id;
      req.authenticated = true;
      console.log('token valide,user has acces')
      
      
    });
  }
   else {
    // res.status(403).json({ message: 'Authorization header missing' });
    // console.log('here,the header does not even exist')
    
  }
 
next() 

}

module.exports = authMiddleware;