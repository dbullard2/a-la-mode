var popup = document.getElementById('square');

document.addEventListener('mousemove', function (e) {
  popup.style.top = event.clientY + 'px';
  popup.style.left = event.clientX + 'px';
  popup.innerText = e.target.tagName;
});

document.addEventListener('click', function (e) {
  var item = e.target.tagName;
  var itemObj = document.getElementById('item-name');
  var classObj = document.getElementById('classes');
  var classList = e.target.className.split(' ');
  classList = classList.join(', ');
  var idObj = document.getElementById('ids');
  var idList = e.target.id;
  idObj.innerHTML = '';
  var code = document.getElementById('css');
  var colours = ['#f5fcc1', '#ff0059', '#ab56fb'];
  var colour = colours[Math.floor(Math.random() * colours.length)];

  itemObj.innerText = item;
  itemObj.style.color = colour;
  classObj.innerHTML = '';
  classObj.style.color = colour;
  idObj.style.color = colour;

  if (classList == '') {
    classObj.insertAdjacentHTML('beforeend', '<p class="is-size-5">Classes: None</p>');
  } else {
    classObj.insertAdjacentHTML(
      'beforeend',
      '<p class="is-size-5">Classes: &nbsp;' + classList + '</p>'
    );
  }

  if (idList == '') {
    idObj.insertAdjacentHTML('beforeend', '<p class="is-size-5">IDs: None</p>');
  } else {
    idObj.insertAdjacentHTML(
      'beforeend',
      '<p class="is-size-5">IDs: &nbsp;' + idList + '</p>'
    );
  }

  //copied code below!
  var proto = Element.prototype;
  var slice = Function.call.bind(Array.prototype.slice);
  var matches = Function.call.bind(
    proto.matchesSelector ||
      proto.mozMatchesSelector ||
      proto.webkitMatchesSelector ||
      proto.msMatchesSelector ||
      proto.oMatchesSelector
  );

  // Returns true if a DOM Element matches a cssRule
  var elementMatchCSSRule = function (element, cssRule) {
    return matches(element, cssRule.selectorText);
  };

  // Returns true if a property is defined in a cssRule
  var propertyInCSSRule = function (prop, cssRule) {
    return prop in cssRule.style && cssRule.style[prop] !== '';
  };

  // Here we get the cssRules across all the stylesheets in one array
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

    var brackets = [];

    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == '{' || str.charAt(i) == '}') {
        brackets.push(i);
      }
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
