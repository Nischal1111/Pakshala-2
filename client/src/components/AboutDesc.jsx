import React from 'react'
import "../Css/About.css"
import { SectionWrapper } from '../motion'

const AboutDesc = () => {
  return (
    <div className='about-desc'>
      <div className='inside-about-div'>
        <div className="about-container">
            <div className="about-text">
                <h1 className='about-title'>ABOUT US</h1>
                <p>Located in the heart of Kathmandu, Pakshala Restro Bar and Hotel stands as a beacon of modern
                    elegance and culinary delight. Nestled amidst the bustling streets, this premier establishment
                    offers a seamless blend of exquisite dining experiences and luxurious accommodations,
                    promising both locals and travelers alike an unforgettable stay. With its chic ambiance,
                    impeccable service, and a menu curated to satisfy the most discerning palates, Pakshala Restro
                    Bar and Hotel epitomizes urban sophistication, making it a coveted destination for indulgence
                    and relaxation in the city.
                </p>
            </div>
            <div className="about-img">
                <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" alt="aboutImg" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutDesc
