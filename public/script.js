let inURL = document.getElementById('inURL');
let btShort = document.getElementById('btShort');
let containerOutput = document.querySelector('.container-output');
let outShort = document.getElementById('outShort');
let copied = document.getElementById('copied');

function generateLink() {

    if (inURL.value == '') {
        alert('Você não inseriu uma URL.');
        return;
    }

    let url = inURL.value;

    const options = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ url })
    }

    fetch("http://10.0.0.105:3000/", options).then(res => {
        return res.text();
    }).then(data => {
        showNewLink(data);
    })

}

function showNewLink(url) {

    containerOutput.style.display = 'flex';
    url = url.replace(/['"]+/g, '');

    outShort.value = url;

}

function copyLink() {

    if(typeof navigator.clipboard === 'undefined'){
        outShort.select();
        document.execCommand('copy');
    }else{
        navigator.clipboard.writeText(outShort.value);
    }

    copied.style.visibility = 'visible';
    copied.style.opacity = '1';

    setTimeout(() => {
        
        copied.style.visibility = 'hidden';
        copied.style.opacity = '0';

    }, 600);

}

btShort.addEventListener('click', generateLink);
outShort.addEventListener('click', copyLink);