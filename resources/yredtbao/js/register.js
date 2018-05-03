$(function () {
    // input值
    var phone,
        valiWid,
        password,
        password_1,
        temp,
        username;
    var countdown = 60;
    
    // 立即注册
    $('.button_box').click(function () {
        phone = $('#phone').val();
        username = $('#id_name').val();
        valiWid = $('.valiWid').val();
        password = $('#password').val();
        password_1 = $('#password_1').val();
        
        if (!validata(username, phone, valiWid, password, password_1)){
            return false;
        }
        // 参数分别为 手机号 姓名、密码，确认密码、验证码
        temp = webAppInterface.register(phone, username, password, password_1, valiWid)
        setTimeout(function () {
            $('.model').css('display', 'block');
            $('.model .text_notice').text(temp)
            modelYn()
        }, 350);
    })
})