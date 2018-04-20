$(function () {
    function itemClick(item, locationSea) {
        item.on('click', function () {
            $(this).toggleClass('active').siblings().removeClass('active');
            var quesObj = $(this).closest('.box');
            var index = quesObj.index();
            if (quesObj.find('.active').length == quesObj.find('.box_select').length) {
                //给所有box添加隐藏，当前点击的元素显示
                var residence = $('.city').val();
                var residenceTm = $('.time_city1 p[class="active"]').attr('name');
                var hasHouseLoan = $('.time_city2 p[class="active"]').attr('name');
                localStorage.setItem('residence', residence);
                localStorage.setItem('residenceTm', residenceTm);
                localStorage.setItem('hasHouseLoan', hasHouseLoan);
                
                location.href = locationSea;
            }
        })
    }
    itemClick($('.box .time_city p'), './moneyGuide4.html');
})