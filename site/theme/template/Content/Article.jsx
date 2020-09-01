import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';
import { Alert, Anchor } from 'antd';
import delegate from 'delegate';
import EditButton from './EditButton';
import { ping } from '../utils';

class Article extends React.PureComponent {
  componentDidMount() {
    // Add ga event click
    this.delegation = delegate(this.node, '.resource-card', 'click', (e) => {
      if (window.ga) {
        window.ga('send', 'event', 'Download', 'resource', e.delegateTarget.href);
      }
    }, false);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const links = [...document.querySelectorAll('.outside-link.internal')];
    if (links.length === 0) {
      return;
    }
    this.pingTimer = ping((status) => {
      if (status !== 'timeout' && status !== 'error') {
        links.forEach((link) => (link.style.display = 'block'));
      } else {
        links.forEach((link) => link.parentNode.removeChild(link));
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
  }

  getAnchor = (node) => React.Children.map(node.props.children, (item) => {
    const children = item.props.children[0];
    return React.createElement(Anchor.Link, { ...children.props, title: children.props.children }, null);
  });

  render() {
    const { utils, intl: { locale }, content } = this.props;
    const { meta, description } = content;
    const { title, subtitle, filename } = meta;
    const isNotTranslated = locale === 'en-US' && typeof title === 'object';
    const anchorChild = this.getAnchor(utils.toReactComponent(
      ['ul', { className: 'toc' }].concat(getChildren(content.toc))
    ));
    return (
      <DocumentTitle title={`${title[locale] || title} - Ant Design Landing`}>
        <article className="markdown" ref={(node) => { this.node = node; }}>
          {isNotTranslated && (
            <Alert
              type="warning"
              message={(
                <span>
                  This article has not been translated yet. Wan&apos;t to help us out?
                  {' '}
                  <a href="https://github.com/ant-design/ant-design-landing/issues/1">
                    See this issue on GitHub.
                  </a>
                </span>
              )}
              style={{ marginBottom: 24 }}
            />
          )}
          <h1>
            {title[locale] || title}
            {
              !subtitle || locale === 'en-US' ? null
                : (
                  <span className="subtitle">
                    {subtitle}
                  </span>
                )
            }
            <EditButton
              title={<FormattedMessage id="app.content.edit-page" />}
              filename={
                filename.indexOf('scaffold/src/components') >= 0
                  ? 'xxx' : filename
              }
            />
          </h1>
          {
            !description ? null
              : utils.toReactComponent(
                ['section', { className: 'markdown' }].concat(getChildren(description))
              )
          }
          {
            (!content.toc || content.toc.length <= 1 || meta.toc === false) ? null
              : (
                <Anchor className="toc-affix" offsetTop={16}>
                  {anchorChild}
                </Anchor>
              )
          }
          {
            utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content.content))
            )
          }
          {
            utils.toReactComponent(
              ['section', {
                className: 'markdown api-container',
              }].concat(getChildren(content.api || ['placeholder']))
            )
          }
        </article>
      </DocumentTitle>
    );
  }
}

export default injectIntl(Article);
