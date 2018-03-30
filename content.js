// OOPSIE WOOPSIE!! Uwu The window.status variable is fucking BroKEN!!
// To fix: send  A N O T H E R  get request

const copypasta = [
    "OOPSIE WOOPSIE!!",
    "Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!"
]

const errorHTML = `<head><meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"initial-scale=1, minimum-scale=1, width=device-width\">
  <style>
    *{margin:0;padding:0}html,code{font:15px/22px arial,sans-serif}html{background:#fff;color:#222;padding:15px}body{margin:7% auto 0;max-width:390px;min-height:180px;padding:30px 0 15px}* > body{background:url() 100% 5px no-repeat;padding-right:205px}p{margin:11px 0 22px;overflow:hidden}ins{color:#777;text-decoration:none}a img{border:0}@media screen and (max-width:772px){body{background:none;margin-top:0;max-width:none;padding-right:0}}#logo{background:url() no-repeat;margin-left:-5px}@media only screen and (min-resolution:192dpi){#logo{background:url() no-repeat 0% 0%/100% 100%;-moz-border-image:url() 0}}@media only screen and (-webkit-min-device-pixel-ratio:2){#logo{background:url() no-repeat;-webkit-background-size:100% 100%}}#logo{display:inline-block;height:54px;width:150px}
  </style>
  </head><body>
  <p><b>${copypasta[0]}</b>
  </p><p>${copypasta[1]}
</p></body>`

let testRequest = new XMLHttpRequest();
testRequest.addEventListener("load", onRequestLoad);
testRequest.open("GET", location.href);
testRequest.send();

function onRequestLoad() {
    if(!this.status.toString().startsWith("2")) { // technically, I could have done startsWith(2) because 2 == "2" but that would be naughty uwu
        OOPSIE_WOOPSIE(this.status);
    }
}

function OOPSIE_WOOPSIE(status) {
    console.error(copypasta.join(' '))
    let errorHeader = findErrorHeader(status);
    if (errorHeader) {
        deleteEverythingOnSameLevel(errorHeader);
        console.log("found errorHeader");
        console.log(errorHeader);

        let errorDescription = findErrorDescription(errorHeader);
        errorHeader.innerHTML = copypasta[0];
        if (errorDescription) {
            errorDescription.innerHTML = copypasta[1];
            deleteEverythingOnSameLevel(errorDescription);
        }
    } else {
        nothingWorked();
    }
}

function findErrorHeader(status) {
    let header;
    // Current methods of finding the error header:
    // 1. Find the first element with the status code in it then remove the text in elements on it's level
    // 2. Find the first element with text in an element with class or id called "error"

    let allElements = getAllElements();

    header = allElements.find(e => e.innerHTML.includes(status.toString()));

    if (!header) {
        header = allElements.find(e =>
            e.classList.toString().toLowerCase().includes("error")
            || e.id.toLowerCase().includes("error")
        );
    }

    return header;
}

function findErrorDescription(errorHeader) {
    // Current methods of finding the error description:
    // 1. Find the first element directly after the header with text
    let allElements = getAllElements();
    allElements = allElements.slice(allElements.indexOf(errorHeader)+1);
    let errorDescription = allElements.find(e => {
        let text = "";
        for (let i = 0; i < e.childNodes.length; i++) {
            const childNode = e.childNodes[i];
            if (childNode.nodeType == 3) {
                text += childNode.nodeValue;
            }
        }
        return !!text
    });

    return errorDescription;
}

function deleteEverythingOnSameLevel(safeText) {
    getAllElements().forEach(e => {
        let eBoundBox = e.getBoundingClientRect();
        let dBoundBox = safeText.getBoundingClientRect();
        if (e == safeText) { return; }
        if (
            eBoundBox.top <= dBoundBox.bottom &&
            eBoundBox.bottom >= dBoundBox.top
        ) {
            // delete textnodes
            for (let i = 0; i < e.childNodes.length; i++) {
                let childNode = e.childNodes[i];
                if (childNode.nodeType == 3) {
                    childNode.remove();
                }
            }
        }
    });
}

function getAllElements() {
    let allElements = [];
    iterateElement(document, element => {
        if (element.getBoundingClientRect && !domRectIsEmpty(element.getBoundingClientRect())) {
            allElements.push(element);
        }
    });
    return allElements;
}

function nothingWorked() {
    for (let i = 0; i < document.children.length; i++) {
        document.children[i].remove();
    }

    let error = document.createElement("html");
    error.innerHTML = errorHTML;
    document.appendChild(error);
    document.title = copypasta[0];
}

function iterateElement(element, func) {
    if (element.children instanceof HTMLCollection) {
        for (let i = 0; i < element.children.length; i++) {
            iterateElement(element.children[i], func);
        }
    }
    func(element);
}

function htmlCollectionToArray(collection) {
    let returnValue = [];
    for (let i of collection) {
        returnValue.push(i);
    }
    return returnValue;
}

function domRectIsEmpty(domRect) {
    return domRect.width == 0
        && domRect.height == 0;
}
