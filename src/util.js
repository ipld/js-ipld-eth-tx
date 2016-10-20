'use strict'

const Transaction = require('ethereumjs-tx')
const cidForHash = require('./common').cidForHash

exports.deserialize = function(data) {
  return new Transaction(data)
}

exports.serialize = function(tx) {
  return tx.serialize()
}

exports.cid = function(tx) {
  return cidForHash('eth-tx', tx.hash())
}
