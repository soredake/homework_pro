/** Get all tabs **/
const $tabs = Array.from(document.querySelectorAll(".js-tab-item"));
const activeClass = "active";

$tabs.forEach(($tab) => {
  $tab.addEventListener("click", function (e) {
    $tabs.forEach(($tab) => {
      const $link = $tab.querySelector("a");
      $link.classList.remove(activeClass);
    });

    const $currentLink = e.target;
    $currentLink.classList.add(activeClass);
  });
});

/** ----------------------------------- **/

const $paginationItems = Array.from(
  document.getElementsByClassName("js-pagination-item")
);
const $paginationButtonPrev = document.querySelector(".js-pagination-prev");
const $paginationButtonNext = document.querySelector(".js-pagination-next");
const disabledClass = "disabled";

/** Remove all active classes from the pagination items**/
const removeActiveClass = () => {
  $paginationItems.forEach(($item) => $item.classList.remove(activeClass));
};

/** Toggle disabled class for the nav buttons **/
const toggleDisabledButtons = () => {
  const $activeItem = document.querySelector(".js-pagination-item.active");
  const currentIndex = $paginationItems.indexOf($activeItem);
  if (currentIndex + 1 === $paginationItems.length) {
    $paginationButtonNext.classList.add(disabledClass);
  } else {
    $paginationButtonNext.classList.remove(disabledClass);
  }
  if (currentIndex === 0) {
    $paginationButtonPrev.classList.add(disabledClass);
  } else {
    $paginationButtonPrev.classList.remove(disabledClass);
  }
};

$paginationItems.forEach(($item) => {
  $item.addEventListener("click", (e) => {
    removeActiveClass();
    const $target = e.target,
      $parent = $target.closest(".js-pagination-item");
    $parent.classList.add(activeClass);
    toggleDisabledButtons();
  });
});

$paginationButtonNext.addEventListener("click", () => {
  if ($paginationButtonNext.classList.contains(disabledClass)) {
    return;
  }
  const $activeItem = document.querySelector(".js-pagination-item.active");
  const currentIndex = $paginationItems.indexOf($activeItem);
  removeActiveClass();
  $paginationButtonNext.classList.remove(disabledClass);
  $paginationItems[currentIndex + 1].classList.add(activeClass);
  toggleDisabledButtons();
});

$paginationButtonPrev.addEventListener("click", () => {
  if ($paginationButtonPrev.classList.contains(disabledClass)) {
    return;
  }
  const $activeItem = document.querySelector(".js-pagination-item.active");
  const currentIndex = $paginationItems.indexOf($activeItem);
  removeActiveClass();
  $paginationButtonNext.classList.remove(disabledClass);
  $paginationItems[currentIndex - 1].classList.add(activeClass);
  toggleDisabledButtons();
});

/** ----------------------------------- **/

const $form = document.querySelector(".js-form");
const $formDataItems = Array.from(
  document.getElementsByClassName("js-form-data")
);

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const $inputs = Array.from($form.getElementsByTagName("input"));

  for (let $item of $formDataItems) {
    const dataAttr = $item.getAttribute("data-name");
    const $currentInput = $inputs.find(
      ($input) => $input.getAttribute("name") === dataAttr
    );
    $item.innerHTML = $currentInput.value;
  }
});
