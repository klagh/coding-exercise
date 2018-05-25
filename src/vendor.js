//
// Template Engine
//

/**
 * You may add templates via <script type="template/handlebars"></script> tags.
 * They will be automatically registered as partials.
 */
const handlebars = require('handlebars');
const templates = document.querySelectorAll('script[type="template/handlebars"]');

templates.forEach((t) => {
  window.Templates = window.Templates || {};

  if (!t.id) {
    throw new Error('Template must have an ID.');
  }

  if (window.Templates[t.id]) {
    throw new Error('Duplicate template #' + t.id);
  }

  const compiled = window.Templates[t.id] = handlebars.compile(t.innerHTML);
  handlebars.registerPartial(t.id, compiled);

  compiled.render = function (cssSelector, context) {
    document.querySelector(cssSelector).innerHTML = this(context);
  }
});
