import { useState } from "react"
export default function TagInputPopup({ flage, setFlage }) {
  const [tagName, setTagName] = useState("")
  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFlage(false)
  }

  return (
    <form className="px-4 py-3 absolute border-2 shadow-xl inset flex flex-col bg-white items-end z-50 rounded-xl">
      <button
        onClick={() => setFlage(false)}
        className="px-4 py-2 text-white rounded-md bg-primary mb-2"
      >
        close
      </button>
      <input
        className="input-box "
        type="text"
        value={tagName}
        onBlur={handleBlur}
        onChange={(e) => setTagName(e.target.value)}
      ></input>
    </form>
  )
}
