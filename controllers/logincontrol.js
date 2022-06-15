import db from '../config/connectdb.js'

let loginuser = async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
  
      if (email && password) 
      {
        var qu = `select * from signup where email= "${email}" and password= ${password}`;
        db.query(qu, function (err, result) {
          if (err) {
            console.log(err) 
             res.redirect("/login")
          }
  
           else {
            console.log(result) 
            res.redirect("/viewbooks")
          }
        })
     }else 
      {
        console.log("error");
      }
  
    } catch (error) {
      throw error
    }
  
  }

  export default loginuser