function getUserInfo() {
    // const { default: axios } = require("axios");
    // const { charset } = require("mime-types")
    let rooturl = "http://www.liulongbin.top:3007"
    let _headers = { "Authorization": localStorage.getItem('token') || "" }
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
        //渲染用户头像
        renderAvatar(res.data.data);
        console.log(res.data.data)
    });
    //XMLHttpRequest方法,响应头必须在open和send之间调用.
    // var xhr = new XMLHttpRequest()
    // xhr.open('GET', rooturl + '/my/userinfo')
    // xhr.setRequestHeader("Authorization", lstoken)
    // xhr.send()
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4 && xhr.staus === 200) {
    //         console.log(xhr.responseText)
    //     }
    //     console.log(xhr.responseText)
    // }

    document.getElementById('btnlogout').addEventListener('click', function() {
        //eg1
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储
            localStorage.removeItem('token');
            //2.回到主界面
            window.location.href = '/login.html'

            layer.close(index);
        });
        console.log('ok')
    })


    function renderAvatar(user) {
        //获取用户名称
        let name = user.nickname || user.username;
        //2.设置欢迎文本
        document.getElementById("welcome").innerHTML = '欢迎&nbsp;&nbsp;' + name;
        let a1 = document.querySelectorAll(".layui-nav-img")
        let a2 = document.querySelectorAll(".text-avatar")
        if (user.user_pic !== null) {
            for (i of a1) {
                i.src = "user.user_pic";
                i.style.display = "";
            }
            //3.渲染图片头像
            for (i of a2) {
                i.style.display = "none";
            }
        } else {
            for (i of a1) {
                i.style.display = "none";
            }
            let first = name[0].toUpperCase();
            for (i of a2) {
                i.style.display = "";
                i.innerHTML = first;
            }
        }
    }
}
getUserInfo();