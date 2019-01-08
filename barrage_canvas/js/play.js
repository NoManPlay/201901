/*
 * @Author: qtx
 * @Date: 2019-01-08 09:34:17
 * @LastEditors: qtx
 * @LastEditTime: 2019-01-08 09:47:45
 * @Description: barrage_canvas
 */
//播放视频
$(document).ready(function () {
    video.play();
});
$("body").click(function () {
    video.play();
});



var vList = [
    'video/2.mp4',
    'video/3.mp4',
    'video/4.mp4',
    'video/5.mp4',
    'video/6.mp4',
    'video/7.mp4',
    'video/8.mp4',
    'video/9.mp4',
    'video/10.mp4',
    'video/11.mp4',
    'video/1.mp4'
];
// 初始化播放列表   
var vLen = vList.length;
var curr = 0;
var video = document.getElementById("video");
video.addEventListener('ended', function () {
    play();
});

function play() {
    video.src = vList[curr];
    video.load();
    video.play();
    curr++;
    if (curr >= vLen) {
        curr = 0; //重新循环播放 
    }
}