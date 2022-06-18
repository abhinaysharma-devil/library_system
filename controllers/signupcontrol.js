import express from 'express'
import db from '../config/connectdb.js'
import authschema from '../validation/valid_schema.js'
import bcrypt from 'bcrypt'



let signup = async (req, res) => {

  let f_name = req.body.f_name
  let l_name = req.body.l_name
  let email = req.body.email
  let password = req.body.password


  if(f_name && l_name && email && password){

    if(password >= 6){
      
      try {
        const result = await authschema.validateAsync(req.body)
        console.log(result)
        
        var hashpassword = bcrypt.hashSync(password, 10);
        var qu = `insert into signup(first_name, last_name, email, password) values("${f_name}", "${l_name}", "${result.email}", "${hashpassword}");`;/////////////////////////////
        db.query(qu, function (err, result) {
          if (err) throw err
          else {
            res.redirect("/login")
          }
        })
        
      }
      catch (err) {
        throw err;
      }
    }else{
       res.render('signup.ejs',{message: 'password must have more then 6 charecters!'})
    }
}
else{
  res.render('signup.ejs',{message: 'all fields are require to fill !'})
}

}
export default signup





