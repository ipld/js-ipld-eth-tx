'use strict'

const util = require('./util')
const cidForHash = require('./common').cidForHash

exports = module.exports

exports.multicodec = 'eth-tx'

/*
 * resolve: receives a path and a block and returns the value on path,
 * throw if not possible. `block` is an IPFS Block instance (contains data + key)
 */
exports.resolve = (block, path) => {
  let node = util.deserialize(block.data)

  // root

  if (!path || path === '/') {
    return { value: node, remainderPath: '' }
  }

  // check tree results

  let pathParts = path.split('/')
  let firstPart = pathParts.shift()
  let remainderPath = pathParts.join('/')

  let treeResult = exports.tree(block).find(child => child.path === firstPart)

  if (!treeResult) {
    throw new Error('Path not found ("' + firstPart + '").')
  }

  return {
    value: treeResult.value,
    remainderPath: remainderPath,
  }

}

/*
 * tree: returns a flattened array with paths: values of the project. options
 * are option (i.e. nestness)
 */

exports.tree = (block, options) => {
  if (!options) {
    options = {}
  }

  const tx = util.deserialize(block.data)
  const paths = []

  // external links (none)

  // external links as data (none)
  
  // internal data

  paths.push({
    path: 'nonce',
    value: tx.nonce,
  })
  paths.push({
    path: 'gasPrice',
    value: tx.gasPrice,
  })
  paths.push({
    path: 'gasLimit',
    value: tx.gasLimit,
  })
  paths.push({
    path: 'to',
    value: tx.to,
  })
  paths.push({
    path: 'value',
    value: tx.value,
  })
  paths.push({
    path: 'data',
    value: tx.data,
  })
  paths.push({
    path: 'v',
    value: tx.v,
  })
  paths.push({
    path: 'r',
    value: tx.r,
  })
  paths.push({
    path: 's',
    value: tx.s,
  })

  // helpers

  paths.push({
    path: 'from',
    value: tx.from,
  })

  paths.push({
    path: 'signature',
    value: [tx.v, tx.r, tx.s],
  })

  paths.push({
    path: 'isContractPublish',
    value: tx.toCreationAddress(),
  })

  return paths

}