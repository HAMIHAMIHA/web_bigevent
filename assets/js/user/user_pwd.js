// const { default: axios } = require("axios");

//初始化用户的基本信息
let rooturl = "http://www.liulongbin.top:3007";
let _headers = { "Authorization": localStorage.getItem('token') || "" }

//获取layui中的form对象
let form = layui.form;
let layer = layui.layer;
form.verify({
    pwd: [/^[\S]{6,12}/, '密码必须6到12位,且不能出现空格'],
    samepwd: function(value) {
        let value1 = document.getElementById("change_pwd1").value;
        if (value === value1) {
            return "新密码不能和旧密码相同";
        }
    },
    repwd: function(value) {
        let value2 = document.getElementById("change_pwd2").value;
        if (value != value2) {
            return "两次密码输入不一致"
        }
    }
})


document.getElementById("submit_pwd").addEventListener('click', e => {
    e.preventDefault();
    let value1 = document.getElementById("change_pwd1").value;
    let value2 = document.getElementById("change_pwd2").value;
    axios({
        method: 'POST',
        url: rooturl + "/my/updatepwd",
        data: `oldPwd=${value1}&newPwd=${value2}`,
        headers: _headers
    }).then(res => {
        if (res.data.status !== 0) {
            layer.msg("密码更新失败")
            console.log(value1, value2)
            return console.log(res.data)
        }
        layer.msg("密码更新成功")
    })
})