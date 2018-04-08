import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';

export default function EditButton({
  title,
  filename,
  sourcePath = 'https://github.com/ant-design/landins/edit/master/',
}) {
  return (
    <Tooltip title={title}>
      <a className="edit-button" target="_blank" href={`${sourcePath}${filename}`}>
        <Icon type="edit" />
      </a>
    </Tooltip>
  );
}
