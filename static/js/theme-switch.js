const btn = document.getElementById("themeSwitch");
const body = document.body;

let currTheme = localStorage.getItem("theme");

if(currTheme === null){
    currTheme = "light";
    localStorage.setItem("theme", currTheme);
}
else if(currTheme === "dark"){
    body.classList.add('dark-mode');
    btn.checked = true;
}
else {
    body.classList.remove('dark-mode');
    btn.checked = false;
}

btn.addEventListener("click", () =>{
    currTheme = localStorage.getItem("theme");

    if (currTheme === 'light') {
        body.classList.add('dark-mode');
        btn.checked = true;
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        btn.checked = false;
        localStorage.setItem('theme', 'light');
    }

})