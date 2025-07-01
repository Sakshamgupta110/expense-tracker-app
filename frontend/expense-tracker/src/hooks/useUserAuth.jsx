import React, { useEffect,useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import ApiPaths from '../utils/ApiPaths';


export const useUserAuth = () => {
    const {user,updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if(user) return;
       
      let  isMounted =true ;

       const fetchUserInfo = async () => {
        try {
          const response = await axiosInstance.get(ApiPaths.AUTH.GET_USER_INFO);

          if(isMounted && response.data){
            updateUser(response.data)
          }
        } catch (error) {
            console.log("failed to fetch user detail",error);
            if(isMounted)
            {
                clearUser();
                navigate('/login');
            }
            throw error;
        }
      };

      fetchUserInfo();

      return ()=> {
        isMounted = false;
      }
    }, [updateUser,clearUser,navigate]) 
}

export default useUserAuth