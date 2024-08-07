import React, { useContext, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { TableReserveContext } from './TableContext'; 
import TableReserveCard from './TableReserveCard';
import { ToastContainer } from 'react-toastify';

const TableReserveDash = () => {
  const { tableReservations } = useContext(TableReserveContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const sortOrdersByDate = (orders) => {
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const completedReservations = sortOrdersByDate(tableReservations.filter((reservation) => reservation.status === "Completed"))
  const pendingReservations = sortOrdersByDate(tableReservations.filter((reservation) => reservation.status === "Pending"))

  return (
    <div className='menu-dash-page'>
      <ToastContainer />
      <h1 className='dashboard-title'>Table Reserve Dashboard</h1>
      <div className='tabs-order'>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: 'rgb(255, 140, 0)',
            }
          }}
        >
          <Tab
            label="New Reservations"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              color: selectedTab === 0 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
          <Tab
            label="Completed Reservations"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              color: selectedTab === 1 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
        </Tabs>
      </div>
      <Box hidden={selectedTab !== 0}>
        {pendingReservations.length === 0 ? (
          <p style={{padding:"18px 32px",margin:"1rem",backgroundColor:"whitesmoke",boxShadow:"0px 2px 4px 1px rgba(0,0,0,.1)",fontSize:"1.2rem"}}>No current reservations</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {pendingReservations.map((reservation) => (
              <TableReserveCard key={reservation._id} reservation={reservation} />
            ))}
          </div>
        )}
      </Box>
      <Box hidden={selectedTab !== 1}>
        {completedReservations.length === 0 ? (
          <p style={{padding:"18px 32px",margin:"1rem",backgroundColor:"whitesmoke",boxShadow:"0px 2px 4px 1px rgba(0,0,0,.1)",fontSize:"1.2rem"}}>No completed reservations</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {completedReservations.map((reservation) => (
              <TableReserveCard key={reservation._id} reservation={reservation} />
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

export default TableReserveDash;
