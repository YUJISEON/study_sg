$(function(){
    $('select:not(.ignore)').niceSelect();      
})



function optionChange(type){
    var departOption = [];
    var rankOption = [];

    $('#depart_type option').remove();
    $('#rank_type option').remove();

    if ( type == 0 ) {
        departOption = ['-'];
        departOptionNum = [1];
        rankOption = ['대표/대표변호사'];
        rankOptionNum = [1];
    } else  if ( type == 1 ) {
        departOption = ['송무1부', '송무2부', '송무3부', '송무팀', '마케팅팀', '인사회계팀', '계약관리팀', '대외협력팀'];
        departOptionNum = [2, 3, 4, 5, 6, 7, 8, 9];
        rankOption = ['선임변호사', '소속변호사', '부장', '차장', '과장', '대리', '주임', '사원'];
        rankOptionNum = [2, 3, 4, 5, 6, 7, 8, 9];
    } else if ( type == 2 ) {
        departOption = ['송무1부', '송무2부', '송무3부'];
        departOptionNum = [2, 3, 4];
        rankOption = ['선임변호사', '소속변호사'];
        rankOptionNum = [2, 3];
    } else if ( type == 3 ) {
        departOption = ['송무팀', '마케팅팀', '인사회계팀', '계약관리팀', '대외협력팀'];
        departOptionNum = [5, 6, 7, 8, 9];
        rankOption = ['부장', '차장', '과장', '대리', '주임', '사원'];
        rankOptionNum = [4, 5, 6, 7, 8, 9];
    } 

    var newOption1 = ``;
    if ( type !== 0 ) newOption1 += `<option value="">선택</option>`
    for(var i=0;i<departOption.length;i++) {
        newOption1 += `<option value="${departOptionNum[i]}">${departOption[i]}</option>`
    }

    var newOption2 = ``;
    if ( type !== 0 ) newOption2 += `<option value="">선택</option>`
    for(var i=0;i<rankOption.length;i++) {
        newOption2 += `<option value="${rankOptionNum[i]}">${rankOption[i]}</option>`
    }

    $('#depart_type').append(newOption1);
    $('#rank_type').append(newOption2);

    if( type == 0 ) {
        $('#depart_type').addClass('disabled');     
        $('#rank_type').addClass('disabled');
    } else {
        $('#depart_type').removeClass('disabled');     
        $('#rank_type').removeClass('disabled');
    }

    $('#depart_type').niceSelect('update');  
    $('#rank_type').niceSelect('update');  

}