/* eslint-disable */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Templates from './component/Templates';
import { svgBgToParallax } from './utils';

function setBgToParallax(item) {
  const { props } = item;
  return React.cloneElement(item, { children: svgBgToParallax(props.children) });
}

const svgBgChild = setBgToParallax((
  <svg width="1401" height="1843" viewBox="0 0 1401 1843" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" preserveAspectRatio="xMidYMid slice" >
    <circle id="Oval-13" stroke="none" fill="#EBEDF0" fillRule="evenodd" cx="-5" cy="50" r="98.5" />
    <rect id="Rectangle-33" stroke="none" fill="#EBEDF0" fillRule="evenodd" transform="translate(1200, 2000) rotate(45.000000) translate(-1261.132034, -1217.132034) " x="1111.13203" y="1007.13203" width="300" height="300" rx="1" />
    <circle id="Oval-13" stroke="#EBEDF0" strokeWidth="16" fill="none" cx="1402" cy="151" r="70" />
    <path d="M385.032144,960.394832 L394.316344,976.475539 C394.868629,977.432124 394.540879,978.655305 393.584293,979.20759 C393.280255,979.383126 392.935367,979.475539 392.584293,979.475539 L374.015893,979.475539 C372.911323,979.475539 372.015893,978.580108 372.015893,977.475539 C372.015893,977.124466 372.108305,976.779577 372.283842,976.475539 L381.568042,960.394832 C382.120327,959.438247 383.343508,959.110497 384.300093,959.662781 C384.604131,959.838318 384.856607,960.090794 385.032144,960.394832 Z" id="Polygon-2" stroke="none" fill="#A3B1BF" fillRule="evenodd" transform="translate(23.300093, 970.709623) rotate(70.000000) translate(-383.300093, -970.709623) " />
    <path d="M545.537489,211.431472 L552.545207,223.569196 C553.097492,224.525781 552.769741,225.748962 551.813156,226.301246 C551.509118,226.476783 551.164229,226.569196 550.813156,226.569196 L536.79772,226.569196 C535.693151,226.569196 534.79772,225.673765 534.79772,224.569196 C534.79772,224.218122 534.890133,223.873234 535.06567,223.569196 L542.073387,211.431472 C542.625672,210.474887 543.848853,210.147137 544.805438,210.699421 C545.109477,210.874958 545.361952,211.127434 545.537489,211.431472 Z" id="Polygon-2" stroke="none" fill="#A3B1BF" fillRule="evenodd" transform="translate(543.805605, 218.500167) rotate(90.000000) translate(-600.805605, -218.500167) " />
    <g id="Group-26" transform="translate(46.000000, 250.000000)" fill="#FADB14">
      <image xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/UtBesTOkoZsBUxPqfDlZ.svg" />
    </g>
    <g id="Group-29" transform="translate(200.000000, 1800.000000)" fill="#2F54EB">
      <image xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/VrADJaRPMnFjmtmIhObV.svg" />
    </g>
    <circle id="Oval-8" stroke="#13C2C2" strokeWidth="4" opacity="0.95" cx="996" cy="200" r="11" />
    <circle id="Oval-8" stroke="#13C2C2" strokeWidth="4" cx="11" cy="667" r="11" />
    <g id="Group-11" transform="translate(1250.000000, 1019.000000)" fill="#13C2C2">
      <image xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/MnLEmwjipfhzPUmBJnJE.svg" />
    </g>
    <g id="Group-28" transform="translate(800.000000, 1630.000000)" fill="#2F54EB">
      <image xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/dyNuxLOZtvjoHSVisbhQ.svg" />
    </g>
  </svg>
));

export default class Page1 extends React.PureComponent {
  render() {
    return (
      <div className="home-page-wrapper page2" id="page2">
        <div className="home-page">
          <h1><FormattedMessage id="app.home.templates" /></h1>
          <div className="bg">
            {svgBgChild}
          </div>
          <Templates isMobile={this.props.isMobile} />
        </div>
      </div>);
  }
}
