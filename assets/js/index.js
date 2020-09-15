$(function () {
    // 第一步获取用户信息
    //第二部获取到用户信息后渲染用户头像
    //第三步点击退出  退出页面返回login页面  删除token信息
    //第四步强制用户访问权限  如果用户没有输入登录信息 就不允许访问后台页面 强制清空token信息和返回login页面    






    //1.调用获取用户信息
    getUserInfo();

    var layer = layui.layer;
    //点击退出  退出页面返回login页面删除tokrn信息
    // 先给退出注册点击事件
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        //通过layui  获取弹出框
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok');
            //删除token
            localStorage.removeItem('token');
            //跳转到login页面
            location.href = '/login.html'

            layer.close(index);
        })




    })

})


//  封装一个函数获取用户信息  入口函数要调用函数
function getUserInfo() {
    //发起ajax请求  获取用户信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求header  就是请求头  就是配置对象
        // headers:{
        //     //里面的值就是我们localStorage 里面的有一个就是 token  如果没有就是空字符串
        //     Authorization:localStorage.getItem('token')||'',
        // },
        // 回调成功函数
        success: function (res) {
            // console.log(res);
            //判断是否获取用户信息成功
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败！');
            }
            //x渲染用户头像
            renderAvatar(res.data)
        },



        //控制用户访问权限  不输入用户信息不能访问 后台页面
        //   ajax不论失败还是成功 都会调用compete 回调函数
        // complete: function(res){
        //     //在complete 回调函数中我们可以通过res.response.JOSN 拿到服务器响应的数据
        //     //然后进行判断  拿到的信息是否正确
        //     //如果认证失败
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ){
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //强制返回login页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

//封装一个获取用户头像函数
function renderAvatar(user) {
    //先获取用户名称
    var name = user.nickname || user.username;
    //设置用户欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp' + name)
    //渲染头像  如果用户有图片头像就有限显示图片头像如果没有几显示文本头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show;
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide()
        //获取用户名第一个字符并转换为大写
        var first = name[0].toUpperCase();
        //把获取到的第一个大写字符插入到文本头像
        $('.text-avatar').html(first).show();
    }
}