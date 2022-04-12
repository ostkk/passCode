import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from '@/router'
import Layout from '@/layout'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    router,
    reFresh: true,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROUTE: (state, routes) => {
    if (state.router.options.routes.indexOf(routes[0]) == -1) {
      state.router.addRoutes(routes);
      state.router.options.routes = state.router.options.routes.concat(routes);
    }
  },
  SET_REFRESH: (state) => { state.reFresh = false }
}
const adminRoute = [{
  path: '/changestudentdata',
  component: Layout,
  redirect: '/changestudentdata/index',
  children: [{
    path: 'index',
    name: 'ChangeStudentData',
    component: () => import('@/views/changeStudentData/index'),
    meta: { title: '修改学生信息', icon: 'el-icon-edit' },
  }],
},

{
  path: '/uploadstudentlist',
  component: Layout,
  redirect: '/uploadstudentlist/index',
  children: [{
    path: 'index',
    name: 'UploadStudentList',
    component: () => import('@/views/uploadStudentList/index'),
    meta: {
      title: '上传学生名单', icon: 'el-icon-upload'
    },
  }]
}, { path: '*', redirect: '/404', hidden: true }]
const editorRoute = [{
  path: '/approvalform',
  component: Layout,
  redirect: '/approvalform/newapproval',
  name: 'ApprovalForm',
  meta: {
    title: '审批',
    icon: 'el-icon-s-order'
  },
  children: [{
    path: 'newapproval',
    component: () => import('@/views/approvalForm/newApproval/index'),
    name: 'NewApproval',
    meta: {
      title: '新的审批',
    },
  }, {
    path: 'autoapproval',
    component: () => import('@/views/approvalForm/autoApproval/index'),
    name: 'AutoApproval',
    meta: {
      title: '自动审批',
    },
  }, {
    path: 'approvalhistory',
    component: () => import('@/views/approvalForm/approvalHistory/index'),
    name: 'ApprovalHistory',
    meta: {
      title: '审批记录',
    },
  }]
}, { path: '*', redirect: '/404', hidden: true }]
const studentRoute = [{
  path: '/applyout',
  component: Layout,
  redirect: '/applyout/index',
  children: [{
    path: 'index',
    name: 'ApplyOut',
    component: () => import('@/views/applyOut/index'),
    meta: {
      title: '出校申请', icon: 'el-icon-notebook-1'
    },
  }]
},

{
  path: '/applyback',
  component: Layout,
  redirect: '/applyback/index',
  children: [{
    path: 'index',
    name: 'ApplyBack',
    component: () => import('@/views/applyBack/index'),
    meta: {
      title: '返校申请', icon: 'el-icon-notebook-2'
    },
  }]
},

{
  path: '/passcode',
  component: Layout,
  redirect: '/passcode/index',
  children: [{
    path: 'index',
    name: 'PassCode',
    component: () => import('@/views/passCode/index'),
    meta: {
      title: '通行码领取', icon: 'el-icon-thumb'
    },
  },
  { path: '*', redirect: '/404', hidden: true }]
}]
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ number: username.trim(), password: password }).then(response => {
        console.log(1);
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name } = data
        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  addRoute({ commit }, type) {
    if (type == 'admin')
      commit('SET_ROUTE', adminRoute);
    else
      if (type == 'editor')
        commit('SET_ROUTE', editorRoute);
      else
        if (type == 'student')
          commit('SET_ROUTE', studentRoute);
  },

  reFresh({ commit }) {
    commit('SET_REFRESH');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

