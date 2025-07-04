import React from 'react';
import Desctop from './Desctop';
import { Mobile } from './Mobile';

export const TopNav = () => {
  return (
    <div className="w-full">
      <Desctop />
      <Mobile />
    </div>
  );
};
