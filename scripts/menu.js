const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu")

menuBtn.addEventListener("click", function openMenu (e) {
    menu.classList.toggle("menu-closed")
})
