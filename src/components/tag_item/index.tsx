import React from 'react';
import classnames from 'classnames';

import styles from './tag_item.module.scss';
import Icon from '../icon/index';

export interface TagItemInterface {
    id: number
    text: string
}

interface Props {
  className?: Optional<string>;
  size?: number;
  color?: string;
  item: TagItemInterface;
  removeItem: Function;
}
  
const TagItem: React.FC<Props> = (props) => {

  const { className, size, color, item, removeItem, ...otherProps } = props;

  const rootClass = classnames(
    {
      [styles.tagItem]: true,
    },
    className,
  );

  return (
    <span {...otherProps} style={styles} className={rootClass}>
       <span>{item && item.text}</span>
       <button onClick={ item && ( () => removeItem(item.id) ) }>
           <Icon name="times" isSolid={false}/>
       </button>

    </span>
  )
};

export default TagItem;