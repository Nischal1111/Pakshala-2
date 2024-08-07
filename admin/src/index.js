import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CheckProvider from './components/CheckBoxContext';
import RoomReserveProvider from './components/RoomReserveContext';
import TableReserveProvider from './components/TableContext';
import EventBookingProvider from './components/EventContext';
import TokenProvider from './components/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <TokenProvider>
    <EventBookingProvider>
    <TableReserveProvider>
  <RoomReserveProvider>
  <CheckProvider>
    <App />
  </CheckProvider>
  </RoomReserveProvider>
    </TableReserveProvider>
    </EventBookingProvider>
    </TokenProvider>
  </React.StrictMode>
  </BrowserRouter>
);
