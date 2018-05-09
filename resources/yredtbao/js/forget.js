$(function () {
    // input值
    var phone,
        valiWid,
        username,
        password,
        temp,
        password_1;
    // 验证码接口
    $('.but').click(function () {
        phone = $('#phone').val();
        // 手机
        if (Validator.tel(phone) != false) {
            var a = webAppInterface.getKaptchCd(phone, 2)
            if (a == '000000') {
                settime(this);
                $('.model').css('display', 'block');
                $('.model .text_notice').text('验证码已发送')
                modelYn()
                return false
            } else {
                $('.model').css('display', 'block');
                $('.model .text_notice').text(a)
                modelYn()
                return false
            }
        }
    })
    // 重置密码
    $('.button_box').click(function () {
        phone = $('#phone').val();
        valiWid = $('.valiWid').val();
        password = $('#password').val();
        password_1 = $('#password_1').val();

        if (!validata_1(phone, valiWid, password, password_1)) {
            return false;
        }
        temp = webAppInterface.forgetPasswd(phone, password, password_1, valiWid)
        // $('.model').css('display', 'block');
        // $('.model .text_notice').text(temp)
        // modelYn()
        if (temp == '000000') {
            $('.model').fadeIn();
            $('.model .text_notice').text('重置密码成功');
            modelYn();
            return false;
        } else {
            $('.model').fadeIn();
            $('.model .text_notice').text(temp);
            modelYn();
            return false;
        }
    })
})