import React from 'react'
const Header = (props) => (
  <div>
    <h1>{props.title}</h1>
    {
      props.subtitle && <h3>{props.subtitle}</h3>
    }
  </div>
)

Header.defaultProps = {
  title: 'Indecision App'
}

export default Header;