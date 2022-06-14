import db from '../config/connectdb.js'

let btn = document.getElementById("signup-btn");
btn.addEventListener("click", savedata())

function savedata(){
    //   let f_name = req.body.f_name
    //   let l_name = req.body.l_name
    //   let email = req.body.email
    //   let pass = req.body.password

    let f_name = document.getElementById("f_name");
    let l_name = document.getElementById("l_name");
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
      console.log(pass);
    
      var qu = `insert into signup values("${f_name}", "${l_name}", "${email}", "${pass}", 10)`;
      db.query(qu, function (err, result) {
        if (err) throw err
        else document.write("success......")
      })
    } 









