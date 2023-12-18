import DOMHandler                  from './DOMHandler/DomHandler.js'
import SettingsInterfaceEntryPoint from './SettingsInterface/SettingsInterfaceEntryPoint.js'
import StratManager                from './StrategyManager/StrategyManager.js'

// Invoke StratManager to pass Settings/Callbacks/Strategies to SettingsInterface and DOMHandler
const stratManager = new StratManager()
const config       = stratManager.getAllStratSettings()
const callback     = stratManager.updateCallback.bind(stratManager)

// build settings UI if on settings page
SettingsInterfaceEntryPoint.invoke(config, callback)

// execute active strategy if we have one
const activeStrategy = stratManager.getActiveStratInstance()
if (activeStrategy) {
  DOMHandler.execute(activeStrategy)
}
