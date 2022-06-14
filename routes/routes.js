import express from 'express'
import path, {resolve} from 'path'
import bodyParser from 'body-parser';
import con from '../config/connectdb.js'
import {index,login,signup} from '../controllers/controller.js'
import {viewbooks, bookdel, putbook,addbook} from '../controllers/booklist.js';
import bcrypt from 'bcrypt'
import db from '../config/connectdb.js'

const router = express.Router()

const __dirname=resolve();
router.use(express.json())

router.use(bodyParser.json());
var x= bodyParser.urlencoded({ extended: false});

 // ===============================================================

router.get("/", index)

router.get("/login", login)

router.get("/signup", signup)

router.post("/signup", x , signup)

// **************************************************************************

router.get("/viewbooks", viewbooks)

router.get("/viewbooks/addbook", (req,res) =>{    
    res.render('addbook.ejs')
  })
router.post("/viewbooks/addbook", addbook)

router.get("/viewbooks/update/:id", (req,res) =>{ 
    try{
        let query = `select * from books where book_id=${req.params.id};`
          db.query(query, function(err, result){
            if (err) throw err
            else {
                console.log(result[0].book_name);
                res.render('update.ejs',{
                res: (result)
              })
            }
          })
      }
      catch (err){
        throw err;
      }
  })

router.post("/viewbooks/update/:id", putbook)

router.get("/viewbooks/delete/:id", bookdel)

// **************************************************************************



router.all('*', (req, res)=>{
    res.status(404).send('<h1>404 page not found!</h1>')
    });

// ========================================================================================================

// router.get('/', function(req, res, next) {
//     if(req.session.flag == 1){
//       req.session.destroy();
//       res.render('index', { title: 'CodeLanguage', message : 'Email Already Exists' , flag : 1});
//     }
//     else if(req.session.flag == 2){
//       req.session.destroy();
//       res.render('index', { title: 'CodeLanguage', message : 'Registration Done. Please Login.', flag : 0});
//     }
//     else if(req.session.flag == 3){
//       req.session.destroy();
//       res.render('index', { title: 'CodeLanguage', message : 'Confirm Password Does Not Match.', flag : 1});
//     }
//     else if(req.session.flag == 4){
//       req.session.destroy();
//       res.render('index', { title: 'CodeLanguage', message : 'Incorrect Email or Password.', flag : 1 });
//     }
//     else{
//       res.render('index', { title: 'CodeLanguage' });
//     }
     
//   });
  
//   //Handle POST request for User Registration
//   router.post('/auth_reg', function(req, res, next){
  
//     var fullname = req.body.fullname;
//     var email = req.body.email;
//     var password = req.body.password;
//     var cpassword = req.body.cpassword;
  
//     if(cpassword == password){
  
//       var sql = 'select * from user where email = ?;';
  
//       con.query(sql,[email], function(err, result, fields){
//         if(err) throw err;
  
//         if(result.length > 0){
//           req.session.flag = 1;
//           res.redirect('/');
//         }else{
  
//           var hashpassword = bcrypt.hashSync(password, 10);
//           var sql = 'insert into user(fullname,email,password) values(?,?,?);';
  
//           con.query(sql,[fullname,email, hashpassword], function(err, result, fields){
//             if(err) throw err;
//             req.session.flag = 2;
//             res.redirect('/');
//           });
//         }
//       });
//     }else{
//       req.session.flag = 3;
//       res.redirect('/');
//     }
//   });
  
  
//   //Handle POST request for User Login
//   router.post('/auth_login', function(req,res,next){
  
//     var email = req.body.email;
//     var password =req.body.password;
  
//     var sql = 'select * from user where email = ?;';
    
//     con.query(sql,[email], function(err,result, fields){
//       if(err) throw err;
  
//       if(result.length && bcrypt.compareSync(password, result[0].password)){
//         req.session.email = email;
//         res.redirect('/home');
//       }else{
//         req.session.flag = 4;
//         res.redirect('/');
//       }
//     });
//   });
  
  
//   //Route For Home Page
//   router.get('/home', function(req, res, next){
//     res.render('home', {message : 'Welcome, ' + req.session.email});
//   });
  
//   router.get('/logout', function(req, res, next){
//     if(req.session.email){
//       req.session.destroy();
//       res.redirect('/');
//     }
//   })

// --------------------------------------------------------------------------------------------------------
export default router