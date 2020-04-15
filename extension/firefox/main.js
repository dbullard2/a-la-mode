/*window.onload = function () {
  window.addEventListener('mousemove', nutterbutter);

  var _el = document.getElementById('square');
  _el.addEventListener('dblclick', function () {
    window.addEventListener('mousemove', nutterbutter);
    _el.addEventListener('dblclick', removeNutter);
  });

  function removeNutter() {
    window.removeEventListener('mousemove', nutterbutter);
    _el.removeEventListener('dblclick', removeNutter);
  }
  function nutterbutter() {
    _el.style.top = event.clientY + 'px';
    _el.style.left = event.clientX + 'px';
  }

  
};*/

document.onmouseover = function (e) {
  var elementToChange = document.getElementsByTagName('body')[0];
  elementToChange.style.cursor = "url('img/cursor.png'), auto";

  var body = document.getElementsByTagName('body');

  //_el.insertAdjacentHTML('beforeend', '<p>' + e.target + '</p>');
};

document.addEventListener('click', function (e) {
  //variables
  var item = e.target.tagName;
  var itemObj = document.getElementById('item-name');
  var elem = e.target;
  var el = document.getElementById('test-container');
  var classObj = document.getElementById('classes');
  var classList = e.target.className.split(' ');
  classList = classList.join(', ');
  var idObj = document.getElementById('ids');
  var idList = e.target.id;
  classObj.innerHTML = '';
  idObj.innerHTML = '';
  itemObj.innerText = item;
  el.style.top = event.clientY + 'px';
  el.style.left = event.clientX + 'px';

  //getting styles

  function getStyles() {}

  //displaying styles

  getStyles();

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

  //console.log(window.getComputedStyle(itemObj));
});
