import React from 'react'
import ReactDom from 'react-dom'
import Drummer from './components/Drummer/Drummer'

if (document.getElementById('root-drummer')) {
  const appConfig = window.drummerConfig

  ReactDom.render(<Drummer />, document.getElementById('root-drummer'))
}
