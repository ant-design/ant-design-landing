import React from 'react';
import QueueAnim from 'rc-queue-anim';
/* replace-start */
import './index.less';
/* replace-end */

class Content10 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: props.isMobile,
    };
  }

  onClick = () => {
    window.open(this.props.dataSource.Content.children.url.children);
  }

  markerEnter = () => {
    this.setState({
      showInfo: true,
    });
  }

  markerLeave = () => {
    this.setState({
      showInfo: false,
    });
  }

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div
        {...props}
        {...dataSource.wrapper}

      >
        <div
          {...dataSource.Content}
          onMouseEnter={this.markerEnter}
          onMouseLeave={this.markerLeave}
          onClick={this.onClick}
          onTouchEnd={this.onClick}
          /* replace-start */
          data-edit="Content"
        /* replace-end */
        >
          <div
            {...dataSource.Content.children.icon}
            /* replace-start */
            data-edit="Content,image"
          /* replace-end */
          >
            <img src={dataSource.Content.children.icon.children} alt="img" />
          </div>
          <div
            {...dataSource.Content.children.iconShadow}
            /* replace-start */
            data-edit="Content,image"
          /* replace-end */
          >
            <img src={dataSource.Content.children.iconShadow.children} alt="img" />
          </div>
        </div>
        <QueueAnim type="scale">
          {this.state.showInfo && (
            <div className="map-tip" key="map">
              <h2>{dataSource.Content.children.title.children}</h2>
              <p>{dataSource.Content.children.content.children}</p>
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}

export default Content10;
