(function attachLanguageController() {
  const STORAGE_KEY = "tsn-preferred-language";
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = new Set(["en", "te"]);
  const root = document.documentElement;
  const listeners = new Set();
  let currentLanguage = normalizeLanguage(root.getAttribute("lang"));
  let liveRegion = null;

  function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.has(language) ? language : DEFAULT_LANGUAGE;
  }

  function getTranslations(language) {
    const dictionaries = window.TSN_TRANSLATIONS || {};
    return dictionaries[normalizeLanguage(language)] || {};
  }

  function readStoredLanguage() {
    try {
      return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function writeStoredLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      /* Ignore storage failures and keep the active language in memory. */
    }
  }

  function t(key, fallback) {
    const activeTranslations = getTranslations(currentLanguage);
    const englishTranslations = getTranslations(DEFAULT_LANGUAGE);

    if (Object.prototype.hasOwnProperty.call(activeTranslations, key)) {
      return activeTranslations[key];
    }

    if (Object.prototype.hasOwnProperty.call(englishTranslations, key)) {
      return englishTranslations[key];
    }

    return typeof fallback === "string" ? fallback : key;
  }

  function captureDefaultText(element, attributeName) {
    if (attributeName) {
      const datasetKey = `i18nDefaultAttr${attributeName.replace(/[^a-z0-9]/gi, "")}`;
      if (!element.dataset[datasetKey]) {
        element.dataset[datasetKey] = element.getAttribute(attributeName) || "";
      }
      return element.dataset[datasetKey];
    }

    if (!element.dataset.i18nDefault) {
      element.dataset.i18nDefault = element.textContent || "";
    }

    return element.dataset.i18nDefault;
  }

  function captureDefaultHtml(element) {
    if (!element.dataset.i18nDefaultHtml) {
      element.dataset.i18nDefaultHtml = element.innerHTML;
    }

    return element.dataset.i18nDefaultHtml;
  }

  function applyLanguageToCopy(element) {
    if (currentLanguage === "te") {
      element.setAttribute("lang", "te");
    } else if (element.getAttribute("lang") === "te") {
      element.removeAttribute("lang");
    }
  }

  function applyTextTranslations(scope) {
    scope.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;

      const fallback = captureDefaultText(element);
      element.textContent = t(key, fallback);
      applyLanguageToCopy(element);
    });

    scope.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.getAttribute("data-i18n-html");
      if (!key) return;

      const fallback = captureDefaultHtml(element);
      element.innerHTML = t(key, fallback);
      applyLanguageToCopy(element);
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const definition = element.getAttribute("data-i18n-attr");
      if (!definition) return;

      definition.split(";").map((part) => part.trim()).filter(Boolean).forEach((pair) => {
        const separatorIndex = pair.indexOf(":");
        if (separatorIndex === -1) return;

        const attributeName = pair.slice(0, separatorIndex).trim();
        const key = pair.slice(separatorIndex + 1).trim();
        if (!attributeName || !key) return;

        const fallback = captureDefaultText(element, attributeName);
        element.setAttribute(attributeName, t(key, fallback));
      });
    });
  }

  function ensureLiveRegion() {
    if (liveRegion) return liveRegion;

    liveRegion = document.createElement("div");
    liveRegion.className = "sr-only";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.setAttribute("data-language-live-region", "");
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  function announceLanguageChange(language) {
    if (!document.body) return;
    const region = ensureLiveRegion();
    region.textContent = t(`ui.language.status.${language}`);
  }

  function syncLanguageOptions() {
    const isTelugu = currentLanguage === "te";
    const nextLanguage = isTelugu ? "en" : "te";
    const floatingButtons = document.querySelectorAll("[data-language-floating]");

    floatingButtons.forEach((button) => {
      const label = button.querySelector("[data-language-floating-label]");
      if (label) {
        label.textContent = t(`ui.language.floating.label.switchTo${nextLanguage === "te" ? "Te" : "En"}`);
      }

      button.setAttribute("title", t(`ui.language.floating.tooltip.switchTo${nextLanguage === "te" ? "Te" : "En"}`));
      button.setAttribute("aria-label", t(`ui.language.floating.aria.switchTo${nextLanguage === "te" ? "Te" : "En"}`));
      button.dataset.targetLanguage = nextLanguage;
    });

    document.querySelectorAll("[data-language-option]").forEach((button) => {
      const optionLanguage = button.getAttribute("data-language-option");
      const isActive = optionLanguage === currentLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("aria-current", isActive ? "true" : "false");
      button.setAttribute("aria-label", t(`ui.language.option.aria.${optionLanguage}`, button.textContent || ""));
    });
  }

  function beginLanguageTransition() {
    if (!document.body) return;
    root.setAttribute("data-language-transition", "true");
  }

  function endLanguageTransition() {
    window.setTimeout(() => {
      root.removeAttribute("data-language-transition");
      root.removeAttribute("data-language-pending");
    }, 180);
  }

  function applyTranslations(scope = document) {
    applyTextTranslations(scope);
    root.setAttribute("lang", currentLanguage);
    root.setAttribute("data-language", currentLanguage);
    syncLanguageOptions();
  }

  function setLanguage(language, options = {}) {
    const nextLanguage = normalizeLanguage(language);
    const {
      persist = true,
      announce = true,
      transition = true
    } = options;

    currentLanguage = nextLanguage;

    root.setAttribute("lang", nextLanguage);
    root.setAttribute("data-language", nextLanguage);

    if (persist) {
      writeStoredLanguage(nextLanguage);
    }

    if (transition) {
      beginLanguageTransition();
    }

    applyTranslations(document);

    if (transition) {
      endLanguageTransition();
    } else {
      root.removeAttribute("data-language-pending");
    }

    if (announce) {
      announceLanguageChange(nextLanguage);
    }

    const event = new CustomEvent("tsn:languagechange", {
      detail: { language: nextLanguage }
    });

    document.dispatchEvent(event);
    listeners.forEach((listener) => listener(nextLanguage));
    return nextLanguage;
  }

  function getLanguage() {
    return currentLanguage;
  }

  function subscribe(listener) {
    if (typeof listener !== "function") {
      return function noop() {};
    }

    listeners.add(listener);
    return function unsubscribe() {
      listeners.delete(listener);
    };
  }

  function bindControls() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-language-floating], [data-language-option]");
      if (!target) return;

      if (target.hasAttribute("data-language-floating")) {
        setLanguage(target.dataset.targetLanguage || (currentLanguage === "te" ? "en" : "te"));
        return;
      }

      if (target.hasAttribute("data-language-option")) {
        setLanguage(target.getAttribute("data-language-option"));
      }
    });
  }

  window.TSNLanguage = {
    STORAGE_KEY,
    getLanguage,
    setLanguage,
    t,
    applyTranslations,
    subscribe
  };

  bindControls();

  document.addEventListener("DOMContentLoaded", () => {
    currentLanguage = readStoredLanguage();
    setLanguage(currentLanguage, {
      persist: false,
      announce: false,
      transition: false
    });
  });
})();
