import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { CheckContext } from './CheckBoxContext';
import OrderCard from './OrderCard';
import { ToastContainer } from 'react-toastify';

const MenuDash = () => {
  const { orderDetails, getOrderDetails } = useContext(CheckContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const sortOrdersByDate = (orders) => {
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const completedOrders = sortOrdersByDate(orderDetails.filter((order) => order.status === "Completed"));
  const pendingOrders = sortOrdersByDate(orderDetails.filter((order) => order.status === "Pending"));

  return (
    <div className='menu-dash-page'>
      <ToastContainer />
      <h1 className='dashboard-title'>Menu Orders Dashboard</h1>
      <div className='tabs-order'>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: 'rgb(255, 140, 0)'
            }
          }}
        >
          <Tab
            label="New Orders"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              marginRight: '1rem',
              color: selectedTab === 0 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
          <Tab
            label="Completed Orders"
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
        {pendingOrders.length === 0 ? (
          <p style={{padding:"18px 32px",margin:"1rem",backgroundColor:"whitesmoke",boxShadow:"0px 2px 4px 1px rgba(0,0,0,.1)",fontSize:"1.2rem"}}>No current orders</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {pendingOrders.map((order) => (
              <OrderCard key={order._id} order={order} setSelectedTab={setSelectedTab} />
            ))}
          </div>
        )}
      </Box>
      <Box hidden={selectedTab !== 1}>
        {completedOrders.length === 0 ? (
          <p style={{padding:"18px 32px",margin:"1rem",backgroundColor:"whitesmoke",boxShadow:"0px 2px 4px 1px rgba(0,0,0,.1)",fontSize:"1.2rem"}}>No completed orders</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {completedOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

export default MenuDash;
