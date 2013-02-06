var crunch = require("../index.js");
require("tap").test("basic test", function(t) {
  var data = [1, 2, 2, 3, 3, 3, 5];
  for(var i=0; i<128; ++i) {
    data.push(4);
  }
  for(var j=0; j<256; ++j) {
    data.push(5);
  }
  for(var k=0; k<(1<<8); ++k) {
    data.push(6);
  }
  
  crunch.encode(data, function(err, runs) {
    console.log(runs);
    crunch.decode(runs, data.length, function(err, decoded) {
      console.log("here");
      t.equal(decoded.length, data.length);
      for(var i=0; i<data.length; ++i) {
        t.equal(data[i], decoded[i], i);
      }
      t.end();
    });
  });
});
