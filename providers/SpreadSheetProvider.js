'use strict'

/*
 * adonis-spread-sheet
 *
 * (c) Artem Kolesnik <kolesnik.artem.g@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('@adonisjs/fold')

class SpreadSheetProvider extends ServiceProvider {
  /**
   * Register spreadsheet provider under `Adonis/Addons/SpreadSheet` namespace
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('Adonis/Addons/SpreadSheet', () => require('../src/SpreadSheet'))
    this.app.alias('Adonis/Addons/SpreadSheet', 'SpreadSheet')
  }
}

module.exports = SpreadSheetProvider
