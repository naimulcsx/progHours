import { useNavigate } from "react-router-dom"
import axios from "axios"
import { showNotification } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"
import React from "react"
import showToast from "~/utils/showToast"

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
        showToast("success", "Logged out!")
      })
      .catch(() => {})
  }
  return handleLogout
}

export default useLogout
