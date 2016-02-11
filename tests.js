QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("searchBing returns empty collection when input is empty", function( assert ) {
    var results = searchBing("");

    var actual = Object.keys(results).length;
    var expected = 0;
    assert.equal (actual, expected, "Search returned an empty collection!");
});

QUnit.test("searchBing returns sample data when input is test", function( assert ) {
	var results = searchBing("test");

    var actual = results["d"]["results"].length;
    assert.equal (actual, 50, "Search returned the sample data");
});