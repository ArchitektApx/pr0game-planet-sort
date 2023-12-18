/**
 * @classdesc PlanetList class stores planets and executes the sort stragegy.
 */
export default class PlanetList {
  #planets = []

  /**
   * Creates a new PlanetList instance.
   * @param {Function} sortStrategy - The sort strategy to use.
   */
  constructor(sortStrategy) {
    this.sortStrategy = sortStrategy
  }

  /**
   * Adds a planet to the list.
   * @param   {HTMLElement | Element } DOMElement - The DOMElement to pass to the sort function.
   * @param   {string}                 SortValue  - The value to sort by ound from the search strategy
   * @returns {void}
   * @public
   */
  addPlanet(DOMElement, SortValue) {
    this.#planets.push({
      ElementRef : DOMElement,
      SortValue  : SortValue,
    })
  }

  /**
   * Returns the list of planets.
   * @returns {HTMLElement[]} The list of planets.
   * @public
   */
  getList() {
    return this.#planets.map(planet => planet.ElementRef)
  }

  /**
   * Resets the list of planets.
   * @returns {void}
   * @public
   */
  resetList() {
    this.#planets = []
  }

  /**
   * Executes the sort strategy on the planets sort value to isolate it from the real DOM elements.
   * (to allow possible untrusted user defined sort strategies in the future)
   * @returns {void}
   * @public
   */
  sortList() {
    const result = this.#planets.map(planet => planet.SortValue)
      .sort((a, b) => this.sortStrategy(a, b))

    this.#planets.sort((a, b) => {
      const aIndex = result.indexOf(a.SortValue)
      const bIndex = result.indexOf(b.SortValue)

      return aIndex - bIndex
    })
  }
}
