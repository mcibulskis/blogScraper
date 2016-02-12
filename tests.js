//var url = require('url');

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "data is parsable", function( assert ) {
  var data;
  assert.ok( data = JSON.parse($("#testdata").text()) );
});
var data = JSON.parse($("#testdata").text());

QUnit.test( "data has a d element", function( assert ) {
  assert.ok( "d" in data );
});

QUnit.test( "data has a results list", function( assert ) {
  assert.ok( 0 < data.d.results.length );
});

QUnit.test( "results have Url keys", function( assert ) {
  var u;
  for (u in data.d.results) {
    assert.ok( typeof data.d.results[u].Url != "undefined" );
  }
});

QUnit.test( "url can be retrieved", function( assert ) {
  var u;
  for (u in data.d.results) {
    (function() {
      var done = assert.async()
      retrievePage(data.d.results[u].Url, function (xmlhttpreq, error) { 
         assert.ok(0 < xmlhttpreq.responseText.length); done();
      } )
    })();
  }
});

QUnit.test( "twitter/linkedin/facebook can be spotted", function( assert ) {
  for (u in data.d.results) {
    (function() {
      var done = assert.async()
      retrievePage(data.d.results[u].Url, function (xmlhttpreq, error) { 
        var doc = $.parseHTML(xmlhttpreq.responseText);
        $.each($(doc).find("a"), function ( i, el ) { 
          if (el.nodeName.toLowerCase() == "a") {
            if ((((el.attributes||{}).href||{}).value||'').match('twitter.com')) {
              assert.ok(1, "HOORAY");
            }
            if ((((el.attributes||{}).href||{}).value||'').match('linkedin.com')) {
              assert.ok(1, "HIRED");
            }
            if ((((el.attributes||{}).href||{}).value||'').match('facebook.com')) {
              assert.ok(1, "FRIENDED");
            }
          }
        } );
      } )
    })();
  } 
});

QUnit.test( "spoltt", function( assert ) {
  assert.ok(1);
});

