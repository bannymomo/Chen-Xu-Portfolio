//home typewriter
class TypeWrtier {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWrtier(txtElement, words, wait);
}

//navbar

const navTrigger = document.querySelector(".nav-trigger");
const nav = document.querySelector(".stretchy-nav");
navTrigger.addEventListener("click", function () {
  nav.classList.toggle("nav-is-visible");
});

const highlightSeleted = (targetArray) => {
  targetArray.forEach((element) => {
    element.addEventListener("click", function () {
      targetArray.forEach((element) => {
        element.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
};

const hrefArray = document.querySelectorAll(".lists");
highlightSeleted(hrefArray);

window.onclick = function (event) {
  if (
    event.target !== navTrigger &&
    event.target !== navTrigger.querySelector("span")
  ) {
    nav.classList.remove("nav-is-visible");
  }
};

//gallery item filter
const filterButtons = document.querySelectorAll(".filter-btns");
const items = document.querySelectorAll(".single-item");

filterButtons.forEach((element) => {
  element.addEventListener("click", function () {
    filterButtons.forEach((element) => {
      element.classList.remove("active");
    });
    this.classList.add("active");
    const target = this.getAttribute("data-target");
    items.forEach((item) => {
      item.style.display = "none";
      if (target === item.getAttribute("data-id")) {
        item.style.display = "block";
      }
      if (target === "all") {
        item.style.display = "block";
      }
    });
  });
});

//lightbox

const lightbox = document.querySelector(".lightbox");
const closeLightbox = document.querySelector(".close-lightbox");
const lightboxImage = lightbox.querySelector("img");

lightbox.addEventListener("click", function (event) {
  if (event.target != lightboxImage) {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
  }
});

closeLightbox.addEventListener("click", function () {
  lightbox.classList.remove("show");
  lightbox.classList.add("hide");
});

const galleryItem = document.querySelectorAll(".item-pic");
galleryItem.forEach((element) => {
  element.querySelector(".fa-plus").addEventListener("click", function () {
    lightbox.classList.remove("hide");
    lightbox.classList.add("show");
    lightboxImage.src = element.querySelector("img").getAttribute("src");
  });
});
