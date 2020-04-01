'use strict';


console.log(new Date(new Date('bfj;kalsdjsfklj;')))

function onClickSave() {

    var request = new XMLHttpRequest();
    let path = window.location.pathname.split('/')[1];
    request.open("POST", window.location.origin + '/' + path + '/vacationrequest');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
        user: document.getElementById('name-input').value,
        from: document.getElementById('from-input').value,
        to: document.getElementById('to-input').value,
        type: getSelectedType(),
        comment: document.getElementById('comment-input').value
    }));
    

    request.onload = (e) => {
        if(request.status === 201) {
            window.location.href = 'vacationrequest';
        } else {
            document.getElementById('error').innerText = JSON.parse(request.responseText).error;
        }
    }
}

function getSelectedType() {
    for (const radioBtn of document.querySelectorAll('.mdc-radio__native-control')) {
        if (radioBtn.checked) {
            return radioBtn.value;
        }
    }
}