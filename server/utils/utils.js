import cryptoPkg from "js-sha3";
const { keccak256 } = cryptoPkg;
import flatley from "flatley";
const { flatten: flatleyFlatten } = flatley;


export const toBuffer = (input) => {
  return Buffer.isBuffer(input) && input.length === 32
    ? input
    : hashToBuffer(keccak256(JSON.stringify(input)));
};

/**
 @params arr: array of target hashes.
 converts the hashes in array to buffer and sort them.
**/
export const hashArray = (arr) => {
  return arr.map((i) => toBuffer(i)).sort(Buffer.compare);
};

/**
    The @flatley library takes a nested Javascript object and flatten it, or 
    unflatten an object with delimited keys.
**/
export const flatten = (data) => {
  return flatleyFlatten(data);
};

/**
 sort and comnine the buffers passed as argument.
**/
export const buffSortJoin = (...args) => {
  return Buffer.concat([...args].sort(Buffer.compare));
};

/**
 Convert hash to argument to buffer if it's a hash
**/
export const hashToBuffer = (hash) => {
  return Buffer.isBuffer(hash) && hash.length === 32
    ? hash
    : Buffer.from(hash, "hex");
};

/**
 @params first: hash
 @params second: hash
 sort and combine the hashes passed in the parameter and generate a new keccak256 hash from the
 combined buffers and convert the hash back to buffer.
**/
export const combineHashBuffers = (first, second) => {
  if (!second) {
    return first;
  }
  if (!first) {
    return second;
  }
  return hashToBuffer(keccak256(buffSortJoin(first, second)));
};

// what is a buffer?
// a buffer is a fixed-size chunk of memory that stores binary data.
// each element in the buffer is a byte, which is 8 bits. 1c represents a byte.
// There are 32 bytes which equals 256 bits.
// <Buffer 1c 8a ff 95 06 85 c2 ed 4b c3 17 4f 34 72 28 7b 56 d9 51 7b 9c 94 81 27 31 9a 09 a7 a3 6d ea c8>
