import { saltData } from "./salt.js";
import { validate } from "./schema.js";
import { MerkleTree } from "./merkle.js";
import { hashToBuffer } from "./utils.js";
import pkg from 'lodash';
const {get, omitBy, sortBy} = pkg;
import {flatten} from "./utils.js";
import cryptoPkg from 'js-sha3';
const {keccak256} = cryptoPkg;

const isKeyOrValueUndefined= (value, key) => value === undefined || key === undefined;

export const flattenHashArray= (data)=>{
    const flattenedData= omitBy(flatten(data), isKeyOrValueUndefined);
    return Object.keys(flattenedData).map((k)=>{
        const obj={};
        obj[k]= flattenedData[k];
        return keccak256(JSON.stringify(obj));
    })
};

export function digestDocument(document){
    // Get the hashes of the obfuscated fields stored under privacy.obfuscatedData
    // const hashedDataArray= get(document, "privacy.obfuscatedData", []);

    const unhashedData= get(document, "data");
    const hashedUnhashedDataArray= flattenHashArray(unhashedData);

    // const combinedHashes=hashedDataArray.concat(hashedUnhashedDataArray);
    const sortedHashes= sortBy(hashedUnhashedDataArray);

    return keccak256(JSON.stringify(sortedHashes));
}

function validateJsonSchema(document) {
  const valid = validate(document);
  if (!valid) {
    return {
      isValid: false,
      errors: validate.errors,
    };
  }
  return {
    isValid: true,
    errors: null,
  };
}

// salts each field and computes the hash of each field, which is then combined and hashed to form the target hash
export function wrapDocument(data) {
  // document contains the salted version of the data
  const document = saltData(data);
  const validationResult = validateJsonSchema(document);
  if (!validationResult.isValid) {
    throw new Error("Invalid document: " + validationResult.errors[0].message);
  }
  // digest points to the target hash of the document
  const digest = digestDocument(document);

  const targetHash=digest;

  return { ...document, targetHash };
}

export function wrapDocuments(documents) {
  // get all the target hashes to compute the merkle tree and the merkle root
  const merkleTree = new MerkleTree(
    documents.map((document) => document.targetHash).map(hashToBuffer)
  );
  const merkleRoot = merkleTree.getRoot().toString("hex");

  // for each document, update the merkle root and add the proofs needed
  return documents.map((document) => {
    const merkleProof = merkleTree
      .getProof(hashToBuffer(document.targetHash))
      .map((buffer) => buffer.toString("hex"));
    return {
      ...document,
      proof: merkleProof,
      merkleRoot,
    };
  });
}