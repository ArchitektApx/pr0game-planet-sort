import SettingsInterface from './SettingsInterface.js'

/**
 * class to add a Entry Point button to the settings page to open/close the settings interface
 * @class
 * @static
 */
export default class SettingsInterfaceEntryPoint {
  static #closeText     = 'Close'
  static #componentName = 'settings-interface-component'
  static #openText      = 'Override Sort'

  /**
   * Handle the click event on the entry point button
   * @param   {object}   event    - click event
   * @param   {object}   config   - well formed config object
   * @param   {Function} callback - callback function
   * @returns {void}
   */
  static clickHandler(event, config, callback) {
    const button = event.target
    if (button.textContent === SettingsInterfaceEntryPoint.#openText) {
      button.textContent = SettingsInterfaceEntryPoint.#closeText
      SettingsInterfaceEntryPoint.#loadSettingsInterface(config, callback)
    } else {
      button.textContent = SettingsInterfaceEntryPoint.#openText
      SettingsInterfaceEntryPoint.#closeSettingsInterface()
    }
  }

  /**
   * Invoke the entry point
   * @param   {object}   config   - well formed config object
   * @param   {Function} callback - callback function
   * @returns {void}
   * @public
   * @static
   */
  static invoke(config, callback) {
    if (window.location.href.includes('page=settings')) {
      customElements.define(SettingsInterfaceEntryPoint.#componentName, SettingsInterface)
      SettingsInterfaceEntryPoint.#attachEntryPointButton(config, callback)
    }
  }

  /**
   * Attach the entry point button to the settings page
   * @param   {object}   config   - well formed config object
   * @param   {Function} callback - callback function
   * @returns {void}
   * @private
   * @static
   */
  static #attachEntryPointButton(config, callback) {
    SettingsInterfaceEntryPoint
    .#getAttachmentNode()
    .append(SettingsInterfaceEntryPoint.#buildEntryPointButton(config, callback))
  }

  /**
   * Build the entry point button
   * @param   {object}      config   - well formed config object
   * @param   {Function}    callback - callback function
   * @returns {HTMLElement}          - button element
   * @private
   * @static
   */
  static #buildEntryPointButton(config, callback) {
    const button       = document.createElement('button')
    button.textContent = SettingsInterfaceEntryPoint.#openText
    button.addEventListener('click', event => SettingsInterfaceEntryPoint.clickHandler(event, config, callback))
    return button
  }

  /**
   * Close the settings interface
   * @returns {void}
   * @private
   * @static
   */
  static #closeSettingsInterface() {
    const settingsinterface = SettingsInterfaceEntryPoint.#findSelf()
    settingsinterface.remove()
  }

  /**
   * Find the settings interface component
   * @returns {HTMLElement} - settings interface component
   * @private
   * @static
   */
  static #findSelf() {
    return document.querySelector(SettingsInterfaceEntryPoint.#componentName)
  }

  /**
   * Get the node to attach the entry point button to
   * @returns {HTMLElement} - node to attach the entry point button to
   * @private
   * @static
   */
  static #getAttachmentNode() {
    return document.querySelector('select[name=planetSort]').parentElement.previousElementSibling
  }

  /**
   * Load the settings interface
   * @param   {object}   config   - well formed config object
   * @param   {Function} callback - callback function
   * @returns {void}
   * @private
   * @static
   */
  static #loadSettingsInterface(config, callback) {
    const settingsinterface = document.createElement(SettingsInterfaceEntryPoint.#componentName)
    settingsinterface.addConfig(config, callback, true)
    SettingsInterfaceEntryPoint.#getAttachmentNode().append(settingsinterface)
  }
}
