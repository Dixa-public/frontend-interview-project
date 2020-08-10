import React, { FC, ReactNode, useState } from 'react';
import Avatar from '../avatar';
import styles from './collapsible.module.scss'

function completedUser(user: User, name: string, email: string, phoneNumber: string): User {

  if(!user.name || user.name===''){
    user.name = name;
  }

  const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!user.email || user.email==='' || !emailExp.test(user.email)){
    if(emailExp.test(email)){
      user.email = email;
    } else {
      user.email = '';
    }
  }

  if(!user.phoneNumber || user.phoneNumber==='' || user.phoneNumber.length<8){
    if(phoneNumber<8){
      user.phoneNumber = '';
    } else {
      user.phoneNumber = phoneNumber;
    }
  }

  return user;
}

function createUser(id: string, name: string, email: string, phoneNumber: string): User {
  if(id){
    return {
      id: id,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    }
  } else {
    // If ID is not avaialble return a default user
    // In real world application, might be useful to create a new user
    return {
      id: '1234-1234',
      name: 'John Smith',
      email: 'johnsmith@alphabet.com',
      phoneNumber: '+4512341234',
    }
  }
}

function formatData(user: User): string {
  const userData = [];

  // We have checked for ID previously
  userData.push("ID: " + user.id);

  if(user.name && user.name!==''){
    userData.push("Name: " + user.name);
  }

  if(user.email && user.email!==''){
    userData.push("Email: " + user.email);
  }

  if(user.phoneNumber && user.phoneNumber!==''){
    userData.push("Phone Number: " + user.phoneNumber);
  }

  return (<div>
      <ul className={styles.list}>
        {userData.map(info => <li key={info.split(':')[0]}>{info}</li>)}
      </ul>
    </div>);
}

interface CollapsibleProps {
  /**
  * Children passed down
  */
  children: ReactNode;

  /**
  * ID of user
  */
  id?: string;

  /**
  * Name of user
  */
  name?: string;

  /**
  * email of user
  */
  email?: string;

  /**
  * phoneNumber of user
  */
  phoneNumber?: string;

  /**
  * user information, will have precedence over above information
  */
  user?: User;
};

/**
* The Collapsible element is built on the Avatar element
*/
const Collapsible: FC<CollapsibleProps> = (props) => {
  const {
    children,
    id,
    name,
    email,
    phoneNumber,
    user
  } = props;

  let userInfo = {};

  if(user && user.id){
    userInfo = completedUser(user, name, email, phoneNumber);
  } else {
    userInfo = createUser(id, name, email, phoneNumber);
  }

  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={togglePanel} style={{ width: '45px', paddingBottom: '5px' }}>
        <Avatar user={userInfo} />
      </div>
      {isOpen ? (
        <div className={styles.info}>
          {formatData(userInfo)}
          <div className={styles.children}>{children}</div>
        </div>) : null}
    </div>
  );
}

export default Collapsible;
