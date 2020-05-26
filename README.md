# React Cookie Preferences
A react package that allows users select their cookie preferences. It opens up an additional dialog window with additional cookie preference options. This component can be used for your website or app as part of GDPR compliance. 

- built with the latest standards - React Hooks, Context API
- uses `js-cookie` a lightweight VanillaJS library as a dependency
- No other plugins or CSS frameworks so its pretty lightweight :)

![Preview](https://raw.githubusercontent.com/Palmabit-IT/react-cookie-law/master/banner_preview.png)

## Installation

```
npm install --save react-cookie-preferences
```

## Usage

Import the various components at the root level of your app. Remember to wrap all these components within the Context provider in order to maintain the global states of the cookie banner and dialog

```js
import { CookieBanner, CookieDialog } from '../../src';
import { CookieContextProvider } from '../../src';
import { PreferenceCheckbox, MarketingCheckbox, StatisticsCheckbox } from '../../src';

const App = () => {

  return (

    <div className="App">
      <header></header>
      <main></main>
      <footer></footer>
      <CookieContextProvider>
        <CookieBanner>
          <CookieDialog>
            <PreferenceCheckbox />
            <MarketingCheckbox />
            <StatisticsCheckbox />
          </CookieDialog>
        </CookieBanner>
      </CookieContextProvider>
    </div>
  )
};

render(<App />, document.getElementById("root"));

```

### Options for 
```
<CookieBanner>...</CookieBanner>
```




|Name|Type|Default|Description|
|----|----|-------|-----------|
| **className** | string | `''` | Wrapper class for overriding styles |
| **title** | string | Your privacy| Custom text of the banner title |
| **message** | string | This site uses cookies to offer you a better browsing experience. By accepting, you consent to the use of cookies| Custom text of the banner description |
| **policyText** | string | To find out more, read our updated policy terms in the link | Text for the Privacy Policy page | 
| **policyLinkText** | string | Cookie Policy | Text for the privacy policy link |
| **policyLink** | string | https://gdpr.eu/cookies/ | Link for the Privacy Policy page. Can be external or internal |
| **acceptButtonText** | string | I am OK with it | Button text |
| **manageConsentText** | string | Manage Preferences | Button text |

### Options for 
```
<CookieDialog>...</CookieDialog>
```

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **className** | string | `''` | Wrapper class for overriding styles |
| **title** | string | Your privacy options| Custom text of the dialog title |
| **message** | string | Please review and manage your privacy settings belows| Custom text of the dialog description |
| **confirmText** | string | Save Preferences | Button text |
| **cancelText** | string | Cancel | Button text |

### Options for Checkbox options 

All the props are the same for each preference option. You can import the ones that are required as it's not mandatory to have all 3 options.


```
<PreferenceCheckbox />
```

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **title** | string | Preference Cookie| Title of the option |
| **message** | string | This cookie option manages and tracks some marketing data| Custom text of the option |
| **name** | string | `preference_cookie` | Name of the Cookie |
| **expiry** | number | `365` | Expiry for Cookie |
| **onPreferenceToggle** | function | `{}` | Callback on Checkbox toggle |

```
<MarketingCheckbox />
```

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **title** | string | Marketing Cookie| Title of the option |
| **message** | string | This cookie option manages and tracks some marketing data| Custom text of the option |
| **name** | string | `marketing_cookie` | Name of the Cookie |
| **expiry** | number | `365` | Expiry for Cookie |
| **onMarketingToggle** | function | `{}` | Callback on Checkbox toggle |

```
<StatisticsCheckbox />
```

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **title** | string | Statistics Cookie| Title of the option |
| **message** | string | This cookie option manages and tracks some marketing data| Custom text of the option |
| **name** | string | `statistics_cookie` | Name of the Cookie |
| **expiry** | number | `365` | Expiry for Cookie |
| **onStatisticsToggle** | function | `{}` | Callback on Checkbox toggle |

## Styles

All styles are done in SCSS at the moment although I might consider moving them to styled-components. CSS classes are provided as hooks for overriding styles as necessary in the above options table


# Contributing

I could not find a well-maintaned react component library creator so I've used a pretty basic Webpack based tool. If I come across a package, I'll look at migrating this package. Happy for suggestions and PR requests are welcome. A few initial tasks to consider

- Add some unit tests with Jest
- More options for styles, theming and different layouts
- Styled components

# Licence

[See the MIT License](http://opensource.org/licenses/MIT)