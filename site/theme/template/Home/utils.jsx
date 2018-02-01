/* eslint no-undef: 0 */
import React from 'react';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

function ParallaxG(props) {
  return <ScrollParallax component="g" {...props} />;
}

export default function svgBgToParallax(children, location, i = 0) {
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
