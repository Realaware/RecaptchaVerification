const Discord = require('discord.js')
const Express = require('express')
const fs = require('fs')
const app = Express()
const Client = new Discord.Client()

const Prefix = "\""

var UserTokens = [{"Token":"test","id":"1908203718902746125"}]

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.use(Express.json())

app.get("/checktoken/:token",function(req,res) {
    console.log("Recevied")
    
    var match = false

    for (index = 0 ; index < UserTokens.length; index++){
        if (UserTokens[index].Token == req.params.token) {
            match = true
            break;
        }
    }

    if (match == false) {
        res.json({"success":false})
    } else {
        res.json({"success":true})
    }
})

app.get('/verified/:token', function(req,res) {

    var match = false
    var id 

    for (index = 0 ; index < UserTokens.length; index++){
        if (UserTokens[index].Token == req.params.token) {
            match = true
            id = UserTokens[index].id;
            break;
        }
    }
    Client.users.cache.get(id).send("인증이 완료되었습니다 !")
    res.send("yeah")

})

app.listen('80',() => {
    console.log('success')
})

Client.on('message',msg => {
    if (msg.content == `${Prefix}Verify`){
        msg.reply(`디엠을 확인해주세요 !`)
        var token = makeid(20)
        UserTokens.push({Token:token,id:msg.author.id})
        msg.author.send(`http://localhost:81/?token=${token} 해당 링크로 가 인증을 완료해주세요 !`)
    }
})

Client.login('')
