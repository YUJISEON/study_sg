window.onload = function() {
    let el = document.querySelectorAll('.box-list li');
    let checkPageNo = 9;
    
    // IntersectionObserver 선언
    // t.isIntersecting - 요소가 화면에 나왔을때 true를 반환
    // threshold - 요소가 몇 %나왔을 때 콜백함수 실행
    // observer.observe(element) - 해당 요소가 화면에 잡히도록 감시
    let observer = new IntersectionObserver((e)=>{
        e.forEach((t)=>{
            if(t.isIntersecting){
                getEventList();
            }
        });
    }, {threshold: 0.9});
    
    observer.observe(el[checkPageNo]);
    
    function getEventList(){
        $.ajax({
            url : 'getList.html',
            success : function(data){
                let r = data.trim();
                if(r == "finish" || r === ""){
                    observer.disconnect();
                    return false;
                }else{
                    $('.box-list').append(r);
                }
            },
            error : function(error){
                console.log(error);
            }
        });
    }
}

/*
visibility : hidden에서 visible 시키는 다른 에시
https://codepen.io/bloqhead/pen/dwMYdr
 */