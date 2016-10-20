/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const dagEthBlock = require('../src')
const resolver = dagEthBlock.resolver
const IpfsBlock = require('ipfs-block')
const Transaction = require('ethereumjs-tx')

describe('IPLD format resolver (local)', () => {
  let testIpfsBlock
  let testData = {
    nonce:    new Buffer('01', 'hex'),
    gasPrice: new Buffer('04a817c800', 'hex'),
    gasLimit: new Buffer('061a80', 'hex'),
    to:       new Buffer('0731729bb6624343958d05be7b1d9257a8e802e7', 'hex'),
    value:    new Buffer('1234', 'hex'),
    // signature
    v:        new Buffer('1c', 'hex'),
    r:        new Buffer('33752a492fb77aca190ba9ba356bb8c9ad22d9aaa82c10bc8fc8ccca70da1985', 'hex'),
    s:        new Buffer('6ee2a50ec62e958fa2c9e214dae7de8ab4ab9a951b621a9deb04bb1bb37dd20f', 'hex'),
  }

  before(() => {
    const testTx = new Transaction(testData)
    testIpfsBlock = new IpfsBlock(dagEthBlock.util.serialize(testTx))
  })

  it('multicodec is eth-tx', () => {
    expect(resolver.multicodec).to.equal('eth-tx')
  })

  describe('eth-tx paths', () => {
    
    describe('resolver.resolve', () => {
      
      it('path within scope', () => {
        const result = resolver.resolve(testIpfsBlock, 'nonce')
        expect(result.value.toString('hex')).to.equal(testData.nonce.toString('hex'))
        // expect(result.value).to.equal(testData.nonce.toString('hex'))
      })

    })

    it('resolver.tree', () => {
      const paths = resolver.tree(testIpfsBlock)
      // console.log(typeof paths)
      // expect(Array.isArray(paths)).to.eql(true)
      expect(typeof paths).to.eql('object')
    })

  })
})
