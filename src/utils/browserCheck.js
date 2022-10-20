let agent = navigator.userAgent.toLowerCase()
let name = navigator.appName

export const isIE = () => {
  return (name === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf('msie') !== -1)
}
export const isChrome = () => {
  return getName() === 'chrome'
}
export const getName = () => {
  let browser = ''
  if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
    browser = 'ie'
    if (name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
      // eslint-disable-next-line no-useless-escape
      agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent)
      browser += parseInt(agent[1])
    } else { // IE 11+
      if (agent.indexOf('trident') > -1) { // IE 11
        browser += 11
      } else if (agent.indexOf('edge/') > -1) { // Edge
        browser = 'edge'
      }
    }
  } else if (agent.indexOf('safari') > -1) { // Chrome or Safari
    if (agent.indexOf('opr') > -1) { // Opera
      browser = 'opera'
    } else if (agent.indexOf('chrome') > -1) { // Chrome
      browser = 'chrome'
    } else { // Safari
      browser = 'safari'
    }
  } else if (agent.indexOf('firefox') > -1) { // Firefox
    browser = 'firefox'
  }
  return browser
}
