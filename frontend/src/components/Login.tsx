import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import AuthenticationService from '../services/AuthenticationService'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [personalAccessToken, setPersonalAccessToken] = useState<string>('')
  const navigate = useNavigate()

  const login = async () => {
    try {
      const response = await AuthenticationService.login(personalAccessToken)
      localStorage.setItem(
        'loggedUser',
        JSON.stringify({ ...response, access_token: personalAccessToken }),
      )
      navigate('/shared-cameras')
    } catch (e) {
      console.error(e)
      window.alert('Not a valid token')
    }
  }

  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Text sx={{ fontSize: '20px' }}>Angelical cameras</Text>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '.5rem',
        }}
      >
        <Input
          placeholder="Use your personal access token"
          sx={{ width: '100%', border: '1px solid black' }}
          value={personalAccessToken}
          onChange={(e) => setPersonalAccessToken(e.target.value)}
        />
        <Button sx={{ color: 'purple' }} onClick={login}>
          Log In
        </Button>
      </Box>
    </Box>
  )
}
