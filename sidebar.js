fetch("./sidebar.html")
    //fetches sidebar
    .then((res) => res.text())
    .then((text) => (document.getElementById("sidebar-cont").innerHTML = text));