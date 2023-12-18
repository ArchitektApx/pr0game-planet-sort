/**
 * @typedef  {object}  AlphaNatStratOptions          - The AlphaNatStrat strategy.
 * @property {object}  sortOptions                   - The sort options to use. Details at {@link AlphaNatStrat/see}
 * @property {boolean} sortOptions.caseFirst         [false]    - Whether upper case or lower case should sort first.
 * @property {string}  sortOptions.sensitivity       [base]     - Which differences in the strings should matter.
 * @property {boolean} sortOptions.ignorePunctuation [false]    - Whether punctuation should be ignored.
 * @property {string}  sortOptions.numeric           [false]    - Use numeric (1>2>10) or not (1>10>2).
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
 */
/**
 * Sorts strings alphabetically with customizing options for numbers/natural sort and locale differences.
 */
export default class AlphaNatStrat {
  static SettingsDefinition = {
    description : 'Alphabetical sort with customizing options for numbers and locale differences.',
    displayName : 'Alphabetical/Natural Sort',
    enabled     : false,
    name        : 'AlphaNatStrat',
    settings    : {
      caseFirst: {
        description : 'Whether upper case or lower case should sort first.',
        name        : 'caseFirst',
        options     : [ 'false', 'upper', 'lower' ],
        type        : 'select',
        value       : 'false',
      },
      ignorePunctuation: {
        description : 'Whether punctuation should be ignored.',
        name        : 'ignorePunctuation',
        type        : 'checkbox',
        value       : false,
      },
      numeric: {
        description : 'Use numeric (1>2>10) or not (1>10>2).',
        name        : 'numeric',
        type        : 'checkbox',
        value       : false,
      },
      sensitivity: {
        description : 'Which differences in the strings should matter.',
        name        : 'sensitivity',
        options     : [ 'base', 'accent', 'case', 'variant' ],
        type        : 'select',
        value       : 'case',

      },
      sortReverse: {
        description : 'Reverse the sort order.',
        name        : 'sortReverse',
        type        : 'checkbox',
        value       : false,
      },
    },
    type: 'static',
  }

  #settings = {}

  /**
   * Creates a new AlphaNatStrat instance with the given settings. Defaults to the settings defined in SettingsDefinition.
   * @param {AlphaNatStratOptions} settings - The settings to use.
   */
  constructor(settings = AlphaNatStrat.SettingsDefinition.settings) {
    Object.keys(settings).forEach((key) => { this.#settings[key] = settings[key].value })
  }

  /**
   * The sort function of this strategy.
   * @param   {string} a - The first string to compare.
   * @param   {string} b - The second string to compare.
   * @returns {number}   The result of the comparison.
   */
  sortFunction(a, b) {
    const { sortReverse, ...sortOptions } = this.#settings

    return a.localeCompare(b, undefined, sortOptions) * (sortReverse ? -1 : 1)
  }

  /**
   * The value function of this strategy. (used to extract the actual value to sort by from the DOMElement)
   * @param   {HTMLElement | Element }        DOMElement - The DOMElement from which to get the value.
   * @param   {'navbar' | 'overview' |' all'} mode       - The mode to use.
   * @returns {string|void}                              The value to sort by.
   */
  valueFunction(DOMElement, mode) {
    if (mode !== 'navbar') { // 'all' or 'overview'
      return DOMElement.firstElementChild.title // the planet name
    }

    if (mode !== 'overview') { // 'all' or 'navbar'
      return  DOMElement.text.replace(/\s\[[\d:]+]$/, '') // the planet name
    }
  }
}
