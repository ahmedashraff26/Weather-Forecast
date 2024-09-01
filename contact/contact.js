let homeClick = Array.from(document.querySelectorAll('.homeClick'));
console.log(homeClick);


for (let i = 0; i < homeClick.length; i++) {
    homeClick[i].addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = "../home/home.html";
    })
}