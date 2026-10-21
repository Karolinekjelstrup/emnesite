/* burger-menu på mobil: klik åbner og lukker menuen */
const burger = document.querySelector(".burger"); // burger-knappen
const nav = document.querySelector("nav"); // hele menuen

burger.addEventListener("click", function () {
  // class "active" tilføjes eller fjernes, og CSS viser/skjuler menuen
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});
