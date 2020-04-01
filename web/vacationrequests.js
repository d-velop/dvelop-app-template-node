'use strict';

// component instantiation
mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector(".mdc-top-app-bar"));
const menue = mdc.menu.MDCMenu.attachTo(document.querySelector(".mdc-menu"));
const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector(".mdc-snackbar"));
let selectedListItem = document.querySelector(".mdc-list-item");

getVacationRequests();

// event listeners
function handleMenuClick(state) {
    const r = new XMLHttpRequest();
    r.addEventListener("load", function () {
        if (r.status == 200 || r.status == 204) {
            selectedListItem.dataset.state = state;
            updateStateIcon(selectedListItem)
        } else {
            snackbar.labelText = "Request failed. Server returned " + r.status;
            snackbar.open();
        }
    });
    r.addEventListener("error", function () {
        snackbar.labelText = "Request failed. Please try again in 5 seconds.";
        snackbar.open();
    });
    r.open("PATCH", selectedListItem.getElementsByTagName("a")[0].href);
    r.setRequestHeader("Content-Type", "application/merge-patch+json");
    r.send(JSON.stringify({
        state: state
    }));
}

document.getElementById("menu_accept").addEventListener("click", function(){
    handleMenuClick("accepted" );
});

document.getElementById("menu_reject").addEventListener("click", function(){
    handleMenuClick("rejected");
});

document.getElementById("menu_cancel").addEventListener("click", function (){
    handleMenuClick("cancelled");
});

const moreIconBtns = document.querySelectorAll(".mdc-icon-button");
for (let i = 0; i < moreIconBtns.length; i++) {
    console.log(moreIconBtns[i].innerText);
    const elmRipple = mdc.ripple.MDCRipple.attachTo(moreIconBtns[i]);
    elmRipple.unbounded = true;

    moreIconBtns[i].addEventListener("click", function (e) {
        e.stopPropagation();
        menue.open = !menue.open;
        selectedListItem = e.currentTarget.parentElement;
        const btnElementRect = e.currentTarget.getBoundingClientRect();
        menue.setAbsolutePosition(btnElementRect.left, btnElementRect.top);
    });
}

function updateStateIcon (element){
    switch (element.dataset.state) {
        case "new":
            element.querySelector(".state-icon").innerHTML = "";
            break;
        case "accepted":
            element.querySelector(".state-icon").innerHTML = "check_circle";
            break;
        case "rejected":
            element.querySelector(".state-icon").innerHTML = "block";
            break;
        case "cancelled":
            element.querySelector(".state-icon").innerHTML = "cancel";
            break;
    }
}

const listItems = document.querySelectorAll(".dmc-list-item");
for (let i = 0; i < listItems.length; i++) {
    updateStateIcon(listItems[i]);
}

function getVacationRequests() {
    const Http = new XMLHttpRequest();
    Http.open("GET", window.location)
    Http.setRequestHeader('Accept', 'application/hal+json');
    Http.send();

    Http.onload = (e) => {
        JSON.parse(Http.responseText).vacationRequests.forEach(r => renderRequest(r));
    }
}

function renderRequest(request) {
    
    let icon = document.createElement('span');
    icon.classList = "mdc-list-item__graphic  material-icons";
    if (request.state === 'GRANTED') {
        icon.innerText = 'check_circle'
    } else if (request.state === 'DENIED') {
        icon.innerText = 'cancel'
    } else {
        icon.innerText = 'help'
    }

    let primaryText = document.createElement('span');
    primaryText.classList = "mdc-list-item__primary-text";
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    primaryText.innerText = `${request.user}: ${new Date(request.to).toLocaleString('en-GB', options)} - ${new Date(request.from).toLocaleString('en-GB', options)}`;

    let secondaryText = document.createElement('span');
    secondaryText.classList = 'mdc-list-item__secondary-text'
    secondaryText.innerText = `[${request.type}] ${request.comment ? 'Comment: ' + request.comment : ''}`

    let text = document.createElement('span');
    text.classList = "mdc-list-item__text";
    text.appendChild(primaryText);
    text.appendChild(secondaryText);

    let buttonMore = document.createElement('button');
    buttonMore.classList = "mdc-icon-button material-icons mdc-top-app-bar__action-item";
    buttonMore.innerHTML = "more_horiz"

    let requestElement = document.createElement("li");
    requestElement.classList = 'mdc-list-item';
    requestElement.role = 'menuitem';
    requestElement.appendChild(icon);
    requestElement.appendChild(text);
    requestElement.appendChild(buttonMore);

    document.getElementById('requests').appendChild(requestElement);
}
