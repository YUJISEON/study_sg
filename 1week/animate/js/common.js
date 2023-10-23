window.onload = function(){    
    const aniItem = document.querySelectorAll('.ani-item');

    aniItem.forEach(function(el, idx){
        el.addEventListener("mouseenter", function(){
            if (el.classList.contains('ani-item1')) { 
                el.style.setProperty('--animate-duration', '1s');
                animateCSS(el, 'bounce');
            }else if (el.classList.contains('ani-item2')) { 
                el.style.setProperty('--animate-duration', '2s');
                animateCSS(el, 'shakeY');
            } else if (el.classList.contains('ani-item3')) { 
                el.style.setProperty('--animate-duration', '1s');
                animateCSS(el, 'tada');
            } 
        });
    });

    const animateCSS = (element, animation, prefix = 'animate__') =>
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            let node = element;   
            console.log(node);
    
            node.classList.add(`${prefix}animated`, animationName);
    
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }
        
            node.addEventListener('animationend', handleAnimationEnd, {once: true});
        });
}