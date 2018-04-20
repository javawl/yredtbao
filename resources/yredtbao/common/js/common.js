var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{3,15}$/;//4-16字节，允许字母数字下划线
var portUrl = 'http://47.100.105.193';
var pageUrl = 'http://106.14.94.52/work/yredtbao/'
//模态框
function modelYn(text) {
    window.setTimeout(function () {
        $('.model').fadeOut()      
    }, 1000)
}
var Validator = {
    name: function (name) {

        if (name.trim().length == "") {
            $('.model').fadeIn();
            $('.model .text_notice').text('请输入您的姓名');
            modelYn();
            return false;

        } else {

            if (name.indexOf('请输入') > -1) {
                $('.model').fadeIn();
                $('.model .text_notice').text('请输入您的姓名');
                modelYn();
                return false;
            } 
            // else if (name == "不详" || name == "不祥" || name == "未知" || name == "不知道" || name.indexOf("姓名") > -1 || name.indexOf("测试") > -1 || name.indexOf("test") > -1) {
            //     $('.model').fadeIn();
            //     $('.model .text_notice').text('姓名不符合规范！');
            //     modelYn();
            //     return false;

            // } else if (name && !/^[\u4e00-\u9fa5\s]{2,8}$/.test(name)) {
            //     $('.model').fadeIn();
            //     $('.model .text_notice').text('姓名不符合规范！');
            //     modelYn();
            // }
             else {
                return true
            }

        }
    },
    tel: function (tel) {
        if (!tel) {
            $('.model').fadeIn();
            $('.model .text_notice').text('请输入您的手机号码');
            modelYn();
            return false;
        } else {

            if (tel && !/^1[34578]\d{9}$/.test(tel)) {
                $('.model').fadeIn();
                $('.model .text_notice').text('手机号码格式有误！');
                modelYn();
                return false;

            } else {

                if (/(\d)\1{4}/.test(tel) || tel.indexOf("12345") > 1 || tel.indexOf("23456") > 1 || tel.indexOf("34567") > 1 || tel.indexOf("45678") > 1 || tel.indexOf("56789") > 1) {
                    $('.model').fadeIn();
                    $('.model .text_notice').text('手机号码格式有误！');
                    modelYn();
                    return false;

                } else {

                    return true;
                }
            }
        }
    }
}
// 注册页面
function validata(username, phone, valiWid, password, password_1) {
    // 用户名
    if (Validator.name(username) == true) {
        Validator.name(username)
    } else {
        return
    }
    // 手机
    if (Validator.tel(phone) == true) {
        Validator.tel(phone)
    } else {
        return
    }
    // 验证码
    if (valiWid == "" || valiWid == null) {
        $('.model').fadeIn();
        $('.model .text_notice').text('请输入您的验证码');
        modelYn();
        return false;
    }
    // 密码
    if (password == "" || password == null) {
        $('.model').fadeIn();
        $('.model .text_notice').text('请输入新密码');
        modelYn();
        return false;
    } else if (!reg.test(password)) {
        $('.model').fadeIn();
        $('.model .text_notice').text('您输入的密码格式错误');
        modelYn();
        return false;
    }

    if (password_1 == "" || password_1 == null) {
        $('.model').fadeIn();
        $('.model .text_notice').text('请再次输入新密码');
        modelYn();
        return false;
    } else if (!reg.test(password_1)) {
        $('.model').fadeIn();
        $('.model .text_notice').text('您输入的密码格式错误');
        modelYn();
        return false;
    }

    if (password != password_1) {
        $('.model').fadeIn();
        $('.model .text_notice').text('您输入的密码不一致');
        modelYn();
        return false;
    }else{
        return true;
    }
}
// 忘记密码
function validata_1( phone, valiWid, password, password_1) {
    // 手机
    if (Validator.tel(phone) == false) {
        return false;
    } 
    // 验证码
    if (valiWid == "" || valiWid == null) {
        $('.model').fadeIn();
        $('.model .text_notice').text('请输入您的验证码');
        modelYn();
        return false;
    }
    // 密码
    if (password == "" || password == null) {
        $('.model').fadeIn();
        $('.model .text_notice').text('请输入新密码');
        modelYn();
        return false;
    } else if (!reg.test(password)) {
        $('.model').fadeIn();
        $('.model .text_notice').text('您输入的密码格式错误');
        modelYn();
        return false;
    }

    if (password_1 == "" || password_1 == null) {
        $('.model').fadeIn();
        $('.model .text_notice').text('请再次输入新密码');
        modelYn();
        return false;
    } else if (!reg.test(password_1)) {
        $('.model').fadeIn();
        $('.model .text_notice').text('您输入的密码格式错误');
        modelYn();
        return false;
    }

    if (password != password_1) {
        $('.model').fadeIn();
        $('.model .text_notice').text('您输入的密码不一致');
        modelYn();
        return false;
    }else{
        return true;
    }
}
// 验证码函数
var countdown = 60;
function settime(obj) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.innerHTML = "获取验证码";
        countdown = 60;
        return;
    } else {
        obj.setAttribute("disabled", true);
        obj.innerHTML = "重新发送(" + countdown + ")";
        countdown--;
    }
    setTimeout(function () {
        settime(obj);
    }, 1000)
};

// 用户注册协议
function agreement(){
    location.href = './agreement.html'
}
// 用户指导
function itemClick(item, locationSea,getDom,key) {
    item.on('click', function () {
        $(this).toggleClass('active').siblings().removeClass('active');
        var quesObj = $(this).closest('.box');
        var index = quesObj.index();
        if (quesObj.find('.active').length == quesObj.find('.box_select').length) {
            //给所有box添加隐藏，当前点击的元素显示
            var aaa = $(getDom).attr('name');
            localStorage.setItem(key, aaa);
            // $('.box').addClass('hide').eq(index).removeClass('hide');
            location.href = locationSea;
        }
    })
}
