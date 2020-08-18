import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './tag_input.module.scss';

import TagItem, {TagItemInterface} from '../tag_item/index';


interface Props {
  className?: Optional<string>;
  list: Array<TagItemInterface>;
  isSmall?: Optional<boolean>;
  isMedium?: Optional<boolean>;
  isLarge?: Optional<boolean>;
}

const TagInput: React.FC<Props> = (props) => {
  const { 
    className, 
    list, 
    isSmall, 
    isMedium, 
    isLarge, 
    ...otherProps } = props;


  const [tagItemList, setTagItemList] = useState(list)
  const [tagItemText, setTagItemText] = useState('')
  const [showError, setShowError] = useState(false)

  const rootClass = classnames(
    {
      [styles.tagInput]: true,
      [styles.tagInputSmall]: isSmall,
      [styles.tagInputMedium]: isMedium,
      [styles.tagInputLarge]: isLarge,
      [styles.onError]: showError,
    },
    className,
  );

  function generateId(): number {
    
    let id = 1;
    if (tagItemList && tagItemList.length > 0)
      id = Math.max(...tagItemList.map( (item: TagItemInterface) => item.id)) + 1;
    return id;

  }

  function onError(){
    setShowError(true)
  }

  function isDuplicated(text: string){
    let isDuplicated = false
    if(tagItemList && tagItemList.length > 0){
      const item = tagItemList.find( (item: TagItemInterface) => item.text === text)
      if(item){
        isDuplicated = true
        onError()
      }
    }
    return isDuplicated
  }

  function addItem() {

    if(isDuplicated(tagItemText))
      return

    const newTagItem = {
      id: generateId(),
      text: tagItemText
    }

    setTagItemList([...tagItemList, newTagItem]);
    setTagItemText('')
  }

  function onKeyEnter(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter')
      addItem()
  }

  function onInputChange(e: React.FormEvent<HTMLInputElement>){
    setShowError(false)
    setTagItemText(e.currentTarget.value)
  }

  function removeItem(id: number){
    setTagItemList(tagItemList.filter( (item: TagItemInterface) => item.id !== id))
  }

  return (
    <div>
      <ul {...otherProps} style={styles} className={rootClass}>
         
          {tagItemList.map( (item: TagItemInterface) => {
              return <TagItem key={item.id} item={item} removeItem={()=> removeItem(item.id)}/>
            })
          }
         
        
          <input
                type="text"
                placeholder="Add a new tag"
                value={tagItemText}
                onChange={onInputChange}
                onKeyPress={onKeyEnter}
              />
          
        </ul>
        <div className={styles.errorHolder}>{showError && <span>Tag is duplicated</span>}</div>
    </div> 
  )
};

export default TagInput;



