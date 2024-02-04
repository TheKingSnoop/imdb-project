import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div>This path doesn't exist.
      <Link to='/'>Home</Link>
    </div>
  )
}

export default NoPage