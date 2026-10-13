(() => {
  // English stays in the HTML. Capture it once so switching back never loses edits.
  const targets = [...document.querySelectorAll("*")].flatMap((element) =>
    [...element.attributes]
      .filter(({ name }) => name === "data-zh" || name.startsWith("data-zh-"))
      .map(({ name, value }) => {
        const attribute = name === "data-zh" ? null : name.slice("data-zh-".length);
        return {
          element,
          attribute,
          en: attribute ? element.getAttribute(attribute) : element.textContent,
          zh: value,
        };
      }),
  );
  const buttons = document.querySelectorAll("[data-language]");

  function setLanguage(language) {
    for (const target of targets) {
      if (target.attribute) {
        target.element.setAttribute(target.attribute, target[language]);
      } else {
        target.element.textContent = target[language];
      }
    }
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  }
})();
