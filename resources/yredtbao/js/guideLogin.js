$(function(){
    // var isTrue = true;
    // getLocal()
    // function getLocal(){
    //     var obj = localStorage.getItem('temp');
    //     console.log(obj)
    //     if (obj.length != 0) {
    //         $('.validata_box').css('display', 'none');
    //         $('#phone').val(obj.phone)
    //         isTrue = true;
    //         // 验证码
    //     } else {
    //         isTrue = false;
    //     }
    // }

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

    // 验证码接口
    $('.but').click(function () {
        phone = $('#phone').val();
        // 手机
        if (Validator.tel(phone) != false) {
            var a = webAppInterface.getKaptchCd(phone,1)
            if(a == '000000'){
                settime(this);
                $('.model').css('display', 'block');
                $('.model .text_notice').text('验证码已发送')
                modelYn()
            }else{
                $('.model').css('display', 'block');
                $('.model .text_notice').text(a)
                modelYn()
            }
        }
    })
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
