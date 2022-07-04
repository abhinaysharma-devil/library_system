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

let addbookApi = (req, res) => {

  let bn = req.body.book_name
  let au = req.body.author
  let ry = req.body.year

  try {
    let query = `insert into books(book_name, author, release_year) values("${bn}", "${au}", "${ry}");`
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.send("add book successfully")
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
          len: (result.length),
          message: ""
        })
      }
    })
  }
  catch (err) {
    throw err;
  }
}

let viewbooksApi = (req, res) => {
  try {
    let query = 'select * from books;'
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.json(result)
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

let bookdelApi = (req, res) => {
  // pop.alert("This is an alert message box.");
  let _id = req.body.id
  try {
    let query = `delete from books where book_id= ${_id};`
    db.query(query, function (err, result) {
      if (err) 
      console.log(err)
      // throw err
      else {
        res.send("delete book with id = " +`${_id}`)
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

let putbookApi = (req, res) => {
  let _id= req.body.id
  let bn = req.body.book_name
  let au = req.body.author
  let ry = req.body.year
  try {
    let query = `update books set book_name = "${bn}" , author = "${au}", release_year = ${ry} where book_id = ${_id}`
    db.query(query, function (err, result) {
      if (err) throw err
      else {
        res.send("update book with id = " +`${_id}`)
      }
    })
  }
  catch (err) {
    throw err;
  }
}

export { viewbooks, bookdel, putbook, addbook, viewbooksApi, addbookApi, putbookApi, bookdelApi }