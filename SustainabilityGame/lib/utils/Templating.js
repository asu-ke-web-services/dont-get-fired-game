Utils = typeof Utils === 'undefined' ? {} : Utils;

Utils.Templating = {
  templatize: function (template, data) {
    let rendered = template;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];

        var regex = new RegExp('{{(\s)*?' + key + '(\s)*?}}', 'g');

        rendered = rendered.replace(regex, value);
      }
    }

    return rendered;
  }
};
