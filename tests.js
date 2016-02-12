QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("search returns empty collection when input is empty", function( assert ) {
    var done = assert.async();
    searchUrl('', function(data) {
    	var actual = Object.keys(data).length;
    	assert.equal(actual, 0, "Search returned an empty colletion!");
    	done();
    });
});

QUnit.test("search returns sample data when input is test", function( assert ) {
	var done = assert.async();

	searchUrl('sample.json', function(data) {
		var actual = data["d"]["results"].length;
    	assert.equal (actual, 50, "Search returned the sample data");
    	done();
	});
});