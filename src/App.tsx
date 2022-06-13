import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:3001")
// const socket = io()

function App() {

  const [ message, setMessage ] = useState<string>("")
  const [ messageReceived, setMessageReceived ] = useState<string>("")

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    } )
  }, [socket])

  const sendMessage = () => {
    socket.emit("send_message", {
      message
    })

  }

  return (
    <div className="App">
      <input onChange={(e) => setMessage(e.target.value)} placeholder='Message...'></input>
      <button onClick={sendMessage}>Send</button>
      <h1>Message : {messageReceived}</h1>
    </div>
  )
}

export default App
