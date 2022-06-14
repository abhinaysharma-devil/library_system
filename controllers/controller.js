import express from 'express'
import db from '../config/connectdb.js'

let index = (req,res) =>{
  res.render('index.ejs');
}

let login = (req,res) =>{
  res.render('login.ejs');
}

let signup = (req, res) => {
  res.render('signup.ejs');
}

export {index,login,signup}