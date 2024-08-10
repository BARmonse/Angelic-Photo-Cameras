import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUser = AuthenticationService.getLoggedUser()

    if (!loggedUser || !loggedUser?.access_token) {
      navigate('/login')
    } else {
      navigate('/shared-cameras')
    }
  }, [])

  return <></>
}
