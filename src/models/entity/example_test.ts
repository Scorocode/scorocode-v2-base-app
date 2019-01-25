import { assert, expect, use } from 'chai';
use(require('chai-things'))
use(require('chai-as-promised'))
use(require('chai-datetime'))

import conn from '../conn'
import example from './example'
import { datetimeUtc } from '../models'

describe('models', () => {

  before(async () => {
    await conn.initDefault()
  })

  afterEach(async () => {
    await conn.getDefault().createQueryRunner().query('DELETE FROM example')
  })

  it('migrations', async () => {
    const md = await conn.getDefault().getMetadata(example)
    assert.equal('example', md.tableName)

    const columns = []
    md.columns.map(item => columns.push(item.databaseName))
    assert.deepEqual(['id_example', 'ftext', 'fbyte', 'created_at', 'updated_at'], columns)
  });

  it('save', async () => {
    assert.equal(0, await conn.getDefault().manager.count(example))

    const src = new example()
    src.ftext = 'text'
    src.fbyte = Buffer.from('123456', 'utf8')

    const timeNow = datetimeUtc()
    const timeAfter = new Date(timeNow.getTime() + 1000)

    const saveVal = await src.save()
    assert.isNotEmpty(saveVal.id)
    expect(saveVal.createdAt).to.be.greaterThan(timeNow).and.lessThan(timeAfter);
    expect(saveVal.updatedAt).to.be.greaterThan(timeNow).and.lessThan(timeAfter);
    expect(saveVal.ftext).to.be.eq('text')
    expect(saveVal.fbyte).to.be.deep.eq(Buffer.from([49, 50, 51, 52, 53, 54]))

    assert.equal(src.id, saveVal.id)
    assert.isEmpty(src.createdAt)
    assert.isEmpty(src.updatedAt)

    assert.equal(1, await conn.getDefault().manager.count(example))
  })

  it('get', async () => {
    assert.equal(0, await conn.getDefault().manager.count(example))

    const src = new example()
    src.ftext = 'text'
    src.fbyte = Buffer.from('123456', 'utf8')

    const saveVal = await src.save()
    assert.equal(1, await conn.getDefault().manager.count(example))

    assert.deepEqual(saveVal, await example.getByFText('text'))
    assert.isUndefined(await example.getByFText('fail'))

    assert.deepEqual(saveVal, await example.getById(src.id))
    assert.isUndefined(await example.getById('00000000-0000-0000-0000-000000000000'))
  })

  it('delete by ftext', async () => {
    assert.equal(0, await conn.getDefault().manager.count(example))

    const src = new example()
    src.ftext = 'text'
    src.fbyte = Buffer.from('123456', 'utf8')

    await src.save()
    assert.equal(1, await conn.getDefault().manager.count(example))

    const remVal = await example.deleteByFText('text')
    expect(remVal.raw).to.be.deep.eq([{ id_example: src.id }])

    assert.equal(0, await conn.getDefault().manager.count(example))
  })

  it('delete by id', async () => {
    assert.equal(0, await conn.getDefault().manager.count(example))

    const src = new example()
    src.ftext = 'text'
    src.fbyte = Buffer.from('123456', 'utf8')

    await src.save()
    assert.equal(1, await conn.getDefault().manager.count(example))

    const remVal = await example.deleteById(src.id)
    assert.deepEqual([{ id_example: src.id }], remVal.raw)
    assert.equal(0, await conn.getDefault().manager.count(example))
  })
});
