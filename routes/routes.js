import express from 'express'
import {resolve} from 'path'
import bodyParser from 'body-parser';
import {index, loginget, signupget, updatebookget, addbookget} from '../controllers/controller.js'
import {viewbooks, bookdel, putbook,addbook} from '../controllers/booklist.js';
import signup from '../controllers/signupcontrol.js'
import {loginuser,authtoken} from '../controllers/logincontrol.js'

const router = express.Router()

const __dirname=resolve();
router.use(express.json())

router.use(bodyParser.json());
var x= bodyParser.urlencoded({ extended: true});



router.get("/", index)


router.get("/login", loginget)

router.post("/login", loginuser)


router.get("/signup", signupget)

router.post("/signup", x , signup)


router.get("/viewbooks", authtoken , viewbooks)


router.get("/viewbooks/addbook", addbookget)

router.post("/viewbooks/addbook", addbook)


router.get("/viewbooks/update/:id", updatebookget)

router.post("/viewbooks/update/:id", putbook)


router.get("/viewbooks/delete/:id",bookdel)


router.all('*', (req, res)=>{
    res.status(404).send('<h1>404 page not found!</h1>')
    });

export default router