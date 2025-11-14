import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
        <Nav />
        <Outlet />
        <footer></footer>
    </>
  )
}

export default Layout