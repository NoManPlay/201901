/**
 * 声明
 */
var bulletArr = [];
var msgs;
var nArr = [];
var stamp;
/**
 * 准备
 */

$(document).ready(function () {
    $("#video")[0].play();
    $("body").click(function () {
        $("#video")[0].play();
        $(".hint").remove();
    });
    setInterval(function () {
        getBullets();
    }, 1000);
    getBullets();

    /*监听动画完成*/
    $(document).on("webkitAnimationEnd", ".bullet", function (e) {
        $(e.target).remove();
    });
    $(document).on("webkitAnimationEnd", ".bullet2", function (e) {
        $(e.target).remove();
    });
    $(document).on("webkitAnimationEnd", ".bullet3", function (e) {
        $(e.target).remove();
    });
});

//回调
function tempCallBack() {
    // console.log("获取", msgs);
}

/**
 * AJAX
 */
function getBullets() {
    $.ajax({
        type: "GET",
        url: '',
        data: $(this).serialize(), // 你的formid
        dataType: 'json',
        error: function (request) {
            // console.log(request);
            alert("Connection error");
        },
        success: function (r) {
            // console.log(r.data.bullets);
            if (r.errcode == 0) {
                var arr = r.data.bullets;
                var len = arr.length;
                msgs = r.data.bullets;
                tempCallBack();
                //第一次先存储数组
                if (len > 0 && bulletArr.length == 0) {
                    // console.log(111);
                    updateBulletArr(arr);
                }
                //发生变化则
                if (len > 0 && bulletArr.length > 0 && isDataChange(arr)) {
                    // console.log(222);
                    var b = getNewData(arr);
                    // console.log(b);

                    for (var j = 0; j < b.length; j++) {
                        showBullet(b[j]);
                        // console.log("a");
                    }
                    updateBulletArr(arr);
                }
            } else {
                alert(r.errmsg);
            }
        }
    });
}

/**
 * 相关函数
 */
function updateBulletArr(arr) {
    nArr = [];
    bulletArr = [];
    stamp = arr[arr.length - 1].substring(0, 14);
    // console.log(stamp);
    for (var i = 0; i < arr.length; i++) {
        bulletArr.push(arr[i]);
    }
}

function isDataChange(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != bulletArr[i]) {
            return true;
        }
    }
    return false;
}

function getNewData(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var stamp2 = arr[i].substring(0, 14);
        // console.log(stamp2);
        if (stamp2 >= stamp) {
            nArr.push(arr[i]);
            // console.log(nArr);
        }
    }
    return nArr;
}

/**
 * 显示弹幕
 */

var bc = 1;

function showBullet(str) {
    if (tops.length == 0) {
        tops = [
            '70px',
            '105px',
            '140px',
            '175px',
            '210px',
            '245px',
            '280px',
            '315px',
            '350px',
            '385px'
        ];
    }

    // str = $.trim(str.slice(14)).replace(/\s/g,"");
    str = str.slice(14);
    var topPos = selectTrack();
    var q1 = $('.bullet').map(function () {
        return $(this).css('top');
    }).get().join(',');
    var q2 = $('.bullet').map(function () {
        return $(this).css('top');
    }).get().join(',');
    var mod = bc % 20;
    var left = 110 + mod;
    var speed = 5 + mod;
    var html;
    // var topPos = Math.floor((parseInt($('video').innerHeight()) - 600) * Math.random()) + 30; //弹幕位置
    var colorTxt = getRandomColor();
    var divWidth = getTextWidth(str);
    html = '<div class="bullet" style="top:' + topPos + ';width:' + divWidth + 'px;color:' + colorTxt + ';" id="myBullet' + bc + '">' + str + '</div>';
    if (q1.indexOf(topPos) != -1) {
        if (q2.indexOf(q1) != -1) {
            html = '<div class="bullet2" style="top:' + topPos + ';width:' + divWidth + 'px;color:' + colorTxt + ';" id="myBullet' + bc + '">' + str + '</div>';
        } else {
            html = '<div class="bullet3" style="top:' + topPos + ';width:' + divWidth + 'px;color:' + colorTxt + ';" id="myBullet' + bc + '">' + str + '</div>';
        }
    } else {
        html = '<div class="bullet" style="top:' + topPos + ';width:' + divWidth + 'px;color:' + colorTxt + ';" id="myBullet' + bc + '">' + str + '</div>';
    }

    $("#bulletBox").append(html);
    bc++;
    nArr = [];
}

/*固定轮循*/
setInterval(function () {
    var random = Math.floor(Math.random() * msgs.length - 1);
    nArr.push(msgs[random]);
    showBullet(msgs[random]);
}, 3000);

/*获取显示宽度*/
function getTextWidth(str) {
    var w = $('body').append($('<span stlye="display:none;"id="textWidth"/>')).find('#textWidth').html(str).width();
    $('#textWidth').remove();
    return w + 20;
}

/**
 * 从列表中获取颜色
 */

var colors = [
    '#FFFFFF',
    '#9B9B9B',
    '#222222',
    '#CC0273',
    '#89D5FF',
    '#4266BE',
    '#019899',
    '#00CD00',
    '#A0EE00',
    '#FFFF00',
    '#FFD302',
    '#FFAA02',
    '#FF7204',
    '#FE0302'
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * 弹幕轨道
 */
var tops = [
    '70px',
    '105px',
    '140px',
    '175px',
    '210px',
    '245px',
    '280px',
    '315px',
    '350px',
    '385px'
];

function selectTrack() {
    var _top = tops[Math.floor(Math.random() * tops.length)];
    tops.remove(_top);
    // console.log(tops);
    return _top;
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};