$(function () {
    //给"去注册账号"注册点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //给“去登陆”注册点击事件
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义一个校验规则
    // 先从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            //value 拿到的是确认密码的值
            //我们还要拿到密码中的值
            //然后进行判断
            //如果两次的值不一样直接return
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return "两次密码不一致";
            }
        }
    })

    //监听表单注册提交事件

    $('#form_reg').on('submit', function (e) {
        //清除表单的默认事件
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=uername]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        //发起ajax请求提交
        $.post('http://ajax.frontend.itheima.net/api/reguser',
            //需要请求的参数
            data,
            //判断是否请求正确
            function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // console.log('注册成功');
                layer.msg('注册成功，请登录！');
                //模拟人的点击行为  注册成功后直接跳到登录页面
                $('#link_login').click()
            }
        )
    })
    // 监听表单登录事件
    // $('#form_login').submit(function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url: 'http://ajax.frontend.itheima.net/api/login',
    //         method: 'POST',
    //         data: $('#form_login').serialize(),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message);
    //             }
    //             console.log(res.token);

    //             // location.href = ''

    //         }
    //     })
    // })
    

    $('#form_login').submit(function(e){
        e.preventDefault();
        // console.log($(this).serialize());
        var data = {
            username: $('#form_login [name=uername]').val(),
            password: $('#form_login [name=password]').val(),
        }
        console.log(data);
        
        $.ajax({
            
            url:'http://ajax.frontend.itheima.net/api/login',
            method:'POST',
            data,           
            success: function(res){
               console.log(res);
               if(res.status!==0){
                   console.log('失败');
                   return layer.msg(res.message);   
               }
            //    console.log('nb');
            layer.msg('登录成功');
            //将登陆成功得到的token字符串 保存到localStorage中
            localStorage.setItem('token',res.token);
            //跳转到index.html
            location.href = '/index.html'
               
                // if(res.status !== 0){
                //     return layer.msg(res.message);
                // }else{
                //     console.log('登录成功');
                    
                // }
                // console.log(1);
                // if(res.status !== 0){
                //     return layer.msg('登录失败');
                //     // console.log(data);
                    
                // }
                // console.log('登录成功');
                
                
            }
            
        })
    })
})
