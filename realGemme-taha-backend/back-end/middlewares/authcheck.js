const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
  console.log("middleware fired")
  const authHeader = req.headers.authorization;
  if (authHeader){
    console.log("header exists")
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
            if (err) {
              console.log('invalide token')
              req.authuser = undefined;
              req.authenticated = false;
              // return res.status(403).json({ message: 'Invalid token yo' });
              // next()
            }
            if (decoded){
            req.authuser = decoded.id;
            req.authenticated = true;
            console.log('token valide,user has acces')
            // next() 
            }
          });
    
    
  }
  else {
    console.log("header does not exists")
    req.authuser = undefined;
    req.authenticated = false;
  }
  next()
}
  
module.exports = authMiddleware;

// const authHeader = req.headers.authorization;
//   if (authHeader) {
//     // console.log(req)
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
//       if (err) {
//         console.log('invalide token')
//         req.authuser = undefined;
//         req.authenticated = false;
//         // return res.status(403).json({ message: 'Invalid token yo' });
//         // next()
//       }
//       req.authuser = decoded.id;
//       req.authenticated = true;
//       console.log('token valide,user has acces')
//       // next() 
      
//     });
//   }
//    else {
//     req.authuser = undefined;
//     req.authenticated = false;
//     // next() 
//     // res.status(403).json({ message: 'Authorization header missing' });
//     // console.log('here,the header does not even exist')
    
//   }
 
 
// next()
// }
