var WINDOW_WIDTH = 1024; // canvas的宽度
var WINDOW_HEIGHT = 768; // canvas的高度
var RADIUS = 8; // 小球的半径
var MARGIN_TOP = 60; // 每一个数字距离canvas顶部的长度
var MARGIN_LEFT = 30; // 第一个数字距离canvas左边栏的长度

window.onload = function() {
    var canvas = document.getElementById("can");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    setInterval(function() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        render(hours, minutes, seconds, context);
    }, 1000);
}

/**
 * 绘制时间
 * @param {*} hours 小时
 * @param {*} minutes 分钟
 * @param {*} seconds 秒
 * @param {*} context canvas上下文
 */
function render(hours, minutes, seconds, context) {
    // 绘制小时的第一个数字
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), context);

    // 绘制小时的第二个数字
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), context);

    // 绘制冒号
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context);

    // 绘制分钟的第一个数字
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), context);

    // 绘制分钟的第二个数字
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), context);

    // 绘制冒号
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);

    // 绘制秒的第一个数字
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), context);

    // 绘制秒的第二个数字
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), context);
}

/**
 * 绘制一个单独的数字
 * @param {*} x 起始横坐标
 * @param {*} y 起始纵坐标
 * @param {*} num 数字
 * @param {*} context canvas上下文
 */
function renderDigit(x, y, num, context) {
    context.fillStyle = "#0094ff";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                context.beginPath();
                context.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
            }
        }
    }
}