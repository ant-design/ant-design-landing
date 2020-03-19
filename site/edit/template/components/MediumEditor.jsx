import React from 'react';
import MediumEditor from 'medium-editor';

import { tagRep } from '../../../utils';

const noop = () => { };
export default class Editor extends React.Component {
  medium = null;

  state = {
    text: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  componentDidMount() {
    const { options } = this.props;
    const { text } = this.state;
    this.dom.innerHTML = text;
    this.medium = new MediumEditor(this.dom, {
      // paste: { cleanPastedHTML: true },
      placeholder: {
        text: '请输入...',
      },
      anchor: {
        placeholderText: 'Paste or type a having (http) link.',
        targetCheckbox: true,
        targetCheckboxText: 'Open in new window',
      },
      ...options,
    });
    this.addChange();
  }

  addChange = () => {
    const { textToString } = this.props;
    this.medium.subscribe('editableInput', (e, b) => {
      if (b.innerHTML.match(tagRep)) {
        this.setState({
          text: b.innerHTML,
        }, () => {
          (this.props.onChange || noop)(b);
        });
      }
    });
    this.medium.subscribe('blur', (e, b) => {
      e.stopPropagation();
      if (b.innerHTML.match(tagRep) && e.type === 'click') {
        (this.props.onBlur || noop)(textToString ? b.innerText : `<span>${b.innerHTML}</span>`);
      }
    });
  }

  /* componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text) {
      this.setState({
        text: nextProps.text,
      }, () => {
        this.medium.destroy();
        this.dom.innerHTML = nextProps.text;
        this.medium.setup();
        this.addChange();
      });
    }
  } */

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const { options, onChange, onBlur, text, children, textToString, ...props } = this.props;
    return (
      <div
        ref={(c) => { this.dom = c; }}
        {...props}
      />
    );
  }
}
