function addCss() {
  var head = document.head;
  var link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'https://dbullard2.github.io/a-la-mode/extension/firefox/mystyles.css';
  console.log(link);

  head.appendChild(link);
}

addCss();

document.body.insertAdjacentHTML(
  'beforeend',
  '<div id="mode--test-container" class="blah blep">      <div class="mode--top">        <h1 class="title is-size-1" id="item-name">          <span style="color: #f5fcc1;">à</span> <span style="color: #ff0059;">la</span>          <span style="color: #ab56fb;">mode</span>        </h1>      </div>      <div class="mode--container">        <div id="classes"></div>        <div id="ids"></div>        <hr style="width: 10000px; margin-left: -1000px;" />        <code id="mode--css"></code>      </div>    </div>'
);

var popup = document.getElementById('mode--test-container');
popup.style.zIndex = '9999999999999999';
popup.style.position = 'absolute';

var colours = ['#f5fcc1', '#ff0059', '#ab56fb'];
var colour = colours[Math.floor(Math.random() * colours.length)];
document.getElementById('item-name').style.color = colour;

document.addEventListener('mousemove', function (e) {
  popup.style.top = e.clientY + 'px';
  popup.style.left = e.clientX + 'px';
  document.getElementById('item-name').innerText = e.target.tagName;

  var classObj = document.getElementById('classes');
  classObj.innerHTML = '';
  var classList = e.target.className.split(' ');
  classList = classList.join(', ');
  classObj.style.color = colour;
  if (classList == '') {
    classObj.insertAdjacentHTML('beforeend', '<p class="is-size-5">Classes: None</p>');
  } else {
    classObj.insertAdjacentHTML(
      'beforeend',
      '<p class="is-size-5">Classes: &nbsp;' + classList + '</p>'
    );
  }

  var idObj = document.getElementById('ids');
  var idList = e.target.id;
  idObj.innerHTML = '';
  idObj.style.color = colour;
  if (idList == '') {
    idObj.insertAdjacentHTML('beforeend', '<p class="is-size-5">IDs: None</p>');
  } else {
    idObj.insertAdjacentHTML(
      'beforeend',
      '<p class="is-size-5">IDs: &nbsp;' + idList + '</p>'
    );
  }

  var code = document.getElementById('mode--css');
  code.innerText = 'hello';

  var proto = Element.prototype;
  var slice = Function.call.bind(Array.prototype.slice);
  var matches = Function.call.bind(
    proto.matchesSelector ||
      proto.mozMatchesSelector ||
      proto.webkitMatchesSelector ||
      proto.msMatchesSelector ||
      proto.oMatchesSelector
  );

  var elementMatchCSSRule = function (element, cssRule) {
    return matches(element, cssRule.selectorText);
  };

  var propertyInCSSRule = function (prop, cssRule) {
    return prop in cssRule.style && cssRule.style[prop] !== '';
  };

  var cssRules = slice(document.styleSheets).reduce(function (rules, styleSheet) {
    return rules.concat(slice(styleSheet.cssRules));
  }, []);

  var getAppliedCss = function (elm) {
    // get only the css rules that matches that element
    var elementRules = cssRules.filter(elementMatchCSSRule.bind(null, elm));
    var rules = [];
    if (elementRules.length) {
      for (i = 0; i < elementRules.length; i++) {
        var e = elementRules[i];
        rules.push({
          order: i,
          text: e.cssText,
        });
      }
    }

    if (elm.getAttribute('style')) {
      rules.push({
        order: elementRules.length,
        text: elm.getAttribute('style'),
      });
    }
    return rules;
  };

  function showStyle() {
    var styleSheetList = document.styleSheets;
    // get a reference to an element, then...
    //var div1 = document.getElementById('div1');

    var rules = getAppliedCss(e.target);

    var str = '';
    for (i = 0; i < rules.length; i++) {
      var r = rules[i];
      str += r.text + '<br /><br />';
    }

    var strArr = str.split('');
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i] == '{') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;">{<br /></span>');
      } else if (strArr[i] == '}') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;"><br />}</span>');
      } else if (strArr[i] == ',') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;">,</span>');
      } else if (strArr[i] == ';') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;">;<br /></span>');
      } else if (strArr[i] == ':') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;">:</span>');
      } else if (strArr[i] == '.') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;">.</span>');
      } else if (strArr[i] == '#') {
        strArr.splice(i, 1, '<span style="color: #56d6fb;"> #</span>');
      }
    }

    strArr = strArr.join('');
    code.innerHTML = strArr;
  }

  showStyle();
});
