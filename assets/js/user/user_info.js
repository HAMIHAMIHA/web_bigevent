//获取layui中的form对象
let form = layui.form;
let layer = layui.layer;


let userdata;
//初始化用户的基本信息
let rooturl = "http://www.liulongbin.top:3007";
let _headers = { "Authorization": localStorage.getItem('token') || "" }
let funaxios = function() {
    axios({
        method: "GET",
        url: rooturl + "/my/userinfo",
        params: {},
        headers: _headers,
    }).then(res => {
        if (res.data.status !== 0) {
            window.location.href = '/login.html';
            localStorage.removeItem('token');
            return console.log(res.data.message)
        }
        userdata = res.data.data;
        //将信息填入对话框
        // document.getElementById("change_info1").value = res.data.data.username;
        //调用form.val()快速为表单赋值. 需要在html中添加lay-filter="formUserInfo"属性.
        form.val("formUserInfo", res.data.data)
    });
}
funaxios();
document.getElementById("reset_info").addEventListener('click', (e) => {
    //阻止表单的默认重置事件
    e.preventDefault();
    funaxios();
});

document.getElementById("submit_info").addEventListener('click', (e) => {
    e.preventDefault();
    form.verify({
        // pwd: [/^[\S]{6,12}/, '密码必须6到12位,且不能出现空格'],
        // repwd: function(value) {
        //     let value1 = document.getElementById("layuiinputid1").value;
        //     if (value1 != value) {
        //         return "两次密码不一致"
        //     }
        // }
        nickname1: function(value1) {
            // let value1 = document.getElementById("change_info2").value;
            if (value1.length > 6) {
                return '昵称长度必须在1~6之间'
            } else {
                //如果通过了昵称要求则能够修改
                let usernickname = document.getElementById("change_info2").value;
                let useremail = document.getElementById("change_info3").value;
                axios({
                    method: "POST",
                    url: rooturl + "/my/userinfo",
                    data: `id=${userdata.id}&nickname=${usernickname}&email=${useremail}`,
                    headers: _headers,
                }).then(res => {
                    if (res.data.status !== 0) {
                        layer.msg("更新用户信息失败!")
                        return console.log(res.data.message)
                    }
                    layer.msg("信息修改成功")
                        // console.log("信息修改成功", res.data)
                        //在子页面中,调取父页面的函数.
                    window.parent.getUserInfo();

                })
            }
        }
    });

})