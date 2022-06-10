import mysql from 'mysql';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abhinay.777',
    database: 'backend_work',
    insecureAuth : true
   });
   conn.connect(function(err){
       if(err){
           console.log(err)
       } 
       console.log('database connect succesfully..');
   })

   export default conn