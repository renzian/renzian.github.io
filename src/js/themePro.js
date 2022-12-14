
// =======================================主题设置============================================== 


if(localStorage.getItem("blur")=="false"){
    var blur=0;
    }else{
        var blur=1;
    
    }
    if(localStorage.getItem("yjjs")=="true"){
        var yjjs=1;
    }else{
        var yjjs=0;
        
    }

if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
function setBlur(){
    blur=!blur;
    localStorage.setItem("blur",blur);
    if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
}
// if(yjjs){
//     document.getElementById("yjjs").innerText=`
//     *:not(#web_bg){
//         transform:translateZ(0);
//         backface-visibility: hidden
//     }`}
//     else{
//         document.getElementById("yjjs").innerText=``
//     }
function yjjs1(){
    yjjs=!yjjs;
    localStorage.setItem("yjjs",yjjs)
    // if(yjjs){
    // document.getElementById("yjjs").innerText=`
    // *:not(#web_bg){
    //     transform:translateZ(0);
    //     backface-visibility: hidden
    // }`}
    // else{
    //     document.getElementById("yjjs").innerText=``
    // }
}
if(localStorage.getItem("theme")=="acrylic"){
    document.getElementById("css").href=""
}
switchTheme=function(){
    if(document.getElementById("css").href==window.location.protocol+"//"+window.location.host+"/css/stylessimple.css"){
        document.getElementById("css").href=""
        localStorage.setItem("theme","acrylic");
    }else{
        document.getElementById("css").href="/css/stylessimple.css"
        localStorage.setItem("theme","simple");
    }
}
setColor=function(c){
    document.getElementById("themeColor").innerText=`:root{--lyx-theme:var(--lyx-${c})!important}`;
    localStorage.setItem("themeColor",c);

}

if(localStorage.getItem("themeColor")==undefined){
    localStorage.setItem("themeColor","pink");
}

setColor(localStorage.getItem("themeColor"));



if(localStorage.getItem("hideRightside")==undefined){
    localStorage.setItem("hideRightside","0");
}

if(localStorage.getItem("hideRightside")=="1"){
    $("#rightside").toggle()
}
function toggleRightside(){
    $("#rightside").toggle();
    localStorage.setItem("hideRightside",Math.abs(Number(localStorage.getItem("hideRightside"))-1))
}

if(localStorage.getItem("font")==undefined){
    localStorage.setItem("font","HYTMR")
}
setFont(localStorage.getItem("font"))
// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    var bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}
function setFont(n){
    localStorage.setItem("font",n)
    if(n=="main"){
        document.body.style.fontFamily="-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
    }
    else{
        document.body.style.fontFamily="var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
        document.documentElement.style.setProperty('--global-font', n)
    }
}
// 以下为2.0新增内容

// 创建窗口
var winbox = ''

var isMax=false;
function createWinbox() {
    
    div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "   博客设置",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => {
            isMax=true;
            div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`
        },
        onrestore: () => {
            isMax=false;
            div.innerHTML = ''
        },
    });
    document.getElementsByClassName("wb-close")[0].onclick=function(){
        sessionStorage.setItem("settingWindow","close");
    }
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div class="settings" style="display: block;"><a class="reSettings content-button">恢复默认设置</a>
    <p></p>
    <h2 class="content-head">性能设置</h2>
    <p></p>
    <div class="content" style="display:flex"><input type="checkbox" id="blur" onclick="setBlur()">
        <div class="content-text">禁用模糊效果</div>
    </div>
    <div class="content" style="display:flex"><input type="checkbox" id="yjjs" onclick="yjjs1()"
            value="onrightMenurightMenu">
        <div class="content-text">硬件加速</div>
    </div>
    <p></p>
    <h2 class="content-head">主题设置</h2>
    <p></p>
    <div class="content" style="display:flex">
        <input type="checkbox" id="hideAside" onclick="toggleRightside()">
        <div class="content-text">隐藏侧边栏</div>
    </div>
    <h3 class="content-head">&nbsp;&nbsp;主题色</h3>
    <p></p>
    <div class="content content-color" style="display:flex">
        <input type="radio" id="red" name="colors" value=" " onclick="setColor('red')">
        <input type="radio" id="orange" name="colors" value=" " onclick="setColor('orange')">
        <input type="radio" id="yellow" name="colors" value=" " onclick="setColor('yellow')">
        <input type="radio" id="green" name="colors" value=" " onclick="setColor('green')">
        <input type="radio" id="blue" name="colors" value=" " onclick="setColor('blue')">
        <input type="radio" id="heoblue" name="colors" value=" " onclick="setColor('heoblue')">
        </br><p></p>
        <input type="radio" id="darkblue" name="colors" value=" " onclick="setColor('darkblue')">
        <input type="radio" id="purple" name="colors" value=" " onclick="setColor('purple')">
        <input type="radio" id="pink" name="colors" value=" " onclick="setColor('pink')" checked="checked">
        <input type="radio" id="black" name="colors" value=" " onclick="setColor('black')">
        <input type="radio" id="blackgray" name="colors" value=" " onclick="setColor('blackgray')"></div>
    <p></p>
    <p></p>
    <p></p>
    <h2 class="content-head">字体设置</h2>
    <div id="swfs">
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a><br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZXJLJ'!important;color:black" onclick="setFont('FZXJLJ')">方正金陵体</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZXS'!important;color:black" onclick="setFont('FZXS')">方正像素体</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZODZK'!important;color:black" onclick="setFont('FZODZK')">方正欧蝶正楷</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('main')">系统默认</a> <br>
    </div>
</div>

`;
$("#"+localStorage.getItem("themeColor")).attr("checked", true);
if(localStorage.getItem("blur")=="false"){
    document.getElementById("blur").checked=true;
}
if(localStorage.getItem("yjjs")=="true"){
    document.getElementById("yjjs").checked=true;
}
if(localStorage.getItem("hideRightside")=="1"){
    document.getElementById("hideAside").checked=true;
}
document.getElementsByClassName("reSettings")[0].onclick=function(){
    localStorage.clear()
    window.location.reload()
}
}

function winResize() {
    if(!isMax){
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }}
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) {winbox.toggleClass('hide');sessionStorage.setItem("settingWindow","close");}
    else {createWinbox();sessionStorage.setItem("settingWindow","open");}
}
if(sessionStorage.getItem("settingWindow")=="open"){
    createWinbox();
    
}


// ===============================更好的导航栏======================================

document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav(){
    document.getElementById("name-container").setAttribute("style", "display:none");

    var position = $(window).scrollTop();

    $(window).scroll(function () {

        var scroll = $(window).scrollTop();

        if (scroll > position) {


            document.getElementById("name-container").setAttribute("style", "");
            document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");

        } else {


            document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
            document.getElementById("name-container").setAttribute("style", "display:none");

        }

        position = scroll;

    });
    function scrollToTop(){
        document.getElementsByClassName("menus_items")[1].setAttribute("style","");
        document.getElementById("name-container").setAttribute("style","display:none");
        btf.scrollToDest(0, 500);
    }
//修复没有弄右键菜单的童鞋无法回顶部的问题
    document.getElementById("page-name").innerText = document.title.split(" | Zian")[0];
}

// ============================================弹窗提示===============================================

//首次访问弹窗
if (localStorage.getItem("popWelcomeWindow") != "0") {
    if(document.referrer==undefined||document.referrer.indexOf("yisous.xyz")!=-1||document.referrer.indexOf("ariasaka.top")!=-1){ //改成自己域名，注意是referrer!!! qwq
        Snackbar.show({
            pos: "top-right",
            showAction: false,
            text: '欢迎访问本站！'
        })
    }else{
        Snackbar.show({
            pos: "top-right",
            showAction: false,
            text: `欢迎来自${document.referrer.split("://")[1].split("/")[0]}的童鞋访问本站！`
        })
        localStorage.setItem("popWelcomeWindow", "0");
    }
}
if (sessionStorage.getItem("popCookieWindow") != "0") {
    setTimeout(function () {
        Snackbar.show({
            text: '本站使用Cookie和本地/会话存储保证浏览体验和网站统计',
            pos: 'bottom-right',
            actionText: "查看博客声明",
            onActionClick: function (element) {
                window.open("/license")
            },
        })
    }, 3000)
}
//不在弹出Cookie提醒
sessionStorage.setItem("popCookieWindow", "0");

//自带上文浏览器提示

function browserTC() {
    btf.snackbarShow("");
    Snackbar.show({
        text: '浏览器版本较低，网站样式可能错乱',
        actionText: '关闭',
        duration: '6000',
        pos: 'bottom-right'
    });
}
function browserVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
    var isOpera = userAgent.indexOf("Opera")>-1 || userAgent.indexOf("OPR")>-1 ; //Opera浏览器
    var isChrome = userAgent.indexOf("Chrome")>-1 && userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Chrome浏览器
    var isSafari = userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Chrome")==-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Safari浏览器
    if(isEdge) {
        if(userAgent.split('Edge/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isFirefox) {
        if(userAgent.split('Firefox/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isOpera) {
        if(userAgent.split('OPR/')[1].split('.')[0]<80){
            browserTC()
        }
    } else if(isChrome) {
        if(userAgent.split('Chrome/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isSafari) {
        //不知道Safari哪个版本是该淘汰的老旧版本
    }
}
//2022-10-29修正了一个错误：过期时间应使用toGMTString()，而不是toUTCString()，否则实际过期时间在中国差了8小时
function setCookies(obj, limitTime) {
    let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
    for (let i in obj) {
        document.cookie = i + '=' + obj[i] + ';expires=' + data
    }
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
if(getCookie('browsertc')!=1){
    setCookies({
        browsertc: 1,
    }, 1);
    browserVersion();
}
