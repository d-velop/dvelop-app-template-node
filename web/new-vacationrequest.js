'use strict';


function onClickSave() {
    let name = document.getElementById('name-input').value;
    let from = new Date(document.getElementById('from-input').value);
    let to = new Date(document.getElementById('to-input').value);
    let type = getSelectedType();
    let comment = document.getElementById('comment-input').value;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    let path = window.location.pathname.split('/')[1];
    console.log(path)
    xmlhttp.open("POST", window.location.origin + '/' + path + '/vacationrequest');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        user: name,
        from: from,
        to: to,
        type: type,
        comment: comment
    }));

    xmlhttp.onload = (e) => {
        if(xmlhttp.status === 201) {
            window.location.href = 'vacationrequest';
        }
        console.log(xmlhttp.status);
    }
}

function getSelectedType() {
    for (const radioBtn of document.querySelectorAll('.mdc-radio__native-control')) {
        if (radioBtn.checked) {
        console.log(radioBtn.checked)
        console.log(radioBtn.value)
            return radioBtn.value;
        }
    }
}