import * as React from 'react';
import MenuComponent from './components/MenuComponent';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <MenuComponent></MenuComponent>
      <Outlet />
    </div>
  );
}
