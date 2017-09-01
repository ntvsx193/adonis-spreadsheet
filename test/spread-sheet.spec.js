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

test.group('SpreadSheet', () => {
  const request = {
    header: (key, value) => {},
    send: (buffer) => {}
  }

  test('throw exception when unable to find format', (assert) => {
    const fn = () => new SpreadSheet(request, '')
    assert.throw(fn, 'E_VALIDATION_FAILED: Validation failed')
  })
})
