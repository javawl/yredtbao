$(function () {
    var ps = '';
    var url = window.location.href;
    function getUrlkey(url) {
        var params = {},
            arr = url.split("?");
        if (arr.length <= 1)
            return params;
        arr = arr[1].split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var a = arr[i].split("=");
            params[a[0]] = a[1];
        }
        return params;
    }
    ps = getUrlkey(url);
    // alert(JSON.stringify(ps))
    var phone = ps.phone,
        tag = ps.tag,
        pageSize = 10,
        city = ps.city;
    // function isLogin() {
    //     var tag,
    //         loginStatus;
    //     loginStatus = webAppInterface.isLogin();
    //     // alert(loginStatus)
    //     if (loginStatus != "false") {
    //        var obj = JSON.parse(loginStatus);
    //         phone = obj.phone;
    //         // alert(obj)
    //     } else {
    //         tag = webAppInterface.getTag()
    //     }
    // }

    getelement()
    function getelement() {
        var str = "";
        $.ajax({
            type: 'get',
            url: portUrl + '/app/msg/getMsg',
            data: {
                phone: phone,
                tag: tag,
                pageSize: pageSize,
                city: city,
            },
            dataType: 'json',
            success: function (data) {
                var dataArray = data.data;
                console.log(dataArray)
                if (dataArray == undefined || dataArray == ""){
                    $('#content').html('<div class="as"><p>目前暂无消息</p></div>')
                    return;
                }
                for (var i = 0; i < dataArray.length; i++) {
                    str = '<div class="con_box">'+
                        '<div name="' + dataArray[i].id+'" class="clearfloat imgBox news' + i + '">' +
                        '<p class="fl f1">' +
                        '<span  class=""></span>' +
                        '</p>' +
                        '<div class="fl text_box">' +
                        '<p class="text_title">' +
                        '<span>' + dataArray[i].title + '</span>' +
                        '<span class="date">' + dataArray[i].sndTm + '</span>' +
                        '</p>' +
                        '<p class="con_text">' + dataArray[i].content + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    $('#content').append(str);
                    if (dataArray[i].sta == 1) {
                        $('.news' + i + ' .f1').find("span").addClass('red')
                        $('.news' + i).click(function () {
                            var a = webAppInterface.msgHasRead($(this).attr('name'), 'N');
                            $(this).find('.f1').find('span').removeClass('red')
                            $(this).unbind();
                        })
                    } else {
                        $(this).find('.f1').find('span').removeClass('red')
                    }
                }
            }
        })
    }
})