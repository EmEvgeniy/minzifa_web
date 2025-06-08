import React, { FC } from 'react';
import { Desctop } from './Desctop';
import { Mobile } from './Mobile';

export const TopNav: FC = () => {
  return (
    <div className="w-full">
      <Desctop />
      <Mobile />
    </div>
  );
};
