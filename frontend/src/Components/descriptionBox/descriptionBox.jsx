import React from 'react'
import './descriptionBox.css'

function DescriptionBox() {
    return (
        <div className="descriptionBox">
            <div className="descriptionBox-navigator">
                <div className="descriptionBox-nav-box">
                    Desccription
                </div>
                <div className="descriptionBox-nav-box fade">
                        Reviews{122}
                    </div>
            </div>
            <div className="descriptionBox-description">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, consequuntur voluptatum a quo blanditiis exercitationem modi, id ratione pariatur odit sed quas optio laudantium ex sit accusamus debitis. Dolorum, tempora!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem in corrupti laborum quidem quibusdam id dignissimos, animi quaerat assumenda fugit consequuntur et vero aliquid cumque doloribus. Nisi accusantium cupiditate rerum.</p>
            </div>
        </div>
    )
}

export default DescriptionBox
