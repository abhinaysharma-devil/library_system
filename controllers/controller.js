import db from '../config/connectdb.js'

let index = (req, res) => {
  res.render('index.ejs');
}

let loginget= (req,res) =>{
  res.render('login.ejs');
}

let signupget = (req, res) => {
  res.render('signup.ejs');
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
              // console.log(result);
              res.render('update.ejs',{
              res: (result)
            })
          }
        })
    }
    catch (err){
      throw err;
    }
}

export { index, signupget, loginget, addbookget, updatebookget }