$(function () {
    // 用户指导
    function itemClick(item) {
        var ageRange = hasCrdtCard = residenceTm = hasHouseLoan = hasCar = hasCarLoan = residence = phone = name = "";
        item.on('click', function () {
            $(this).toggleClass('active').siblings().removeClass('active');
            var quesObj = $(this).closest('.box');
            var index = quesObj.index();
            if (quesObj.find('.active').length == quesObj.find('.box_select').length) {
                //给所有box添加隐藏，当前点击的元素显示
                ageRange = localStorage.getItem('ageRange');//年龄
                hasCrdtCard = localStorage.getItem('hasCrdtCard');//是否信用卡
                residence = localStorage.getItem('residence');//居住后工作地点
                residenceTm = localStorage.getItem('residenceTm');//居住时间
                hasHouseLoan = localStorage.getItem('hasHouseLoan');//是否有房贷
                hasCar = $('.car p[class="active"]').attr('name');//是否有车
                hasCarLoan = $('.CarLoan p[class="active"]').attr('name');//是否有车贷

                console.log(residence)
                var temp = webAppInterface.saveApplyInfo(phone, name, ageRange, hasCrdtCard, residence, residenceTm, hasHouseLoan, hasCar, hasCarLoan);
                webAppInterface.toGuidPage1(pageUrl + 'moneyGuide5.html','借钱向导')
            }
        })
    }
    itemClick($('.box .time_city p'));
})