import express from 'express'
import path, {resolve} from 'path'
import bodyParser from 'body-parser';
import db from '../config/connectdb.js'
import {index,login,signup,viewbooks} from '../controllers/controller.js'
// router.set(conn)

const router = express.Router()
const __dirname=resolve();
router.use(express.json())

router.use(bodyParser.json());
var x= bodyParser.urlencoded({ extended: true});

// ===============================================================

router.get("/", index)

router.get("/login", login)

router.get("/signup", signup)

router.post("/signup", x , signup)

router.get("/viewbooks", viewbooks)

router.all('*', (req, res)=>{
    res.status(404).send('<h1>404 page not found!</h1>')
    });

export default router