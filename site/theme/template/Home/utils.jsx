/* eslint no-undef: 0 */
import React from 'react';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import ticker from 'rc-tween-one/lib/ticker';
import TweenOne from 'rc-tween-one';

function ParallaxG(props) {
  return <ScrollParallax component="g" {...props} />;
}

export function svgBgToParallax(children, location, i = 0) {
  const svgChildren = React.Children.toArray(children).map((child, ii) => (
    <ParallaxG
      key={ii.toString()}
      location={location}
      animation={{
        y: (Math.random() * -200) - 80 - (i * 20),
        playScale: [0, Math.random() + 2],
      }}
    >
      {child}
    </ParallaxG>
  ));
  return svgChildren;
}
export function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}
export function windowHeight() {
  return window.innerHeight
    || document.documentElement.clientHeight || document.body.clientHeight;
}

export function scrollTo(number, _scrollTop) {
  const scrollTop = _scrollTop || currentScrollTop();
  if (scrollTop !== number) {
    const tickerId = `scrollToTop-${Date.now()}`;
    const startFrame = ticker.frame;
    ticker.wake(tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const ratio = TweenOne.easing.easeInOutCubic(moment, scrollTop, number, 450);
      window.scrollTo(window.scrollX, ratio);
      if (moment >= 450) {
        ticker.clear(tickerId);
      }
    });
  }
}

// 图处预加载；
const div = document.createElement('div');
div.style.display = 'none';
document.body.appendChild(div);
[
].forEach((src) => {
  const img = new Image();
  img.src = src;
  div.appendChild(img);
});
