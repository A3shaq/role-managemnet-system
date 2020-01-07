let roleType = {
  roleStudent: 10,
  roleCompany: 20,
  roleAdmin: 30
};



const Auth = {
  isAuthenticated: false,
  authenticate() {
  this.isAuthenticated = true;
  },
  signout() {
  this.isAuthenticated = false;
  },
  getAuth() {
  return this.isAuthenticated;
  }
  };
  export default Auth;

export { roleType ,Auth};
