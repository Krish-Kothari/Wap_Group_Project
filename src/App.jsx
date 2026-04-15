import { useState } from 'react'
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import StartMenu from './components/StartMenu/StartMenu'

function App() {


  return (
    <div>
      <Desktop/>
      <Taskbar/>
      <StartMenu/>
    </div>
  )
}


export default App
