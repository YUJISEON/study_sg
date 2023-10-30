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

// 토글버튼
function toggleSelect(_this, type) {  
    if( !$(_this).hasClass('off') ) {
        setSelect(_this, type);
    } else {
        delSelect(_this, type);
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