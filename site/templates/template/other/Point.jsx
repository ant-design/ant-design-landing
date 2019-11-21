import React from 'react';
import Link from 'rc-scroll-anim/lib/ScrollLink';

export default function Point(props) {
  const { data, size, position, type, stroke } = props;
  const children = data.map((item) => {
    if (item.match('nav') || item.match('footer')) {
      return null;
    }
    const className = `point ${type} ${stroke} ${size}`.trim();
    return (
      <Link
        key={item}
        className={className}
        to={item}
        toHash={false}
      />
    );
  }).filter((item) => item);
  const wrapperClass = `point-wrapper ${position} ${size}`.trim();
  return (
    <div
      className={wrapperClass}
    >
      <div>
        {children}
      </div>
    </div>
  );
}

Point.defaultProps = {
  size: '',
  position: '',
  type: '',
  stroke: '',
};
