voxel-crunch
============
This library applies run-length-encoding + gzip to an array of octets, and returns the result.  It can be used to compress individual chunks in voxel.js

Installation
============
Via npm:

    npm install voxel-crunch
    
To use it on the browser you'll need to install some zlib compatibility layer, for example [zlib-browserify](https://github.com/brianloveswords/zlib-browserify).

Example
=======

    var data = chunk.voxels;
    require("voxel-crunch").encode(data, function(err, crunched) {
      //crunched is a compressed representation of data
      require("voxel-crunch").decode(crunched, data.length, function(err, result) {
        //Now:
        // result == data
      });
    });


`require("voxel-crunch").encode(chunk, callback(err, buf))`
------------------------------------------------------------
This method crunches a chunk down into a smaller representation.  It takes 2 arguments
* `chunk` is either a `Buffer`, a `Uint8Array`, or an `Array` of bytes
* `callback` is called when the encoding completes, with either an error or a crunched `Uint8Array` if successful.

`require("voxel-crunch").decode(buf, chunk_len, callback(err, chunk))`
------------------------------------------------------------
This method decodes a crunched chunk back into a full chunk.  It takes 3 arguments:

* `buf` is the crunched chunk
* `chunk_len` is the length of the decoded chunk
* `callback(err, chunk)` is called when the decoding is complete

Credits
=======
(c) 2013 Mikola Lysenko. BSD
