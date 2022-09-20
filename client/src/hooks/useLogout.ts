import { useNavigate } from "react-router-dom"
import axios from "axios"
import { showNotification } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"
import React from "react"

/**
 * Responsible for logging out an user
 */
const useLogout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then(() => {
        navigate("/login")
        showNotification({
          message: `Logged out!`,
          color: "green",
          icon: React.createElement(IconCheck),
        })
      })
      .catch(() => {})
  }
  return handleLogout
}

export default useLogout
