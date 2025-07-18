import React, { createContext,useContext,useState} from "react";

export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [user,setUser] = useState(null);

    // Function to update user data
    const updateUser = (userData)=>{
        setUser(userData);
    };

    // Function ton clear user data
    const clearUser = ()=>{
        setUser(null);
    };
    return (
        <UserContext.Provider
          value={{
            user,
            updateUser,
            clearUser,
          }}>
          {children}
          </UserContext.Provider>
    );
}

// NC
export const useUserAuth = () => {
    return useContext(UserContext);
  };
export default UserProvider;