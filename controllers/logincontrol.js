import db from '../config/connectdb.js'
import jwt from 'jsonwebtoken'

let loginuser = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
      var qu = `select * from signup where email= "${email}" and password= ${password}`;
      db.query(qu, function (err, result) {
        if (err) {
          console.log(err)
          res.redirect("/login")
        }

        else {

          const token1 = jwt.sign({ id: result[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
           if (!token1) {
            res.status(401).send({
              msg: 'token not generated'
              });
              }
              else{
                console.log(token1)
                res.cookie('fortoken',token1);
                // console.log()
                res.redirect("/viewbooks")

              }
        }
      })
    } else {
      console.log("error");
    }

  } catch (error) {
    throw error
  }

}


function authtoken(req, res, next) {
  const authheader = req.headers['authorization']
  const token = `${req.cookies.fortoken}`
  // authheader && authheader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    next()
  })
}

// export { loginuser, jwtauth, authtoken }
export {loginuser, authtoken} 
