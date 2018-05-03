$(function(){
    var phone,
        valiWid,
        username;

    isLogin();
    // 判断是否登录
    function isLogin(){
        var loginStatus = webAppInterface.isLogin();
        if (loginStatus != "false") {
            // 获取json字符串并转义
            var obj = JSON.parse(loginStatus);
            $('#phone').val(obj.phone).attr('disabled', 'true');
            $('#id_name').val(obj.name);
            $('.validata_box').addClass('hide');
        }
    }

    // 下一步
    $('.button_box').click(function(){
        var temp = '000000';
        username = $('#id_name').val();
        phone = $('#phone').val();
        valiWid = $('.valiWid').val();
        // 用户名
        if (Validator.name(username) == true) {
            Validator.name(username)
        } else {
            return
        }
        //     // 手机
        if (Validator.tel(phone) == true) {
            Validator.tel(phone);
        } else {
            return;
        }
        if (!$('.validata_box').hasClass('hide')){
            if (valiWid == "" || valiWid == null) {
                $('.model').fadeIn();
                $('.model .text_notice').text('请输入您的验证码');
                modelYn();
                return false;
            }
            temp = webAppInterface.isVerify(phone, username, valiWid);
        }
        
        if (temp == '000000'){
            location.href = './moneyGuide.html'
        }else{
            $('.model').fadeIn();
            $('.model .text_notice').text('验证码错误');
            modelYn();
            return false;
        }
    })
})
