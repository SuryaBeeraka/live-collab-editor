import React from 'react'
import Editor from './components/Editor'

function App() {
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Live Collab Editor (Stage 1)</h1>
      <Editor />
    </div>
  )
}

export default App