(function() {

  function getRequest(url, cb) {
    var req = new XMLHttpRequest();
    req.addEventListener('load', function() {
      if (cb) cb(req.response);
    });
    req.open('GET', url);
    req.send();
  }


  var ol = self.Overlay = {

    open: function(url, cb) {
      getRequest(url, function(html) {
        ol.background.insertAdjacentHTML('afterbegin', html);
        ol.background.firstChild.classList.add('overlay-content');
        ol.background.firstChild.addEventListener('click', function(e){e.stopPropagation()});
        ol.background.classList.add('active');
        if (cb) cb(ol.background.firstChild);
      });
    },

    close: function() {
      ol.background.classList.remove('active');
      ol.background.innerHTML = '';
    }

  };

  ol.background = document.createElement('div');
  ol.background.classList.add('overlay-bg');
  ol.background.addEventListener('click', ol.close);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') ol.close();
  });

  window.addEventListener('load', function() {
    document.body.appendChild(ol.background);
  });

})();
