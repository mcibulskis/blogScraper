QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "data is parsable", function( assert ) {
  var data;
  assert.ok( data = JSON.parse($("#shorttestdata").text()) );
});

var data = JSON.parse($("#shorttestdata").text());
QUnit.test( "data has a d element", function( assert ) {
  assert.ok( "d" in data );
});

QUnit.test( "data has a results list", function( assert ) {
  alert(typeof data.d.results.length)
  assert.ok( 0 < data.d.results.length );
});
