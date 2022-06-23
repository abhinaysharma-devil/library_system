import {google} from 'googleapis'
import nodemailer from 'nodemailer'
import otp from '../controllers/test.js'
import dotenv from 'dotenv'
dotenv.config()


const CLIENT_ID = process.env.clientId
const CLIENT_SECRET = process.env.clientSecret
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = process.env.refreshToken

const oauthclient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oauthclient.setCredentials({ 
    refresh_token: REFRESH_TOKEN
})

async function sendMail(){
    try {
const accesstoken = await oauthclient.getAccessToken()

const transport = nodemailer.createTransport({
     service: 'gmail',
     auth:{
        type:'OAuth2',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accesstoken,
        user: process.env.userEmail,
        pass: process.env.userPass
     }
})
const mailoption = {
    from: "devil from heaven",
    to: "abhinaysharma151@gmail.com",
    subject: "this is the temp email",
    text: 'hiii', 
    html: `${otp}`
}
 
const result = await transport.sendMail(mailoption)
return result 
        
    } catch (error) {
        return error
    }
}

sendMail().then(result=> console.log ('email sent...', result))
.catch(error => console.log(error.message))

 