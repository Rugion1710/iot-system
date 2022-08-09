

var header = document.getElementById("navbar");
var btns = header.getElementsByClassName("nav-item");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    console.log("haha")
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
}

var subMenu = document.getElementById("sub-menu")
var sub = document.getElementsByClassName('sub')
for (var i = 0; i < sub.length; i++) {
    sub[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active2");
    console.log("haha")
    current[0].className = current[0].className.replace(" active2", "");
    this.className += " active2";
    });
}






