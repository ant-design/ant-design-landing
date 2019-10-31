import React from 'react';
import TweenOne from 'rc-tween-one';
import { Link } from 'rc-scroll-anim';
/* replace-start */
import { polyfill } from 'react-lifecycles-compat';
import './index.less';
/* replace-end */
class Header extends React.Component {
  /* replace-start */
  static getDerivedStateFromProps(props, { prevProps }) {
    const { func } = props;
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps && func) {
      nextState.phoneOpen = func.open;
    }
    return nextState;
  }

  /* replace-end */
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;

    const { phoneOpen } = this.state;
    const { LinkMenu } = dataSource;
    const navData = LinkMenu.children;
    const navChildren = Object.keys(navData)
      .map((key, i) => {
        const item = navData[key];
        if (item.to.match(/\//g)) {
          const link = item.to;
          delete item.to;
          return (
            <a
              key={i.toString()}
              {...item}
              href={link}
              /* replace-start */
              data-edit="LinkMenu"
              /* replace-end */
            >
              {
                /* replace-start-value = navData[key].children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: navData[key].children } })
                /* replace-end-value */
              }
            </a>
          );
        }
        return (
          <Link
            key={i.toString()}
            {...item}
            /* replace-start */
            data-edit="LinkMenu"
          /* replace-end */
          >
            {
              /* replace-start-value = navData[key].children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: navData[key].children } })
              /* replace-end-value */
            }
          </Link>
        );
      });
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
              /* replace-start */
              data-edit="LinkMenu"
            /* replace-end */
            >
              <em />
              <em />
              <em />
            </div>
          )
          }
          <TweenOne
            {...LinkMenu}
            animation={isMobile ? {
              height: 0,
              duration: 300,
              onComplete: (e) => {
                if (this.state.phoneOpen) {
                  e.target.style.height = 'auto';
                }
              },
              ease: 'easeInOutQuad',
            } : null}
            moment={moment}
            reverse={!!phoneOpen}
            /* replace-start */
            data-edit="LinkMenu"
          /* replace-end */
          >
            {navChildren}
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

/* replace-start-value = export default Header */
export default polyfill(Header);
/* replace-end-value */
