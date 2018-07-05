var canvasWidth = 800;
var canvasHeight = canvasWidth;
var maxLineWidth = 16;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;

var canvas = document.getElementById("can");
var context = canvas.getContext("2d");
var isMouseDown = false;
var lastLoc = { x: 0, y: 0 };
var lastTimestamp = 0;
var lastLineWidth = 0;
canvas.height = canvasHeight;
canvas.width = canvasWidth;

drawGrid(context);
canvas.onmousedown = function(e) {
    e.preventDefault();
    isMouseDown = true;
    lastLoc = windowToCanvas(e.clientX, e.clientY);
    lastTimestamp = new Date().getTime();
};

canvas.onmouseup = function(e) {
    e.preventDefault();
    isMouseDown = false;
};

canvas.onmouseout = function(e) {
    e.preventDefault();
    isMouseDown = false;
};

canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown) {
        // TODO 绘制
        var currentLoc = windowToCanvas(e.clientX, e.clientY);
        var currentTimestamp = new Date().getTime();
        var distance = calcDistance(currentLoc, lastLoc);
        var time = currentTimestamp - lastTimestamp;
        var lineWidth = calsLineWidth(time, distance);

        context.beginPath();
        context.moveTo(lastLoc.x, lastLoc.y);
        context.lineTo(currentLoc.x, currentLoc.y);

        context.strokeStyle = "#333333";
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

        lastLoc = currentLoc;
        lastTimestamp = currentTimestamp;
        lastLineWidth = lineWidth;
    }
};

function drawGrid() {
    context.save();

    // 绘制边框
    context.strokeStyle = "rgb(220, 11, 9)";
    context.beginPath();
    context.moveTo(3, 3);
    context.lineTo(canvasWidth - 3, 3);
    context.lineTo(canvasWidth - 3, canvasHeight - 3);
    context.lineTo(3, canvasHeight - 3);
    context.closePath();
    context.lineWidth = 6;
    context.stroke();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, canvasHeight);

    context.moveTo(canvasWidth, 0);
    context.lineTo(0, canvasHeight);

    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);

    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);
    context.lineWidth = 1;
    context.stroke();

    context.restore();
}
/**
 * 计算鼠标在canvas中的位置
 * @param {*} x window中的横坐标
 * @param {*} y window中的纵坐标
 */
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) };
}
/**
 * 计算出两个点之间的距离
 * @param {*} loc1 第一个点
 * @param {*} loc2 第二个点
 */
function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y));
}

function calsLineWidth(time, distance) {
    var v = distance / time;
    var resultLineWidth = 0;
    if (v <= minStrokeV) {
        resultLineWidth = maxLineWidth;
    } else if (v >= maxStrokeV) {
        resultLineWidth = minLineWidth;
    } else {
        resultLineWidth = maxLineWidth - (v - minStrokeV) / (maxStrokeV - minStrokeV) * (maxLineWidth - minLineWidth);
    }
    if (lastLineWidth === 0) {
        return resultLineWidth;
    }
    return resultLineWidth / 8 * 3 + lastLineWidth / 8 * 5;
}

document.getElementById("clear_btn").onclick = function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
};