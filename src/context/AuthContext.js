import {useContext, createContext} from 'react'

const AuthContext = createContext();
//Context - Permite passar dados atraves de arvore de componentes sem necessariamente passar via props
export function AuthProvider ({children,value}){
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthValue () {
    return useContext(AuthContext);
}