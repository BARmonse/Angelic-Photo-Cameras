import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import AuthenticationService from '../services/AuthenticationService'

export const Login = () => {
  const [personalAccessToken, setPersonalAccessToken] = useState<string>('')

  const login = async () => {
    const response = await AuthenticationService.login(personalAccessToken)
    console.log(response)
  }

  return (
    <Box>
      <Box>
        <Input
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
