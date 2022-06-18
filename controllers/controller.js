import db from '../config/connectdb.js'

let index = (req, res) => {
  res.render('index.ejs');
}

let loginget= (req,res) =>{
  res.render('login.ejs',{message: 'message',flag: 1});
}

let signupget = (req, res) => {
  res.render('signup.ejs',{message: 'message',flag: 1});
}

let addbookget= (req,res) =>{    
  res.render('addbook.ejs')
}

let updatebookget = (req,res) =>{ 
  try{
      let query = `select * from books where book_id=${req.params.id};`
        db.query(query, function(err, result){
          if (err) throw err
          else {
            res.render('update.ejs',{res: result })
          }
        })
    }
    catch (err){
      throw err;
    }
}

export {index, loginget, signupget, updatebookget, addbookget}