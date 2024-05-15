import React from 'react'
import "../styles/not-available.css"
const NotAvailable = () => {
  return (
    <div className="not-found-wrap">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/" className="back-to-home">Back to Home</a>
    </div>
  )
}

export default NotAvailable
