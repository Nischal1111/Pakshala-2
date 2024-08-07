import React from 'react'
import "../Css/maps.css"
import {BsFillPinMapFill} from "react-icons/bs"

const Map = () => {
  return (
    <div className='maps-div'>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <BsFillPinMapFill className='map'/>
            <h2 className='con--location'>Check our Location</h2>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1602884422496!2d85.32795267546756!3d27.71233687617974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e5f59fd9f1%3A0xa92d0846f366fc7b!2sPakshala%20Restro%20Bar%20and%20Hotel!5e0!3m2!1sen!2snp!4v1719430291673!5m2!1sen!2snp"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="pakshala" className='map-frame' frameBorder="0"></iframe>
    </div>
  )
}

export default Map
