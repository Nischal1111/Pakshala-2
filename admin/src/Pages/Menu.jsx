import React, { useState, useEffect } from "react"
import "../css/menu.css"
import { FaPlus, FaTrash } from "react-icons/fa"
import { Button, Modal, TextField } from "@mui/material"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { userLogged } from "../components/Cookie"
import { failednotify, notify, menufailnotify } from "../components/Notify"
import { ToastContainer } from "react-toastify"
import { ImSpinner2 } from "react-icons/im"
import { delnotify, failedaddnotify } from "../components/delnotify"
import { FaRegEye } from "react-icons/fa"
import { Link } from "react-router-dom"

const Special = () => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState("")
  const [itemImage, setItemImage] = useState(null)
  const [imagePath, setImagePath] = useState(null)
  const [loading, setLoading] = useState(false)
  const [delLoading, setDelLoading] = useState(false)
  const [delopen, setDelOpen] = useState(false)

  const handleDelopen = () => setDelOpen(true)
  const handleDelClose = () => setDelOpen(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setItemName("")
    setItemImage(null)
    setImagePath(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImagePath(file)
      setItemImage(URL.createObjectURL(file))
    }
  }

  const handleAddItem = async () => {
    setLoading(true)
    if (itemName && imagePath) {
      const formData = new FormData()
      formData.append("item_name", itemName)
      formData.append("img", imagePath)

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/add-special-menu`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        )
        const data = await response.json()

        if (data.success) {
          notify()
          handleClose()
          getSpecialMenu()
        } else {
          setLoading(false)
          alert("Failed to add special item.")
        }
      } catch (error) {
        setLoading(false)
        console.log("Error on adding menu:", error)
      } finally {
        setLoading(false)
      }
    } else {
      menufailnotify()
      setLoading(false)
    }
  }

  const getSpecialMenu = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-special-menu`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      const data = await response.json()
      if (data.success) {
        setItems(data.specialMenuItems)
      }
    } catch (error) {
      console.log("Error on getting special menu:", error)
    }
  }

  const handleRemoveItem = async (id) => {
    setDelLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-special-menu/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
      const data = await response.json()

      if (data.success) {
        delnotify()
        setDelLoading(false)
        handleDelClose()
        getSpecialMenu()
      } else {
        setDelLoading(false)
        alert("Failed to delete special item.")
      }
    } catch (error) {
      setDelLoading(false)
      alert("Failed to delete special item. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSpecialMenu()
  }, [])

  return (
    <section>
      <ToastContainer />
      <div className="special-div">
        <h1>Today's Special</h1>
        <div style={{ display: "flex" }}>
          {items.map((item) => (
            <>
              <div className="special-card" key={item._id}>
                <img
                  src={item.item_image?.url}
                  alt={item.item_name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: ".5rem",
                    padding: ".3rem",
                  }}
                >
                  <p style={{ fontSize: "1rem", marginLeft: ".8rem" }}>
                    {item.item_name}
                  </p>
                  <div className="fa-trash">
                    <FaTrash
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "2rem",
                      }}
                      className="fa-trash-icon"
                      onClick={handleDelopen}
                    />
                  </div>
                </div>
              </div>
              <Dialog open={delopen} onClose={handleDelClose}>
                <DialogTitle>Delete Image</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this image?
                  </DialogContentText>
                </DialogContent>

                {delLoading ? (
                  <>
                    <div
                      className="loading-spinner"
                      style={{
                        height: "2rem",
                        width: "2rem",
                        margin: "1rem 0rem 2rem 2rem",
                      }}
                    >
                      <ImSpinner2
                        className="loading"
                        style={{ height: "2rem", width: "2rem" }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <DialogActions>
                      <Button
                        onClick={handleDelClose}
                        color="primary"
                        sx={{ color: "#06D001" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleRemoveItem(item._id)}
                        color="primary"
                        autoFocus
                        sx={{ color: "red" }}
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </>
                )}
              </Dialog>
            </>
          ))}
          <div className="special-card" onClick={handleOpen}>
            <FaPlus style={{ fontSize: "2.5rem", color: "#B4B4B8" }} />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div
          className="modal-box"
          style={{ maxHeight: "90vh", overflow: "auto" }}
        >
          <h2>Add Special Item</h2>
          <TextField
            label="Item Name"
            variant="outlined"
            required
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="item-image-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="item-image-file">
            <Button
              variant="contained"
              component="span"
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "blue",
                boxShadow: "none",
                textDecoration: "underline",
              }}
            >
              Upload Item Image
            </Button>
          </label>
          {itemImage && (
            <div>
              <img
                src={itemImage}
                alt="Preview"
                style={{ width: "100%", height: "auto", marginTop: "10px" }}
              />
            </div>
          )}
          {loading ? (
            <div className="loading-spinner">
              <ImSpinner2 className="loading" />
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              style={{ marginTop: "10px" }}
            >
              Add Item
            </Button>
          )}
        </div>
      </Modal>
    </section>
  )
}

const Menu = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userLogged()) {
      navigate("/login")
    }
  }, [navigate])

  const [file, setFile] = useState(null)
  const [filePath, setFilePath] = useState(null)
  const [drinkfile, setDrinkFile] = useState(null)
  const [drinkFilePath, setDrinkFilePath] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState({})
  const [drink, setDrink] = useState({})
  const [delId, setdelId] = useState("")

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFilePath(selectedFile)
      setFile(URL.createObjectURL(selectedFile))
    } else {
      alert("Please upload a valid PDF file.")
    }
  }

  const handleDrink = (event) => {
    const selectedFile2 = event.target.files[0]
    if (selectedFile2 && selectedFile2.type === "application/pdf") {
      setDrinkFilePath(selectedFile2)
      setDrinkFile(URL.createObjectURL(selectedFile2))
    } else {
      alert("Please upload a valid PDF file.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Create FormData and append files
    const formData = new FormData()
    formData.append("file", filePath) // Check if filePath is properly set in handleFileChange
    formData.append("drink", drinkFilePath) // Check if drinkFilePath is properly set in handleDrink

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/add-menu-pdf`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      )
      const data = await response.json()

      if (data.success) {
        notify()
        setFile(null)
        setDrinkFile(null)
        setUploadSuccess(true)
      } else {
        failedaddnotify()
        setLoading(false)
        alert("Failed to add menu")
      }
    } catch (error) {
      failedaddnotify()
      setLoading(false)
      alert("Failed to add menu. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  // console.log(menu, drink )

  const getMenuPdf = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-menu-pdf`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      const data = await response.json()
      console.log(data)
      if (data.success) {
        setUploadSuccess(true)

        console.log("menu:", data.menuPdfs)
        setdelId(data.menuPdfs[0]._id)
        setMenu(data.menuPdfs[0]?.menu_file?.menu_url || null)
        setDrink(data.menuPdfs[0]?.drink_file?.menu_url || null)
      }
    } catch (error) {
      console.log("Error on getting menu pdf:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const deleteMenu = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-menu-pdf/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
      const data = await deleteMenu.json()
      if (data.success) {
        delnotify()
        setUploadSuccess(false)
        setFile(null)
        setDrinkFile(null)
      }
    } catch (error) {
      console.log("Error while deleting menu :", error)
    }
  }

  useEffect(() => {
    getMenuPdf()
  }, [])

  return (
    <>
      <div className="menu-content">
        <Special />
        <div className="menu-file">
          <form onSubmit={handleSubmit}>
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              name="MenuPDF"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                className="upload-img2"
                style={{
                  marginBottom: ".5rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "blue",
                  textDecoration: "underline",
                  boxShadow: "none",
                }}
              >
                Upload Menu File
              </Button>
            </label>
            {file && (
              <div className="pdf-viewer" style={{ marginBottom: "1rem" }}>
                <iframe
                  src={file}
                  width="100%"
                  height="600px"
                  style={{ border: "none", marginTop: "20px" }}
                  title="Menu PDF"
                ></iframe>
              </div>
            )}
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="raised-drink-file"
              type="file"
              name="DrinkPDF"
              onChange={handleDrink}
            />
            <label htmlFor="raised-drink-file">
              <Button
                variant="contained"
                component="span"
                className="upload-img2"
                style={{
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "blue",
                  textDecoration: "underline",
                  boxShadow: "none",
                }}
              >
                Upload Drinks File
              </Button>
            </label>
            {drinkfile && (
              <div className="pdf-viewer">
                <iframe
                  src={drinkfile}
                  width="100%"
                  height="600px"
                  style={{ border: "none", marginTop: "20px" }}
                  title="Drink PDF"
                ></iframe>
              </div>
            )}
            {loading ? (
              <div className="loading-spinner">
                <ImSpinner2 className="loading" />
              </div>
            ) : (
              <Button
                type="submit"
                variant="contained"
                className={
                  !file || !drinkfile
                    ? "submit-button disabled-button"
                    : "submit-button"
                }
                style={{
                  marginLeft: ".5rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
                disabled={!file || !drinkfile}
              >
                Confirm Upload
              </Button>
            )}
          </form>
          {uploadSuccess && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Link to={menu} target="_blank">
                  <Button
                    variant="contained"
                    className="view-button"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid black",
                      color: "black",
                      boxShadow: "none",
                      marginRight: "1rem",
                    }}
                  >
                    View Menu PDF <FaRegEye style={{ marginLeft: ".5rem" }} />
                  </Button>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Link to={drink} target="_blank">
                  <Button
                    variant="contained"
                    className="view-button"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid black",
                      color: "black",
                      boxShadow: "none",
                      marginRight: "1rem",
                    }}
                  >
                    View Drink PDF <FaRegEye style={{ marginLeft: ".5rem" }} />
                  </Button>
                </Link>
              </div>
              <button
                onClick={() => handleDelete(delId)}
                style={{
                  border: "1px solid red",
                  padding: "12px 24px",
                  borderRadius: ".2rem",
                  width: "50%",
                  backgroundColor: "transparent",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                Delete PDFs
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Menu
