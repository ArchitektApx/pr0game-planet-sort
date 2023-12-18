import { LitElement, html, css, nothing } from 'lit'
import { choose }                         from 'lit/directives/choose.js'
import { when }                           from 'lit/directives/when.js'

/**
 * @class SettingsInterface
 * @description Component to render a settings interface from a given config and keep track of the
 * current state of the settings
 */
export default class SettingsInterface extends LitElement {
  static properties = {
    config              : { attribute: false, type: Object },
    forceSingleCategory : { attribute: false, type: Boolean },
    runningConfig       : { attribute: false, type: Object },
    updateCallback      : { attribute: false, type: Function },
  }

  static styles = css`
    .si-settings-category {
      text-align: left;
    }

    /* force each radioelement+label into individual row*/
    .si-input-radio-label::after {
      content: '';
      display: block; 
      white-space: pre;
    }

  `

  static typesMultiValue  = [ 'radio', 'select' ]
  static typesSingleValue = [ 'checkbox', 'text', 'number', 'color' ]
  #runningConfigLastState = {}

  constructor() {
    super()
    this.forceSingleCategory     = false
    this.config                  = {}
    this.runningConfig           = {}
    this.#runningConfigLastState = {}
  }

  /**
   * Add a config to the component and set its behaviour
   * @param   {object}   config                  - config to render
   * @param   {Function} callbackFunction        - function to call when the config changes (optional)
   * @param   {boolean}  forceSingleCategoryOnly - force only one category to be enabled at a time (optional)
   * @returns {void}
   * @public
   */
  addConfig(config, callbackFunction = () => {}, forceSingleCategoryOnly = false) {
    this.config                  = config
    this.runningConfig           = JSON.parse(JSON.stringify(config))
    this.#runningConfigLastState = JSON.parse(JSON.stringify(this.runningConfig))
    this.updateCallback          = callbackFunction
    this.forceSingleCategory     = forceSingleCategoryOnly
  }

  /**
   * LitElement default render method
   * @returns {html|nothing} - the rendered element
   * @public
   */
  render() {
    if (Object.keys(this.runningConfig).length === 0) { return nothing }

    return html`
      <div>
        ${ Object.values(this.runningConfig).map(category => this.#buildSettingsCategory(category)) }
      </div>
    `
  }

  /**
   * Builds a selection based input (radio or select)
   * @param   {string} id      - id of the input
   * @param   {object} setting - setting to render
   * @returns {html}           - template for the input
   * @private
   */
  #buildMultiValueSetting(id, setting) {
    const { name, options, value } = setting
    return choose(
      setting.type,
      [ [ 'radio', () => this.#templateRadio(name, id, options, value) ],
        [ 'select', () => this.#templateSelect(name, id, options, value) ] ],
      () => nothing
    )
  }

  /**
   * Builds a category with its settings
   * @param   {object} category - category config to render
   * @returns {html}            - template for the category
   * @private
   */
  #buildSettingsCategory(category) {
    const { name, enabled, type, displayName, description } = category

    const statusCheckbox = this.#templateCheckbox(
      name,
      this.#pathToId(name, 'enabled', 'checkbox'),
      enabled
    )

    const settingsList = choose(
      type,
      [ [ 'dynamic', () => this.#buildSettingsListDynamic(category) ],
        [ 'static', () => this.#buildSettingsListStatic(category) ] ],
      () => nothing
    )

    return html`
      <details class="si-settings-category">
        <summary 
          class="si-settings-category-header" 
          title="${ description }"
          @change=${ this.#eventStatusChange }
        >
          ${ displayName }
          ${ statusCheckbox }
        </summary>
        ${ settingsList }
      </details>
    `
  }

  /**
   * Builds a single settings element not in a dynamic list
   * @param   {string} categoryName - name of the category the setting belongs to
   * @param   {object} setting      - setting to render
   * @returns {html}                - template for the input
   * @private
   */
  #buildSettingsElementStatic(categoryName, setting) {
    const inputId     = this.#pathToId(categoryName, setting.name, setting.type)
    const description = setting.description || ''
    const input       = when(
      SettingsInterface.typesMultiValue.includes(setting.type),
      () => this.#buildMultiValueSetting(inputId, setting),
      () => this.#buildSingleValueSetting(inputId, setting)
    )

    return html`
      <tr 
        title="${ description }"
        class="si-settingslist-row si-settingslist-static-row"
      >
        <td>${ this.#templateLabel(setting.name, inputId) }</td>
        <td>${ input }</td>
      </tr>
    `
  }

  /**
   * Builds a dynamic list of settings that match a key input to a value input with a button to add
   * and remove rows
   * @param   {object} category - category config to render
   * @returns {html}            - template for the dynamic list
   * @private
   */
  #buildSettingsListDynamic(category) {
    const {
      name,
      settings,
      keyType,
      valueType,
      keyTitle,
      valueTitle,
      keyDesc,
      valueDesc,
    } = category

    const addButton = this.#templateButton(
      'Add',
      this.#pathToId(name, 'dynamiclist', 'addRow'),
      this.#eventDynamicRowAdd
    )

    const header = when(
      keyTitle && valueTitle,
      () => this.#templateTableHeader(keyTitle, valueTitle, keyDesc, valueDesc),
      () => nothing
    )

    const rows = settings.map((keyPair, index) => (
      this.#buildSettingsListDynamicRow(name, keyPair, keyType, valueType, index)
    ))

    return html`
      <table 
        class="si-settingslist-elements si-settingslist-dynamic" 
        @change=${ this.#eventDynamicRowChange }
      >
        ${ header }
        ${ rows }
      </table>
      ${ addButton }
    `
  }

  /**
   * Builds a single row in a dynamic list of settings
   * @param   {string} categoryName - name of the category the setting belongs to
   * @param   {object} keyPair      - key value pair of the setting
   * @param   {string} keyType      - type of the key input
   * @param   {string} valueType    - type of the value input
   * @param   {number} index        - index of the row in the list
   * @returns {html}                - template for the row
   * @private
   */
  #buildSettingsListDynamicRow(categoryName, keyPair, keyType, valueType, index) {
    const [ key, value ] = Object.entries(keyPair)[0]
    const rowId          = this.#pathToId(categoryName, 'dynamiclist', `row-${ index }`)
    const leftInput      = this.#buildSingleValueSetting(
      `${ rowId }-left`,
      { name: 'key', type: keyType, value: key }
    )
    const rightInput     = this.#buildSingleValueSetting(
      `${ rowId }-right`,
      { name: 'value', type: valueType, value: value }
    )
    const removeButton   = this.#templateButton(
      'Remove',
      this.#pathToId(categoryName, 'dynamiclist', 'removeRow'),
      event => this.#eventDynamicRowRemove(event, index)
    )

    return html`
      <tr id=${ rowId } class="si-settingslist-row si-settingslist-dynamic-row">
        <td>${ leftInput }</td>
        <td>${ rightInput }</td>
        <td>${ removeButton }</td>
      </tr>
    `
  }

  /**
   * Builds a regular (non-dynamic) list of settings
   * @param   {object} category - category config to render
   * @returns {html}            - template for the list
   * @private
   */
  #buildSettingsListStatic(category) {
    const { name, settings } = category

    return html`
      <table 
        class="si-settingslist-elements si-settingslist-static" 
        @change=${ this.#eventStaticChange }
      >
        ${ Object.values(settings).map(setting => this.#buildSettingsElementStatic(name, setting)) }
      </table>
    `
  }

  /**
   * Builds a single settings element that is not in a dynamic list
   * @param   {string}       id      - id of the input
   * @param   {object}       setting - setting to render
   * @returns {html|nothing}         - template for the input
   * @private
   */
  #buildSingleValueSetting(id, setting) {
    if (!SettingsInterface.typesSingleValue.includes(setting.type)) { return nothing }

    return when(
      setting.type === 'checkbox',
      () => this.#templateCheckbox(setting.name, id, setting.value),
      () => this.#templateInput(setting.type, setting.name, id, setting.value)
    )
  }

  /**
   * Event handler for adding a row to a dynamic list
   * @param   {Event} event - event that triggered the handler
   * @returns {void}
   * @private
   */
  #eventDynamicRowAdd({ target }) {
    const { category } = this.#pathFromId(target.id)
    this.runningConfig[category].settings.push({ Default: '0' })

    this.#eventProcessChange(true)
  }

  /**
   * Event handler for changes in inputs in a dynamic list
   * @param   {Event} event - event that triggered the handler
   * @returns {void}
   * @private
   */
  #eventDynamicRowChange({ target }) {
    const row            = target.closest('tr')
    const rowIndex       = row.id.split('-').pop()
    const { category }   = this.#pathFromId(target.id)
    const [ key, value ] = [ ...row.querySelectorAll('input') ].map(input => input.value)

    this.runningConfig[category].settings[rowIndex] = { [key]: value }

    this.#eventProcessChange(true)
  }

  /**
   * Event handler for removing a row from a dynamic list
   * @param   {Event}  event - event that triggered the handler
   * @param   {number} index - index of the row to remove
   * @returns {void}
   * @private
   */
  #eventDynamicRowRemove({ target }, index) {
    const { category } = this.#pathFromId(target.id)
    this.runningConfig[category].settings.splice(index, 1)

    this.#eventProcessChange(true)
  }

  /**
   * Common method called by event handlers to handle outgoing callback, rerender, etc.
   * @param   {boolean} forceReRender - force a rerender of the component (optional)
   * @returns {void}
   * @private
   */
  #eventProcessChange(forceReRender = false) {
    const before = JSON.stringify(this.#runningConfigLastState)
    const after  = JSON.stringify(this.runningConfig)

    if (before !== after) {
      this.updateCallback(this.runningConfig)
      this.#runningConfigLastState = JSON.parse(after)
    }

    if (forceReRender) {
      this.requestUpdate()
    }
  }

  /**
   * Event handler for changes in inputs that are not in a dynamic list
   * @param   {Event} event - event that triggered the handler
   * @returns {void}
   * @private
   */
  #eventStaticChange({ target }) {
    const { category, property, setting }                = this.#pathFromId(target.id)
    this.runningConfig[category].settings[setting].value = target[property]

    this.#eventProcessChange(false)
  }

  /**
   * Event handler for changes in the status checkbox of a category
   * @param   {Event} event - event that triggered the handler
   * @returns {void}
   * @private
   */
  #eventStatusChange({ target }) {
    const { category } = this.#pathFromId(target.id)

    this.runningConfig[category].enabled = target.checked

    if (this.forceSingleCategory && target.checked) {
      Object.keys(this.runningConfig)
      .filter(categoryName => categoryName !== category)
      .forEach((categoryName) => { this.runningConfig[categoryName].enabled = false })
    }

    this.#eventProcessChange(this.forceSingleCategory && target.checked)
  }

  /**
   * "Decode" the id to get the category, setting, element and index of a given element
   * @param   {string} id - id of element
   * @returns {object}    - object containing category, setting, element and index
   * @private
   */
  #pathFromId(id = '') {
    const [ , category, setting, type ] = id.split('-')
    const property                      = type === 'checkbox' ? 'checked' : 'value'

    return { category, property, setting, type }
  }

  /**
   * "Encode" the category, setting, element and index into an id for an element
   * @param   {string} category - the category of the ele
   * @param   {string} setting  - the setting the element belongs to
   * @param   {string} type     - type of the element
   * @returns {string}          - id for the element
   * @private
   */
  #pathToId(category = 'category', setting = 'setting', type = 'type') {
    return `si-${ category }-${ setting }-${ type }`
  }

  /**
   * Template method for buttons
   * @param   {string}   name      - name of the button
   * @param   {string}   id        - id of the button
   * @param   {Function} onclickfn - function to call when the button is clicked
   * @returns {html}               - template for the button
   * @private
   */
  #templateButton(name, id, onclickfn) {
    const { element } = this.#pathFromId(id)
    const classList   = [ 'si-button-element' ]
    if (element === 'addRow' || element === 'removeRow') { classList.push(`si-button-${ element }`) }

    return html`
      <button 
        name="${ name }" 
        id="${ id }" 
        class=${ classList.join(' ') }
        @click=${ onclickfn }
      >
        ${ name }
      </button>
    `
  }

  /**
   * Template method for checkboxes
   * @param   {string} name  - name of the checkbox
   * @param   {string} id    - id of the checkbox
   * @param   {string} value - wether the checkbox is checked or not
   * @returns {html}         - template for the checkbox
   * @private
   */
  #templateCheckbox(name = '', id = '', value = false) {
    return this.#templateInput('checkbox', name, id, '', value)
  }

  /**
   * Template method for inputs that can be set by the value attribute
   * @param   {string}  type    - type attibute of the input
   * @param   {string}  name    - name attibute of the input
   * @param   {string}  id      - id attribute of the input
   * @param   {string}  value   - value of the input
   * @param   {boolean} checked - checked property set to true or false (only used for checkboxes)
   * @returns {html}            - template for input
   * @private
   */
  #templateInput(type = 'text', name = '', id = '', value = '', checked = false) {
    return html`
      <input 
        type="${ type }" 
        name="${ name }" 
        id="${ id }" 
        value="${ value }" 
        class="${ `si-input-${ type } si-allinput-elements` }"
        .checked=${ checked } 
      />
    `
  }

  /**
   * Template method for labels
   * @param   {string} text        - text of the label
   * @param   {string} id          - id of the label
   * @param   {string} customClass - addional class of the label
   * @returns {html}               - template for the label
   * @private
   */
  #templateLabel(text = '', id = '', customClass = '') {
    let classString = 'si-label-element'
    if (customClass) { classString = `${ classString } ${ customClass }` }

    return html`
      <label 
        for="${ id }"
        class="${ classString }"
      >
        ${ text }
      </label>
    `
  }

  /**
   * Template method for options in a select element
   * @param   {string}  value    - value of the option
   * @param   {boolean} selected - wether the option is selected or not
   * @returns {html}             - template for the option
   * @private
   */
  #templateOption(value = '', selected = false) {
    return html`
      <option 
        value="${ value }" 
        class="si-option-element"
        ?selected=${ selected }
      >
        ${ value }
      </option>
    `
  }

  /**
   * Template method for radio buttons
   * @param   {string} name     - common name of the radio buttons
   * @param   {string} id       - id of the radio buttons (will be suffixed with the index of each)
   * @param   {Array}  options  - options for the radio buttons
   * @param   {string} selected - value of the selected option
   * @returns {html}            - template for the radio buttons
   * @private
   */
  #templateRadio(name = '', id = '', options = [], selected = '') {
    const radioElements =  options.map((option, index) => {
      const optionId = `${ id }-${ index }`
      return html`
        ${ this.#templateInput('radio', name, optionId, option, option === selected) }
        ${ this.#templateLabel(option, optionId, 'si-input-radio-label') }
      `
    })

    return html`${ radioElements || nothing }`
  }

  /**
   * Template method for select elements
   * @param   {string} name     - name of the select element
   * @param   {string} id       - id of the select element
   * @param   {Array}  options  - options for the select element
   * @param   {string} selected - value of the selected option
   * @returns {html}            - template for the select element
   * @private
   */
  #templateSelect(name = '', id = '', options = [], selected = '') {
    const selectElements = options.map(option => this.#templateOption(option, option === selected))

    return html`
      <select
        name="${ name }"
        id="${ id }"
        class="si-select-element si-allinput-elements"
      >
        ${ selectElements || nothing }
      </select>
    `
  }

  /**
   * Template method for table headers
   * @param   {string} keyTitle   - title for the key column
   * @param   {string} valueTitle - title for the value column
   * @param   {string} keyDesc    - description for the key column
   * @param   {string} valueDesc  - description for the value column
   * @returns {html}              - template for the table header
   * @private
   */
  #templateTableHeader(keyTitle = 'Key', valueTitle = 'Value', keyDesc = '', valueDesc = '') {
    return html`
      <tr class="si-dynamiclist-header">
        <th title="${ keyDesc }">${ keyTitle }</th>
        <th title="${ valueDesc }">${ valueTitle }</th>
        <th></th>
      </tr>
    `
  }
}
