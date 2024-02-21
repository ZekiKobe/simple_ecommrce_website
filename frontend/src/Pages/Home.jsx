import React from 'react'
import Hero from '../Components/Hero/hero'
import Popular from '../Components/Popular/popular'
import Offers from '../Components/Offers/offers'
import NewCollections from '../Components/New Collections/newCollections'
import NewsLetter from '../Components/newsLetter/newsLetter'

function Home() {
    return (
        <div>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
            <NewsLetter/>
        </div>
    )
}

export default Home
