$(function(){
    // alert(111)
    isLogin();
    // 判断是否登录
    function isLogin() {
        var loginStatus = webAppInterface.isLogin();
        // alert(loginStatus)
        if (loginStatus != "false") {
        //     // 获取json字符串并转义
            var obj = JSON.parse(loginStatus);
            $('.center').text(obj.name);
            $('.dl').hide();
            $('.zc').text('退出登录').addClass('off');
            $('.off').removeClass('zc')
        }
    }
    // 退出登录
    $('.off').click(function name() {
        webAppInterface.logout()
        $('.center').text('个人中心');
        $('.dl').show();
        $('.off').addClass('zc');
        $('.zc').text('注册').removeClass('off');
    })
    $('.dl').click(function(){
        webAppInterface.toGuidPage(pageUrl +'login.html','登录')
    })
    $('.zc').click(function () {
        webAppInterface.toGuidPage(pageUrl +'register.html','新用户注册')
    })
    $('.share').click(function () {
        webAppInterface.share();
    })
    // 版权声明
    $('.versions').click(function () {
        webAppInterface.toGuidPage1(pageUrl + 'versions.html', '版权声明')
    })
    // 关于我们
    $('.aboutUs').click(function () {
        webAppInterface.toGuidPage1(pageUrl + 'aboutUs.html', '关于我们')
    })
    // 计算器.html
    $('.calculator').click(function () {
        webAppInterface.toGuidPage1(pageUrl + 'calculator.html', '计算器')
    })
    // banner
    $('.banner img').click(function () {
        webAppInterface.toGuidPage1('http://www.urenology.com/yredts2jii68m.do?id=cxx-xyd-001', '信用卡')
    })
})