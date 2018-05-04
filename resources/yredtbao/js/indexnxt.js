var pageSize = 10;
var page = 1;
(function ($) {
    $(document).ready(function () {
        // jquery相关代码
        var data;
        function ajaxGet() {
            var index, smallData, bigArr, big = {}, html, idItem
            // 请求tab栏
            $.ajax({
                typeL: 'get',
                dataType: 'json',
                url: portUrl + '/app/products/hotNew?page_size=' + pageSize +'&page=' + page,
                success: function (data) {
                    console.log(data)
                    // 转换数据
                    smallData = data.data.small
                    bigArr = data.data.big;
                    big = {};
                    big.data = bigArr;
                    html = template('wholesale', big);
                    idItem = document.getElementById('item1mobile');
                    idItem.getElementsByTagName("ul")[0].innerHTML = html

                    document.querySelector('.mui-slider').addEventListener('slide', function (event) {
                        // 产品渲染 index 当前tap的索引
                        index = event.detail.slideNumber;
                        // index = 1 并且ul下没有li
                        if (index == 1 && $('.mui-table-view').eq(event.detail.slideNumber).find('li').length == 0) {
                            html = template('wholesale', smallData);
                            idItem = document.getElementById('item' + ++event.detail.slideNumber + 'mobile');
                            idItem.getElementsByTagName("ul")[0].innerHTML = html
                        }
                        //注意slideNumber是从0开始的；
                    });
                }
            })
        }
        ajaxGet()
    });
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
                        ajaxPro(mui("#slider").slider().getSlideNumber(), 1, 1);
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
    mui('.mui-table-view').on('tap','li',function(){
        this.click();
    })
})(mui);

function ajaxSL() {
    var Oi = mui("#slider").slider().getSlideNumber();
    var self = this;
    if (Oi == 0) {
        self.endPullUpToRefresh(true);
        return false;
    }
    page++;
    // pageSize = page;
    // 请求tab栏下面‘全部’的数据
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: portUrl + '/app/products/hotNew?page_size=' + pageSize + '&page=' + page,
        success: function (data) {
            var smallData = data.data.small
            if (!smallData.data.length) {
                self.endPullUpToRefresh(true);
                return false;
            }
            // 渲染数据
            var html = template('wholesale', smallData);
            var idItem = document.getElementById('item2mobile');
            idItem.getElementsByTagName("ul")[0].innerHTML += html
            self.endPullUpToRefresh(false);
        }
    })
}
// 公用请求数据
function ajaxPro(index, Id,page) {
    var bigArr, html, idItem, smallData, big= {};
    // 请求tab栏下面‘全部’的数据
    page = 1;
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: portUrl + '/app/products/hotNew?page_size='+ pageSize +'&page=' + page,
        success: function (data) {
            // 渲染数据
            if (index == 0){
                bigArr = data.data.big;
                big = {};
                big.data = bigArr;
                html = template('wholesale', big);
                idItem = document.getElementById('item1mobile');
                idItem.getElementsByTagName("ul")[0].innerHTML = html
            }else{
                smallData = data.data.small
                html = template('wholesale', smallData);
                idItem = document.getElementById('item2mobile');
                idItem.getElementsByTagName("ul")[0].innerHTML = html
            }
        }
    })
}

function toDetail(url,tag) {
    if (tag == '0'){
        var userStatus = webAppInterface.isLogin();
        if (userStatus === 'false') {
            //跳转登录
            webAppInterface.toGuidPage3(pageUrl + 'login.html', url, '登录', '详情')
        } else {
            //直接打开URL对应的页面
            webAppInterface.toGuidPage1(url, '详情')
        }
    }else{
        webAppInterface.toGuidPage1(url, '详情')
    }
}
