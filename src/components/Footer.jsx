import React from "react";


const Footer = ()=> {
    return(
        <div className="mt-5">
        <footer className="text-white text-center py-3 mt-auto" style={{ backgroundColor: 'black' }}>
        <div className="container">
            <small>© {new Date().getFullYear()} The Book Store. All rights reserved.</small>
        </div>
        </footer>
        </div>
    )
}

export default Footer;
