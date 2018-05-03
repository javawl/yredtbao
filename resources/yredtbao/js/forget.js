$(function () {
    // input值
    var phone,
        valiWid,
        username,
        password,
        temp,
        password_1;

    // 重置密码
    $('.button_box').click(function () {
        phone = $('#phone').val();
        valiWid = $('.valiWid').val();
        password = $('#password').val();
        password_1 = $('#password_1').val();
        
        if (!validata_1( phone, valiWid, password, password_1)) {
            return false;
        }
        temp = webAppInterface.forgetPasswd(phone, password, password_1, valiWid)
        setTimeout(function () {
            $('.model').css('display', 'block');
            $('.model .text_notice').text('重置密码成功')
            modelYn()
        }, 350);
    })
})