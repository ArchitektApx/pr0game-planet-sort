/**
 * Sort by user defined key (planetname) to value (sort order) definition. undefined planets will not be sorted.
 */
export default class CustomSortStrat {
  static SettingsDefinition = {
    description : 'Sort by custom list of planet names matched to their sort order (number).',
    displayName : 'Custom Sort',
    enabled     : false,
    keyDesc     : 'Enter your exact planet names here',
    keyTitle    : 'Your Planet Names',
    keyType     : 'text',
    name        : 'CustomSortStrat',
    settings    : [
      { 'Your Planet Name': 1 },
    ],
    type       : 'dynamic',
    valueDesc  : 'Enter the number to use for sorting this planet name (any positive number is allowed and sorting is asc).',
    valueTitle : 'Sort Order',
    valueType  : 'number',
  }

  #settings = {}

  /**
   * Creates a new CustomSortStrat instance with the given settings. Defaults to the settings defined in SettingsDefinition.
   * @param {object} settings - The settings to use.
   */
  constructor(settings = CustomSortStrat.SettingsDefinition.settings) {
    settings.forEach((row) => {
      const [ key, value ] = Object.entries(row)[0]
      this.#settings[key]  = value
    })
  }

  /**
   * The sort function of this strategy.
   * @param   {string} a - The first string to compare.
   * @param   {string} b - The second string to compare.
   * @returns {number}   The result of the comparison.
   */
  sortFunction(a, b) {
    if (!this.#settings[a] && !this.#settings[b]) {
      return 0
    }

    return Number.parseInt(this.#settings[a], 10) - Number.parseInt(this.#settings[b], 10)
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
