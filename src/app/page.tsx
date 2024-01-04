import React, { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/sections/Footer';

export default function App(){
    
    return(
        <div className='bg-gray-800'>
            <Header />
            <Hero />
            <Footer />
        </div>
    )
}
