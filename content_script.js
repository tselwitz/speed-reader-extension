const fieldToChange = 'innerHTML';
const disregard = [
  /<strong(.*?)<\/strong>/gmsu,
  /<a(.*?)<\/a>/gmsu,
  /<svg(.*?)<\/svg>/gmsu,
  /<span(.*?)<\/span>/gmsu,
  /<href(.*?)<\/href>/gmsu,
];
function getContent() {
  const content = document.querySelectorAll(
    'h1, h2, h3, h4, h5, p, li, caption, span, a'
  );
  return content;
}

function modifyContent(content) {
  console.info(content);
  for (let i = 0; i < content.length; i++) {
    let text = content[i][fieldToChange];
    // If the text clean, do it all
    if (text.indexOf('>') === -1 || text.indexOf('<') === -1) {
      let words = text?.split(' ');
      if (words) {
        for (let j = 0; j < words.length; j++) {
          words[j] = embolden(words[j]);
        }
        text = words.join(' ');
        content[i][fieldToChange] = text;
      }
    } else {
      //Otherwise get more creative
      text = removeUndesirables(text);
      let words = text?.split(' ');
      if (words) {
        for (let j = 0; j < words.length; j++) {
          words[j] = embolden(words[j]);
        }
        text = words.join(' ');
        content[i][fieldToChange] = text;
      }
    }
  }
  console.info(content);
  return content;
}

function embolden(word) {
  const halfway = word.length / 2;
  const firstHalf = word.substring(0, halfway);
  const lastHalf = word.substring(halfway);
  return `<b>${firstHalf}</b>${lastHalf}`;
}

// Not done obviously.  Right now, it just tries to remove anything matching troublesome html
function removeUndesirables(text) {
  console.info(text);
  disregard.forEach((rgx) => {
    console.info(text.match(rgx));
    text.replace(rgx, '');
  });
  return text;
}

modifyContent(getContent());
