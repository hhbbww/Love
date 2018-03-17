window.addEventListener('load',function () {
    // 字体出现效果
    var lefts = document.querySelector('.left');
    var conents = lefts.querySelector('.conent');
    var dels = lefts.querySelector('.del');
    var love = document.querySelector('.love');
    var boxs = document.querySelector('.box');
    var index = 0;
    var t = setInterval(find,50);  // 字体出现的时间函数
    function find(){
        conents.innerText = dels.innerText.substring(0,index++)+'_';

        if(index == dels.innerText.length/2){
            block();  // 一段时间后心内的字体开始出现
        }
        if(index == dels.innerText.length+1){
            clearInterval(t);
        }
    }
    //心型出现
    draw();
    function draw(){
        var drawing = document.getElementById("myCanvas"),
            pic = document.getElementById('flower'); //获取描边图片
            drawing.width = '700'; //设置画布大小
            drawing.height = '700';
        if (drawing.getContext){
            var content = drawing.getContext("2d"),
                radian = 0,
                radian_add = Math.PI/73;
            content.translate(320,250);
            function heart(){

                var X = getX1(radian),
                Y = getY1(radian);
                content.drawImage(pic,X,Y,30,30);   //在给定坐标绘制给定大小的图片
                radian+=radian_add;
                if (radian > (2*Math.PI)){ //绘制完整的心型线后取消间歇调用
                    clearInterval(intervalId);
                }

            }

            intervalId = setInterval(heart,100);  //设置间歇调用，间隔为100ms
        }

    }
    function getX1(t){  //获取心型线的X坐标
        return 20*(16*Math.pow(Math.sin(t),3))
    }

    function getY1(t){  //获取心型线的Y坐标
        return -20*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
    }
//  时间：

    var times = boxs.querySelector('.time');
    var digits =times.querySelectorAll('.digit');
    var dates = new Date(); //获取当前的时间
    var dateold = dates.getTime(); //  获取1970年的时间
    var newdate = new Date('23:15:00 2018/3/13'); // 设置规定的时间
    var olddate = newdate.getTime(); // 获取1970年到规定时间的时间段
    var ts = (dateold - olddate)/1000;
    // 进行天 时  分  秒的 逐个计算
    digits[0].innerText = parseInt(ts/60/60/24);
    digits[1].innerText = parseInt(ts/60/60%24);
    digits[2].innerText = parseInt(ts/60%60);
    digits[3].innerHTML = parseInt(ts%60);
    setInterval(fn,1000);  // 页面中时间的跳动
    function fn() {
        dates = new Date();
        dateold = dates.getTime();
        newdate = new Date('23:15:00 2018/3/13');
        olddate = newdate.getTime();
        ts = (dateold - olddate)/1000;
        digits[3].innerHTML = parseInt(ts%60);
        digits[0].innerText = parseInt(ts/60/60/24);
        digits[1].innerText = parseInt(ts/60/60%24);
        digits[2].innerText = parseInt(ts/60%60);
    }

// 淡出

    function block() {
        animate(love,{opacity:1},3000);
        animate(boxs,{opacity:1},3000);
    }

// 雪花
    function Obj(){}  //创建一个对象

    /*为这个对象添加一个具有一个参数的原型方法*/
    Obj.prototype.draw=function(o){
        var speed=0;   //雪花每次下落的数值（10px）
        var startPosLeft=Math.ceil(Math.random()*document.documentElement.clientWidth);//设置雪花随机的开始x值的大小
        o.style.opacity=(Math.ceil(Math.random()*3)+7)/10;  //设置透明度
        o.style.left=startPosLeft+'px';
        o.style.color="#fff";
        o.style.fontSize=12+Math.ceil(Math.random()*14)+'px';
        setInterval(function(){
            //雪花下落的top值小于屏幕的可视区域高时执行下列
            if(speed<document.documentElement.clientHeight){
                o.style.top=speed+'px';
                o.style.left=startPosLeft+Math.ceil(Math.random()*8)+'px';
                speed+=10;
            }
            else{
                o.style.display='none';
            }
        },400);
    }

    var flame=document.getElementById('flame');

    /*使用setInterval定时器每800毫秒创建一个雪花*/
    setInterval(function(){
        var odiv=document.createElement('div');  //创建div
        odiv.innerHTML="✽";   //div的内容
        odiv.style.position='absolute';  //div的绝对定位
        flame.appendChild(odiv);   //把创建好的div放进flame中
        var obj=new Obj();   //创建函数
        obj.draw(odiv);  //执行obj的draw方法
    },800);
});
