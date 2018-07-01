# 1. 原图

代码：
```html
<div class="d1"></div>
<style>
    .d1 {
        height: 200px;
        width: 200px;
        background: yellowgreen;
    }
</style>
```


# 2. 方形
代码：
```html
<div class="d2"></div>
<style>
    .d2 {
        height: 200px;
        width: 200px;
        background: yellowgreen;
        /* 方形，以原图的中心为中心，裁剪成50px长，30px宽的方形 */
        clip-path: inset(50px 30px);
    }
</style>
```


# 3. 圆形
代码：
```html
<div class="d3"></div>
<style>
    .d3 {
        height: 200px;
        width: 200px;
        background: yellowgreen;
        /* 圆形，以(50%, 50%)为中心，50%为半径裁剪成圆形*/
        clip-path: circle(20% at 50% 50%);
    }
</style>
```


# 4. 不规则多边形
代码：
```html
<div class="d4"></div>
<style>
    .d4 {
        height: 200px;
        width: 200px;
        background: yellowgreen;
        /* 将以下坐标作为裁剪点，裁剪出不规则形状 */
        clip-path: polygon(0% 30%, 45% 30%, 45% 20%, 80% 45%, 45% 70%, 45% 60%, 0% 60%);
    }
</style>
```


# 5. 动画
代码：
```html
<div class="d5"></div>
<style>
    .d5 {
        height: 300px;
        width: 300px;
        background: yellowgreen;
        clip-path: circle(30% at 50% 50%);
        transition: clip-path 0.5s ease-in-out;
        -webkit-transition: clip-path 0.5s ease-in-out;
    }
    
    .d5:hover {
        clip-path: circle(40% at 50% 50%);
    }
</style>
```
