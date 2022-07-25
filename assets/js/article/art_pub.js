// const { default: axios } = require("axios");

let rooturl = "http://www.liulongbin.top:3007";
let _headers = { "Authorization": localStorage.getItem('token') || "" };
let post_headers = { "Authorization": localStorage.getItem('token') || "", 'content-type': 'application/x-www-form-urlencoded' };
let form = layui.form;
// let pubdata;
axios({
    method: "GET",
    url: rooturl + "/my/article/cates",
    headers: _headers,
}).then(res => {
    if (res.data.status !== 0) {
        return console.log("文章信息获取失败")
    }
    console.log("文章信息获取成功", res.data.data)

    let select = document.querySelector("select");
    let ii = 1;
    for (let i of res.data.data) {
        let option = document.createElement("option")
        option.value = ii++;
        option.innerHTML = i.name;
        select.appendChild(option);
    }
    form.render();
})



document.querySelector("#release1").addEventListener("click", e => {
    e.preventDefault();
    let fd = new FormData(document.querySelector("#layui-form1"))
    let debug = { hello: "world" };
    let blob = new Blob([JSON.stringify(debug, null, 2)], { type: 'application/json' });
    let cover_img = blob;
    let state = "已发布";
    fd.append("cover_img", cover_img);
    fd.append("state", state);
    fd.forEach(function(v, k) {
        console.log(k, v)
    })
    axios({
        method: "POST",
        url: rooturl + "/my/article/add",
        data: fd,
        headers: post_headers,
    }).then(res => {
        if (res.data.status !== 0) {
            return console.log(res.data)
        }
        console.log(res.data)
        layer.msg('文章发布成功', { icon: 6, time: 1000 });
    })
})

document.querySelector("#release2").addEventListener("click", e => {
    e.preventDefault();
    let fd = new FormData(document.querySelector("#layui-form1"))
    let debug = { hello: "world" };
    let blob = new Blob([JSON.stringify(debug, null, 2)], { type: 'application/json' });
    let cover_img = blob;
    console.log(blob)
    let state = "草稿";
    fd.append("cover_img", cover_img);
    fd.append("state", state);
    axios({
        method: "POST",
        url: rooturl + "/my/article/add",
        data: fd,
        headers: post_headers,
    }).then(res => {
        if (res.data.status !== 0) {
            return console.log(res.data)
        }
        layer.msg('文章存为草稿成功!', { icon: 6, time: 1000 });
        console.log(res.data)
    })
})