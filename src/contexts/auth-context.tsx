import React, { useEffect } from "react"
import { setItem, getItem } from 'expo-secure-store'

interface User {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: User | null
  loading: boolean
  token: string | null
  error: unknown
}

type AuthAction = 
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: { error: unknown } }
  | { type: 'LOGOUT' | 'LOADING' }


const initialState: AuthState = {
  user: null,
  loading: false,
  token: null,
  error: null,
}

const AuthContext = React.createContext<{
  state: AuthState
  actions: ReturnType<typeof createActions> 
}>({
  state: initialState,
  actions: {} as ReturnType<typeof createActions>
})

function authReducer (state: AuthState, action: AuthAction): AuthState { 
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token }
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload.error }
    case 'LOADING':
      return { ...state, loading: true }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

const createActions = (previousState: AuthState, dispatch: React.Dispatch<AuthAction>) => ({
  login: async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' })
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

      // Simulate API call
      const result = { 
        user: { id: '1', name: 'John Doe', email: email },
        token: 'fake-jwt-token'
      } 

      dispatch({ type: 'LOGIN_SUCCESS', payload: result })

    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: error } })
    }
  },
  logout: () => dispatch({ type: 'LOGOUT' })
})

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  const actions = React.useMemo(() => createActions(state, dispatch), [state])

  useEffect(() => {
    const savedState = getItem('auth_state')
    if (savedState) {
      dispatch({ type: 'LOADING' })
      const parsedState = JSON.parse(savedState) as AuthState
      if (parsedState.user && parsedState.token) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: parsedState.user, token: parsedState.token } })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    }
  }, [])

  useEffect(() => {
    setItem('auth_state', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export {
  AuthProvider,
  useAuth,
}
