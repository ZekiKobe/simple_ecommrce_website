import React from 'react'
import './newsLetter.css'

function NewsLetter() {
    return (
        <div className="news-letter">
            <h1>Get exclusive offers on your Email</h1>
            <p>Subscribe to our news letter and stay updates</p>
            <div>
                <input type="email" name="email" id="" placeholder='Your Email id' />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter

