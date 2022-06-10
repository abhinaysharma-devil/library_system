import express from 'express'
import db from '../config/connectdb.js'

let index = (req,res) =>{
  res.render('index.ejs');
}

let login = (req,res) =>{
  res.render('login.ejs');
}

let signup = async (req, res) => {
  res.render('signup.ejs');
  try {
    let f_name = req.body.f_name
    let l_name = req.body.l_name
    let email = req.body.email
    let pass = req.body.password
    console.log(pass);

    var qu = `insert into signup values("${f_name}", "${l_name}", "${email}", "${pass}", 8)`;
    db.query(qu, function (err, result) {
      if (err) throw err
      else document.write("success......")
    })
  } catch (err) {
    throw err
  }
}

let viewbooks = (req,res) =>{
  try{
    let query = 'select * from books;'
      db.query(query, function(err, result){
        if (err) throw err
        else {
          res.render('viewbook.ejs',result);
        }
      })
  }
  catch (err){
    throw err;
  }
}

export {index,login,signup, viewbooks}