import express from 'express'
import db from '../config/connectdb.js'
import authschema from '../validation/valid_schema.js'

let signup = async(req,res,next) => {

  let f_name = req.body.f_name
  let l_name = req.body.l_name
  let email = req.body.email
  let pass = req.body.password

  try {
      
    const result = await authschema.validateAsync(req.body)
    console.log(result)

    var qu = `insert into signup(first_name, last_name, email, password) values("${f_name}", "${l_name}", "${email}", "${pass}");`;
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
}
export default signup





