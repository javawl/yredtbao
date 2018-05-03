
var Id = [];
var page = 1;
(function ($) {
    $(document).ready(function () {
        // jquery相关代码
        function ajaxGet() {
            // 请求tab栏数据
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: portUrl+'/app/categories',
                success: function (data) {
                    for (var i = 0; i < data.data.length; i++) {
                        var url = portUrl + '/app/categories/' + data.data[i].id + '/articles?page=';
                        var item = { url: url,page:1};
                        Id.push(item);
                    }
                    // tab栏渲染
                    var html = template('tab', data);
                    $('.mui-scroll')[0].innerHTML = html;

                    // 默认加载全部
                    ajaxPro(0, Id, 1)

                    document.querySelector('.mui-slider').addEventListener('slide', function (event) {
                        //注意slideNumber是从0开始的；
                        // 如果当前li内容不为空就加载
                        if ($('.mui-table-view').eq(event.detail.slideNumber).find('li').length == 0) {
                            ajaxPro(event.detail.slideNumber, Id, 1);
                        }
                        $('.mui-scroll a').eq(event.detail.slideNumber).addClass('mui-active').siblings().removeClass('mui-active')
                    });
                }
            })
        }
        ajaxGet()
    });
    $('.mui-table-view').on('tap', 'li', function () {
        this.click();
    })
})(jQuery);
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
                        ajaxPro(mui("#slider").slider().getSlideNumber(), Id, 1);
                        self.endPullDownToRefresh();
                        self.refresh(true);
                        Id[index].page = 1;
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
    var Oi = mui("#slider").slider().getSlideNumber();
    Id[Oi].page = Id[Oi].page+1;

    var self = this;
    // 请求tab栏下面‘全部’的数据
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: Id[Oi].url + Id[Oi].page,
        success: function (data) {
            if (data.data.length == 0) {
                 self.endPullUpToRefresh(true);
            }else{
                // 获取时间方法
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i].create_time = CurentTime(data.data[i].create_time)
                }
                // 渲染数据
                var html = template('test', data);
                var idItem = document.getElementById('item' + ++Oi + 'mobile');
                idItem.getElementsByTagName("ul")[0].innerHTML += html
                self.endPullUpToRefresh(false);
            }
        }
    })
}
// 公用请求数据
function ajaxPro(index, Id, page) {
    // 请求tab栏下面‘全部’的数据
    Id[index].page = 1;
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: Id[index].url + Id[index].page,
        success: function (data) {
            // 获取时间方法
            for (var i = 0; i < data.data.length; i++) {
                data.data[i].create_time = CurentTime(data.data[i].create_time)
            }
            // 渲染数据
            var html = template('test', data);
            // $('#item' + index + 'mobile .mui-table-view')[0].innerHTML = html;
            var idItem = document.getElementById('item' + ++index + 'mobile');
            idItem.getElementsByTagName("ul")[0].innerHTML = html
        }
    })
}
// 年月日获取
function CurentTime(time) {
    var clock = "";
    var now = new Date(time);
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";
    return clock
}

function toDetail(id) {
    webAppInterface.toGuidPage1(portUrl + '/app/articles/'+id, '攻略详情');
}

