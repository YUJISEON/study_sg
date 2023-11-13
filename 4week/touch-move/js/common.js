$(function(){
    $('select:not(.ignore)').niceSelect();      
})

let isTop = false;
let $mapList = document.getElementById('mapList');
let isMoblie = false;


function toggleMap(idx = '', obj = '') {
    var idx = idx ? ( idx == 1 ? 0 : 1 ) : $(obj).index();
    
    $('.map_btn').addClass('on');
    $('.map_btn').eq(idx).removeClass('on');

    if ( idx == 0 ) {
        $('.map_list').removeClass('active');
        if ( isMoblie) {
            $('.map_list').removeClass('move');
            $('.map_list').css('top', '100svh');
            isTop = false;
        } 
    } else if ( idx == 1 ) {
        $('.map_list').addClass('active');
        if ( isMoblie) {
            $('.map_list').css({
                'top' : '55svh'
            });
        }
    }
}

    
$(function(){
    $(window).on('resize', function(){
        var winW = $(window).innerWidth();
        if( winW > 1025 ) {
            toggleMap(2);
        } 

    })
})


window.onload = function() {
    if ( 'ontouchstart' in window ) {
        if ($mapList != null) {            
            $('html, body').addClass('no-reset');
            $('.map_list').addClass('action');          
            let lateral = new MenuLateral();    
            isMoblie = true;              
        }
    } 
}

    
// MENÚ LATERAL
// ------------
function MenuLateral(){
    var dis     = this;
    dis.menu    = $mapList;
    dis.touchsi = 'ontouchstart' in window;
    // 이벤트를 저장하기 위한 변수
    dis.empieza;   // 시작
    dis.mientras;  // 무브
    dis.termina;   // 끝
    dis.moviendo = false; // 움직임 여부
    dis.puntoPartida; // 터치가 시작된 지점
    dis.movido; // 움직인 거리
    dis.movidoPerv = 0;
    dis.height = 0;
    dis.heightPrev = 0;
    dis.changeH = 0;
    dis.moveOffsetTop;
    dis.pos; //. offsetTop 값
    dis.abierto = false; // 리스트가 열려있는지 여부
    dis.isScroll = 0;
    dis.currentW = 0;
    dis.topValue = 0;
    
    // 모바일용 터치를 지원하는지 묻고 이벤트를 변수에 할당
    if (dis.touchsi) {
        dis.empieza  = 'touchstart';
        dis.mientras = 'touchmove';
        dis.termina  = 'touchend';
    }else{
        dis.empieza  = 'mousedown';
        dis.mientras = 'mousemove';
        dis.termina  = 'mouseup';
    }

    // 움직임 감지 시작 
    // touchstart!!!!!
    dis.menu.addEventListener(dis.empieza, function(event){
        dis.currentW = $(window).innerWidth();
        dis.topValue = dis.currentW > 376 ? 52 : 165 ;
        dis.height = $mapList.offsetHeight;

        if ( $mapList.classList.contains('active') && !$('.detail_list').hasClass('on') ) { 
            if( !isTop ) {
                //event.preventDefault();
                $mapList.classList.remove('prevent');
            } 

            // 움직임 여부
            dis.moviendo = true;

            if (dis.touchsi) {
                dis.puntoPartida = event.touches[0].clientY;
                dis.pos = dis.menu.offsetTop * -1;
            }else{
                dis.puntoPartida = event.clientY;
                dis.pos = dis.menu.offsetTop * -1;
            }    
        }

    }, { passive: true });
    
    // touchmove!!!!!
    document.addEventListener(dis.mientras, function(event){        
        if ( $mapList.classList.contains('active') && !$('.detail_list').hasClass('on') ) { 
            if( !isTop ) {
                //event.preventDefault();
                $mapList.classList.add('prevent');
            } 
            
            // 움직였다면
            if(dis.moviendo ){

                // 터치한 시점에서 - 움직인 지점 = 움직인 값
                if(dis.touchsi){
                    dis.movido = event.touches[0].clientY - dis.puntoPartida;
                }else{
                    dis.movido = event.clientY - dis.puntoPartida;
                }            

                dis.isScroll = document.getElementsByClassName('list_wrap')[0].scrollTop;
                
                // 움직인 거리 - 메뉴의 offsetTop 위치         
                // 박스가 top이 된 상태에서, isScroll = 0이고 무브를 아래로 할 경우 움직임  
                if (  (dis.movido - dis.pos) < dis.topValue  || (isTop && dis.isScroll !== 0 && dis.movido > 0) ) {
                    return false;
                } else {                    
                    dis.moveOffsetTop = dis.menu.offsetTop;
                    dis.menu.style.top = (dis.movido - dis.pos)+'px';   
                    $mapList.classList.add('move');

                    //console.log("변화하는 top 값 : " + dis.movido, dis.pos);
                    //console.log("변화하는OffsetTop 값 : " + dis.moveOffsetTop);
                }  
            }
        }
    
    }, { passive: true });

    // touchend!!!!!
    document.addEventListener(dis.termina, function(event){
        var percent = dis.moveOffsetTop * 100 / dis.height ;

        //event.preventDefault();
        $mapList.classList.remove('prevent');
        if( dis.movido > 5 && dis.movido < -5) return false;

        if ( $mapList.classList.contains('active') && !$('.detail_list').hasClass('on') ) { 
            // 움직임이 끝난 경우 
            dis.moviendo = false;
        
            // 양수 -> 아래로 , 음수 -> 위로            
            if (percent <= 45) {
                dis.menu.style.top = dis.topValue +'px';
                dis.abierto  = true;                
                isTop = true;
                $('.map_list').addClass('top');
            } else if (45 < percent && percent <= 90) {
                dis.menu.style.top = '55svh';
                dis.abierto  = true;
                isTop = false;
                $('.map_list').removeClass('top');
                toggleMap(2);                
            } else if (90 < percent) {
                dis.menu.style.top = '100svh';
                dis.abierto = false;      
                isTop = false;
                $('.map_list').removeClass('top');          
                toggleMap(1);
            }

            setTimeout(function(){
                $mapList.classList.remove('move');                
            })
        }
    }, { passive: true });
}

/* 래퍼런스 
https://codepen.io/yusufbkr/pen/gbELQX
*/