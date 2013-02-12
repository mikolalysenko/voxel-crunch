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
  return new Uint8Array(runs);
}

exports.decode = function(runs, buf_len) {
  if(!buf_len) {
    buf_len = (1<<16);
  }
  var chunk = new Int8Array(buf_len);
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
      throw new Error("Chunk buffer overflow");
    }
    var v = runs[ptr++];
    for(var i=0; i<l; ++i) {
      chunk[cptr++] = v;
    }
  }
  return chunk;
}
