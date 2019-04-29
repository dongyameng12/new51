(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})
    (document, window);

$(document).ready(function () {
    var name_friend = $('#namefriend').text();
    if(name_friend.length>6) {
        //方法：截取6个字符，之后的用省略号拼接~~~
        name_friend = $('#namefriend').text().substring(0,6)+'...';
        $('#namefriend').text(name_friend)
    }
    
    //送她一朵小花
    $('#send').on('click', function () {
        showMask();
        $('.send_fri').show();
    });
    // 活动规则
    $('.go_rule').on('click', function () {
        showMask();
        $('.rule').show();
    });
    // 活动规则确定
    $('.rule_close').on('click', function () {
        $('.rule').hide();
        hideMask();
    });
});
//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
    $('body').css('position', 'fixed');
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
    $('body').css('position', 'unset');
}