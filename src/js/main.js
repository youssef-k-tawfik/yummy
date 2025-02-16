import * as api from "./apiClient.js";
import * as ui from "./ui.js";

// & Side Nav Bar & //
const widthSideNav = $("#hiddenSideNav").outerWidth(true);
const heightNav = $("nav").outerHeight(true);

$("#sideNav").animate({ left: -widthSideNav }, 0);

// * Side NavBar toggle control
let navOpen = false;
$("#navBtn").on("click", function () {
  const distanceWidth = navOpen ? -widthSideNav : 0;
  const distanceHeight = navOpen ? heightNav : 0;

  $("#sideNav").animate({ left: distanceWidth });
  $("nav ul").animate({ top: distanceHeight }, 400);
  $("nav li").each(function (index) {
    $(this)
      .delay(100 * index)
      .animate({ top: distanceHeight }, 500);
  });
  $("#navBtn i").toggleClass("hidden");

  navOpen = !navOpen;
});
// TODO: unite nav animation in one function
$("nav li").on("click", function () {
  // *
  $("#sideNav").animate({ left: -widthSideNav });
  $("nav ul").animate({ top: heightNav }, 400);
  $("nav li").each(function (index) {
    $(this)
      .delay(100 * index)
      .animate({ top: heightNav }, 500);
  });
  $("#navBtn i").toggleClass("hidden");
  navOpen = !navOpen;
});

// * hide inputs if other pages are clicked
$(".nav-link")
  .not("#linkSearch")
  .on("click", function () {
    $("#searchInputs").remove();
  });
$(".nav-link")
  .not("#linkContact")
  .on("click", function () {
    $("main").removeClass("form-container");
  });

// & Home Page Meals & //
api
  .getMeals("")
  .then((listMeals) => ui.displayMeals(listMeals))
  .catch((error) => console.error("Error: ", error));

// & Search Meal & //
$("#linkSearch").on("click", function () {
  // * show inputs
  ui.displayInputs();

  // * toggle shadow effect
  $(".searchInput").on("focus", function () {
    $(this).parent().addClass("input-focused");
  });
  $(".searchInput").on("focusout", function () {
    $(this).parent().removeClass("input-focused");
  });
});

// & Categories Page & //
$("#linkCategories").on("click", clickCategories);

function clickCategories() {
  api
    .getCategories()
    .then((listCategories) => ui.displayCategories(listCategories))
    .catch((error) => console.error("Error: ", error));
}

// & Areas Page & //
$("#linkArea").on("click", clickAreas);

function clickAreas() {
  api
    .getAreas()
    .then((listAreas) => ui.displayAreas(listAreas))
    .catch((error) => console.error("Error: ", error));
}

// & Ingredients Page & //
$("#linkIngredients").on("click", clickIngredients);

function clickIngredients() {
  api
    .getIngredients()
    .then((listIngredients) => ui.displayIngredients(listIngredients))
    .catch((error) => console.error("Error: ", error));
}

// & Contact Us & //
$("#linkContact").on("click", function () {
  ui.displaySignUpForm();
});
