$(function () {

    function elsCli(item) {
        var index = 0;
        var viewport = "";
        var viewWid = $(window).width();
        $(item).click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            index = $(this).index();
            viewport = $(window).width();
            if (index == 1) {
                $('.swiper-wrapper').css({
                    transitionDuration: '500ms',
                    transform: 'translate3d(-' + viewport + 'px, 0px, 0px)'
                })
            } else {
                $('.swiper-wrapper').css({
                    transitionDuration: '500ms',
                    transform: 'translate3d(0px, 0px, 0px)'
                })
            }
        })
        console.log(viewWid)
        if ($('.swiper-wrapper').css('transform') == 'translate3d(-' + viewWid +'px, 0px, 0px)'){
            console.log(11)
            $('.dribblet').addClass('active');
        }
    }
    elsCli('.els')

    wholesaleMoney()
    // 发现产品接口
    function wholesaleMoney() {
        var dataSmall,
            dataBig;
        var str = temp = "";
        // 大额接口
        $.ajax({
            type: 'get',
            url: portUrl + '/app/products/hot',
            dataType: 'json',
            success: function (data) {
                // 小额贷款
                dataSmall = data.data.small.data;
                console.log(dataSmall)
                dataBig = data.data.big;
                for (var i = 0; i < dataSmall.length; i++) {
                    var maxMoney = dataSmall[i].max_amount / 10000;
                    var minMoney = dataSmall[i].min_amount == 0 ? 0 : dataSmall[i].min_amount / 10000;
                    str += '<div class="box" onclick="toDetail("' + dataSmall[i].link+'")">' +
                        '<div class="list_left">' +
                        '<div class="logo fl">' +
                        '<img src="'+dataSmall[i].logo+'" alt="">' +
                        '</div>' +
                        '<div class="left_text fl">' +
                        '<p class="name">'+dataSmall[i].name+'</p>' +
                        '<p class="money">' + minMoney+'~' + maxMoney +'万</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="list_right">' +
                        '<p>最快2小时放款</p>' +
                        '<p>贷款期限12~36月</p>' +
                        '<p>月费用0.8%起</p>' +
                        '</div>' +
                        '</div>'
                }
                $('#dribblet').append(str)
                // 大额贷款
                for (var i = 0; i < dataBig.length; i++) {
                    var maxMoney = dataBig[i].max_amount / 10000;
                    var minMoney = dataBig[i].min_amount == 0 ? 0 : dataBig[i].min_amount / 10000;
                    temp += '<div class="box" onclick="toDetail("' + dataSmall[i].link +'")">' +
                        '<div class="list_left">' +
                        '<div class="logo fl">' +
                        '<img src="' + dataBig[i].logo + '" alt="">' +
                        '</div>' +
                        '<div class="left_text fl">' +
                        '<p class="name">' + dataBig[i].name + '</p>' +
                        '<p class="money">' + minMoney + '~' + maxMoney + '万</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="list_right">' +
                        '<p>最快2小时放款</p>' +
                        '<p>贷款期限12~36月</p>' +
                        '<p>月费用0.8%起</p>' +
                        '</div>' +
                        '</div>'
                }
                $('#wholesale').append(temp)
            }
        })
    }
    var mySwiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        centeredSlides: !0,
        // loop: true, 
        pagination: '.swiper-pagination',
        paginationClickable: true,
        speed: 1000,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        // autoplay:2000, 
        preventClicks: false,
        noSwiping: true,
        effect: 'flip',
        spaceBetween: 5
    });
    function toDetail(url) {
        var userStatus = webAppInterface.isLogin();
        if (userStatus === 'false') {
            //跳转登录 
            webAppInterface.toGuidPage3(pageUrl + 'login.html', url, '登录', '详情')
        } else {
            //直接打开URL对应的页面 
            webAppInterface.toGuidPage1(url, '详情')
        }
    }
    function locaMore() {
        var userStatus = webAppInterface.isLogin();
        $('.pro_list').on('click', '.more', function name() {
            if (userStatus === 'false') {
                webAppInterface.toGuidPage3(pageUrl + 'login.html', pageUrl + 'product.html', '登录', '产品列表')
            } else {
                webAppInterface.toGuidPage1(pageUrl + 'product.html', '产品列表')
            }
        })
    }
    // locaMore()
})


function ajaxGet() {
            var time = [];
            var index;
            // 请求tab栏
            $.ajax({
                typeL: 'get',
                dataType: 'json',
                url: 'http://47.100.105.193/app/products/hot',
                success: function (data) {
                    var Oi = mui("#slider").slider().getSlideNumber()
                    var bigArr = data.data.big;
                    var big = {};
                    var smallData = data.data.small
                    big.data = bigArr;
                   
                  
                    var html = template('wholesale', big);
                    var idItem = document.getElementById('item' + ++Oi + 'mobile');
                    idItem.getElementsByTagName("ul")[0].innerHTML = html
                    
                    document.querySelector('.mui-slider').addEventListener('slide', function (event) {
                        // 产品渲染
                        var index = event.detail.slideNumber;
                        if (index == 1){
                            var html = template('wholesale', smallData);
                            var idItem = document.getElementById('item' + ++event.detail.slideNumber + 'mobile');
                            idItem.getElementsByTagName("ul")[0].innerHTML = html
                            console.log(event.detail.slideNumber);
                        }
                        //注意slideNumber是从0开始的；
                        // 如果当前li内容不为空就加载
                        if ($('.mui-table-view').eq(event.detail.slideNumber).find('li').length == 0){
                            
                        }
                    });
                }
            })
        }

