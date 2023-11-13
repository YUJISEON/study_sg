$(function(){
    includeLayout();
});

function includeLayout(){
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function() {
        self = $(this);
        url = self.data("include");
        self.load(url, function() {
            self.removeAttr("data-include");
        });
    });
}


function ppAlert(opts){
    var alertHTML = '';

    if ($('.alertOverlay2').length > 0) {
        $('.alertOverlay2').remove();
    }

    if ($('.pp-alert').length > 0) {
        $('.pp-alert').remove();
    }

    if (typeof opts == 'string') {
        var alertHTML = `
            <div id="alertModal" class="popup pp-alert small_modal" style="z-index:9999;">
                <div class="pop_wrap">
                    <div class="size">
                        <div class="pop_inner">
                            <div class="pop_cont">
                                <div class="txt_box">
                                    <p id="msg">${opts}</p>
                                </div>
                                <div class="btnSet">
                                    <a href="javascript:;" class="btn btn1 lime">확인</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    } else {
        var alertHTML = `
        <div ${opts.id ? 'id="'+ opts.id +'"' : ''} class="popup pp-alert ${opts.button2 ? ' confirm' : ''} small_modal" style="z-index:9999;">
            <div class="pop_wrap">
                <div class="size">
                    <div class="pop_inner">
                        <div class="pop_cont">
                            <div class="txt_box">
                                <p id="msg2">${opts.text}</p>
                            </div>
                            <div class="btnSet">
                            ${opts.button2 ? '<a href="javascript:;" class="btn lime btn2">'+ opts.button2.text +'</a>' : ''}
                                ${opts.button1 ? '<a href="javascript:;" class="btn gr btn1">'+ opts.button1.text +'</a>' : '<a href="javascript:;" class="btn lime btn1"확인</a>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    $('html').append(alertHTML);
    
    $('.pp-alert').css('display', 'block');

    // button 클릭
    $('.pp-alert .btn1').on('click', function(e){
        $('.pp-alert').css('display', 'none');
        if (opts.button1) {
            if (opts.button1.click) opts.button1.click(e);
        }
    });

    if (opts.button2) {
        $('.pp-alert .btn2').on('click', function(e){
            $('.pp-alert').css('display', 'none');
            if (opts.button2) {
                if (opts.button2.click) opts.button2.click(e);
            }
        });
    }
};
