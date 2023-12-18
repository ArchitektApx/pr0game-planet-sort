import path                 from 'node:path'
import webpack              from 'webpack'
import { UserscriptPlugin } from 'webpack-userscript'
import packagejson          from './package.json' assert { type: 'json' }

const isDevelopment = true
const mode          = isDevelopment ? 'development' : 'production'

const scriptName         = 'PlanetSort'
const pathOut            = path.resolve('./', 'dist')
const entryPoint         = path.resolve('./', 'src', `${ scriptName }.js`)
const tamperMonkeyHeader = {
  name        : `${scriptName}_DevBuild`,
  version     : packagejson.version,
  description : packagejson.description,
  author      : packagejson.author,
  match       : 'https://pr0game.com/*/game.php?*',
}

tamperMonkeyHeader.version += '-build.[buildTime]'

export default {
  mode   : mode,
  entry  : entryPoint,
  output : {
    path     : pathOut,
    filename : `${ scriptName }.user.js`,
  },
  devtool   : false,
  devServer : {
    hot             : false,
    client          : false,
    webSocketServer : false,
    devMiddleware   : {
      writeToDisk: true,
    },
  },
  plugins: [
    new UserscriptPlugin({
      headers     : tamperMonkeyHeader,
      proxyScript : {
        baseUrl  : `file://${ pathOut }`,
        filename : '[basename].proxy.user.js',
        enable   : isDevelopment,
      },
    }),
    new webpack.DefinePlugin({
      __buildMode__  : JSON.stringify(mode),
      __isDevBuild__ : JSON.stringify(isDevelopment),
      __scriptName__ : JSON.stringify(scriptName),
    }),
  ],
}
