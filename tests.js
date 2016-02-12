QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("searchUrl returns empty collection when url is empty", function( assert ) {
    var done = assert.async();
    searchUrl('', function(data) {
    	var actual = Object.keys(data).length;
    	assert.equal(actual, 0, "Search returned an empty colletion!");
    	done();
    });
});

var data;

//var thenable = new Promise(function( resolve, reject ) {
  QUnit.test("working inside qunit", function( assert ) {
    expect(0);
    var donewithSample = assert.async()
    searchUrl("sample.json", function (innerdata) { 
      data = innerdata; 
      donewithSample();
//      resolve( innerdata );
    })
  });
//} );

QUnit.test("searchUrl returns data when a URL is passed in", function( assert ) {
	var done = assert.async();

	searchUrl('sample.json', function(data) {
		var actual = data["d"]["results"].length;
    	assert.equal (actual, 50, "Search returned the sample data");
    	done();
	});
});

QUnit.test("generateUrl returns empty string when search terms are empty", function( assert ) {
	var actual = generateUrl("");
	assert.equal(actual, "", "Generate URL returned empty string");
});

QUnit.test("generateUrl returns test URL when test is passed in", function(assert) {
	var actual = generateUrl("test");
	assert.equal(actual, "sample.json", "Generate sample URL for test search term");
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

QUnit.test("generateUrl returns correct url when given search terms", function(assert){
	var actual = generateUrl("sunshine");
	assert.equal(actual, "https://api.datamarket.azure.com/Data.ashx/Bing/Search/Web?Query=%27sunshine%27&$top=10&$format=json", "Generate correct url given search terms");
});

QUnit.test( "twitter/linkedin/facebook can be spotted", function( assert ) {
  var thisdone = assert.async();
//  thenable.then(function (data) {
	searchUrl('sample.json', function(data) {
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
          done();
        } )
      })();
    } 
    thisdone();
  });
});

QUnit.test( "spoltt", function( assert ) {
  assert.ok(1);
});

