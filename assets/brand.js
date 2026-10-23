// Mobile navigation
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

function closeMenu() {
  if (!menu || !nav) return;

  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}

menu?.addEventListener("click", () => {
  if (!nav) return;

  const open = menu.getAttribute("aria-expanded") !== "true";

  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("open")) {
    closeMenu();
    menu?.focus();
  }
});

// Keep the footer year current
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Work sample image viewer
const lightbox = document.querySelector(".lightbox");
let opener = null;

function closeLightbox() {
  if (!lightbox) return;

  lightbox.close();
  document.body.classList.remove("lightbox-open");
  opener?.focus();
}

document.querySelectorAll(".zoom-image").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!lightbox || typeof lightbox.showModal !== "function") return;

    event.preventDefault();
    opener = link;

    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector("p");

    image.src = link.href;
    image.alt = link.querySelector("img")?.alt || "";
    caption.textContent = link.dataset.caption || "";

    lightbox.showModal();
    document.body.classList.add("lightbox-open");
  });
});

lightbox?.querySelector(".lightbox-close")?.addEventListener(
  "click",
  closeLightbox
);

lightbox?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeLightbox();
});

lightbox?.addEventListener("click", (event) => {
  if (event.target !== lightbox) return;

  const bounds = lightbox.getBoundingClientRect();

  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (outside) {
    closeLightbox();
  }
});