// const { parse } = require("path/posix");
// const { json } = require("stream/consumers");

// const { default: axios } = require("axios");

// const { default: axios } = require("axios");
// const axios = require('axios').default;

let rooturl = "http://www.liulongbin.top:3007"
document.querySelector("#link_reg").addEventListener('click', function() {
    console.log(1111);
    document.querySelector(".loginAndRegBox").style.height = "330px";
    document.getElementById("reg_box").style.display = "block";
    document.getElementById("login_box").style.display = "none";
})
document.querySelector("#link_login").addEventListener('click', function() {
    document.querySelector(".loginAndRegBox").style.height = "280px";
    document.getElementById("reg_box").style.display = "none";
    document.getElementById("login_box").style.display = "block";
})

//获取layui中的form对象
let form = layui.form;
let layer = layui.layer;
form.verify({
    pwd: [/^[\S]{6,12}/, '密码必须6到12位,且不能出现空格'],
    repwd: function(value) {
        let value1 = document.getElementById("layuiinputid1").value;
        if (value1 != value) {
            return "两次密码不一致"
        }
    }
})

//监听注册表单的提交事件
document.getElementById("form_reg").addEventListener("submit", function(e) {
    e.preventDefault();
    let value0 = document.getElementById("layuiinputid0").value;
    let value1 = document.getElementById("layuiinputid1").value;
    // axios.post('http://www.liulongbin.top:3007/api/reguser', `username=${value0}&password=${value1}`)
    //     .then((res) => {
    //         console.log(value0, value1, res.data, res)
    //         if (res.data.status !== 0) {
    //             return console.log(res.data.message)
    //         }
    //         console.log('注册成功')
    //     })
    //axios
    axios({
        method: "POST",
        url: rooturl + "/api/reguser",
        data: `username=${value0}&password=${value1}`
    }).then(res => {
        if (res.data.status !== 0) {
            return layer.msg(res.data.message)
        }
        layer.msg('注册成功')
        document.querySelector("#link_login").click()
    });
    // //XMLHttpRequest
    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', "http://www.liulongbin.top:3007/api/reguser")
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // xhr.send(`username=${value0}&password=${value1}`);
    // xhr.onreadystatechange = function(res) {
    //     if (xhr.readyState = 4 && xhr.status == 200) {
    //         console.log(typeof(xhr.responseText))
    //         console.log("1111" + xhr.responseText)
    //         let response = JSON.parse(xhr.responseText)
    //         console.log(response)
    //         layer.msg(response.message);
    //     }
    // }
})

//监听登录表单的提交事件
document.getElementById("form_login").addEventListener("submit", function(e) {
    e.preventDefault();
    let value0 = document.getElementById("layuiinputid3").value;
    let value1 = document.getElementById("layuiinputid4").value;
    axios({
        method: "POST",
        url: rooturl + "/api/login",
        data: `username=${value0}&password=${value1}`
    }).then(res => {
        if (res.data.status !== 0) {
            return layer.msg(res.data.message)
        }
        layer.msg('登录成功');
        let paramsobj = {
            Authorization: res.data.token
        }
        window.localStorage.setItem('token', res.data.token)
            // console.log(res.data.token) //服务端返回的token字符串
            // window.location.href = '/index.html'
            //     axios({
            //         method: "GET",
            //         url: "http://www.liulongbin.top:3007/my/userinfo",
            //         params: `Authorization=${res.data.token}`
            //     }).then(res => {
            //         if (res.data.status !== 0) {
            //             return layer.msg(res.data.message)
            //         }
            //         console.log('获取基本信息成功.')
            //     })
    });
})