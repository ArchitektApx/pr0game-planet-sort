import PlanetList from '../PlanetList/PlanetList.js'

/**
 * @classdesc DOMHandler reads the DOM and and provides limited data to PlanetList for sorting.
 * The Result of PlanetList is then used to update the DOM.
 * This is done so the sorting strategy is decoupled from the actual DOM.
 */
export default class DOMHandler {
  /**
   * @param   {object}   strategy               - A instance of the strategy to use.
   * @param   {Function} strategy.sortFunction  - The sort function of the strategy. (how to sort)
   * @param   {Function} strategy.valueFunction - The value function of the strategy. (what to sort)
   * @returns {void}
   * @public
   * @static
   */
  static execute(strategy) {
    const sortStrategy  = strategy.sortFunction.bind(strategy)
    const valueStrategy = strategy.valueFunction.bind(strategy)

    const targetMode     = window.location.href.includes('page=overview') ? 'all' : 'navbar'
    const planetElements = new PlanetList(sortStrategy)

    if (targetMode !== 'navbar') { // 'all' or 'overview'
      const { parent, planets } = DOMHandler.#getOverviewElements(valueStrategy)
      DOMHandler.#executeSortStrategy(parent, planets, planetElements)
    }

    if (targetMode !== 'overview') { // 'all' or 'navbar'
      const { parent, planets } = DOMHandler.#getNavbarElements(valueStrategy)
      DOMHandler.#executeSortStrategy(parent, planets, planetElements)
    }
  }

  /**
   * Executes the sorting operation for a given modes parent and planets using the given planetList.
   * @param   {HTMLElement} parent     - The parent element of the planets in the DOM
   * @param   {object[]}    planets    - The list of planets to sort.
   * @param   {PlanetList}  planetList - The PlanetList instance to use.
   * @returns {void}
   * @private
   * @static
   */
  static #executeSortStrategy(parent, planets, planetList) {
    planets.forEach((planet) => {
      planetList.addPlanet(planet.ElementRef, planet.SortValue)
    })

    planetList.sortList()
    DOMHandler.#updateDOMElement(parent, planetList.getList())
    planetList.resetList()
  }

  /**
   * Executes the sorting operation for the navbar mode.
   * @param   {Function} valueStrat - The strategy to get the SortValue from the PlanetElements
   * @returns {object}              ParentNode and PlanetList
   * @private
   * @static
   */
  static #getNavbarElements(valueStrat) {
    const parent  = document.querySelector('#planetSelector')
    const planets = [ ...parent.options ].map(option => ({
      ElementRef : option,
      SortValue  : valueStrat(option, 'navbar'),
    }))

    return { parent, planets }
  }

  /**
   * Executes the sorting operation for the overview mode.
   * @param   {Function} valueStrat - The strategy to get the SortValue from the PlanetElements
   * @returns {object}              ParentNode and PlanetList
   * @private
   * @static
   */
  static #getOverviewElements(valueStrat) {
    const parent  = document.querySelector('div.infos:nth-child(5)')
    const planets = [ ...parent.querySelectorAll('.planetl') ].map(planet => ({
      ElementRef : planet,
      SortValue  : valueStrat(planet, 'overview'),
    }))

    return { parent, planets }
  }

  /**
   * Updates the DOM element with the sorted children by removing and appending them (makes unkown elements work too).
   * @param   {HTMLElement} parent   - The parent element of the planets in the DOM
   * @param   {object[]}    elements - The list of planets to sort and update.
   * @returns {void}
   * @private
   * @static
   */
  static #updateDOMElement(parent, elements) {
    elements.forEach((planet) => {
      planet.remove()
      parent.append(planet)
    })
  }
}
