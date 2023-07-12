import { Navigate } from "react-router-dom"
import { removeUserData } from "../Services/Storage"

export default function Logout() {

  removeUserData()
  
  return <Navigate to="/login" />
}
