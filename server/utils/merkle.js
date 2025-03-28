import { toBuffer , hashArray, combineHashBuffers, hashToBuffer} from "./utils.js";
/**
 Create the different layers of the merkle tree.
 if the index is even, combine the element with the next one. 0 and 1 are combined, 2 and 3 are combined,
 etc.
**/
export const getNextLayer = (elements) => {
  return elements.reduce((layer, element, index, arr) => {
    if (index % 2 === 0) {
      layer.push(combineHashBuffers(element, arr[index + 1]));
    }
    return layer;
  }, []);
};

/**
 Generate the merkle tree layers.
 If @param element ===["hash1", "hash2", "hash3"]:
    layers=[["hash1", "hash2", "hash3"], ["hash1 + hash2", "hash3"], [root]]
**/
export const getLayers = (elements) => {
  if (elements.length === 0) {
    return [[]];
  }
  const layers = [];
  layers.push(elements);

  while (layers[layers.length - 1].length > 1) {
    layers.push(getNextLayer(layers[layers.length - 1]));
  }
  return layers;
};

const getPair = (index, layer) => {
  const pairIndex = index % 2 ? index - 1 : index + 1;
  if(pairIndex<layer.length){
    return layer[pairIndex];
  }
  return null;
};

const getProof = (index, layers) => {
  let i = index;
  const proof = layers.reduce((current, layer) => {
    const pair = getPair(i, layer);
    if (pair) {
      current.push(pair);
    }
    i = Math.floor(i / 2);
    return current;
  }, []);
  return proof;
};

export class MerkleTree {
  elements = [];
  layers = [];

  constructor(_elements) {
    // convert the elements array to a sorted array of buffers.
    this.elements = hashArray(_elements);

    // check buffers
    if (this.elements.some((e) => !(e.legnth === 32 && Buffer.isBuffer(e)))) {
      throw new Error("All elements must be 32 byte buffers");
    }
    this.layers = getLayers(this.elements);
  }
  getRoot() {
    return this.layers[this.layers.length - 1][0];
  }

  getProof(_element) {
    const element = toBuffer(_element);
    const index = this.elements.findIndex((e) => e.equals(element));
    if (index === -1) {
      throw new Error("Element not found");
    }
    return getProof(index, this.layers);
  }
}

/**
 * Function that runs through the supplied hashes to arrive at the supplied merkle root hash
 * @param _proof The list of uncle hashes required to arrive at the supplied merkle root
 * @param _root The merkle root
 * @param _element The leaf node that is being verified
 */
export const checkProof=(_proof, _root, _element)=>{
    const proof= _proof.map((step)=>hashToBuffer(step));
    const root= hashToBuffer(_root);
    const element= hashToBuffer(_element);
    const proofRoot= proof.reduce(
        (hash, pair)=>combineHashBuffers(hash, pair), element
    )
    return root.equals(proofRoot);
}
// Example Merkle Tree:
//            Root Hash
//           /         \
//       Hash1-2      Hash3-4
//       /     \      /     \
//    Hash1   Hash2  Hash3  Hash4
//    /         \    /        \
// Data1      Data2 Data3    Data4

// to get the proof for Data2:
// 1. Need Hash1 (to combine with Hash2)
// 2. Need Hash3-4 (to combine with Hash1-2)