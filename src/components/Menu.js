import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {

  return (
    <div>
        <Link to="/Greet">
            <button>Button one</button>
        </Link>
        <Link to="/user">
            <button>Button two</button>
        </Link>
    </div>
  )
}

export default Menu