import React from 'react';
import MediumEditor from 'medium-editor';

const noop = () => { };
export default class Editor extends React.Component {
  medium = null;

  componentDidMount() {
    const { options, defaultText } = this.props;
    this.dom.innerHTML = defaultText;
    this.medium = new MediumEditor(this.dom, {
      ...options,
      placeholder: {
        text: this.props.children,
        hideOnClick: true,
      },
      anchor: {
        placeholderText: 'Paste or type a having (http) link.',
        targetCheckbox: true,
        targetCheckboxText: 'Open in new window',
      }
    });
    this.medium.subscribe('editableInput', (e, b) => {
      (this.props.onChange || noop)(b.innerHTML);
    });
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const props = { ...this.props };
    ['options', 'onChange', 'children', 'defaultText'].forEach(key => delete props[key]);
    return (
      <div
        ref={(c) => { this.dom = c; }}
        {...props}
      />
    );
  }
}
