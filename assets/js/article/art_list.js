let rooturl = "http://www.liulongbin.top:3007";
let _headers = { "Authorization": localStorage.getItem('token') || "" };
let pdata = { pagenum: 1, pagesize: 2, cate_id: "", state: "已发布" }
let form = layui.form;
let laypage = layui.laypage;
let table = layui.table;

document.querySelector("#listb1").addEventListener("click", e => {
    e.preventDefault();
    let table = document.querySelector('table');
    let tbody = document.querySelector('tbody');
    table.removeChild(tbody);
    tbody = document.createElement("tbody");
    tbody.classList.add("ctbody")
    table.appendChild(tbody);
    let fd = new FormData(document.querySelector("#layui-formlist"))
    let a = [];
    fd.forEach(function(v) {
        a.push(v);
    })
    pdata.cate_id = a[0];
    pdata.state = a[1];
    lista();
})

lista();
sa();

function lista() {
    axios({
        method: "GET",
        url: rooturl + "/my/article/list",
        params: pdata,
        headers: _headers,
    }).then(res => {
        if (res.data.status !== 0) {
            return console.log("文章列表获取失败")
        }
        console.log("文章列表获取成功", res.data.data);
        let tbody = document.querySelector("tbody");
        for (let i of res.data.data) {
            tr = document.createElement("tr");
            td1 = document.createElement("td");
            td2 = document.createElement("td");
            td3 = document.createElement("td");
            td4 = document.createElement("td");
            tr.appendChild(td1).innerHTML = i.title;
            tr.appendChild(td2).innerHTML = i.cate_name;
            tr.appendChild(td3).innerHTML = i.pub_date;
            tr.appendChild(td4).innerHTML = i.state;
            let artbutton1 = document.createElement("button")
            let artbutton3 = document.createElement("button")
            let artbutton2 = document.createElement('button');
            artbutton1.innerHTML = "查看";
            artbutton1.type = "button";
            artbutton1.bid = i.Id;
            artbutton1.classList.add("layui-btn", "layui-btn-sm", "seebtn");
            // artbutton3.innerHTML = "编辑";
            // artbutton3.type = "button";
            // artbutton3.bid = i.Id;
            // artbutton3.classList.add("layui-btn", "layui-btn-sm", "editbtn");
            artbutton2.innerHTML = "删除";
            artbutton2.type = "button";
            artbutton2.bid = i.Id;
            artbutton2.setAttribute("id", "btnid");
            artbutton2.classList.add("layui-btn", "layui-btn-danger", "layui-btn-sm", "deletebtn");
            td5 = document.createElement("td");
            td5.appendChild(artbutton1);
            // td5.appendChild(artbutton3);
            td5.appendChild(artbutton2);
            tr.appendChild(td5);
            tbody.appendChild(tr)
            var btnlen = document.querySelectorAll("#btnid").length;

        }
        //渲染分页结构
        laypage.render({
            elem: "pageBox",
            count: res.data.total,
            limit: pdata.pagesize,
            curr: pdata.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                pdata.pagenum = obj.curr;
                pdata.pagesize = obj.limit;
                // console.log("页码", pdata.pagenum, "页内容数", pdata.pagesize, "flag", first);
                if (!first) {
                    document.querySelector("#listb1").click();
                }
            }
        });
        document.querySelector("tbody").addEventListener("click", e => {
            e.preventDefault();
            if (e.target.innerHTML == "删除") {
                layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
                    axios({
                        method: "get",
                        url: rooturl + `/my/article/delete/${e.target.bid}`,
                        headers: _headers,
                    }).then(res => {
                        if (res.data.status !== 0) {
                            return console.log(res.data);
                        }
                        console.log("文章删除成功", res.data)
                            //eg2
                        layer.msg('文章删除成功', { icon: 6, time: 1000 });

                        // location.reload();
                    })
                    layer.close(index);
                    setTimeout(() => {
                        let table = document.querySelector('table');
                        let tbody = document.querySelector('tbody');
                        table.removeChild(tbody);
                        tbody = document.createElement("tbody");
                        tbody.classList.add("ctbody")
                        table.appendChild(tbody);
                        // table.reload("layui-table-id");
                        // initTable();
                        console.log(btnlen)
                            //判断最后一页是否有数据, 若没有则跳转到前一页. 
                        if (btnlen === 1) {
                            if (pdata.pagenum >= 2) {
                                pdata.pagenum -= 1;
                            }
                        }
                        lista();
                    }, 1100);
                });
            }
        })
        document.querySelector("tbody").addEventListener("click", e => {
            e.preventDefault();
            if (e.target.innerHTML == "查看") {
                let bid = e.target.bid;
                console.log(bid);
                axios({
                    method: "get",
                    url: rooturl + `/my/article/${bid}`,
                    headers: _headers,
                }).then(res => {
                    if (res.data.status !== 0) {
                        return console.log(res.data.status);
                    }
                    console.log("文章查询成功", res.data);
                    layer.open({
                        type: 1,
                        area: ["800px"],
                        title: "文章详情",
                        content: `
                        <div>
                        <div class="layui-card">
                            <div class="layui-card-body layui-font-18" >
                                <div  class="art-list-css1">文章标题:  ${res.data.data.title}</div>
                                <div  class="art-list-css1">文章内容:  ${res.data.data.content}</div>
                                <div  class="art-list-css1">文章状态:  ${res.data.data.state}</div>
                            </div>
                        </div>
                    </div>
                        ` //这里content是一个普通的String
                    });
                })
            }
        })



    });
}

function sa() {
    axios({
        method: "GET",
        url: rooturl + "/my/article/cates",
        headers: _headers,
    }).then(res => {
        if (res.data.status !== 0) {
            return console.log("文章信息获取失败")
        }
        console.log("文章信息获取成功", res.data.data);
        let select = document.querySelector("select");
        for (let i of res.data.data) {
            let option = document.createElement("option")
            option.value = i.Id;
            option.innerHTML = i.name;
            select.appendChild(option);
        }
        form.render();
    })
};
let indexAdd = null;