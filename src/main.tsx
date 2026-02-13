import React from "react"
import ReactDOM from "react-dom/client"
import { Buffer } from "buffer"
import App from "./App"

if (typeof window !== "undefined") {
  (window as unknown as { Buffer: typeof Buffer }).Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
