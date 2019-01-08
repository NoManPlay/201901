/*
 * @Author: qtx
 * @Date: 2019-01-08 09:34:17
 * @LastEditors: qtx
 * @LastEditTime: 2019-01-08 09:47:33
 * @Description: barrage_canvas
 */

/*声明*/
var barrageArr = [];
var msgs;
var nArr = [];
var stamp;
var a = [];

/*创建对象*/
function Msg(msg) {
    this.msg = msg;
}

/*页面载入时加载*/
$(document).ready(function () {
    $("body").click(function () {
        $("#video")[0].play();
        $(".hint").remove();
    });
    setInterval(function () {
        getBarrage();
    }, 1000);
    getBarrage();
});

/*回调*/
function tempCallBack() {
    // console.log("获取", msgs);
}

/**
 * ajax获取实时弹幕
 */
function getBarrage() {
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
                // console.log(arr);
                var len = arr.length;
                msgs = r.data.bullets;
                tempCallBack();

                //第一次先存储数组
                if (len > 0 && barrageArr.length == 0) {
                    // console.log(111);
                    updateBarrageArr(arr);
                }

                //发生变化则
                if (len > 0 && barrageArr.length > 0 && isDataChange(arr)) {
                    // console.log(2);
                    var b = getNewData(arr);
                    // console.log(b);
                    $('canvas').barrager(b);
                    updateBarrageArr(arr);
                }
            } else {
                alert(r.errmsg);
            }
        }
    });
}

/*更新弹幕*/
function updateBarrageArr(arr) {
    a = [];
    nArr = [];
    barrageArr = [];
    stamp = arr[arr.length - 1].substring(0, 14);

    for (var i = 0; i < arr.length; i++) {
        barrageArr.push(arr[i]);
    }
}

/*数据是否发生改变*/
function isDataChange(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != barrageArr[i]) {
            return true;
        }
    }
    return false;
}

/*获取新数据*/
function getNewData(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var stamp2 = arr[i].substring(0, 14);
        // console.log(stamp2);
        if (stamp2 >= stamp) {
            nArr.push(arr[i]);
            // console.log(nArr);
        }
    }
    for (var j = 0; j < nArr.length; j++) {
        // console.log(msgs);
        var msg = nArr[j].slice(14);
        var m = new Msg(msg);
        a.push(m);
    }
    // console.log(a);
    return a;
}

/**
 * 固定轮循
 */
$(function () {
    setInterval(function () {
        a = [];
        var rand = Math.floor(Math.random() * msgs.length - 1);
        // console.log(rand);
        var msg = msgs[rand].slice(14);
        // console.log(msg);
        var m = new Msg(msg);
        a.push(m);
        $('canvas').barrager(a);
    }, 3000);
});