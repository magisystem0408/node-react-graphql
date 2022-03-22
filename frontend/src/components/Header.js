import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

export const Header = () => (
  <Navbar color='primary' dark className='mb-4'>
    <NavbarBrand href='/'>Movie list</NavbarBrand>
  </Navbar>
)
