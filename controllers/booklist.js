import db from '../config/connectdb.js'

let addbook = (req, res) => {

  let bn = req.body.book_name
  let au = req.body.author
  let ry = req.body.year

  try {
    let query = `insert into books(book_name, author, release_year) values("${bn}", "${au}", "${ry}");`
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.redirect("/viewbooks")
      }
    })
  }
  catch (err) {
    throw err;
  }
}


let viewbooks = (req, res) => {
  try {
    let query = 'select * from books;'
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.render('viewbook.ejs', {
          res: (result),
          len: (result.length)
        })
      }
    })
  }
  catch (err) {
    throw err;
  }
}


let bookdel = (req, res) => {
  // pop.alert("This is an alert message box.");
  try {
    let query = `delete from books where book_id= ${req.params.id};`
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.redirect("/viewbooks")
      }
    })
  }
  catch (err) {
    throw err;
  }

}


let putbook = (req, res) => {

  let bn = req.body.book_name
  let au = req.body.author
  let ry = req.body.year
  try {
    let query = `update books set book_name = "${bn}" , author = "${au}", release_year = ${ry} where book_id = ${req.params.id}`
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.redirect("/viewbooks")
      }
    })
  }
  catch (err) {
    throw err;
  }
}

export { viewbooks, bookdel, putbook, addbook }