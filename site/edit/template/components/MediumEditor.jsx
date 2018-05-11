import React from 'react';
import MediumEditor from 'medium-editor';

const noop = () => { };
export default class Editor extends React.Component {
  medium = null;

  componentDidMount() {
    const { opitons, defaultText } = this.props;
    this.dom.innerHTML = defaultText;
    this.medium = new MediumEditor(this.dom, {
      ...opitons,
      placeholder: {
        text: this.props.children,
        hideOnClick: true,
      },
    });
    this.medium.subscribe('editableInput', (e) => {
      (this.props.onChange || noop)(e.target.innerHTML);
    });
  }
  componentWillUnmount() {
    this.medium.destroy();
  }
  render() {
    const props = { ...this.props };
    ['opitons', 'onChange', 'children', 'defaultText'].forEach(key => delete props[key]);
    return (
      <div
        ref={(c) => { this.dom = c; }}
        {...props}
      />
    );
  }
}
