// const { default: axios } = require("axios");

// const { default: axios } = require("axios");


//初始化用户的基本信息
let rooturl = "http://www.liulongbin.top:3007";
let _headers = { "Authorization": localStorage.getItem('token') || "" };

// let table = document.querySelector('table');
let tbody = document.querySelector('tbody');
// table.removeChild(tbody);
// tbody = document.createElement("tbody");
tbody.classList.add("ctbody")
    // table.appendChild(tbody);
axios({
    method: "GET",
    url: rooturl + "/my/article/cates",
    headers: _headers,
}).then(res => {
    if (res.data.status !== 0) {
        return console.log("文章信息获取失败")
    }
    console.log("文章信息获取成功", res.data.data)
        //0.获取tbody标签
    let tbody = document.querySelector('tbody');
    //1.循环遍历users数据
    res.data.data.forEach(function(item) {
        let artbutton1 = document.createElement("button")
        let artbutton2 = document.createElement('button');
        artbutton1.innerHTML = "编辑";
        artbutton1.type = "button";
        artbutton1.bid = item.Id;
        artbutton1.classList.add("layui-btn", "layui-btn-sm", "editbtn");
        artbutton2.innerHTML = "删除";
        artbutton2.type = "button";
        artbutton2.bid = item.Id;
        artbutton2.setAttribute("id", "btnid");
        artbutton2.setAttribute("name", "btnname");
        artbutton2.classList.add("layui-btn", "layui-btn-danger", "layui-btn-sm", "deletebtn");
        // artbutton2.classList.remove();//删除类名
        //这里的item就是数组中的每一个对象
        //console.log(item)
        let tr = document.createElement('tr');
        let keys = ["name", "alias"];
        for (let key of keys) {
            //4.生成td标签
            let td = document.createElement('td')
            td.innerHTML = item[key];
            //5.把td插入到tr内部
            tr.appendChild(td)
        }
        let td = document.createElement("td")
        td.appendChild(artbutton1);
        td.appendChild(artbutton2);
        tr.appendChild(td);
        //6.把本次的tr插入到tbody内部
        tbody.appendChild(tr)

    });

    // let a2 = document.getElementsByName("btnname");
    // a2[a2.length - 1].click()
    // console.log("长度", a2)
    // console.log(a2, a2.length, a2.values, a2[0], typeof(a2))
    // let a3 = document.querySelectorAll("#btnid");
    // console.log(a3, a3.length) 
})


let layer = layui.layer;
let indexAdd = null;
document.getElementById("add_art_cate").addEventListener('click', e => {
    e.preventDefault();
    indexAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: document.getElementById("dialog-add").innerHTML
    });
    document.querySelector("#art_cate_add").addEventListener('click', e => {
        e.preventDefault();
        let name1 = document.getElementById("art_cate_input1").value;
        let name2 = document.getElementById("art_cate_input2").value;
        console.log(name1, name2);
        axios({
            method: "POST",
            url: rooturl + "/my/article/addcates",
            data: `name=${name1}&alias=${name2}`,
            headers: _headers
        }).then(res => {
            console.log("尝试添加分类")
            if (res.data.status !== 0) {
                return console.log("分类添加失败")
            }
            console.log("分类添加成功")
            layer.close(indexAdd) //根据索引关闭弹出层
                //刷新页面用location.reload();
            location.reload();
        })
    })

})

document.querySelector(".ctbody").addEventListener("click", e => {
    e.preventDefault();
    if (e.target.innerHTML == "编辑") {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: document.getElementById("dialog-add").innerHTML
        });
        let bid = e.target.bid;
        document.querySelector("#art_cate_add").addEventListener('click', e => {
            e.preventDefault();
            let name1 = document.getElementById("art_cate_input1").value;
            let name2 = document.getElementById("art_cate_input2").value;
            console.log(name1, name2);
            axios({
                method: "POST",
                url: rooturl + "/my/article/updatecate",
                data: `Id=${bid}&name=${name1}&alias=${name2}`,
                headers: _headers
            }).then(res => {
                if (res.data.status !== 0) {
                    return console.log("分类修改失败")
                }
                console.log("分类修改成功")
                layer.close(indexAdd) //根据索引关闭弹出层
                location.reload();



            })
        })
    }
})

document.querySelector(".ctbody").addEventListener("click", e => {
        e.preventDefault();
        console.log(e.target.innerHTML)
        if (e.target.innerHTML == "删除") {
            let bid = e.target.bid;
            axios({
                method: "GET",
                url: rooturl + `/my/article/deletecate/${bid}`,
                // params: { id: `${bid}` },
                headers: _headers
            }).then(res => {
                if (res.data.status !== 0) {
                    return console.log("删除分类失败")
                }
                console.log(bid)
                console.log("删除分类成功")
                location.reload();
            })
        }
    })
    // let deli = 17114;
    // setInterval(function() {
    //     deli += 1;
    //     console.log(deli)
    //     let deld = function(i) {
    //         axios({
    //             method: "GET",
    //             url: rooturl + `/my/article/deletecate/${i}`,
    //             headers: _headers
    //         }).then(res => {
    //             if (res.data.status !== 0) {
    //                 return console.log("删除分类失败", i)
    //             }
    //             console.log("删除分类成功", i)
    //                 // location.reload();
    //         })
    //     };
    //     deld(deli);
    // }, 100)

// let del = function() {

// }
// del();

// document.addEventListener("DOMContentLoaded", () => {


//     // let b = a.length;
//     // console.log(b)
// })