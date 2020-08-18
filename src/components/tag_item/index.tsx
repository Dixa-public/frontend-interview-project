import React from 'react';

import styles from './tag_item.module.scss';

console.log(styles)

export interface TagItemInterface {
    id: number
    text: string
}

interface Props {
  className?: Optional<string>;
 
  item: TagItemInterface;
  removeItem: Function;
}
  
const TagItem: React.FC<Props> = (props) => {

  const { className, item, removeItem, ...otherProps } = props;


  return (
    <li {...otherProps} className={styles.tagItem}>
       <span>{item && item.text}</span>
     
       <button className={styles.Button} onClick={ item && ( () => removeItem(item.id) ) }>
           x
       </button>

    </li>
  )
};

export default TagItem;