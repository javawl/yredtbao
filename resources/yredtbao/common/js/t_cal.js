function sendrate2() {
    var objArray = new Array();
    objArray[0] = document.estateborrow.original;
    objArray[1] = document.estateborrow.active;
    objArray[2] = document.estateborrow.yearSpan;
    var rst = checkData(objArray);
    if (rst == "false") {
        return
    }
    rst = isInteger(objArray);
    if (rst == "false") {
        return
    }
    var original = document.estateborrow.original.value;
    var active = document.estateborrow.active.value;
    var yearSpan = document.estateborrow.yearSpan.value;
    var timeSpan = parseFloat(yearSpan) * 12;
    active = active * 10 / 12;
    var result = new Array();
    if (document.estateborrow.inputSelect.value == "等额本息还款") {
        result = estateBorrow(original, active, timeSpan);
        document.estateborrow.monthBack.value = result[0];
        $("#monthBackDiv").show();
        document.estateborrow.totalBack.value = result[1];
        document.estateborrow.totalInterest.value = result[3]
    } else {
        var result = estateBorrow1(original, active, timeSpan);
        $("#monthBackDiv").hide();
        document.estateborrow.totalInterest.value = result[0];
        document.estateborrow.totalBack.value = result[1]
    }
};