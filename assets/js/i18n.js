/* Simple i18n for static UI texts (ES/EN). Post content is not translated. */
(function () {
  const LANG_KEY = "lang";
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en", "es"];

  const translations = {
    en: {
      // Navbar
      "nav.About": "About",
      "nav.Blog": "Blog",
      "nav.Projects": "Projects",
      "nav.Publications": "Publications",
      "nav.Music": "Music",
      "nav.lang_toggle_title": "Switch language",

      // Landing
      "landing.welcome": "Hi! Welcome to my website",
      "landing.intro_html":
        "I am Alejandro, <span id=\"age\"></span> years old. Here, you can take a look at my (personal) <a href=\"/projects\">projects</a> (I have selected several that are available on my GitHub profile), <a href=\"/blog\">blog</a> (where I document and share insights about computer vision, image processing, math, geometry and engineering, among other topics), <a href=\"/publications\">publications</a> (a mix of informal, formal, and quasi-formal documents I find valuable for anyone interested in my fields), and, if you'd like to know more about me, <a href=\"/about\">additional information</a>.",
      "landing.freetime": "Free time?,",
      "landing.play_game": "play a game!",

      // About
      "about.title": "About Me",
      "about.hi_html": "Hi, I am <strong>{name}</strong> 🌐,",
      "about.description":
        "My interests focus on the research and development of analytical techniques and machine learning for computer vision and image processing to continuously improve a variety of applications, with an emphasis on cutting-edge systems and processes that involve object inspection and measurement algorithms, particularly in digital images and 3D point clouds. Additionally, I am deeply interested in large language models (LLMs), multimodal models (VLMs), generative and diffusion models, and their deployment across diverse real-world applications.",
      "about.resume_es": "Download Resume (ES)",
      "about.resume_en": "Download Resume (EN)",
      "about.programming_skills": "Programming Skills",
      "about.other_skills": "Other Skills",
      "about.professional_experience": "Professional experience",
      "about.education": "Education",

      // Contact
      "contact.title": "Contact",
      "contact.name_placeholder": "Name / Subject",
      "contact.email_placeholder": "Email",
      "contact.message_placeholder": "Message",
      "contact.send": "Send",

      // Publications
      "pub.papers": "Papers",
      "pub.papers_desc": "Some journal publications during research time.",
      "pub.preprints": "Preprints",
      "pub.preprints_desc":
        "Eventually, I research a few exciting topics in image processing and computer vision.",
      "pub.works": "Works",
      "pub.works_desc": "My academic finals projects, published openly.",
      "pub.other": "Other",
      "pub.other_desc": "A few write-ups and more informal, short-format essays.",
      "pub.link_paper": "Link to paper",
      "pub.link_preprint": "Link to preprint",
      "pub.link_work": "Link to work",
      "pub.link_pdf": "Link to PDF",
      "pub.abstract": "Abstract:",
      "pub.description": "Description:",

      // Music
      "music.collection": "Collection of my non-professional musical experimentation.",

      // Blog
      "blog.search_placeholder": "Search posts...",
      "blog.calendar_title": "See blog calendar",
      "blog.tags_title": "See blog tags",
      "blog.no_results": "No results found",

      // Footer
      "footer.license_html":
        "&copy; {year} (and <i class=\"fas fa-code\"></i> by) <strong>{name}</strong>. Under the <a href=\"https://github.com/agarnung/agarnung.github.io/blob/main/LICENSE\" target=\"_blank\">MIT License</a>."
    },
    es: {
      // Navbar
      "nav.About": "Sobre mí",
      "nav.Blog": "Blog",
      "nav.Projects": "Proyectos",
      "nav.Publications": "Publicaciones",
      "nav.Music": "Música",
      "nav.lang_toggle_title": "Cambiar idioma",

      // Landing
      "landing.welcome": "¡Hola! Bienvenido a mi web",
      "landing.intro_html":
        "Soy Alejandro, tengo <span id=\"age\"></span> años. Aquí puedes echar un vistazo a mis <a href=\"/projects\">proyectos</a> personales (he seleccionado varios que están disponibles en mi perfil de GitHub), mi <a href=\"/blog\">blog</a> (donde documento y comparto contenido sobre visión por computador, procesamiento de imágenes, matemáticas, geometría e ingeniería, entre otros temas), mis <a href=\"/publications\">publicaciones</a> (una mezcla de documentos informales, formales y semi-formales que considero valiosos para cualquier interesado en mis áreas) y, si quieres saber más sobre mí, <a href=\"/about\">información adicional</a>.",
      "landing.freetime": "¿Tiempo libre?,",
      "landing.play_game": "¡juega un rato!",

      // About
      "about.title": "Sobre mí",
      "about.hi_html": "Hola, soy <strong>{name}</strong> 🌐,",
      "about.description":
        "Mis intereses se centran en la investigación y el desarrollo de técnicas analíticas y de aprendizaje automático para visión por computador y procesamiento de imágenes, con el objetivo de mejorar de forma continua una gran variedad de aplicaciones, haciendo hincapié en sistemas y procesos de vanguardia que implican algoritmos de inspección y medida de objetos, especialmente en imágenes digitales y nubes de puntos 3D. Además, me interesan profundamente los grandes modelos de lenguaje (LLMs), los modelos multimodales (VLMs), los modelos generativos y de difusión, y su despliegue en diversas aplicaciones reales.",
      "about.resume_es": "Descargar CV (ES)",
      "about.resume_en": "Descargar CV (EN)",
      "about.programming_skills": "Habilidades de programación",
      "about.other_skills": "Otras habilidades",
      "about.professional_experience": "Experiencia profesional",
      "about.education": "Formación",

      // Contact
      "contact.title": "Contacto",
      "contact.name_placeholder": "Nombre / Asunto",
      "contact.email_placeholder": "Correo electrónico",
      "contact.message_placeholder": "Mensaje",
      "contact.send": "Enviar",

      // Publications
      "pub.papers": "Artículos",
      "pub.papers_desc": "Algunas publicaciones en revistas durante mi etapa investigadora.",
      "pub.preprints": "Preprints",
      "pub.preprints_desc":
        "De vez en cuando investigo algunos temas interesantes en procesamiento de imágenes y visión por computador.",
      "pub.works": "Trabajos",
      "pub.works_desc": "Mis proyectos académicos finales, publicados abiertamente.",
      "pub.other": "Otros",
      "pub.other_desc": "Algunos escritos y ensayos más informales y de formato breve.",
      "pub.link_paper": "Enlace al artículo",
      "pub.link_preprint": "Enlace al preprint",
      "pub.link_work": "Enlace al trabajo",
      "pub.link_pdf": "Enlace al PDF",
      "pub.abstract": "Resumen:",
      "pub.description": "Descripción:",

      // Music
      "music.collection": "Colección de mi experimentación musical no profesional.",

      // Blog
      "blog.search_placeholder": "Buscar posts...",
      "blog.calendar_title": "Ver calendario del blog",
      "blog.tags_title": "Ver etiquetas del blog",
      "blog.no_results": "No se encontraron resultados",

      // Footer
      "footer.license_html":
        "&copy; {year} (y <i class=\"fas fa-code\"></i> por) <strong>{name}</strong>. Bajo la <a href=\"https://github.com/agarnung/agarnung.github.io/blob/main/LICENSE\" target=\"_blank\">Licencia MIT</a>."
    }
  };

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute("lang", lang);
    applyTranslations();
    updateToggleUI();
  }

  function interpolate(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] != null ? vars[k] : "{" + k + "}";
    });
  }

  function t(key, vars) {
    const lang = getLang();
    const dict = translations[lang] || translations[DEFAULT_LANG];
    const raw = dict[key] != null ? dict[key] : (translations[DEFAULT_LANG][key] || key);
    return interpolate(raw, vars);
  }

  function collectVars(el) {
    const vars = {};
    for (const attr of el.attributes) {
      if (attr.name.indexOf("data-i18n-var-") === 0) {
        vars[attr.name.substring("data-i18n-var-".length)] = attr.value;
      }
    }
    return vars;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key, collectVars(el));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(key, collectVars(el));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key, collectVars(el)));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-title");
      el.setAttribute("title", t(key, collectVars(el)));
    });

    // Re-run age calculator if present (the landing intro contains #age span)
    if (typeof window.calculateAge === "function") {
      try { window.calculateAge(); } catch (e) { /* noop */ }
    }
  }

  function toggleLang() {
    setLang(getLang() === "en" ? "es" : "en");
  }

  function updateToggleUI() {
    const lang = getLang();
    const toggle = document.getElementById("lang-toggler");
    if (toggle) {
      toggle.setAttribute("data-lang", lang);
      toggle.setAttribute("title", t("nav.lang_toggle_title"));
      const esLabel = toggle.querySelector(".lang-label-es");
      const enLabel = toggle.querySelector(".lang-label-en");
      if (esLabel) esLabel.classList.toggle("active", lang === "es");
      if (enLabel) enLabel.classList.toggle("active", lang === "en");
      const knob = toggle.querySelector(".lang-knob");
      if (knob) knob.style.transform = lang === "es" ? "translateX(0)" : "translateX(22px)";
    }
  }

  // Expose
  window.i18n = { t: t, setLang: setLang, getLang: getLang, toggleLang: toggleLang, apply: applyTranslations };

  // Init
  document.documentElement.setAttribute("lang", getLang());
  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
    updateToggleUI();
    const toggle = document.getElementById("lang-toggler");
    if (toggle) toggle.addEventListener("click", toggleLang);
  });
})();
