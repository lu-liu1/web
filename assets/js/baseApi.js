//封装一个函数没次调用get post ajax的时候都会先调用这个函数
//在这个函数里面我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    //如果 url的索引带有my  就执行  没有就不执行
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
                Authorization:localStorage.getItem('token')||''
            }
    }
    
        //控制用户访问权限  不输入用户信息不能访问 后台页面
        //   ajax不论失败还是成功 都会调用compete 回调函数
        options.complete = function(res){
            //在complete 回调函数中我们可以通过res.response.JOSN 拿到服务器响应的数据
            //然后进行判断  拿到的信息是否正确
            //如果认证失败
            // console.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ){
                //强制清空token
                localStorage.removeItem('token');
                //强制返回login页面
                location.href = '/login.html';
            }
        }
})