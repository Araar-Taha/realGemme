const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
  console.log('middleware fired')
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        // console.log('invalide token')
        return res.status(403).json({ message: 'Invalid token' });
      }
      res.locals.user = decoded.id;
      res.locals.authentificated = true;
      console.log('middleware 888')
      
    });
  }
   else {
    // res.status(403).json({ message: 'Authorization header missing' });
    console.log('here,the header does not even exist')
    
  }
 
next() 

}

module.exports = authMiddleware;
