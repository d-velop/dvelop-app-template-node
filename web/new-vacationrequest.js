'use strict';


function onClickSave() {
    let name = document.getElementById('name-input').value;
    let from = new Date(document.getElementById('from-input').value);
    let to = new Date(document.getElementById('to-input').value);
    let type = getSelectedType();
    let comment = document.getElementById('comment-input').value;
    console.log({
        name: name,
        from: from,
        to: to,
        type: type,
        comment: comment
    });
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