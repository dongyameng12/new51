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


// ios点击事件不触发
$(function() {  
    FastClick.attach(document.body);  
})
// 输入法聚焦
$('.name').on('focus',function () {
    var bodyname = document.querySelector('.name');
    bodyname.scrollTop = bodyname.scrollHeight; 
})
// 软键盘顶起来解决问题
$('.name').on('blur',function () {
    window.scroll(0,0)
})

/**
* 
变量展示区
*/
var flower_number = 0 // 判断展示红花的数量
var flower_status = false // 判断是否点击测试几朵花按钮
var current_clickclass // 判断当前点击是哪个class
// 劳模类型（女生）
var modeltypeArr = [
    {
        modeltypeImg : 'images/00.jpg',
        introduction : '我是女生1'  
    },
    {
        modeltypeImg : 'images/01.jpg',
        introduction : '我是女生2'  
    },
    {
        modeltypeImg : 'images/02.jpg',
        introduction : '我是女生3'  
    },
    {
        modeltypeImg : 'images/03.jpg',
        introduction : '我是女生4'  
    },
    {
        modeltypeImg : 'images/04.jpg',
        introduction : '我是女生5'  
    },
    {
        modeltypeImg : 'images/05.jpg',
        introduction : '我是女生6'  
    },
    {
        modeltypeImg : 'images/06.jpg',
        introduction : '我是女生7'  
    },
    {
        modeltypeImg : 'images/07.jpg',
        introduction : '我是女生8'  
    },
];
// 劳模类型（男生）
var modelmenArr = [
    {
        modeltypeImg : 'images/08.jpg',
        introduction : '我是男生1'  
    },
    {
        modeltypeImg : 'images/09.jpg',
        introduction : '我是男生2'  
    },
    {
        modeltypeImg : 'images/10.jpg',
        introduction : '我是男生3'  
    },
    {
        modeltypeImg : 'images/11.jpg',
        introduction : '我是男生4'  
    },
    {
        modeltypeImg : 'images/12.jpg',
        introduction : '我是男生5'  
    },
    {
        modeltypeImg : 'images/13.jpg',
        introduction : '我是男生6'  
    },
    {
        modeltypeImg : 'images/14.jpg',
        introduction : '我是男生7'  
    },
    {
        modeltypeImg : 'images/15.jpg',
        introduction : '我是男生8'  
    },
];
$(document).ready(function () {
    
    //是否关注公众号
    var attention = true;
    // 是否绑定手机号
    var binding = true;
    // 本网，异网用户(默认本网)
    var CM = true;
    //是否转增
    var increase;
    // 出现劳模类型弹窗（女生）
    var  women_number = parseInt(Math.random()*7);
    // 点击首页开始按钮
    $('#start').on('click',function(){
        $('.home').hide();
        $('.enter').show();
    });
    // 选择
    $('.radio_selected>div').on('click',function(){
        var class_name = $(this).children('div').children('span').prop('class');
        if (class_name !== 'select_radio') {
            $(this).siblings('div').children('div').children('span').removeClass('select_radio');
            $(this).children('div').children('span').prop('class','select_radio');
        } else {
            $(this).children('div').children('span').removeClass('select_radio');
        }
    })   
    // 去测试
    $('#start_test').on('click',function(){
        var name = $('.name').val()
        var selected_status = $('.select_radio').length;
        submitForm(name,selected_status);
    });
    var sex
    // 用户填信息
    function submitForm (name,selected_status) {
        if (name !== '' && selected_status === 1) {
            sex = $('.select_radio').parent('div').siblings('label').text();
            showCard(sex)
        } else {
            if (name === '' && selected_status === 0) {
                $('.prompt').text('您还没有填写姓名和性别');
                showMask();
                $('.sex_name').show();
                // console.log('没有填写姓名和选择性别')
            } else {
                if (name === '') {
                    $('.prompt').text('您还没有填写姓名');
                    showMask();
                    $('.sex_name').show();
                    // console.log('没有填写姓名')
                } else {
                    $('.prompt').text('您还没有选择性别');
                    showMask();
                    $('.sex_name').show();
                }
            }
        }
    }
    // 卡片展示
    function showCard (sex) {
        showMask();
        if (sex === '女') {
            showModel (modeltypeArr);
            $('.worker').show();
        } else {
            showModel (modelmenArr);
            $('.worker').show();
        }  
    }
    
    // 展示劳模类型
    function showModel (sextArr) { 
        var str = '';
        var str_share = '';
        var nickname = $('.name').val();
        if(nickname.length>6) {
            //方法：截取6个字符，之后的用省略号拼接~~~
            nickname = $('.name').val().substring(0,6)+'...'
        }
        str = " <img src='"+sextArr[women_number].modeltypeImg +"'>";
        str_share = " <p><span>"+nickname+"</span><span> 被评为</span></p><img src='"+sextArr[women_number].modeltypeImg +"'>";
        $('.model_detail').html(str);
        $('.share_detail').html(str_share);
    }
    // 劳模种类弹窗换一个
    $('#another').on('click',function(){
        if (sex == '男') {
            cyclePromblem (modelmenArr);
        } else {
            cyclePromblem (modeltypeArr);
        }
    });
    // 循环问题
    function cyclePromblem (sextArr2) {
        women_number++; 
        if(women_number < 8){
            showModel(sextArr2); 
        }else{
            women_number = 0;
            showModel(sextArr2); 
        }
    }
    // 劳模种类弹窗确定
    $('#worker_sure').on('click',function(){
        $('.worker').hide();
        hideMask();
        $('.enter').hide();
        $('.glory').show();
    });
    // 判断关注，绑定等
    function jiangli () {
        if(attention){
            // 已关注
            if (binding) {
                if (CM) {
                    //本网中流量 
                    showMask();
                    // 链接
                    $('.tc-1').show();
                } else {
                    //异网中流量 
                    if ($(current_clickclass).text() == '查看奖励') {
                        // alert('查看奖励')
                        showMask();
                        $('.tc-5').show(); 
                    } else {
                        showMask();
                        $('.tc-2').show();
                    }
                }
            } else {
                $('.main').hide();
                $('.bind').show();
                // 未绑定手机号
                // alert('你还没绑定手机号');
            }
        } else {
            // 未关注
            // alert('未关注');
             window.location.href = "https://mp.weixin.qq.com/s/FDD5Q57SnOrWAiYkfyzLFQ";
        }
    };

    // 改变小花
    function change_flower (number) {
        $('.small_flower li').each(function (index,item) {
            if (index < number) {
                $(this).css('background','url(images/flower_red.png)')
            }
        })
    }
    // 点击分享获得荣誉小红花
    $('.get_flower').on('click',function(){
        let rongyu_flower = localStorage.getItem('isclick')
        if (rongyu_flower == null) {
            localStorage.setItem('isclick',true)
            flower_number++;
            $('.show_flower').text(flower_number)
            change_flower(flower_number);
        } 
        showMask();
        $('.share_before').show();
        
    });
    // 分享前发送好友按钮
    $('.shareb_btn').on('click',function(){
        $('.share_before').hide();
        $('.share').show();
        generateImage()
    });
    // 点击分享
    $('.mask').on('click',function(){
        if ($('.share').css('display') == 'block') {
            hideMask();
            $('.share').hide();
        }
    })
    // 点击抽取最高5.1G
    $('.highest_ext').on('click',function () {
        $('.glory').hide();
        $('.main').show();
    })
    
    // 点击抽取
    $('.lottery').on('click',function () {
        if ($(this).hasClass('one_flower')) {
            if (flower_number <1) {
                $('#unflower').text('1');
                showMask();
                $('.unling').show();
            } else {
                current_clickclass = '.one_flower'
                // 跳转链接本网
                // 测试用（选择两者中的一个链接）
                var cmaimg = true;
                if (cmaimg) {
                    $('#cm_aimg').css('background-image','url(images/cq_qita.gif)').attr('href','https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7858699aca01b75f&redirect_uri=http%3A%2F%2Fserviceimg.bmcc.com.cn%2Fweixin%2Fredirect%2FdispenseRequest.action&response_type=code&scope=snsapi_base&state=cxbxl2018072#wechat_redirect');    
                } else {
                    $('#cm_aimg').css('background-image','url(images/cm_10GB.gif)').attr('href','http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7858699aca01b75f&redirect_uri=http%3A%2F%2Fserviceimg.bmcc.com.cn%2Fweixin%2Fredirect%2FdispenseRequest.action&response_type=code&scope=snsapi_base&state=hxyhq10Y#wechat_redirect'); 
                }
                // 跳转异网
                $('#yi_aimg').css('background-image','url(images/cm_yidongw.gif)').attr('href',' https://service.bj.10086.cn/m/num/num/commonNum/showFontPage.action?busiCode=YDWKXCX');
                jiangli();
            }
        }else if ($(this).hasClass('five_flower')) {
            if (flower_number < 5) {
                $('#unflower').text('5');
                showMask();
                $('.unling').show();
            } else {
                current_clickclass = '.five_flower'
                // 跳转链接本网
                $('#cm_aimg').css('background-image','url(images/cm_yidongw.gif)').attr('href',' https://service.bj.10086.cn/m/num/num/commonNum/showFontPage.action?busiCode=YDWKXCX'); 
                // 跳转异网
                $('#yi_aimg').css('background-image','url(images/yi_wuxian.gif)').attr('href','  https://service.bj.10086.cn/m/num/num/commonNum/showFontPage.action?busiCode=WXKWTYW')
                jiangli()
            }
        }else if ($(this).hasClass('eight_flower')) {
            if (flower_number < 8) {
                $('#unflower').text('8');
                showMask();
                $('.unling').show();
            } else {
                current_clickclass = '.eight_flower'
                 // 跳转链接本网
                 $('#cm_aimg').css('background-image','url(images/cm_handt.gif)').attr('href','https://mp.weixin.qq.com/s/CtHh-Ea6txKdcEu_7zeHPA'); 
                 // 跳转异网
                 $('#yi_aimg').css('background-image','url(images/yi_kuandai.png)').attr('href','http://service.bj.10086.cn/m/p/kdzq/weixinyiwang/')
                jiangli()
            }
        }
    })

    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        // var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(17[2|8])|(165)|(147)|198)[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }

    // 点击绑定（提交）
    $('.bind_submit').on('click',function(){
        $('.bind').hide();
        $('.main').show();
    });
    // 点击主页返回
    $('.return').on('click',function(){
        $('.main').hide();
        $('.glory').show();
    })
    // (转增和取消)
    function Transfcancel () {
     if (increase) {
        //转增
        $('.tc-2').hide();  
        $('.tc-3').show();  
     } else {
        //  取消
        hideMask();
        $('.tc-2').hide();  
     }  
    };
    //异网流量弹窗 1（取消）
    $('.close-2').on('click',function(){
        increase = false;
        Transfcancel ();
    });
    //异网流量弹窗 1（转增）
    $('#giveBtn').on('click',function(){
        increase = true;
        Transfcancel ();
    });
    //异网流量弹窗 2,确定
    $('#giveBtn_2').on('click',function(){
        var input_val = $('#inputTel').val();
        if (istel(input_val)) {
            $('.tc-3').hide();
            $('.tc-4').show();
            $('.mobile').text(input_val);   
        } else {
           alert('请输入正确的北京移动号'); 
        }
       
    });
    //异网流量弹窗 3,修改
    $('#revise').on('click',function(){
        $('.tc-4').hide();
        $('.tc-3').show();
    });
    //异网流量弹窗 3,确定
    $('#giveBtn_3').on('click',function(){
        $('.tc-4').hide();
        $('.tc-5').show();
    });

    $('.close').on('click',function(){
        $(current_clickclass).text('查看奖励')
        $(this).parent().hide();
        hideMask();
    });

    // 活动规则
    $('.go_rule').on('click',function(){
        showMask();
        $('.rule').show();
    });
    // 活动规则确定
    $('.rule_close').on('click',function(){
        $('.rule').hide();
        hideMask();
    });
    // 未领奖的确定按钮
    $('.unsure').on('click',function(){
        $('.unling').hide();
        $('.share').show();
        generateImage()
    });
    // 姓名性别确定
    $('.sex_btn').on('click',function(){
        hideMask();
      $('.sex_name').hide();  
    })
    // 测试
    $('.test2').on('click',function(){
        $('.test2').css('color','red');
        attention = false;
    });
    $('.test3').on('click',function(){
        $('.test3').css('color','red');
        binding = false;
    });
    $('.test4').on('click',function(){
        $('.test4').css('color','red');
        CM = false;
    });
   
    // 测试展示几朵小红花
    $('.test_number_flower').on('click',function () {
        flower_status = true
        var class_test = $(this).prop('class')
        if (class_test.includes('6')) {
            $('.test6').css('color','red');
            flower_number = 5;
            change_flower(flower_number);
            $('.show_flower').text(flower_number);
        } else if (class_test.includes('7')) {
            $('.test7').css('color','red');
            flower_number = 8;
            change_flower(flower_number);
            $('.show_flower').text(flower_number);
        }
    })

    // 恢复首次登陆
    $('.test8').on('click',function () {
        $('.test8').css('color','red');
        localStorage.clear();
        window.location.href="index.html?time="+((new Date()).getTime());
    })

});
// 生成图片方法
function generateImage () {
    var getimg_length = $('.getimg').children('img').length
    if (getimg_length == 0) {
        var copyDom = $('#pic')[0]
        var width = copyDom.offsetWidth;
        var height = copyDom.offsetHeight;
        var scale = 2;
        html2canvas(document.getElementById('pic'),{
            dpi:window.devicePixelRatio*2,
            scale:scale,
            width:width,
            height:height,
        }).then(function(canvas){
            var imgUrl = canvas.toDataURL();
            $('.getimg').css({'width':width,'height':height,'margin':'0 auto'})
            $('.getimg').html('<img class="cavas_img" src="'+imgUrl+'" style="width:'+width+'px;height:'+height+'px">');
        })
    }
}


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
// 获取url参数
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
