import React from "react";
import axios from "axios";

const Users = ({}) => {

    return(
        <>
        <h1>{Users.name}</h1>
        </>
    )
    };
  
  Users.getInitialProps = async () => {
    const res = await axios.get('https://criel.herokuapp.com/user/getuser');
    console.log(res);
    console.log("data loaded");

    return{
        users : res.data
    }

  };
  
  export default Users;