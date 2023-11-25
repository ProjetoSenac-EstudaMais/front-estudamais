const getUserInfo = () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const username = localStorage.getItem('username');
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');
  
    return { loggedInUsername, username, loggedInUser, token };
  };
  
  export default getUserInfo;