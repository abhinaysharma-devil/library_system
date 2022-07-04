import db from '../config/connectdb.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



let loginuser = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    
    if(email == '' || password == ''){
      res.render("login.ejs",{title: 'Login',message: "email and password cannot be empty!"})
    }

    if(email){

      var qu = `select * from signup where email= "${email}"`;
      db.query(qu, function (err, result) {
        if (err) {
          console.log(err)
          res.redirect("/login")
        }
        if(result.length && bcrypt.compareSync(password, result[0].password)){
          
          const token1 = jwt.sign({ id: result[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
          if (!token1) {
            res.status(401).send({
              msg: 'token not generated'
            });
        }
        else {
          console.log("login")
          res.cookie('fortoken', token1);
          res.redirect("/viewbooks")
          
        }
      }
      else{
        console.log("incorrect email or password")
        res.render("login.ejs",{message: "incorrect email or password"})
      }
    })
    
  }
  } catch (error) {
    throw error
  }
  
}


let loginuserApi = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    
    if(email == '' || password == ''){
      res.send("email and password cannot be empty!")
    }

    if(email){

      var qu = `select * from signup where email= "${email}"`;
      db.query(qu, function (err, result) {
        if (err) {
          console.log(err)
          res.send("some err in your Query ")
          // res.redirect("/login")
        }
        if(result.length && bcrypt.compareSync(password, result[0].password)){
          
          const token1 = jwt.sign({ id: result[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
          if (!token1) {
            res.status(401).send({
              msg: 'token not generated'
            });
        }
        else {
          console.log("login")
          res.cookie('fortoken', token1);
          res.send("login successfully...")
          
        }
      }
      else{
        console.log("incorrect email or password")
        res.send("incorrect email or password")
      }
    })
    
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
export { loginuser, authtoken , loginuserApi} 
