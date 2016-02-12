// EXAMPLE CALL
//renderTable( researchUrls( queryBing("query") ) );

// input type: query string, callback
// output type: callback called with list of urls matching [ url, url, ... ]
function queryBing(query, cb) {
  var list = [];
  searchUrl(query, function(data){
     cb(data.d.results.map( function ( item ) {
         return item.Url;
       } ) );
  })
}

// input type: list of urls [ url, url, ... ]
// output type: [ { url: "...", social: [ { href: "...", name: "george" }, { ... } ] 
function researchUrls (list, rcb) {
  var outputlist = [];
  async.map(list, function (item, cb) {
    var prom = new Promise(function (resolve, reject) {
      retrievePage(item, function (xmlhttp, error) { 
        cb( { link: item, social : getListOfUrlsAndNames($.parseHTML(xmlhttp.responseText)) } );
      } ) 
    });
  }, function (err, result) { rcb( result )} );
}

// input type: [ { url: "...", social: [ { href: "...", name: "george" }, { ... } ] 
// output type: SIDE EFFECT NO OUTPUT
function renderTable() {
  // PUT DATA IN TABLE HERE
}

// input type: document object
// output type: [ { href: "...", name: "george" }, { ... } ]
function getListOfUrlsAndNames (doc) {
  var list = [];
  $.each($(doc).find("a"), function ( i, el ) {
      if ((((el.attributes||{}).href||{}).value||'').match('twitter.com')) {
        var name = (el.attributes.href.value.match('twitter.com/([^/]+)/?')||[])[1];
        list.push({ href: el.attributes.href.value, name: name });
      }

      if ((((el.attributes||{}).href||{}).value||'').match('linkedin.com/in')) {
        var name = (el.attributes.href.value.match('linkedin.com/in/([^/]+)/?')||[])[1];
        list.push({ href: el.attributes.href.value, name: name });
        // POSSIBILITY: RETRIEVE LINKEDIN PAGE AND GET ACTUAL DISPLAY NAME
      } else if ((((el.attributes||{}).href||{}).value||'').match('linkedin.com')) {
        ///... ??
      }

      if ((((el.attributes||{}).href||{}).value||'').match('facebook.com')) {
        var name = (el.attributes.href.value.match('facebook.com/([^/]+)/?')||[])[1];
        list.push({ href: el.attributes.href.value, name: name });
        // POSSIBILITY: RETRIEVE FACEBOOK PAGE AND GET ACTUAL DISPLAY NAME
      }
    }); 
  return list;
}

function retrievePage (url, cb) {
    // how are we mangling
    // RAW: https://something.wordpress.com/blahblab
    // PROXY USES: http://localhost:1337/something.wordpress.com/blahblab
    var mangled = url.replace(':/', '');
    $.ajax({
      url: 'http://localhost:1337/' + mangled,
      complete: cb
     });
}

