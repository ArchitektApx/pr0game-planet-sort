import AlphaNatStrat   from './strategies/AlphaNatStrat.js'
import CustomSortStrat from './strategies/CustomSortStrat.js'

const STRATS = {
  AlphaNatStrat: {
    ClassRef : AlphaNatStrat,
    Settings : AlphaNatStrat.SettingsDefinition,
  },
  CustomSortStrat: {
    ClassRef : CustomSortStrat,
    Settings : CustomSortStrat.SettingsDefinition,
  },
}

/**
 * @classdesc StratManager manages the strategies and their settings and provides the active strategy.
 */
export default class StratManager {
  settingsKey      = ''
  #runningConfig   =  {}
  #settingsKeyBase = 'PlanetReorderSettings'
  #StratDefinition =  STRATS

  /**
   * Creates a new StratManager instance loading stored settings or defaults from the strategies.
   */
  constructor() {
    this.#getSettingsKey()
    this.#loadSettings()
  }

  /**
   * Returns the active strategy.
   * @returns {object|void} The active strategy.
   * @public
   */
  getActiveStratInstance() {
    const activeSettings = Object.entries(this.#runningConfig).find(([ , value ]) => value.enabled)
    if (!activeSettings) {
      return
    }

    const [ stratName, stratConfig ] = activeSettings
    return new this.#StratDefinition[stratName].ClassRef(stratConfig.settings)
  }

  /**
   * Returns the settings for all strategies.
   * @returns {object} The settings for all strategies.
   * @public
   */
  getAllStratSettings() {
    return this.#runningConfig
  }

  /**
   * public callback to update the settings.
   * @param {object} config - The new settings.
   * @public
   */
  updateCallback(config) {
    this.#runningConfig = config
    this.#saveSettings()
  }

  /**
   * sets the default values for strategies from the strategy definitions to the running config.
   * @returns {void}
   * @private
   */
  #buildDefaultConfig() {
    Object.entries(this.#StratDefinition).forEach(([ key, value ]) => {
      this.#runningConfig[key] = value.Settings
    })
  }

  /**
   * Sets the settings key for the current universe.
   * @returns {void}
   * @private
   */
  #getSettingsKey() {
    // https://pr0gramm.com/uni2/game.php => uni2
    const universe   = window.location.pathname.split('/')[1]
    this.settingsKey = `${ this.#settingsKeyBase }_${ universe }`
  }

  /**
   * Loads default Config and replaces it with the stored settings if available.
   * @returns {void}
   * @private
   */
  #loadSettings() {
    this.#buildDefaultConfig()
    const savedSettings = localStorage.getItem(this.settingsKey)

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      Object.entries(parsedSettings).forEach(([ key, value ]) => {
        this.#runningConfig[key] = value
      })
    }
  }

  /**
   * Saves the current settings to local storage.
   * @returns {void}
   * @private
   */
  #saveSettings() {
    localStorage.setItem(this.settingsKey, JSON.stringify(this.#runningConfig))
  }
}
