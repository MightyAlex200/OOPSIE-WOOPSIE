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
    if(this.status != 200) {
        OOPSIE_WOOPSIE();
    }
}

function OOPSIE_WOOPSIE() {
    console.error(copypasta.join(' '))
    for(element of document.children) {
        element.remove();
    }

    let error = document.createElement("html");
    error.innerHTML = errorHTML;
    document.appendChild(error);
    document.title = copypasta[0];
}
