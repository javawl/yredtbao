$(function () {

    // 登录按钮
    $('.button_box').click(function () {
        // alert(111)
        var password,
            phone;
        password = $('#password').val();
        phone = $('#phone').val();
        // 手机号验证
        if (Validator.tel(phone) != true) {
            return false;
        }
        // 密码验证
        if (password == "" || password == null) {
            $('.model').fadeIn();
            $('.model .text_notice').text('请输入密码');
            modelYn();
            return false;
        } else if (!reg.test(password)) {
            $('.model').fadeIn();
            $('.model .text_notice').text('您输入的密码格式错误');
            modelYn();
            return false;
        }
        // 登入接口
        var obj = webAppInterface.login(phone, password);
        if (obj.slice(0,1) != '{'){
            if (obj == 'false'){
                $('.model').fadeIn();
                $('.model .text_notice').text('用户名或密码错误');
                modelYn();
                return false;
            }else{
                $('.model').fadeIn();
                $('.model .text_notice').text(obj);
                modelYn();
                return false;
            } 
        }
    })
    // 注册按钮
    $('.login').click(function () {
        webAppInterface.toGuidPage2(pageUrl + 'register.html', '新用户注册')
    })
    // 忘记密码
    $('.forget').click(function () {
        webAppInterface.toGuidPage2(pageUrl + 'forget.html','忘记密码')
    })

    // 解决键盘顶起div
    var hei = $('.login').offset().top - $('.footer-wrap').offset().top;
    $('.login').css({
        marginTop: hei + 'px',
        position: 'static'
    });
})