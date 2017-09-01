'use strict'

/*
 * adonis-spread-sheet
 *
 * (c) Artem Kolesnik <kolesnik.artem.g@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const xlsx = require('xlsx')
const VE = require('@adonisjs/validator/src/Exceptions')

class SpreadSheet {
  /**
   * @param {Response} response
   * @param {string} format
   */
  constructor (response, format) {
    this.response = response
    this.format = format
    this._validateFormat()
    this.wb = xlsx.utils.book_new()
  }

  /**
   * @private
   */
  _validateFormat () {
    const valid = this.format in this.constructor.formats
    if (!valid) {
      throw VE.ValidationException.validationFailed([{
        field: 'format',
        value: this.format,
        formats: Object.keys(this.constructor.formats).join(','),
        message: 'validation failed on format'
      }])
    }
  }

  /**
   * @param {String} name
   * @param {Array} data
   */
  addSheet (name, data) {
    const ws = xlsx.utils.aoa_to_sheet(data)
    xlsx.utils.book_append_sheet(this.wb, ws, name)
  }

  /**
   * @return {Array}
   */
  static get formats () {
    return {
      ods: {
        bookType: 'ods',
        header: 'application/vnd.oasis.opendocument.spreadsheet'
      },
      xls: {
        bookType: 'xlml',
        header: 'application/vnd.ms-excel'
      },
      xlsx: {
        bookType: 'xlsx',
        header: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      csv: {
        bookType: 'csv',
        header: 'application/csv'
      }
    }
  }

  /**
   * @param {String} filename
   */
  download (filename) {
    const buffer = xlsx.write(this.wb, {
      bookType: this.constructor.formats[this.format].bookType,
      type: 'buffer'
    })

    this.response.header('Content-Type', `${this.constructor.formats[this.format].header}; charset=UTF-8`)
    this.response.header('Content-Disposition', `attachment; filename="${filename}.${this.format}"`)
    this.response.send(buffer)
  }
}

module.exports = SpreadSheet
