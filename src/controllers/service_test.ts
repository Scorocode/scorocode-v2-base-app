import { assert, expect, request, use } from 'chai'
import app from '../app'
use(require('chai-http'))

describe('router', () => {

  it('/healthz', (done) => {
    request(app)
      .get('/healthz')
      .end((err, res) => {
        assert.isNull(err)
        expect(res).to.have.status(200)
        assert.deepEqual({}, res.body)
        done();
      });
  });

});
