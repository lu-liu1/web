//封装一个函数没次调用get post ajax的时候都会先调用这个函数
//在这个函数里面我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})