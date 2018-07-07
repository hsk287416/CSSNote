var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width; // 获取canvas的宽度
var height = ctx.canvas.height; // 获取canvas的高度
var r = width / 2; // 设定半径为宽度的一半
var fontSize = width / 20; // 设定字体大小

// 设置时针的宽度
var hourPointWidth = width / 50;
// 设置分针的宽度（最小为3像素）
var minutePointWidth = hourPointWidth - 4 > 3 ? hourPointWidth - 4 : 3;
// 设置秒针的宽度（最小为1像素）
var secoundPointWidth = minutePointWidth - 3 > 1 ? minutePointWidth - 3 : 1;
// 设置表盘边框的宽度
var backgroundBorderWidth = width / 20;
// var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
var hourNumbers = ["Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ", "Ⅰ", "Ⅱ"];
// 将绘制区域的原点移动到(r, r)位置
ctx.translate(r, r);

draw();
setInterval(draw, 1000);

/**
 * 绘制
 */
function draw() {
    // 获取当前时间的时分秒
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // 清空当前画布
    ctx.clearRect(-r, -r, width, height);

    // 绘制表盘
    drawBackground();

    // 绘制时针
    drawHour(hour, minute);

    // 绘制分针
    drawMinute(minute, second);

    // 绘制秒针
    drawSecond(second);

    // 绘制表盘中间的圆圈
    drawBoll();
}

/**
 * 绘制表盘
 */
function drawBackground() {
    ctx.beginPath();
    ctx.arc(0, 0, r - backgroundBorderWidth / 2, 0, 2 * Math.PI);
    ctx.lineWidth = backgroundBorderWidth;
    ctx.stroke();

    // 指定文字的大小和字体样式
    ctx.font = fontSize + "px Times New Roman";
    // 水平居中
    ctx.textAlign = "center";
    // 垂直居中
    ctx.textBaseline = "middle";

    // 绘制文字
    hourNumbers.forEach(function(num, i) {
        // 求弧度
        var rad = 2 * Math.PI / 12 * i;

        var x = Math.cos(rad) * (r - fontSize * 2 - backgroundBorderWidth / 2);
        var y = Math.sin(rad) * (r - fontSize * 2 - backgroundBorderWidth / 2);
        ctx.fillStyle = "#000000";
        ctx.fillText(num, x, y);
    });

    // 绘制点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - fontSize - backgroundBorderWidth / 2);
        var y = Math.sin(rad) * (r - fontSize - backgroundBorderWidth / 2);

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        if (i % 5 == 0) {
            ctx.fillStyle = "#000000";
        } else {
            ctx.fillStyle = "#888888";
        }
        ctx.fill();
    }
}

/**
 * 绘制时针
 * @param {*} hour 小时
 * @param {*} minute 分钟
 */
function drawHour(hour, minute) {
    var rad = 2 * Math.PI / 12 * hour + 2 * Math.PI / 60 / 12 * minute;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(rad);
    ctx.lineWidth = hourPointWidth;
    ctx.lineCap = "round";
    ctx.moveTo(0, r / 10);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}

/**
 * 绘制分针
 * @param {*} minute 分钟
 * @param {*} second 秒
 */
function drawMinute(minute, second) {
    var rad = 2 * Math.PI / 60 * minute + 2 * Math.PI / 60 / 60 * second;;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(rad);
    ctx.lineWidth = minutePointWidth;
    ctx.lineCap = "round";
    ctx.moveTo(0, r / 7);
    ctx.lineTo(0, -r / 2 - (r / 7));
    ctx.stroke();
    ctx.restore();
}

/**
 * 绘制秒针
 * @param {*} second 秒
 */
function drawSecond(second) {
    var rad = 2 * Math.PI / 60 * second;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(rad);
    ctx.lineWidth = secoundPointWidth;
    ctx.lineCap = "round";
    ctx.moveTo(0, r / 5);
    ctx.lineTo(0, -r / 2 - (r / 5));
    ctx.strokeStyle = "#d41a1a";
    ctx.stroke();
    ctx.restore();
}

/**
 * 绘制中间的圆圈
 */
function drawBoll() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, hourPointWidth + 1, 0, 2 * Math.PI);
    ctx.fillStyle = "#cccccc";
    ctx.fill();
    ctx.restore();
}