// $(function () {
//数据对象
var param = {};
var sort_val = "";
var step = -1;
var pageFlag = true
var pageNum = 1;
var n = 0;
// 筛选函数
function screen(item) {
    item.on('click', function () {
        // 排他写法
        $(this).addClass("black").siblings().removeClass("black");
        var num = $(this).index() + 1

        //根据当前的key做当前的操作

        if ($(this).hasClass('black')) {
            //给三角添加颜色
            if ($(this).children('i').hasClass('black_color')) {
                $(this).children('font').addClass('black_color');
                $(this).children('i').removeClass('black_color')
                showHJTYB(1, num, 0, 3)
            } else if ($(this).children('font').hasClass('black_color')) {
                $(this).children('font').removeClass('black_color');
                showHJTYB(1, num, -1, 3)
            } else {
                showHJTYB(1, num, 1, 3)
                $(this).children('i').addClass('black_color');
            }
        }
        // 遍历li去除样式
        item.each(function (i, v) {
            if (!$(v).hasClass('black')) {
                $(v).children('font').removeClass('black_color');
                $(v).children('i').removeClass('black_color')
            }
        })
    })
}
// 调用筛选方法
screen($('.condition ul .lis'))
// 显示隐藏筛选页面
$('.con_screen').click(function () {
    $('#content3').addClass('show');
    // $('.search').addClass('hide');
    // $('.condition').addClass('hide');
    $('.box').addClass('hide');
    $('#more').hide();
})
// 隐藏页面
$('.filtra_select li').click(function () {
    $(this).toggleClass('active').siblings().removeClass('active');
})

// 确定按钮
$('.confirm').click(function () {
    pageNum = 1;
    function attrText(item, obj, attr) {
        if (item.length == 0) {
            obj = "";
        } else {
            obj = item.attr(attr);
        }
        return obj
    }
    // 获取所有人群
    param.crowd = attrText($('.crowd li[class="active"]'), param.crowd, 'data-crowd');
    // 获取全部金额 
    param.money = attrText($('.money li[class="active"]'), param.money, 'data-money');
    // 获取全部期限
    param.time = attrText($('.time li[class="active"]'), param.time, 'data-time');
    // 获取芝麻分
    param.sesame = attrText($('.sesame li[class="active"]'), param.sesame, 'data-sesame');
    // 获取电商账号
    param.inter = attrText($('.inter li[class="active"]'), param.inter, 'data-inter');
    // 获取征信
    param.credit = attrText($('.credit li[class="active"]'), param.credit, 'data-credit');

    $('#content3').removeClass('show');
    // $('.search').removeClass('hide');
    // $('.condition').removeClass('hide');
    $('.box').removeClass('hide');
    $('#more').show();
    showHJTYB(pageNum, "", -1, 3);
    $("#more").html("点击加载更多");
    pageFlag = true;
})

// 重置按钮
$('.reset').click(function () {
    $('.filtra_select li').removeClass('active');
})

showHJTYB(pageNum, "", -1, 1)
function showHJTYB(page, sort_by, sort, key) {
    var str = "";
    var ps = "";
    if (key == 3) {
        // alert(key)
        $('.box').html('')
    }

    // 截取city值
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
    if (ps.length <= 0) {
        ps.city = "";
    }
    // console.log(ps.city)
    // 请求数据，渲染页面，传递参数47.100.105.193
    var dataJson = {};
    dataJson.for_people = param.crowd,
        dataJson.amount = param.money,
        dataJson.day = param.time,
        dataJson.has_zhima_credit = param.sesame,
        dataJson.has_account = param.inter,
        dataJson.has_credit_report = param.credit
    if (dataJson.for_people == "") {
        delete dataJson.for_people
    }
    if (dataJson.amount == "") {
        delete dataJson.amount
    }
    if (dataJson.day == "") {
        delete dataJson.day
    }
    if (dataJson.has_zhima_credit == "") {
        delete dataJson.has_zhima_credit
    }
    if (dataJson.has_account == "") {
        delete dataJson.has_account
    }
    if (dataJson.has_credit_report == "") {
        delete dataJson.has_credit_report
    }


    $.ajax({
        type: 'get',
        url: portUrl + '/app/products?page=' + page + '&sort_by=' + sort_by + '&sort=' + sort + '&city=' + ps.city,
        dataType: 'json',
        data: dataJson,
        success: function (data) {
            console.log(data)
            $('#more').show();
            n = 0;
            $(".img-box").css("margin-top", n + "px");
            $("#refsh").html("下拉刷新");
            if (data.data.length < 10) {
                $("#more").html("已全部加载");
                pageFlag = false;
            }
            // data.data = data.data.concat(data.data)
            var dataArray = data.data;

            getelement(dataArray)
        }


    })


}

$("#more").click(function () {

    if (pageFlag) {
        pageNum++
        showHJTYB(pageNum, "", -1, 2)
    }

})

var startx, starty;

//获得角度
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }

    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }

    return result;
}
//手指接触屏幕
document.addEventListener("touchstart", function (e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
}, false);
//手指离开屏幕
document.addEventListener("touchmove", function (e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
        case 0:
            // alert("未滑动！");
            break;
        case 1:



            // if($(document).scrollTop() == 5) {
            // n -= 2.5;
            // if(n = 50) {
            //     n = 50
            //     alert(n)
            //     $("#refsh").html("松开刷新。。。。。")
            // }
            // $(".img-box").css("margin-top",n+"px")
            // }
            break;
        case 2:
            if ($(document).scrollTop() == 0) {
                n += 1;
                if (n >= 50) {
                    n = 50;
                    $("#refsh").html("松开刷新")
                }
                $(".img-box").css("margin-top", n + "px")
            }
            break;
        case 3:
            // alert("向左！")
            break;
        case 4:
            // alert("向右！")
            break;
        default:
    }
}, false);

document.addEventListener("touchend", function (e) {
    if (n >= 50) {
        $("#refsh").html("正在加载");
        showHJTYB(1, "", -1, 3);
        $('#more').hide();
    } else {
        n = 0;
        $(".img-box").css("margin-top", n + "px")
    }
})


$(window).scroll(function (event) {

    if (n > 0) {
        n -= 10
        $(".img-box").css("margin-top", n + "px");
        $("#refsh").html("下拉刷新");
    }

});

//渲染数据
function getelement(dataArray) {
    var str = "";
    for (var i = 0; i < dataArray.length; i++) {
        // 放款时间
        var maxMoney = dataArray[i].max_amount / 10000;
        var minMoney = dataArray[i].min_amount == 0 ? 0 : dataArray[i].min_amount / 10000;
        var maxTime = dataArray[i].max_day / 30;
        var minTime = dataArray[i].min_day == 0 ? 0 : dataArray[i].min_day / 30;
        str += '<a class="clearfloat" href="' + dataArray[i].link + '">' +
            '<div class="product">' +
            '<div class="product_top clearfloat">' +
            '<div class="pro_left fl">' +
            '<img src="' + dataArray[i].logo + '">' +
            '</div>' +
            '<div class="pro_center fl">' +
            '<p class="p_center_f1">' +
            '<span class="p_center_name">' + dataArray[i].name + '</span>' +
            '</p>' +
            '<p class="p_center_f3">适合人群：上班族，企业主，网店主</p>' +
            '<p class="p_center_f3">月费用：' + dataArray[i].monthly_charge + '</p>' +
            '</div>' +
            '<div class="pro_right fl">' +
            '<p class="p_right_f1">' + maxMoney + '万' + '</p>' +
            '<p class="p_right_f3">最高额度</p>' +
            '</div>' +
            '</div>' +
            '<ul class="product_center">' +
            '<li>' +
            '<p>最快' +
            '<span>' + dataArray[i].lending_time + '</span>小时</p>' +
            '<p>放款时间</p>' +
            '</li>' +
            '<li>' +
            '<p>' +
            '<span>' + minTime + '~' + maxTime + '</span>个月</p>' +
            '<p>期限范围</p>' +
            '</li>' +
            '<li>' +
            '<p>' +
            '<span>' + minMoney + '~' + maxMoney + '</span>万</p>' +
            '<p>额度</p>' +
            '</li>' +
            '</ul>' +
            '<div class="product_bottom">' + dataArray[i].remark + '</div>' +
            '</div>' +
            '</a>'
    }
    $('.box').append(str);
}
// })