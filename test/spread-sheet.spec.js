'use strict'

/*
 * adonis-spread-sheet
 *
 * (c) Artem Kolesnik <kolesnik.artem.g@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const SpreadSheet = require('../src/SpreadSheet')
const Request = require('../lib/Request')

test.group('SpreadSheet', (group) => {
  let request

  group.beforeEach(() => {
    request = new Request()
  })

  test('throw exception when unable to find format', (assert) => {
    const fn = () => new SpreadSheet(request, '')
    assert.throws(fn, 'E_VALIDATION_FAILED: Validation failed')
  })

  test('should not be throw with correct format', (assert) => {
    const fn = () => new SpreadSheet(request, 'csv')
    assert.doesNotThrow(fn, 'E_VALIDATION_FAILED: Validation failed')
  })

  test('should not be throw with correct format', (assert) => {
    const fn = () => new SpreadSheet(request, 'csv')
    assert.doesNotThrow(fn, 'E_VALIDATION_FAILED: Validation failed')
  })

  test('should be success add sheet', (assert) => {
    const ss = new SpreadSheet(request, 'csv')
    const sheetName = 'MyPersonal'
    const data = [['id', 'first_name']]
    ss.addSheet(sheetName, data)
    assert.property(ss.wb, 'SheetNames')
    assert.property(ss.wb, 'Sheets')
    assert.deepEqual(ss.wb.SheetNames, [sheetName])
    assert.isObject(ss.wb.Sheets[sheetName])
  })

  test('should be downloaded csv', (assert) => {
    const ss = new SpreadSheet(request, 'csv')
    const sheetName = 'MyPersonal'
    const data = [['id', 'first_name']]
    const filename = 'my-personal-filename'
    ss.addSheet(sheetName, data)
    ss.download(filename)

    assert.property(request.headers, 'Content-Type', 'application/csv; charset=UTF-8')
    assert.property(request.headers, 'Content-Disposition', `${filename}.csv`)
    assert.isNotNull(request.buffer)
    assert.instanceOf(request.buffer, Buffer)
    assert.isAbove(request.buffer.length, 0)
  })

  test('should be downloaded xls', (assert) => {
    const ss = new SpreadSheet(request, 'xls')
    const sheetName = 'MyPersonal'
    const data = [['id', 'first_name']]
    const filename = 'my-personal-filename'
    ss.addSheet(sheetName, data)
    ss.download(filename)

    assert.property(request.headers, 'Content-Type', 'application/vnd.ms-excel; charset=UTF-8')
    assert.property(request.headers, 'Content-Disposition', `${filename}.xls`)
    assert.isNotNull(request.buffer)
    assert.instanceOf(request.buffer, Buffer)
    assert.isAbove(request.buffer.length, 0)
  })

  test('should be downloaded xlsx', (assert) => {
    const ss = new SpreadSheet(request, 'xlsx')
    const sheetName = 'MyPersonal'
    const data = [['id', 'first_name']]
    const filename = 'my-personal-filename'
    ss.addSheet(sheetName, data)
    ss.download(filename)

    assert.property(request.headers, 'Content-Type', 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8')
    assert.property(request.headers, 'Content-Disposition', `${filename}.xlsx`)
    assert.isNotNull(request.buffer)
    assert.instanceOf(request.buffer, Buffer)
    assert.isAbove(request.buffer.length, 0)
  })

  test('should be downloaded ods', (assert) => {
    const ss = new SpreadSheet(request, 'ods')
    const sheetName = 'MyPersonal'
    const data = [['id', 'first_name']]
    const filename = 'my-personal-filename'
    ss.addSheet(sheetName, data)
    ss.download(filename)

    assert.property(request.headers, 'Content-Type', 'application/vnd.oasis.opendocument.spreadsheet; charset=UTF-8')
    assert.property(request.headers, 'Content-Disposition', `${filename}.ods`)
    assert.isNotNull(request.buffer)
    assert.instanceOf(request.buffer, Buffer)
    assert.isAbove(request.buffer.length, 0)
  })
})
