(function() {

  function getRequest(url, cb) {
    var req = new XMLHttpRequest();
    req.responseType = 'text';
    req.addEventListener('load', function() {
      if(cb) cb(req.response);
    });
    req.open('GET', url);
    req.send();
  }


  var ol = self.Overlay = {

    open: function(url, cb) {
      getRequest(url, function(html) {
        ol.background.insertAdjacentHTML('afterbegin', html);
        ol.background.firstChild.classList.add('overlay-content');
        ol.background.classList.add('active');
        if(cb) ol.acceptCB = cb;
      });
    },

    close: function() {
      ol.background.classList.remove('active');
      ol.background.innerHTML = '';
      delete ol.acceptCB;
    },

    accept: function() {
      ol.acceptCB();
      ol.close();
    }

  };

  ol.background = document.createElement('div');
  ol.background.classList.add('overlay-bg');
  ol.background.addEventListener('keydown', function(e) {
    console.log(e.key);
    if (e.key === 'Escape') ol.close();
  });

  window.addEventListener('load', function() {
    document.body.appendChild(ol.background);
  });

})();
