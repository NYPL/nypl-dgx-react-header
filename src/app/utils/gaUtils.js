import ga from 'react-ga';

function gaUtils() {
  /**
   * _trackEvent(gaLabel)
   * Track a GA click event.
   *
   * @param {gaLabel} String Label for GA event.
   */
  this._trackEvent = function _trackEvent(action, label) {
    ga.event({
      category: 'NYPL Header',
      action: action,
      label: label
    });
  };
}

export default new gaUtils();
