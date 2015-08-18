import React from 'react';
import Radium from 'radium';

class BasicButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <button
      ref='BasicButton'
      id={this.props.id}
      className={this.props.className}
      name={this.props.name}
      onClick={this.props.onClick}
      style={[
        styles.base,
        this.props.style
      ]}>
        {this.props.label}
      </button>
    );
  }
};

BasicButton.defaultProps = {
  id: 'BasicButton',
  className: 'BasicButton',
  name: 'BasicButton',
  label: 'Basic Button',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {

  }
};

export default Radium(BasicButton);