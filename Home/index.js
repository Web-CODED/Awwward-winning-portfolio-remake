const buttons = document.querySelectorAll(
  ".button__container"
);
const magnetic = document.querySelectorAll(".magnetic");
const sidebarM = document.querySelectorAll(".aside-text");
const asideButton = document.querySelector(
  ".aside__button-container"
);
const asideElement = document.querySelector("aside");
const scrollEl1 = document.querySelector(".move1");
const scrollEl2 = document.querySelector(".move2");
const header = document.querySelector("header");
const freezeEl = document.querySelector(".freeze");
const homeBg = document.querySelector(".background__img");
const mobileAsideButton =
  document.querySelector(".header__more");
const aboutMeButton = document.querySelector(
  ".about__me-button"
);
const aboutMainText =
  document.querySelector(".about__main");
const aboutExtraText =
  document.querySelector(".about__extra");
let headerIsVisible = true;
const designImg = document.querySelectorAll(
  ".design__img-container"
);

// In and Out
for (const button of buttons) {
  const elementBg = button.querySelector(
    ".button__background"
  );
  let transform = 32.5,
    exponent = 0,
    startAnimate,
    endAnimate;

  button.addEventListener("mouseenter", () => {
    transform = 55;
    exponent = 0;
    clearInterval(endAnimate);
    elementBg.style.transform = `translate(-50%, 47.5%)`;
    startAnimate = setInterval(() => {
      animateUntil(-50);
    }, 12);
  });
  button.addEventListener("mouseleave", () => {
    clearInterval(startAnimate);
    exponent = 0;

    endAnimate = setInterval(() => {
      animateUntil(-150);
    }, 12);
  });
  function animateUntil(limit) {
    if (transform > limit) {
      transform -= 1.1 ** exponent;
      exponent++;
    } else {
      clearInterval(startAnimate);
    }
    elementBg.style.transform = `translate(-50%, ${transform}%)`;
  }
}

//Magnetic effect

for (const el of magnetic) {
  // In case ga ada element yang diselect biar g error
  const elText = el.querySelector("div")
    ? el.querySelector("div")
    : document.querySelector(".dummy");

  let elPosition = elPositionInt();

  window.addEventListener("resize", () => {
    elPosition = elPositionInt();
  });
  asideButton.addEventListener("click", () => {
    const renew = setInterval(() => {
      elPosition = elPositionInt();
    }, 50);
    setTimeout(() => {
      elPosition = elPositionInt();
      clearInterval(renew);
    }, 1000);
  });

  function elPositionInt() {
    return {
      x: el.getBoundingClientRect().x,
      y: el.getBoundingClientRect().y,
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
    };
  }

  let isHovering = false;
  el.addEventListener("mouseenter", () => {
    elPosition = elPositionInt();
    el.classList.remove("soft__return");
    elText.classList.remove("soft__return");
    isHovering = true;
  });
  el.addEventListener("mouseleave", () => {
    isHovering = false;
    el.classList.add("soft__return");
    elText.classList.add("soft__return");
    el.style.top = "0px";
    el.style.left = "0px";
    elText.style.top = "0px";
    elText.style.left = "0px";
  });
  el.addEventListener("mousemove", (e) => {
    if (!isHovering) return;
    const posX = e.clientX;
    const posY = e.clientY;

    magnetizeHorizontal(el, 9);
    magnetizeHorizontal(elText, 14);
    magnetizeVertical(el, 9);
    magnetizeVertical(elText, 14);

    function magnetizeHorizontal(element, speed) {
      element.style.left = `${
        -(elPosition.x + elPosition.width / 2 - posX) /
        speed
      }px`;
    }
    function magnetizeVertical(element, speed) {
      element.style.top = `${
        -(elPosition.y + elPosition.height / 2 - posY) /
        speed
      }px`;
    }
  });
}

// Side bar dot hover effect
for (const el of sidebarM) {
  el.addEventListener("mouseenter", () => {
    removeEvery();
    el.classList.add("aside__hover");
  });
  el.addEventListener("mouseleave", () => {
    el.classList.remove("aside__hover");
    setTimeout(() => {
      if (!isFilled())
        sidebarM[0].classList.add("aside__hover");
    }, 1000);
  });

  function removeEvery() {
    for (ele of sidebarM) {
      ele.classList.remove("aside__hover");
    }
  }

  function isFilled() {
    for (const ele of sidebarM) {
      if (ele.classList.contains("aside__hover"))
        return true;
    }
  }
}

// Aside Button toggle

function toggleAside() {
  asideElement.classList.toggle("aside__hidden");
  const crossEl = document.querySelectorAll(".cross");
  const codeby = document.querySelector(".code-by");

  for (const el of crossEl) {
    el.classList.toggle("crossclose");
    el.classList.toggle("crossopen");
  }

  codeby.style.opacity =
    codeby.style.opacity === "0" ? "1" : "0";

  if (
    window
      .getComputedStyle(mobileAsideButton)
      .getPropertyValue("display") !== "none" &&
    headerIsVisible === true
  )
    asideButton.classList.toggle("aside__button-hidden");

  mobileAsideButton.classList.toggle("header__more-hide");
  header.classList.toggle("header__more-hide");

  if (!asideElement.classList.contains("aside__hidden")) {
    disableScroll();
    freezeEl.style.visibility = "visible";
    freezeEl.style.opacity = "1";
  } else {
    enableScroll();
    freezeEl.style.visibility = "hidden";
    freezeEl.style.opacity = "0";
  }
}

asideButton.addEventListener("click", toggleAside);
freezeEl.addEventListener("click", toggleAside);
mobileAsideButton.addEventListener("click", () => {
  toggleAside();
});

// Freeze Screen (Disable Scroll)
function disableScroll() {
  topScroll = window.scrollY || 0;
  leftScroll = window.scrollX || 0;
  window.onscroll = () => {
    window.scrollTo(leftScroll, topScroll);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

// Moving text on home section
let move2Amount = 10,
  move1Amount = 112,
  scrollFunction;

scrollFunction = setInterval(() => {
  scrollDirection("left", 1);
}, 1);

function scrollDirection(direction, speed) {
  // el2
  scrollEl2.style.transform = `translateX(${move2Amount}%)`;
  if (direction === "left") move2Amount -= 0.08 * speed;
  if (
    move2Amount < -100 ||
    (move2Amount > 102 && direction === "")
  )
    move2Amount = 102;
  102;

  scrollEl1.style.transform = `translateX(${move1Amount}%)`;
  if (direction === "left") move1Amount -= 0.08 * speed;
  if (
    move1Amount < -100 ||
    (move1Amount > 102 && direction === "")
  )
    move1Amount = 102;
}

// Show Aside Button

const observer = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      asideButton.classList.remove("aside__button-hidden");
      headerIsVisible = false;
    } else {
      asideButton.classList.add("aside__button-hidden");
      headerIsVisible = true;
    }
    console.log(entry);
  },
  { rootMargin: "1%" }
);

observer.observe(header);

// Change title velocity
window.addEventListener("scroll", () => {
  scrollDirection("left", 1.5);
});

// Paralax

//Paralax buat screen width < 724px

const mediaQuerry724 = window.matchMedia(
  "(min-width: 724px)"
);

console.log(mediaQuerry724);

window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector(".about");
  // Home BG
  homeBg.style.objectPosition = `50% ${
    (scrollY * 200) / homeBg.getBoundingClientRect().height
  }%`;

  //About me
  if (!mediaQuerry724.matches) {
    aboutMeButton.style.transform = `translateY(${
      -(scrollY * 20) /
        aboutMeButton.getBoundingClientRect().height +
      40
    }%)`;
  } else {
    aboutMeButton.style.transform = `translateY(${
      -(scrollY * 20) /
        aboutMeButton.getBoundingClientRect().height +
      80
    }%)`;
  }
});

// My Work Image Zoom and Scroll

for (const design of designImg) {
  const imgInside = design.querySelector(".design__img");

  design.addEventListener("mouseenter", zoominScroll);
  design.addEventListener("mouseleave", zoomoutScroll);

  function zoominScroll() {
    imgInside.style.transform = "scale(1.05)";
    imgInside.style.objectPosition = "50% 100%";
  }

  function zoomoutScroll() {
    imgInside.style.transform = "scale(1)";
    imgInside.style.objectPosition = "50% 0%";
  }
}

// Scroll Reveal contact
const contactSection = document.querySelector(".contact");

window.addEventListener("scroll", (e) => {
  const elHeight =
    contactSection.getBoundingClientRect().height * 2;
  const docHeight = document.documentElement.scrollHeight;
  if (window.scrollY < docHeight - elHeight) return;
  const movingFor =
    ((docHeight - window.scrollY) / elHeight) * 2;

  contactSection.querySelector(
    ".showcase__bottom"
  ).style.bottom = `${
    -[(movingFor - 1) * 100] *
      1.2 ** (window.scrollY * 0.001) -
    20
  }px`;

  const reducingI = Math.floor(
    ([(movingFor - 0.88) ** -0.1] - 0.8) * 10
  );

  contactSection.querySelector(
    ".showcase__bottom"
  ).style.borderRadius = `${50 - reducingI}%`;

  console.log(reducingI);
});
