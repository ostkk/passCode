const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  router: state => state.user.router,
  reFresh: state => state.user.reFresh,
  number: state => state.app.number
}
export default getters
