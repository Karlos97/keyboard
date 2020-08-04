import React from 'react'
import './Drummer.scss'
import { IDrummerConfig } from '../../model/AppConfigInterface'

const Drummer = () => {
  const config: IDrummerConfig = {
    locale: 'aa'
  }

  return (
    <div className='drummer'>HELLO DRUMMER</div>
  )
}

export default Drummer
