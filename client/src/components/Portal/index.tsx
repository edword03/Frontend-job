import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface PropsType {
  children: React.ReactChild;
  className?: string;
  el?: string;
}

export const Portal: FC<PropsType> = ({ children }) => {
  const portalId = document.getElementById('root-portal');

  return portalId ? ReactDOM.createPortal(children, portalId) : null;
};
