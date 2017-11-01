(function() {

  function getRequest(url, cb) {
    var req = new XMLHttpRequest();
    req.addEventListener('load', function() {
      if(cb) cb(req.response);
    });
    req.open('GET', url);
    req.send();
  }


  var ol = self.Overlay = {

    open: function(url, callbacks) {
      callbacks = callbacks || {};
      getRequest(url, function(html) {
        ol.background.insertAdjacentHTML('afterbegin', html);
        ol.background.firstChild.classList.add('overlay-content');
        ol.background.classList.add('active');
        if (callbacks.load) callbacks.load(ol.background.firstChild);
        ol.acceptCB = callbacks.accept;
      });
    },

    close: function() {
      ol.background.classList.remove('active');
      ol.background.innerHTML = '';
      delete ol.acceptCB;
    },

    accept: function() {
      if(ol.acceptCB) ol.acceptCB();
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
