import React from 'react';

const Menu = ({ menuData }) => {
  return (
    <div>
      <h1>Menu</h1>
      <pre>{JSON.stringify(menuData, null, 2)}</pre>
    </div>
  );
};

export default Menu;