import {google} from 'googleapis'
import nodemailer from 'nodemailer'
import otp from '../controllers/test.js'

const CLIENT_ID = '592438844344-0qi01holq1gt9q31r8dcbehemmfm0c1d.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Mw7evwVf20rCgYIARAAGAQSNwF-L9Irqb8ZTCYficS-iMZaLyscy3grMnU5r95rfvVK2LOmPwpeE9VlMJCBohb4ANX8Q4JLB30'

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
        user: 'panchalabhinay@gmail.com',
        pass: 'xirnjilatpiadost'
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

