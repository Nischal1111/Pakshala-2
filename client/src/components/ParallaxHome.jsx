import React from 'react';

import "../Css/nav.css"

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import HomeDescripton from './HomeDescripton';

const ParallaxHome = () => {
  return (
    <>
    <Parallax pages={1}>
        <ParallaxLayer>
            <HomeDescripton/>
        </ParallaxLayer>
    </Parallax>
    </>
  );
}

export default ParallaxHome;
