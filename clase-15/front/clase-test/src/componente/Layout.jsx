import React from 'react'

const Layout = ({components, ...res}) => {
  return (
    <div {...res} >
        <header>Header</header>
        {components}
        <footer>Footer</footer>
    </div>
  )
}

export default Layout