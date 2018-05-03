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
    var phone = ps.phone,
        tag = ps.tag,
        redArrStr = ps.red,
        pageSize = 10,
        city = decodeURI(ps.city),
        ArrStr = redArrStr.split('.');   
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
                if (dataArray == undefined || dataArray == ""){
                    $('#content').html('<div class="as"><p>目前暂无消息</p></div>')
                    return;
                }
                for (var i = 0; i < dataArray.length; i++) {
                    str = '<div class="con_box">'+
                        '<div name="' + dataArray[i].id + '" tt="' + dataArray[i].msgTp +'" class="clearfloat imgBox news' + i + '">' +
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
                    for (var j = 0; j < ArrStr.length; j++){
                        if (dataArray[i].id == ArrStr[j]){
                            $('.news' + i + ' .f1').find("span").addClass('red')
                            $('.news' + i).click(function () {
                                var tp = 'Y';
                                if ($(this).attr('tt') == '9' || $(this).attr('tt') == '0'){
                                    tp = 'N'
                                }
                                var a = webAppInterface.msgHasRead($(this).attr('name'), tp);
                                $(this).find('.f1').find('span').removeClass('red')
                                $(this).unbind();
                            })
                            break;
                        }
                    }
                    // if (dataArray[i].sta == 1) {
                    //     $('.news' + i + ' .f1').find("span").addClass('red')
                    //     $('.news' + i).click(function () {
                    //         var a = webAppInterface.msgHasRead($(this).attr('name'), 'N');
                    //         $(this).find('.f1').find('span').removeClass('red')
                    //         $(this).unbind();
                    //     })
                    // } else {
                    //     $(this).find('.f1').find('span').removeClass('red')
                    // }
                }
            }
        })
    }
    getelement()
})