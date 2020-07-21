let lastScrollTop = 0;

window.addEventListener("scroll", throttle(onPageScroll, 1000));

function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function onPageScroll() {
  console.log("scroll occured");
  const st = window.pageYOffset || document.documentElement.scrollTop;
  const isMovingUp = st > lastScrollTop;
  showNextPage();
  hideCurrentPage();
  // For Mobile or negative scrolling
  lastScrollTop = st <= 0 ? 0 : st;
}

function hideCurrentPage() {
  const visiblePage = document.querySelector(".visible");
  if (visiblePage) {
    visiblePage.classList.add("hide-up");
    visiblePage.classList.remove("visible");
  }
}

function showNextPage() {
  const pages = document.querySelectorAll(".page");
  let visiblePageIndex;
  for (const [index, page] of pages.entries()) {
    if (page.classList.contains("visible")) {
      visiblePageIndex = index;
      break;
    }
  }
  const nextPageIndex = visiblePageIndex + 1;
  const nextPage = pages.item(nextPageIndex);
  nextPage.classList.add("visible");
}
