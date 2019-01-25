import * as chai from 'chai';
import { assert, expect, use } from 'chai';
use(require('chai-http'))
use(require('chai-as-promised'))
use(require('chai-datetime'))

import app from '../app'
import conn from '../models/conn'
import example from '../models/entity/example'

describe('router', () => {

  before(async () => {
    await conn.initDefault()
  })

  afterEach(async () => {
    await conn.getDefault().createQueryRunner().query('DELETE FROM example')
  })

  it('/example invalid content-type', (done) => {

    chai.request(app)
      .post('/example')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.text).to.be.eq('invalid content-type')
        done();
      });
  });

  it('/example invalid body', (done) => {
    chai.request(app)
      .post('/example')
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.text).to.be.eq('invalid body')
        done()
      });
  });

  it('/example ok', async () => {

    const res = await chai.request(app)
      .post('/example')
      .set('content-type', 'application/json')
      .send({ ftext: 'text', fbyte: 'byte' })

    expect(res).to.have.status(200)
    assert.isNotEmpty(res.body)

    const inDb = await example.getByFText('text')
    const inReq = {
      id: res.body.id,
      ftext: res.body.ftext,
      fbyte: Buffer.from(res.body.fbyte.data),
      createdAt: new Date(res.body.createdAt),
      updatedAt: new Date(res.body.updatedAt),
    }

    assert.deepEqual(inDb.id, inReq.id)
    assert.deepEqual(inDb.ftext, inReq.ftext)
    assert.deepEqual(inDb.fbyte, inReq.fbyte)
    assert.deepEqual(inDb.createdAt, inReq.createdAt)
    assert.deepEqual(inDb.updatedAt, inReq.updatedAt)
  });
});
