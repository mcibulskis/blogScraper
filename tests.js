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

QUnit.test("generateUrl returns correct url when given search terms", function(assert){
	var actual = generateUrl("sunshine");
	assert.equal(actual, "https://api.datamarket.azure.com/Data.ashx/Bing/Search/Web?Query=%27sunshine%27&$top=10&$format=json", "Generate correct url given search terms");
});
