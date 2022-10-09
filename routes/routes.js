import express from 'express'
import {resolve} from 'path'
import bodyParser from 'body-parser';
import {index, loginget, signupget, updatebookget, addbookget} from '../controllers/controller.js'
import {viewbooks, bookdel, putbook,addbook, viewbooksApi, addbookApi, putbookApi, bookdelApi} from '../controllers/booklist.js';
import {signup, signupApi} from '../controllers/signupcontrol.js'
import {loginuser,authtoken, loginuserApi} from '../controllers/logincontrol.js'
import options from '../src/swagger.js'
import swaggerui from 'swagger-ui-express'
import swaggerjsDocs from 'swagger-jsdoc'

const router = express.Router()

const __dirname=resolve();   
router.use(express.json())

router.use(bodyParser.json());
var x= bodyParser.urlencoded({ extended: true});


/**
 * @swagger
 *  components:
 *   schemas:
 *      login_user:
 *       type: object 
 *       require:
 *          -email id
 *          -password
 *       properties:
 *         email-id:
 *           type: string
 *           description: The auto-generated id of the book.
 *         password:
 *           type: string
 *           description: password
 * 
 *      signup_user:
 *       type: object 
 *       require:
 *          -firt name
 *          -last name
 *          -email id
 *          -password
 *       properties:
 *         f_name:
 *           type : string
 *           description: first name string value
 *         l_name:
 *           type : string
 *           description: last name string value
 *         email:
 *           type: string
 *           description: Here is your email-id ex- abc@gmail.com
 *         password:
 *           type: string
 *           description: password
 * 
 *      viewbooks:
 *       type: object 
 * 
 *      viewbooks_addbook:
 *       type: object 
 *       require:
 *         -book_name
 *         -author
 *         -year
 *       properties:
 *         book_name:
 *           type: string
 *           description: book name
 *         author:
 *           type: string
 *           description: author of the book
 *         year:
 *           type: integer
 *           description: book year
 * 
 *      viewbooks_update:
 *       type: object 
 *       require:
 *         -id
 *         -book_name
 *         -author
 *         -year
 *       properties:
 *         id:
 *           type: integer
 *           description: book id
 *         book_name:
 *           type: string
 *           description: book name
 *         author:
 *           type: string
 *           description: author of the book
 *         year:
 *           type: integer
 *           description: book year
 * 
 *      viewbooks_delete:
 *       type: object 
 *       require:
 *         -id
 *       properties:
 *         id:
 *           type: integer
 *           description: book id
 *                
 */

/** to get index */

/** 
 * @swagger 
 * /api/login: 
 *   post: 
 *     description: Login into the web 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/login_user'
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

/** 
 * @swagger 
 * /api/signup: 
 *   post: 
 *     description: Signup into the web 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/signup_user'
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

/** 
 * @swagger 
 * /api/viewbooks: 
 *   get: 
 *     description: here you can see the books
 *     requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/viewbooks'
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

/** 
 * @swagger 
 * /api/viewbooks/addbook: 
 *   post: 
 *     description: here you can addbook the books
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/viewbooks_addbook'
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

/** 
 * @swagger 
 * /api/viewbooks/update/:id: 
 *   post: 
 *     description: here you can update the books
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/viewbooks_update'
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

/** 
 * @swagger 
 * /api/viewbooks/delete/:id: 
 *   post: 
 *     description: here you can delete the books
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/viewbooks_delete'
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

router.get("/", index)


router.get("/login", loginget)

router.post("/login", loginuser)
router.post("/api/login", loginuserApi)



router.get("/signup", signupget)

router.post("/signup", x , signup)
router.post("/api/signup", x , signupApi)



router.get("/viewbooks", authtoken , viewbooks)
router.get("/api/viewbooks" , authtoken , viewbooksApi)



router.get("/viewbooks/addbook", addbookget)

router.post("/viewbooks/addbook", addbook)
router.post("/api/viewbooks/addbook", addbookApi)



router.get("/viewbooks/update/:id", updatebookget)

router.post("/viewbooks/update/:id", putbook)
router.post("/api/viewbooks/update/:id", putbookApi)



router.get("/viewbooks/delete/:id",bookdel)
router.post("/api/viewbooks/delete/:id",bookdelApi)


const swaggerDoc = swaggerjsDocs(options);
router.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDoc))

router.get("/noti", (req,res)=>{
    res.render('test_noti.ejs')
})

router.get("/store", (req,res)=>{
    res.render('storage.ejs')
})

router.all('*', (req, res)=>{
    res.status(404).send('<h1>404 page not found!</h1>')
    });

export default router