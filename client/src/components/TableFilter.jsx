import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser } from "react-icons/fa";
import { Dialog, DialogContent, DialogContentText, DialogTitle,  CardContent, CardMedia, Typography} from '@mui/material';
import { ImSpinner2 } from "react-icons/im";
import { fadeIn } from "../motion/motion";
import { failednotify } from './Notify';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from "../components/ConfirmationModal";

const TableFilter = () => {
    const [loading, setLoading] = useState(false);
    const [tableList, setTableList] = useState([]);
    const [filteredTables, setFilteredTables] = useState([]);
    const [btnClicked, setClicked] = useState("all tables");
    const [open, setOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        date: '',
        time: '',
        guests: '',
    });
    const [refetch,setreFetch]=useState(false)

    const handleClickOpen = (table) => {
        setSelectedTable(table);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTable(null);
        setFormData({
            name: '',
            email: '',
            contact: '',
            date: '',
            time: '',
            guests: '',
        });
    };

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => {
        setModalOpen(false);
        setreFetch(true)
    }

    const getAllTable = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-table-items`);
            const data = await response.json();
            if (data.success) {
                setTableList(data.tableItems);
                setFilteredTables(data.tableItems);
                setreFetch(false)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllTable();
    }, []);

    useEffect(() => {
    if (refetch) {
      getAllTable()
    }
  }, [refetch]);

    const handleFilter = (e) => {
        const choice = e.target.value.toLowerCase();
        setClicked(choice);

        if (choice === "all tables") {
            setFilteredTables(tableList);
        } else {
            setFilteredTables(tableList.filter(table => table.table_category.toLowerCase() === choice));
        }
    };

    const handleReserve = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/request-table-reserve/${selectedTable._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                setModalOpen(true);
                handleClose();
            } else {
                failednotify();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // Function to get the current time in HH:MM format
    const getCurrentTime = () => {
        const today = new Date();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div className='room-filter'>
            <ToastContainer />
            <h1>Reserve a table</h1>
            <div className="filter-choice">
                {["all tables", "terrace", "bar", "lobby", "indoor", "dining", "rooftop"].map((category) => (
                    <button
                        key={category}
                        value={category}
                        onClick={handleFilter}
                        className={btnClicked === category ? "clicked" : ""}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <div className="room-cards">
                {loading ? (
                    <div className='loading-spinner'>
                        <ImSpinner2 className='loading' />
                    </div>
                ) : filteredTables.length === 0 ? (
                    <div className='no-special-div'>
                        <h1>No tables available</h1>
                    </div>
                ) : (
                    filteredTables.map((table, index) => (
                        <motion.div
                            key={table._id}
                            className='singleroom-card'
                            style={{ backgroundColor: "#F3EEEA", position: "relative" }}
                            variants={fadeIn("up", "spring", index * 0.01, 0.1)}
                            viewport={{ once: "true" }}
                            initial="hidden"
                            whileInView="show"
                        >
                            <CardMedia
                                component="img"
                                alt={table.table_name}
                                image={table.table_image.url}
                                className='roomcard-img'
                            />
                            <CardContent>
                                <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
                                    <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
                                        {table.table_name}
                                    </Typography>
                                </div>
                                <Typography variant="body2" style={{ fontFamily: "Lato", fontSize: "1rem", letterSpacing: "1.4px", color: "black", lineHeight: "2rem" }}>
                                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: ".8rem" }}>
                                        <FaUser />
                                        <span>Up to {table.table_guests} guest/s</span>
                                    </div>
                                </Typography>
                            </CardContent>
                            <div className="overlay2" onClick={() => handleClickOpen(table)}>
                                <button
                                    style={{
                                        backgroundColor: table.tableStatus === "Booked" ? "gray" :
                                            table.tableStatus === "Pending" ? "#FFC107" : "var(--primary-color)",
                                    }}
                                    disabled={table.tableStatus !== "Available"}
                                >
                                    {table.tableStatus === "Booked" ? "Reserved" : 
                                        table.tableStatus === "Pending" ? "In Queue" : "Reserve"}
                                </button>
                            </div>
                            <div style={{ position: "absolute", top: ".7rem", left: "1.2rem", display: "flex", gap: ".5rem", alignItems: "center", backgroundColor: "white", padding: ".3rem .8rem", borderRadius: ".3rem" }}>
                                <div style={{ height: ".7rem", width: ".7rem", borderRadius: "50%", backgroundColor: table.tableStatus === "Booked" ? "#8686f0" : table.tableStatus === "Pending" ? "#FFC107" : "lightgreen" }}></div>
                                <p style={{ fontSize: ".8rem" }}>{table.tableStatus}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reserve {selectedTable?.table_name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the form to reserve your table.
                    </DialogContentText>
                    <form onSubmit={handleReserve} className='table-form'>
                        <div>
                            <input
                                type="text"
                                placeholder='Name'
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{width:"100%",border:"gray 0.1px solid"}}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                required
                                placeholder='Email'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{width:"100%",border:"gray 0.1px solid "}}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                required
                                placeholder='Contact'
                                minLength={10}
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                style={{width:"100%",border:"gray 0.1px solid "}}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                required
                                placeholder='Guests'
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                style={{width:"100%",border:"gray 0.1px solid "}}
                            />
                        </div>
                        <div style={{marginTop:".3rem",marginBottom:"-1rem"}}>
                            <label htmlFor="" style={{marginTop:".3rem",marginBottom:"-.5rem"}}>Date</label>
                            <input
                                type="date"
                                required
                                placeholder='Date to book'
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                min={getTodayDate()}
                                style={{width:"100%",border:"gray 0.1px solid",marginTop:"0rem"}}
                            />
                        </div>
                        <div style={{marginTop:"2rem",marginBottom:"-1rem"}}>
                            <label htmlFor="" style={{marginTop:"1rem",marginBottom:"1rem"}}>Time</label>
                            <input
                                type="time"
                                required
                                placeholder='Estimated arrival time'
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                min={getCurrentTime()}
                                style={{width:"100%",border:"gray 0.1px solid ",marginTop:"0rem"}}
                            />
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",marginTop:"2rem",gap:"1rem",fontSize:"15px",cursor:"pointer"}}>
                        <button style={{border:"none",letterSpacing:"1px"}} onClick={handleClose} className='form-cancel'>
                            CANCEL
                        </button>
                        <button type='submit' style={{border:"none",letterSpacing:"1px",transition:"all .3s"}} className='form-reserve'>
                            RESERVE
                        </button>
                        </div>
                    </form>
                </DialogContent>
               
            </Dialog>

            <ConfirmationModal open={modalOpen} handleClose={handleModalClose} message={"reserved a table"} />
        </div>
    );
};

export default TableFilter;
