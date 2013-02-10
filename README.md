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
    //First encode data
    var rle = require("voxel-crunch").encode(data);
    //Then decode
    var result = require("voxel-crunch").decode(rle, data.length);
    //Now
    //    result == data

`require("voxel-crunch").encode(chunk)`
------------------------------------------------------------
This method crunches a chunk down into a smaller representation.

* `chunk` is either a `Buffer`, a `Uint8Array`, or an `Array` of bytes

It returns a Uint8Array containing a run-length-encoded representation of the chunks.

`require("voxel-crunch").decode(runs, chunk_len)`
------------------------------------------------------------
This method decodes a crunched chunk back into a full chunk.  It takes 3 arguments:

* `runs` is the crunched chunk
* `chunk_len` is the length of the decoded chunk

If the runs are not valid, it throws an error.  Otherwise, it returns a buffer of length=chunk_len containing the decompressed voxel buffer.


Credits
=======
(c) 2013 Mikola Lysenko. BSD
