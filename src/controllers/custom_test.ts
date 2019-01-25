import { assert, expect, request, use } from 'chai';
import app from '../app'

use(require('chai-http'))

describe('router', () => {

  it('/', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        assert.isNull(err)
        expect(res).to.have.status(200)
        expect(res.text).to.be.include('Welcome to your first Scorocode app!')

        done();
      });
  });

});
