1. 移动端touch事件（区分webkit和winphone）
// 触摸事件
gesturestart          //当两个手指接触屏幕时触发
gesturechange      //当两个手指接触屏幕后开始移动时触发
gestureend
// 屏幕旋转事件   
onorientationchange     
// 检测触摸屏幕的手指何时改变方向       
orientationchange       
// touch事件支持的相关属性
touches         
targetTouches       
changedTouches              
clientX　　　　// X coordinate of touch relative to the viewport (excludes scroll offset)       
clientY　　　　// Y coordinate of touch relative to the viewport (excludes scroll offset)       
screenX　　　 // Relative to the screen        
screenY 　　  // Relative to the screen       
pageX　　 　　// Relative to the full page (includes scrolling)     
pageY　　　　 // Relative to the full page (includes scrolling)     
target　　　　 // Node the touch event originated from      
identifier　　   // An identifying number, unique to each touch event
/* 当用户手指放在移动设备在屏幕上滑动会触发的touch事件 */
// 以下支持webkit
touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
touchend——当手指离开屏幕时触发
touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用
//TouchEvent说明：
touches：屏幕上所有手指的信息
targetTouches：手指在目标区域的手指信息
changedTouches：最近一次触发该事件的手指信息
touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息
//参数信息(changedTouches[0])
clientX、clientY在显示区的坐标
target：当前元素
//事件响应顺序
ontouchstart  > ontouchmove  > ontouchend > onclick
// 以下支持winphone 8
MSPointerDown——当手指触碰屏幕时候发生。不管当前有多少只手指
MSPointerMove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用css的html{-ms-touch-action: none;}可以阻止默认情况的发生：阻止页面滚动
MSPointerUp——当手指离开屏幕时触发



2. 快速点击
// 移动端click屏幕产生200-300ms的延时响应 
// 说明：移动设备上的web网页是有300ms延迟的，往往会造成按钮点击延迟甚至是点击失效。
// 以下是历史原因，来源一个公司内一个同事的分享：
// <a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。

//解决方案：
 fastclick可以解决在手机上点击事件的300ms延迟
 zepto的touch模块，tap事件也是为了解决在click的延迟问题



3. 屏幕旋转的事件和样式
//JS处理
function orientInit(){
    var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight?'landscape':'portrait';
    if(orientChk =='lapdscape'){
        //这里是横屏下需要执行的事件
    }else{
        //这里是竖屏下需要执行的事件
    }
}
orientInit();
window.addEventListener('onorientationchange' in window?'orientationchange':'resize', function(){
    setTimeout(orientInit, 100);
},false)    
//CSS处理
//竖屏时样式
@media all and (orientation:portrait){   }
//横屏时样式
@media all and (orientation:landscape){   }



 4. 重力感应事件
// 运用HTML5的deviceMotion，调用重力感应事件
if(window.DeviceMotionEvent){
    document.addEventListener('devicemotion', deviceMotionHandler, false)
}   

var speed = 30;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandler(eventData){
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y; 
    z = acceleration.z;
    if(Math.abs(x-lastX)>speed || Math.abs(y-lastY)>speed || Math.abs(z-lastZ)>speed ){
        //这里是摇动后要执行的方法 
        yaoAfter();
    }
    lastX = x;
    lastY = y;
    lastZ = z;
}

function yaoAfter(){
    //do something
}
//说明：说见案例摇一摇效果中yao.js



5. 微信浏览器用户调整字体大小后页面矬了，怎么阻止用户调整
//以下代码可使Android机页面不再受用户字体缩放强制改变大小，但是会有1S左右延时，期间可以考虑loading来处理
if (typeof(WeixinJSBridge) == "undefined") {
    document.addEventListener("WeixinJSBridgeReady", function (e) {
        setTimeout(function(){
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
                alert(JSON.stringify(res));
            })
        }, 0)
    });
}else{  
    setTimeout(function(){
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
            alert(JSON.stringify(res));
        })
    }, 0)   
}

//IOS下可使用 -webkit-text-size-adjust禁止用户调整字体大小
body { -webkit-text-size-adjust:100%!important; }
//最好的解决方案：最好使用rem或百分比布局



6. css定位的bug修复
//fixed定位
//1.ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
//2.android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
//3.ios4下不支持position:fixed
//解决方案：使用[Iscroll](http://cubiq.org/iscroll-5)，如：
// <div id="wrapper">
//         <ul>
//                <li></li>
//                .....
//         </ul>
// </div>
    var myscroll;
    function loaded(){
        myscroll=new iScroll("wrapper");
    }
    window.addEventListener("DOMContentLoaded",loaded,false);
// </script>

//position定位
//Android下弹出软键盘弹出时，影响absolute元素定位
//解决方案:
var ua = navigator.userAgent.indexOf('Android');
if(ua>-1){
    $('.ipt').on('focus', function(){
        $('.css').css({'visibility':'hidden'})
    }).on('blur', function(){
        $('.css').css({'visibility':'visible'})
    })
}



7. JS判断设备
function deviceType(){
    var ua = navigator.userAgent;
    var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
    for(var i=0; i<len,len = agent.length; i++){
        if(ua.indexOf(agent[i])>0){         
            break;
        }
    }
}
deviceType();
window.addEventListener('resize', function(){
    deviceType();
})



8. JS判断微信浏览器
function isWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=='micromessenger'){
        return true;
    }else{
        return false;
    }
}
//1.三星 Galaxy S4中自带浏览器不支持border-radius缩写
//2.同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分
//3.部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色
//4.android无法同时播放多音频audio

//1.禁止使用iframe（阻塞父文档onload事件）
//2.禁止使用gif图片实现loading效果（降低CPU消耗，提升渲染性能）
//使用CSS3代码代替JS动画；
//开启GPU加速；
//使用base64位编码图片(不小图而言，大图不建议使用)
    // 对于一些小图标，可以使用base64位编码，以减少网络请求。但不建议大图使用，比较耗费CPU。小图标优势在于：
    //1.减少HTTP请求；
    //2.避免文件跨域；
    //3.修改及时生效；
