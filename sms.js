const https = require('https')
const config = require('config')


const sendCode = (phone, code) => {
    const apiKey = config.get('smsApiKey')
    const from = 'Solve++DEMO'

    phone = phone.replaceAll('+', '')

    https.get(`https://api.text2reach.com/sms/send?api_key=${apiKey}&phone=${phone}&from=${from}&message=${code}`);
}


module.exports = { 
    sendCode,
}