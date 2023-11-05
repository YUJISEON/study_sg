$(function(){
    $('select:not(.ignore)').niceSelect();      
})

//팝업 관리
const openPopup = (id, i = "", _this = "") =>{	
    console.log(id);

    // 팝업창 초기화
    if( $('.pop_cont #pdepart_type').length ) $('.pop_cont #pdepart_type').val("");
    if( $('.pop_cont .sval').length ) $('.pop_cont .sval').val('');
    if( $('.pop_cont #ser_body').length && !$('.pop_cont #ser_body').hasClass('show_body') ) $('.pop_cont #ser_body tbody tr').remove();
    if( $('.pop_cont .result_body').length ) $('.pop_cont .result_body li').remove();
    if( $('#documentPopup').find('.filename').length ) $('#documentPopup').find('.filename').val('');

    if( id == 'accperson' || id == 'fulperson' || id == 'helpperson' ) {
        $('#selEmployee').css('display', 'block');      
        $('#selEmployee').attr('data-name', id); 
    } if(id == 'editRecord') {
        if(i == 'client' ) { 
            var _birthday =  $(_this).attr('data-birthday');
            $('#birthday').val(_birthday);
            //$('.birthday_tr').css("display", "table-row");
            $('.birthday_tr').addClass('on');
            $('#editRecord .sub_tit h2').text('의뢰인 정보');
        } else if (i == 'other') {
            $('#editRecord .sub_tit h2').text('상대방 정보');
            //$('.birthday_tr').css("display", "none");
            $('.birthday_tr').removeClass('on');
        } else if (i == 'third') {
            $('#editRecord .sub_tit h2').text('제3자 정보');
            //$('.birthday_tr').css("display", "none");
            $('.birthday_tr').removeClass('on');
        }

        if( i !== '') {
            
            var idx =  $(_this).attr('data-idx');
            var _name =  $(_this).attr('data-name');
            var _tel =  $(_this).attr('data-tel');        
            var _email1 =  $(_this).attr('data-email1');
            var _email2 =  $(_this).attr('data-email2');
            var _zipcode =  $(_this).attr('data-zipcode');
            var _address1 =  $(_this).attr('data-address1');
            var _address2 =  $(_this).attr('data-address2');
            
            $('#name').val(_name);
            $('#tel').val(_tel);        
            $('#email1').val(_email1);
            $('#email2').val(_email2);
            $('#zipcode').val(_zipcode);
            $('#address1').val(_address1);
            $('#address2').val(_address2);    
            $('#target_id').val(idx);
            $('#editRecord').attr('data-idx', idx);

            /*$('.add-btn').hide();
            $('.edit-btn').show();*/
            $('.record-type').css("display", "none");

            $('.targetType').prop('checked', false); 
            if(i == 'client'){ 
                $('#recordType1').prop('checked', true);  
            }else if(i == 'other'){
                $('#recordType2').prop('checked', true);
            }else if(i == 'third'){
                $('#recordType3').prop('checked', true);
            }

            $('#target_id').val();
            $('#ex_cmd').val('edit');

        } else {
            $('#name').val('');
            $('#tel').val('');      
            $('#birthday').val('');  
            $('#email1').val('');
            $('#email2').val('');
            $('#email_drop').val('');
            $('#email_drop').niceSelect('update');
            $('#zipcode').val('');
            $('#address1').val('');
            $('#address2').val('');   
            $('#target_id').val('');
            $('#editRecord').attr('data-idx', 'add');   

            /*$('.add-btn').show();
            $('.edit-btn').hide();*/
            $('.record-type').css("display", "table-row");
            $('.birthday_tr').addClass('on');
            $('#recordType1').prop('checked', true);
            $('#ex_cmd').val('write');
        }

        $('#editRecord').css('display', 'block');
    }

    if(i !== '') {
        $('#' + id).attr('data-type', i);
    } 

	return id;
}

const closePopup = (id = "") => {
	$('.popup').css('display', 'none');

    if(id != ""){
        $('#' + id).css('display', 'none');
    }
    
    $('.popup').attr('data-name', '');

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

// 토글버튼
function toggleSelect(_this, type) {  
    if( !$(_this).hasClass('off') ) {
        setSelect(_this, type);
    } else {
        delSelect(_this, type);
    }   
}

// toggle - 인덱스 비교
function toggleBlock(obj, val = '', objAdd = '', _this = '') {
    //console.log(obj);
    //console.log(val);

    $(obj).removeClass('on');

    if(val !== '')  {         
        if ( val == 'all') {
            $(obj).addClass('on'); 
        } else {
            $(obj).eq(val).addClass('on'); 
        }        
    }

    if(objAdd !== '') { 
        $(objAdd).addClass('on');
    } else {
        $(obj).eq(val).next('.toggle_tr_add').removeClass('on');
    }

    if(_this !== '')  { 
        var tabParents = $(_this).parents('li').parents('ul').parents('.tab_wrap');
        var isTab = $(_this).parents('li').parents('ul').parents('.tab_wrap').length;
        if( isTab ) {
            tabParents.find('.tbl_tab ul li').removeClass('on');
            $(_this).parents('li').addClass('on');
        }
    }

}

function toggleBlock2(obj, _this, type) {
    //console.log(obj)

    // type - 체크박스 
    if ( type == 0 ) {
        if( $(_this).is(':checked') ) {
            $(obj).removeClass('on'); 
        } else {
            $(obj).addClass('on'); 
        }
    // type - a링크 
    } else if ( type == 1) {
        if( $(_this).hasClass('on') ) {
            $(obj).removeClass('on'); 
            $(_this).removeClass('on'); 
            if( $(_this).parents('td').length) $(_this).parents('td').prev('th').removeClass('on');
            if( $(_this).parents('th').length) $(_this).parents('th').removeClass('on');
        } else {
            $(obj).addClass('on'); 
            $(_this).addClass('on'); 
            if( $(_this).parents('td').length) $(_this).parents('td').prev('th').addClass('on');
            if( $(_this).parents('th').length) $(_this).parents('th').addClass('on');
        }
    }
}


function setSelect(obj, _type) { 
    if( _type == 'accperson' || _type == 'fulperson'  || _type == 'helpperson' ) {
        var _depart = '';
        var _rank = '';
        var _name = '';
        var _val = '';
        var _target;
        var val = $(obj).data('val');
        $(obj).attr('data-duplicate', 2);

        
        $('.sel_btn').each(function(index, target){
            if ( val == $(target).data('val') ) {
                _target = $(target);
                _depart =  $(target).data('depart');
                _rank =  $(target).data('rank');
                _name =  $(target).data('name');
                _val =  $(target).data('val');
                _target.addClass('off').text('선택취소');
            }
        });
    
        var tag = ``;        
        tag += `
        <li data-depart="${_depart}" data-rank="${_rank}" data-name="${_name}" data-val="${_val}">
            <input type="hidden" name="sel_${_type}[]" value="${_val}" />
            <span>${_depart} ${_rank} ${_name}</span>
            <a href="javascript:;" class="svg order_btn del sel_btn2" onclick="delOrderList(this, '${_type}');" data-val="${_val}">X</a>
        </li>`

        $('#result_'+_type).append(tag);	

    } 
    
}

function delSelect(obj, type) {
    var val = $(obj).data('val');

    $('.sel_btn').each(function(index, target1){
        if ( val == $(target1).data('val') ) {
            _target = $(target1);
        }
    });

    _target.removeClass('off').text('선택');
    
    $('#result_'+type+' li').each(function(index, target2){
        if ( val == $(target2).data('val') ) {
            $('#result_'+type+' li').eq(index).remove();
        }
    });

}


// 삭제하기 X 버튼
function delOrderList(obj, type) {
    var val = $(obj).data('val');
    var _target = null;

    // 재등록을 하면 안되는 요소 - 연차, 참고자, 담당자 등록(수임자, 수행자, 보조인)
    if (  type == 'accperson'  || type == 'fulperson' || type == 'helpperson' || type == 'schedule') {
        $('.sel_btn').each(function(index, target){
            if ( val == $(target).data('val') ) {
                //console.log(val);
                _target = $(target); 
            }
        });

        if( _target )  _target.removeClass('off').text('선택');

        if( $(obj).closest('.result_body').length ) {
            $('#result_'+type+' li').each(function(index, target2){
                if ( val == $(target2).data('val') ) {
                    $('#result_'+type+' li').eq(index).remove();
                }
            });
        }    
    }       
    
}

// 당사자 정보 수정
function editRecord(){
    ppAlert({
        text: '정보를 수정하시겠습니까?',
        button1: {
            text: '취소'
        },
        button2: {
            text: '확인',
            click: function (e) {				
                var idx = $("#editRecord").attr('data-idx');
                var type = $("#editRecord").attr('data-type');
                //console.log(idx);
                //console.log(type);

                if ($('#name').val() == "") {
                    ppAlert('이름을 입력해주세요.');
                    $("#name").focus();
                    return false;
                }

                if ($('#tel').val() == "") {
                    ppAlert('연락처를 입력해주세요.');
                    $("#tel").focus();
                    return false;
                }

                if ( type == 'client') {
                    if ($('#birthday').val() == "") {
                        ppAlert('생년월일을 입력해주세요.');
                        $("#birthday").focus();
                        return false;
                    }

                    var birthday = $('#birthday').val();     
                    $('#'+type).find('tr').eq(idx).find('.birthday').text(birthday); 
                    $('#'+type).find('tr').eq(idx).find('.edit .btn').attr('data-birthday', birthday);
                }

                if ($('#email1').val() == "" || $('#email2').val() == "") {
                    ppAlert('이메일을 입력해주세요.');
                    $("#email1").focus();
                    return false;
                }

                var name = $('#name').val();
                var tel = $('#tel').val();                  
                var email1 = $('#email1').val();
                var email2 = $('#email2').val();
                var email = email1 + '@' + email2;

                $('#'+type+'Record').find('tr').eq(idx).find('.name').text(name);
                $('#'+type+'Record').find('tr').eq(idx).find('.tel').text(tel);                
                $('#'+type+'Record').find('tr').eq(idx).find('.email').text(email);
                $('#'+type+'Record').find('tr').eq(idx).find('.address').text(address);
                $('#'+type+'Record').find('tr').eq(idx).find('.edit .btn').attr('data-name', name);
                $('#'+type+'Record').find('tr').eq(idx).find('.edit .btn').attr('data-tel', tel);                
                $('#'+type+'Record').find('tr').eq(idx).find('.edit .btn').attr('data-email1', email1);
                $('#'+type+'Record').find('tr').eq(idx).find('.edit .btn').attr('data-email2', email2);
                
                closePopup();    
                ppAlert('수정되었습니다.');					
            }
        },
    });
}

// 당사자 정보 추가
function saveExInfo(){
    ppAlert({
        text: '정보를 추가하시겠습니까?',
        button1: {
            text: '취소'
        },
        button2: {
            text: '확인',
            click: function (e) {
                var typeIdx;
                var add;
                var birthday;

                $('input[name="recordType"]').each(function(i, el){
                    if( $(el).is(':checked')) {
                        typeIdx = $(el).val();
                    }
                });

                switch (typeIdx) {
                    case "0":
                        var type="client";
                        break;
                    case "1":
                        var type="other";
                        break;
                    case "2":
                        var type="third";
                        break;
                }
                if ($('#name').val() == "") {
                    ppAlert('이름을 입력해주세요.');
                    $("#name").focus();
                    return false;
                }

                if ($('#tel').val() == "") {
                    ppAlert('연락처를 입력해주세요.');
                    $("#tel").focus();
                    return false;
                }

                if ( type == 'client') {
                    if ($('#birthday').val() == "") {
                        ppAlert('생년월일을 입력해주세요.');
                        $("#birthday").focus();
                        return false;
                    }

                    birthday = $('#birthday').val();  
                    add =`<td class="birthday">${birthday}</td>`;
                }

                if ($('#email1').val() == "" || $('#email2').val() == "") {
                    ppAlert('이메일을 입력해주세요.');
                    $("#email1").focus();
                    return false;
                }

                ppAlert('저장되었습니다.');
            }
        },
    });
}

function getHtml3(addIdx, type, birthday, add, callback){
    addIdx = addIdx >= 0  ? addIdx : 0 ;
    //console.log(addIdx);

    var name = $('#name').val();
    var tel = $('#tel').val();                  
    var email1 = $('#email1').val();
    var email2 = $('#email2').val();
    var email = email1 + '@' + email2;
    var zipcode = $('#zipcode').val();
    var address1 = $('#address1').val();
    var address2 = $('#address2').val();
    var address = '(' + zipcode + ') ' + address1 + ' ' + address2;

    var html =``;
    html +=`
    <tr>                                                            
        <td class="name">${name}</td>
        <td class="tel">${tel}</td>
        ${add}
        <td class="email">${email}</td>
        <td class="address txt_l">${address}</td>
        <td class="edit">
            <div class="btnSet2 clear">
                <a href="javascript:;" class="btn lime" onclick="openPopup('editRecord', '${type}', this)" data-name="${name}" data-tel="${tel}" data-birthday="${birthday}" data-email1="${email1}" data-email2="${email2}" data-zipcode="${zipcode}" data-address1="${address1}" data-address2="${address2}" data-idx="${addIdx}">수정</a>
            </div>
        </td>
    </tr>`;

    callback(html); 

}