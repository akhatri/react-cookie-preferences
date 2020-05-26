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

  const { setDialogState, isBannerOpen, setBannerState } = useContext(CookieContext);

  useEffect(() => {

    Cookies.get('necessary-cookies') ? setBannerState(false) : setBannerState(true)

  });

  const acceptCookies = () => {
    Cookies.set('necessary-cookies', 'true');
    setBannerState(false);
  }

  const manageConsent = () => {
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

  const { isDialogOpen, setDialogState } = useContext(CookieContext);

  useEffect(() => {
  }, [])



  // Events
  //--------

  const closeDialog = (e) => {

    e.preventDefault();
    setDialogState(false);

  }

  // Functions
  //----------

  return (

    <>
      <div className={`cookie-preference-dialog ${isDialogOpen ? 'is-visible' : ''} ${props.cssClass}`}>
        <div className="container">
          <h1>{props.title}</h1>
          <p>{props.message}</p>

          {props.children}

          <div className="button-actions">
            <button onClick={closeDialog}>{props.confirmText}</button>
            <button onClick={closeDialog}>{props.cancelText}</button>
          </div>

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
  confirmText: 'Save Preferences',
  cancelText: 'Cancel'
}

export const PreferenceCheckbox = (props) => {

  const [preferenceCookie, setPreferenceCookie] = useState(true);

  useEffect(() => {

    Cookies.get(props.name) ? setPreferenceCookie(true) : setPreferenceCookie(false);

  }, []);

  const togglePreferenceCookie = (e) => {

    setPreferenceCookie(e.target.checked);

    if (e.target.checked) {
      Cookies.set(props.name, e.target.checked);
    } else {
      Cookies.remove(props.name);
    }

    // callback with checkbox status if necessary
    props.onPreferenceToggle(e.target.checked);

  }


  return (
    <div className="cookie-options-wrapper">

      <h3 className="title">{props.title}</h3>

      <div className='cookie-option'>
        <div className="checkbox-control">
          <label className="checkbox-container">
            <input type="checkbox" checked={preferenceCookie} onChange={togglePreferenceCookie} />
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

  const [marketingCookie, setMarketingCookie] = useState(true);

  useEffect(() => {

    Cookies.get(props.name) ? setMarketingCookie(true) : setMarketingCookie(false);

  }, []);



  const toggleMarketingCookie = (e) => {

    setMarketingCookie(e.target.checked);

    if (e.target.checked) {
      Cookies.set(props.name, e.target.checked);
    } else {
      Cookies.remove(props.name);
    }

    // callback with checkbox status if necessary
    props.onMarketingToggle(e.target.checked);

  }

  return (
    <div className="cookie-options-wrapper">

      <h3 className="title">{props.title}</h3>

      <div className='cookie-option'>
        <div className="checkbox-control">
          <label className="checkbox-container">
            <input type="checkbox" checked={marketingCookie} onChange={toggleMarketingCookie} />
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

  const [statisticsCookie, setStatisticsCookie] = useState(true);
  
  useEffect(() => {

    Cookies.get(props.name) ? setStatisticsCookie(true) : setStatisticsCookie(false);

  }, []);


  const toggleStatisticsCookie = (e) => {

    setStatisticsCookie(e.target.checked);

    if (e.target.checked) {
      Cookies.set(props.name, e.target.checked);
    } else {
      Cookies.remove(props.name);
    }


    // callback with checkbox status if necessary
    props.onStatisticsToggle(e.target.checked);

  }


  return (
    <div className="cookie-options-wrapper">

      <h3 className="title">{props.title}</h3>

      <div className='cookie-option'>
        <div className="checkbox-control">
          <label className="checkbox-container">
            <input type="checkbox" checked={statisticsCookie} onChange={toggleStatisticsCookie} />
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
  name: 'preference_cookie',
  expiry: 365,
  onPreferenceToggle: function () { }
}

MarketingCheckbox.defaultProps = {
  title: 'Marketing Cookie',
  message: 'This cookie option manages and tracks some marketing data',
  name: 'marketing_cookie',
  expiry: 365,
  onMarketingToggle: function () { }
}

StatisticsCheckbox.defaultProps = {
  title: 'Statistics Cookie',
  message: 'This cookie option manages and tracks some marketing data',
  name: 'statistics_cookie',
  expiry: 365,
  onStatisticsToggle: function () { }
}


/*******************
 * Context API
 ******************/

export const CookieContext = createContext();

export const CookieContextProvider = (props) => {

  const [isDialogOpen, setDialogState] = useState(false);
  const [isBannerOpen, setBannerState] = useState(false);

  return (
    <CookieContext.Provider value={{ isDialogOpen, setDialogState, isBannerOpen, setBannerState }}>
      {props.children}
    </CookieContext.Provider>
  )
}