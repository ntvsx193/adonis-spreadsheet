'use strict'

/*
 * adonis-spread-sheet
 *
 * (c) Artem Kolesnik <kolesnik.artem.g@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

class Request {
  constructor () {
    this.buffer = null
    this.headers = {}
  }

  /**
   * @param {String} key
   * @param {String} value
   */
  header (key, value) {
    this.headers[key] = value
  }

  /**
   * @param {Buffer} buffer
   */
  send (buffer) {
    this.buffer = buffer
  }
}

module.exports = Request
