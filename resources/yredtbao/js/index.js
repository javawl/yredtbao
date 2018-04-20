$(function(){
    lunBaner();
    function lunBaner() {
        var str = "";
        // 轮播图接口
        $.ajax({
            type: 'get',
            url: portUrl + '/app/ads',
            dataType: 'json',
            async: false,
            success: function (data) {
                var dataBaner = data.data;
                for (var i = 0; i < dataBaner.length; i++) {
                    str += '<div class="swiper-slide swiper-slide-active">' +
                        '<a href="price('+"'" + dataBaner[i].content +"','"+ dataBaner[i].title +"'"+')" > <img src="'+portUrl+ dataBaner[i].cover + '" title="' + dataBaner[i].title + '" class="main-img"></a>' +
                        '</div>'
                }
                $('.swiper-wrapper').append(str)
            }
        })
    }
    var mySwiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        centeredSlides: !0,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        speed: 1000,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        autoplay: 2000,
        preventClicks: false,
        noSwiping: true,
        effect: 'flip',
        spaceBetween: 5
    });
    $('.pro_button').click(function(){
        webAppInterface.toGuidPage1(pageUrl + 'guideLogin.html', '借钱向导')
    })
})
function price(url,title){
    webAppInterface.toGuidPage1(url, title)
}