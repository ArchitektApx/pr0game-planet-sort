# pr0game-planet-sort
userscript plugin to sort planets on pr0game.com

[Install PlanetSort](https://raw.githubusercontent.com/ArchitektApx/pr0game-planet-sort/master/PlanetSort.user.js)

# Available Sorting Strategies 
- Alphanumerical (Natural) Sorting

  Alphabebetical Sort with customizing options for numerical sorting and differences in locales.

  Available Options are (for details see [mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options)):
  - caseFirst           - Whether to be case insensitive (=false), prefer upper-case or lower-case (default: false)
  - sensitivity         - Which locale (accents, variants, etc.) differences in the strings should matter. (default: base)
  - ignorePunctuation   - Whether punctuation should be ignored.
  - numeric             - Use numeric (1>2>10) or not (1>10>2). (default: false)
  - sortReverse         - If true the sort result is reversed. (default: false)

- Custom Sorting

  Allows to provide a custom sort mapping where a planet name is matched to a number. Planets are then sorted by these numbers (ascending). All Planets not found in the mapping will be ignored.

- Other Sorting Strategies

  If you want any other srting type message me
