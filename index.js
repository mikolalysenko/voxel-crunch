var zlib = require("zlib");

exports.encode = function(chunk, cb) {
  var runs = [];
  var i = 0;
  while(i<chunk.length) {
    var v = chunk[i]
      , l = 0;
    while(i < chunk.length && chunk[i] === v) {
      ++i;
      ++l;
    }
    while(l >= 128) {
      runs.push(128 + (l&0x7f));
      l >>>= 7;
    }
    runs.push(l);
    runs.push(v);
  }
  zlib.gzip(new Buffer(runs), function(err, result) {
    if(err) {
      cb(err, null);
      return;
    }
    cb(null, new Uint8Array(result));
  });
}

exports.decode = function(buf, buf_len, cb) {
  if(!cb) {
    cb = buf_len;
    buf_len = (1<<16);
  }
  zlib.gunzip(new Buffer(buf), function(err, runs) {
    if(err) {
      cb(err, null);
      return;
    }
    var chunk = new Uint8Array(buf_len);
    var cptr = 0;
    var ptr = 0;
    while(ptr < runs.length) {
      var l = 0, s = 0;
      while(ptr < runs.length && runs[ptr] >= 128) {
        l += (runs[ptr++]&0x7f) << s;
        s += 7;
      }
      l += runs[ptr++] << s;
      if(ptr >= runs.length || (cptr + l > chunk.length) ) {
        cb(new Error("Buffer overflow"), null);
        return;
      }
      var v = runs[ptr++];
      for(var i=0; i<l; ++i) {
        chunk[cptr++] = v;
      }
    }
    cb(null, chunk);
  });
}
