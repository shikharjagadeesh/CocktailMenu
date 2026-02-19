const menuRoot = document.querySelector("#menu-root");
const bottleRoot = document.querySelector("#bottle-root");
const archivesRoot = document.querySelector("#archives-root");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function safeText(value) {
  return typeof value === "string" ? value : "";
}

function renderDrinkCard(drink) {
  const ingredients = Array.isArray(drink.ingredients) ? drink.ingredients : [];
  return `
    <article class="drink-card">
      <h3 class="drink-name">${safeText(drink.name)}</h3>
      <p class="drink-description">${safeText(drink.description)}</p>
      <p class="drink-ingredients">${ingredients.map(safeText).join(" · ")}</p>
    </article>
  `;
}

if (menuRoot) {
  const sections = Array.isArray(window.MENU_SECTIONS) ? window.MENU_SECTIONS : [];
  menuRoot.innerHTML = sections
    .map(
      (section) => `
      <section class="menu-section section-block">
        <h2>${safeText(section.title)}</h2>
        <div class="drink-list">
          ${(Array.isArray(section.drinks) ? section.drinks : [])
            .map((drink) => renderDrinkCard(drink))
            .join("")}
        </div>
      </section>
    `
    )
    .join("");
}

if (bottleRoot) {
  const data = window.BOTTLE_LIST || {};
  const liquorTypes = Array.isArray(data.liquorTypes) ? data.liquorTypes : [];
  const syrups = Array.isArray(data.syrups) ? data.syrups : [];

  bottleRoot.innerHTML = `
    <section class="content-card section-block bottle-grid">
      <article class="bottle-column">
        <h2>Bottles By Liquor Type</h2>
        <div class="liquor-type-list">
          ${liquorTypes
            .map((group) => {
              const bottles = (Array.isArray(group.bottles) ? group.bottles : [])
                .map((item) => safeText(item))
                .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
              return `
                <section class="liquor-type">
                  <h3>${safeText(group.type)}</h3>
                  <ul>
                    ${bottles.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </section>
              `;
            })
            .join("")}
        </div>
      </article>
      <article class="bottle-column">
        <h2>Syrups</h2>
        <ul>
          ${syrups.map((item) => `<li>${safeText(item)}</li>`).join("")}
        </ul>
      </article>
    </section>
  `;
}

if (archivesRoot) {
  const archivedDrinks = Array.isArray(window.ARCHIVED_DRINKS) ? window.ARCHIVED_DRINKS : [];
  archivesRoot.innerHTML = `
    <section class="menu-section section-block">
      <h2>Archive Collection</h2>
      <div class="drink-list">
        ${archivedDrinks.map((drink) => renderDrinkCard(drink)).join("")}
      </div>
    </section>
  `;
}
