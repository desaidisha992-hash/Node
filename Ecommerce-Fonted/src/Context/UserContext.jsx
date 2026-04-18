import { createContext, useState } from "react"


// save and make your data centerlize
export const DataContext = createContext();


const UserContext = ({children}) => {
  const [centerData, setCenterData] = useState("")


  return (
    <DataContext.Provider value={{centerData, setCenterData}}>
    <div>{children}</div>
    </DataContext.Provider>
  )
}

export default UserContext