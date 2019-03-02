var fs = require("fs");
var myDate = new Date();
//异步读取文件信息
fs.readFile('data.txt', function (err, data) {
    if (err) {
        return console.error(err)
    }
    var buffer = data.toString();
    var array = buffer.split('\r\n');
    //Array数组的下标
    var index = 0;
    //每一行占Array数组的一个空间
    var Array = [];
    //日期、名字、邮箱各变成一个数组
    var dateArray = [];
    var nameArray = [];
    var emailArray = [];
    //三个数组公用的下标
    var dateIndex = 0;

    for (var i = 1; i < array.length; i++) {
        Array[index] = array[i].split(',');
        index++;
    }
    for (var i = 0; i < Array.length; i++) {
        //中间储存变量
        var shortData = Array[i];
        for (var j = 0; j < shortData.length; j++) {
            if (j % 3 == 2) {
                dateArray[dateIndex] = shortData[j].split('/');
                nameArray[dateIndex] = shortData[1];
                emailArray[dateIndex] = shortData[3];
                dateIndex++;
            }
        }
    }
    var email = require("emailjs");
    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[i][1] - 1 == myDate.getMonth() && dateArray[i][2] == myDate.getDate()) {
            var server = email.server.connect({
                user: "1962628113@qq.com",      // 你的QQ用户
                password: "arutqjschyqghgcj",           // 注意，不是QQ密码，而是刚才生成的授权码
                host: "smtp.qq.com",         // 主机，不改
                ssl: true                   // 使用ssl
            });
            //开始发送邮件
            server.send({
                text: "Happy birthday,dear " + nameArray[i],       //邮件内容
                from: "1962628113@qq.com",        //谁发送的
                to: emailArray[i],       //发送给谁的
                subject: "Happy birthday!"          //邮件主题
            }, function (err, message) {
                console.log(err || message);
            });
        }
    }
})