var xhr = null

getXmlHttpRequestObject = function () {
    if (!xhr){
        xhr = new XMLHttpRequest();
    }
    return xhr
}

function getDate() {
    date = new Date().toString();
    document.getElementById('time-container').textContent = date
}

function dataCallback() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("User data received!");
        getDate();
        dataDiv = document.getElementById('result-container')
        dataDiv.innerHTML = xhr.responseText;
    }
}

function getUsers() {
    console.log("Get users...")
    xhr = getXmlHttpRequestObject()
    xhr.onreadystatechange = dataCallback()
    xhr.open("GET", "http://127.0.0.1:5000/users", true)
    xhr.send(null)
}