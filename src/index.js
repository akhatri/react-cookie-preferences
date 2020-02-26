import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Base styles
import './styles.scss';

// Cookie Banner
import './cookie-banner.scss';

// Cookie Dialog
import './cookie-dialog.scss';

// Cookie Options
import './cookie-options.scss';

export const CookieBanner = (props) => {

  const { setDialogState, isBannerOpen, setBannerState } = useContext(DialogContext);

  // console.log('hello cookie banner', isBannerOpen);
  // const [isBannerOpen, setBannerState] = useState(false);
  // const [isDialogOpen, setDialogState] = useState(false);

  console.log('context provider', isBannerOpen);

  setTimeout( ()=> {
    console.log('add class');
    //setBannerState(true);
    Cookies.get('necessary-cookies') ? setBannerState(false) : setBannerState(true)
  }, 500);


  // const [isDialogOpen, setDialogState] = useState(true);


  useEffect(() => {
    console.log('when component is mounted');
    //Cookies.get('necessary-cookies') ? setBannerState(false) : setBannerState(true)
  });

  const acceptCookies = () => {
    Cookies.set('necessary-cookies', 'true');
    setBannerState(false);
  }

  const manageConsent = () => {
    console.log('manage consent button clicked');
    setDialogState(true);
  }

  return (
    <>
      <div id="cookie-bar" className={`cookie-consent-banner ${isBannerOpen ? 'is-active' : ''} ${props.cssClass}`}>
        <div className="policy-info">
          <h2 className="title">{props.title}</h2>
          <p className="description">
            {props.message} {props.policyText} <a href={props.policyLink}>{props.policyLinkText}</a>
          </p>
        </div>
        <div className="cta-actions">
          <button onClick={acceptCookies}>{props.acceptButtonText}</button>
          <button onClick={manageConsent}>{props.manageConsentText}</button>
        </div>
      </div>
      {props.children}
    </>
  );
}

CookieBanner.defaultProps = {
  title: 'Your privacy',
  message: 'This site uses cookies to offer you a better browsing experience. By accepting, you consent to the use of cookies.',
  policyText: 'To find out more, read our updated policy terms in the link',
  policyLinkText: 'Cookie Policy',
  policyLink: 'https://gdpr.eu/cookies/',
  acceptButtonText: 'I am OK with it',
  manageConsentText: 'Manage Preferences',
  cssClass: ''
}


export const CookieDialog = (props) => {

  const { isDialogOpen, setDialogState } = useContext(DialogContext);
  //const [isDialogOpen, setDialogState] = useState(false);
  // console.log(props);
  const { preferenceCookie, setPreferenceCookie } = useContext(CookieContext);
  const { marketingCookie, setMarketingCookie } = useContext(CookieContext);
  const { statisticsCookie, setStatisticsCookie } = useContext(CookieContext);

  useEffect(() => {

    Cookies.get(preferenceCookie.name) ? setPreferenceCookie({...preferenceCookie, enabled: true}) : setPreferenceCookie({...preferenceCookie, enabled: false});

    Cookies.get(marketingCookie.name) ? setMarketingCookie({...marketingCookie, enabled: true}) : setMarketingCookie({...marketingCookie, enabled: false});

    Cookies.get(statisticsCookie.name) ? setStatisticsCookie({...statisticsCookie, enabled: true}) : setStatisticsCookie({...statisticsCookie, enabled: false});

  }, [])



  // Events
  //--------

  const saveCookiePreference = (e) => {

    e.preventDefault();

    if (preferenceCookie.enabled) {
      Cookies.set(preferenceCookie.name, preferenceCookie.enabled);
    } else {
      Cookies.remove(preferenceCookie.name);
    }

    if (marketingCookie.enabled) {
      Cookies.set(marketingCookie.name, marketingCookie.enabled);
    } else {
      Cookies.remove(marketingCookie.name);
    }

    if (statisticsCookie.enabled) {
      Cookies.set(statisticsCookie.name, statisticsCookie.enabled);
    } else {
      Cookies.remove(statisticsCookie.name);
    }

    setDialogState(false);

  }

  return (

    <>
      <div className={`cookie-preference-dialog ${isDialogOpen ? 'is-visible' : ''} ${props.cssClass}`}>
        <div className="container">
          <h1>{props.title}</h1>
          <p>{props.message}</p>
            {props.children}
          <button className="save-preferences" onClick={saveCookiePreference}>Save Cookie Preferences</button>

        </div>
      </div>
      <div className={`body-overlay ${isDialogOpen ? 'is-visible' : ''}`}></div>

    </>
  );
}

CookieDialog.defaultProps = {
  title: 'Your privacy options',
  message: 'Please review and manage your privacy settings below',
  cssClass: 'css',
  onManagePreferences: function () { }
}



export const PreferenceCheckbox = (props) => {

  const { preferenceCookie, setPreferenceCookie } = useContext(CookieContext);

  const togglePreferenceCookie = (e) => {

    setPreferenceCookie({
      ...preferenceCookie,
      enabled: e.target.checked,
    });

    // callback with checkbox status if necessary
    props.onPreferenceToggle(e.target.checked);

  }


  return (
    <div className="cookie-options-wrapper">

      <h3 className="title">{props.title}</h3>

      <div className='cookie-option'>
        <div className="checkbox-control">
          <label className="checkbox-container">
            <input type="checkbox" checked={preferenceCookie.enabled} onChange={togglePreferenceCookie} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="description">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  )

}

export const MarketingCheckbox = (props) => {

  const { marketingCookie, setMarketingCookie } = useContext(CookieContext);

  const toggleMarketingCookie = (e) => {

    setMarketingCookie({
      ...marketingCookie,
      enabled: e.target.checked,
    });

    // callback with checkbox status if necessary
    props.onMarketingToggle(e.target.checked);

  }

  return (
    <div className="cookie-options-wrapper">

      <h3 className="title">{props.title}</h3>

      <div className='cookie-option'>
        <div className="checkbox-control">
          <label className="checkbox-container">
            <input type="checkbox" checked={marketingCookie.enabled} onChange={toggleMarketingCookie} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="description">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  )

}


export const StatisticsCheckbox = (props) => {

  const { statisticsCookie, setStatisticsCookie } = useContext(CookieContext);

  const toggleStatisticsCookie = (e) => {

    setStatisticsCookie({
      ...statisticsCookie,
      enabled: e.target.checked,
    });

    // callback with checkbox status if necessary
    props.onStatisticsToggle(e.target.checked);

  }


  return (
    <div className="cookie-options-wrapper">

      <h3 className="title">{props.title}</h3>

      <div className='cookie-option'>
        <div className="checkbox-control">
          <label className="checkbox-container">
            <input type="checkbox" checked={statisticsCookie.enabled} onChange={toggleStatisticsCookie} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="description">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  )

}

PreferenceCheckbox.defaultProps = {
  title: 'Preference Cookie',
  message: 'This cookie option manages and tracks some marketing data',
  onPreferenceToggle: function () { }
}

MarketingCheckbox.defaultProps = {
  title: 'Marketing Cookie',
  message: 'This cookie option manages and tracks some marketing data',
  onMarketingToggle: function () { }
}

StatisticsCheckbox.defaultProps = {
  title: 'Statistics Cookie',
  message: 'This cookie option manages and tracks some marketing data',
  onStatisticsToggle: function () { }
}


/*******************
 * Context API
 ******************/

// Dialog Context
//----------------

export const DialogContext = createContext();

export const DialogContextProvider = (props) => {

  const [isDialogOpen, setDialogState] = useState(false);
  const [isBannerOpen, setBannerState] = useState(false);

  // const [preferenceCookies, setPreferenceCookies] = useState(true);
  // const [marketingCookies, setMarketingCookies] = useState(true);


  return (
    <DialogContext.Provider value={{isDialogOpen, setDialogState, isBannerOpen, setBannerState}}>
      {props.children}
    </DialogContext.Provider>
  )
}

// export default DialogContextProvider;

// Cookie Context
//----------------

export const CookieContext = createContext();

export const CookieContextProvider = (props) => {

  const [preferenceCookie, setPreferenceCookie] = useState({
    name: 'preference_cookie_consent',
    expiry: 40,
    enabled: true
  });

  const [marketingCookie, setMarketingCookie] = useState({
    name: 'marketing_cookie_consent',
    expiry: 7,
    enabled: true
  });

  const [statisticsCookie, setStatisticsCookie] = useState({
    name: 'statistics_cookie_consent',
    expiry: 7,
    enabled: true

  });

  return (
    <CookieContext.Provider value={{ preferenceCookie, setPreferenceCookie, marketingCookie, setMarketingCookie, statisticsCookie, setStatisticsCookie }}>
      {props.children}
    </CookieContext.Provider>
  )
}

// export default CookieContextProvider;