
var preload =  function(){
    var  ratio = 1920/1080;
    function resizeInit(){
        var aspect = document.body.clientWidth/document.body.clientHeight;
        if(aspect>ratio){
            document.documentElement.style.fontSize = document.body.clientHeight/1080*100+'px';
        }else{
            document.documentElement.style.fontSize = document.body.clientWidth/1920*100+'px';
        }
    }
    window.onresize = resizeInit;
    resizeInit();
}
window.onload =preload;
