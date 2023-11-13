function addRecord() {

    ppAlert({
        text: '자문이력을 작성하시겠습니까?',
        button1: {
            text: '취소'
        },
        button2: {
            text: '확인',
            click: function (e) {


                var ahourValue = $('#ahour').val();
                var aminuteValue = $('#aminute').val();
                if (!ahourValue && !aminuteValue ) {
                    ppAlert('자문시간을 입력하셔야합니다.');
                    $('#ahour').focus();
                    return false;
                }
            
                var amemoValue = $('#amemo').val();
                if (!amemoValue) {
                    ppAlert('내용을 입력하셔야합니다.');
                    $('#amemo').focus();
                    return false;
                }    
                
                var idx = parseInt($('#recnum').val());

                getHtml4(idx, function(_html){
                    addhtml = _html;
                    $("#record_body .list_wrap > ul").append(addhtml); 

                    var tag = '';
                    $('.afilename').each(function(i, el){
                        if( $(el).val() !== '') {
                            var fileName = $(el).val();
                            var fileSrc = $('#A_filename'+i).val();
                            
                            tag += `<li><a href="${fileSrc}" download>${fileName}</a></li>`
                        }
                    })

                    $(".file_list"+(idx >=0 ? idx+1 : 0)).append(tag); 

                    recordRest();
                }); 

                ppAlert('작성되었습니다.');

            }
        },
    });

}


function getHtml4(addIdx, callback){
    addIdx = addIdx >= 0  ? addIdx+1 : 0 ;
    //console.log(addIdx);

    var user = "홍길동";
    var _ahour = $('#ahour').val();
    var _aminute = $('#aminute').val();
    var _amemo = $('#amemo').val();

    var time = '';
    if( _ahour ) time += _ahour + '시간 ';
    if( _aminute) time += _aminute + '분';

    var html = ``;

    html += 
    `<li>
        <div class="tbl-box tbl-type2">  
            <table class="row_line">
                <caption>게시글</caption>
                <colgroup>
                    <col width="200px">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td>
                            ${user}
                            <div class="btnSet2 right">
                                <a href="javascript:;" class="btn lime edit${addIdx}" onclick="editRecord(${addIdx}, this)" >수정</a>
                                <a href="javascript:;" class="btn lime toggle_blk blk${addIdx} " onclick="saveRecord(${addIdx})" >저장</a>
                                <a href="javascript:;" class="btn gr toggle_blk blk"${addIdx} onclick="cancelRecord(${addIdx})" >취소</a>
                            </div> 
                        </td>
                    </tr>
                    <tr>
                        <th>자문시간</th>
                        <td>${time}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td class="content">
                            <div id="post-content">
                                <p>${_amemo}</p>
                            </div>                                        
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td>
                            <ul class="file_list file_list${addIdx}">
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </li>`

    $('#recnum').val(addIdx);
    callback(html); 

}

function recordRest() {
    $('#ahour').val('');
    $('#aminute').val('');
    $('#amemo').val('');
    $('.A_filename').val('');
    $('.afilename').val('');
}


var recordClone = [];

// 자문이력 수정
function editRecord(idx, _this) {
    var record = $('#record_wrap > li ').eq(idx).find('table tbody');
    var trClone = ``;
    
    record.find('.edit-record').each(function(i, el){
        trClone += `<tr class="edit-record">`;
        trClone += $(el).html();
        trClone += `</tr>`;
    });
    
    record.find('.edit-record').remove();
    recordClone[idx] = trClone.trim();

    getRecord(idx, function(_html){
        addhtml = _html;
        record.append(addhtml); 

        $(_this).css("display", "none");
        $('.blk'+idx).css("display", "inline-block");
    }); 
}

// 자문이력 저장
function saveRecord(idx) {
    ppAlert({
        text: '자문이력을 저장하시겠습니까?',
        button1: {
            text: '취소'
        },
        button2: {
            text: '확인',
            click: function (e) {

                var ahourValue = $('#ahour_'+idx).val();
                var aminuteValue = $('#aminute_'+idx).val();
                if (!ahourValue && !aminuteValue ) {
                    ppAlert('자문시간을 입력하셔야합니다.');
                    $('#ahour_'+idx).focus();
                    return false;
                }
            
                var amemoValue = $('#acontent_'+idx).val();
                if (!amemoValue) {
                    ppAlert('내용을 입력하셔야합니다.');
                    $('#acontent_'+idx).focus();
                    return false;
                }   

                var record = $('#record_wrap > li ').eq(idx).find('table tbody');                
            
                $('.blk'+idx).css("display", "none");
                $('.edit'+idx).css("display", "inline-block");


                getNew(idx, function(_html){
                    addhtml = _html;
                    record.append(addhtml); 

                    var tag3 = '';
                    $('.afilename'+idx).each(function(i, el){
                        if( $(el).val() !== '') {
                            var fileName = $(el).val();
                            var fileSrc = $('#filename_'+idx+'_'+i).val();
                            
                            tag3 += `<li><a href="${fileSrc}" download>${fileName}</a></li>`
                            $('#cnsldt_file'+(i+1)+'_'+idx).val(fileName);
                            //console.log( $('#cnsldt_file'+(i+1)+'_'+idx) );
                        }
                    })

                    $(".file_list"+idx).append(tag3); 
                    record.find('.get-record').remove();
                }); 
                
                ppAlert('작성되었습니다.');
            }
        },
    });
}

// 자문이력 취소
function cancelRecord(idx) {
    var record = $('#record_wrap > li ').eq(idx).find('table tbody');

    record.find('.get-record').remove();
    record.append(recordClone[idx]); 

    $('.blk'+idx).css("display", "none");
    $('.edit'+idx).css("display", "inline-block");
}

function getRecord(addIdx, callback){
    var _ahour = $('#cnsldt_time1_'+addIdx).val();
    var _minute = $('#cnsldt_time2_'+addIdx).val();
    var _content = $('#post_content'+addIdx).val();
    var _file = [];
    if ( $('.cnsldt_file').length ) {
        $('.cnsldt_file').each(function(i, el){
            _file[i] = $(el).val();
        })
    }

    var html = ``;
    html += 
    `<tr class="get-record">
        <th>자문시간<span class="required">*<span>필수입력</span></th>
        <td>
            <div class="input_wrap">
                <input type="text" name="ahour" id="ahour_${addIdx}" value="${_ahour}" class="max100 txt_r" onkeyup="isOnlyNumber(this)"> 시간 
                <input type="text" name="aminute" id="aminute_${addIdx}" value="${_minute}" class="max100 txt_r" onkeyup="isOnlyNumber(this)"> 분
            </div>                                            
        </td>
    </tr>
    <tr class="get-record">
        <th>내용<span class="required">*<span>필수입력</span></th>
        <td>
            <textarea name="acontent" id="acontent_${addIdx}" cols="30" rows="10">${_content}</textarea>
        </td>
    </tr>
    <tr class="get-record">
        <th>첨부파일</th>
        <td>
            <div class="fileCheck max500">
                <div class="file_btn">
                    <input type="file" name="filename_${addIdx}_0" id="filename_${addIdx}_0" class="filename"  value="" onchange="document.getElementById('afilename_${addIdx}_0').value = this.files[0].name;" />
                    <label for="filename_${addIdx}_0" class="btns">파일선택</label>
                </div>
                <div class="ipt_box">
                    <input type="text" name="afilename_${addIdx}_0" id="afilename_${addIdx}_0" class="afilename${addIdx} wid100" value="${_file[0] ? _file[0] : ''}" readonly>
                </div>                                                    
            </div>
            <div class="fileCheck max500">
                <div class="file_btn">
                    <input type="file" name="filename_${addIdx}_1" id="filename_${addIdx}_1" class="filename"  value="" onchange="document.getElementById('afilename_${addIdx}_1').value = this.files[0].name;" />
                    <label for="filename_${addIdx}_1" class="btns">파일선택</label>
                </div>
                <div class="ipt_box">
                    <input type="text" name="afilename_${addIdx}_1" id="afilename_${addIdx}_1" class="afilename${addIdx} wid100" value="${_file[1] ? _file[1] : ''}" readonly>
                </div>                                                    
            </div>
            <div class="fileCheck max500">
                <div class="file_btn">
                    <input type="file" name="filename_${addIdx}_2" id="filename_${addIdx}_2" class="filename"  value="" onchange="document.getElementById('afilename_${addIdx}_2').value = this.files[0].name;" />
                    <label for="filename_${addIdx}_2" class="btns">파일선택</label>
                </div>
                <div class="ipt_box">
                    <input type="text" name="afilename_${addIdx}_2" id="afilename_${addIdx}_2" class="afilename${addIdx} wid100" value="${_file[2] ? _file[2] : ''}" readonly>
                </div>                                                    
            </div>
        </td>
    </tr>`;

    callback(html); 
}

function getNew(addIdx, callback){

    var _ahour = $('#ahour_'+addIdx).val();
    var _minute = $('#aminute_'+addIdx).val();
    var _content = $('#acontent_'+addIdx).val();


    var html = ``;
    html += `
    <tr class="edit-record" >
        <th>자문시간</th>
        <td>${_ahour}시간 ${_minute}분</td>
    </tr>
    <tr class="edit-record" >
        <th>내용</th>
        <td class="content">
            <div id="post-content">
                ${_content}
            </div>                                        
        </td>
    </tr>
    <tr class="edit-record" >
        <th>첨부파일</th>
        <td>
            <ul class="file_list file_list${addIdx}"> 
            </ul>
        </td>
    </tr>`
    
    $('#cnsldt_time1_'+addIdx).val(_ahour);
    $('#cnsldt_time2_'+addIdx).val(_minute);
    $('#post_content'+addIdx).val(_content);

    callback(html); 
}