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
page = 1;

(function ($) {
    $(document).ready(function () {
        function getelement() {
            $.ajax({
                type: 'get',
                url: portUrl + '/app/msg/getMsg',
                data: {
                    phone: phone,
                    tag: tag,
                    pageSize: pageSize,
                    city: city,
                    page: page
                },
                dataType: 'json',
                success: function (data) {
                    if (data.data.length == 0) {
                        $('#content').html('<div class="as"><p>目前暂无消息</p></div>')
                        $('.mui-pull-bottom-tips').hide();
                        return;
                    }
                    var html = template('test', data);
                    $('#content').append(html);
                    for (var i = 0; i < ArrStr.length; i++) {
                        if (dataArray[i].id == ArrStr[i]) {
                            $('.news' + i + ' .f1').find("span").addClass('red')
                            $('.news' + i).click(function () {
                                var tp = 'Y';
                                if ($(this).attr('tt') == '9' || $(this).attr('tt') == '0') {
                                    tp = 'N'
                                }
                                var a = webAppInterface.msgHasRead($(this).attr('name'), tp);
                                $(this).find('.f1').find('span').removeClass('red')
                                $(this).unbind();
                            })
                            break;
                        }
                    }
                }
            })
        }
        getelement()
    })
})(jQuery)

mui.init();
(function ($) {

    //阻尼系数
    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    $('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration: deceleration
    });
    $.ready(function () {
        //循环初始化所有下拉刷新，上拉加载。
        $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function (index, pullRefreshEl) {
            $(pullRefreshEl).pullToRefresh({
                down: {
                    callback: function () {
                        var self = this;
                        ajaxPro();
                        self.endPullDownToRefresh();
                        self.refresh(true);
                        page = 1;
                    }
                },
                up: {
                    contentrefresh: "正在加载...",
                    contentnomore: '没有更多数据了',
                    callback: ajaxSL
                }
            });
        });
    });
})(mui);

function ajaxSL() {
    page++;
    var self = this;
    // 请求tab栏下面‘全部’的数据
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: portUrl + '/app/msg/getMsg',
        data: {
            phone: phone,
            tag: tag,
            pageSize: pageSize,
            city: city,
            page: page
        },
        success: function (data) {
            if (data.data.length == 0) {
                self.endPullUpToRefresh(true);
            } else {
                // 渲染数据
                var html = template('test', data);
                document.getElementById('content').innerHTML += html
                self.endPullUpToRefresh(false);
            }
        }
    })
}
//小程序 公众号 js基础 vue webpack 
// 公用请求数据
function ajaxPro(index, Id, page) {
    // 请求tab栏下面‘全部’的数据
    page = 1;
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: portUrl + '/app/msg/getMsg',
        data: {
            phone: phone,
            tag: tag,
            pageSize: pageSize,
            city: city,
            page: page
        },
        success: function (data) {
            // 渲染数据
            var html = template('test', data);
            document.getElementById('content').innerHTML = html
        }
    })
}