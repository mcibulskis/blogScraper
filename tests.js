QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "data is parsable", function( assert ) {
  var data;
  assert.ok( data = JSON.parse($("#shorttestdata").text()) );
});

QUnit.test( "data has a d element", function( assert ) {
  var data = JSON.parse($("#shorttestdata").text());
  assert.ok( "d" in data );
});
