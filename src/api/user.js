import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function uploadData(data) {
  return request({
    url: '/uploadStudent',
    method: 'post',
    data,
  })
}

export function changePassword(data) {
  return request({
    url: '/changePassword',
    method: 'post',
    data,
  })
}

export function searchStudent(data) {
  return request({
    url: '/searchStudent',
    method: 'post',
    data
  })
}

export function updateStudentData(data) {
  return request({
    url: '/updateStudentData',
    method: 'post',
    data
  })
}

export function applyOut(data) {
  return request({
    url: '/applyOut',
    method: 'post',
    data
  })
}

export function applyBack(data) {
  return request({
    url: '/applyBack',
    method: 'post',
    data
  })
}

export function applyCode(number) {
  return request({
    url: `/applyCode?number=${number}`,
    method: 'get',
  })
}

export function applyList(passed) {
  return request({
    url: `/applyList?passed=${passed}`,
    method: 'get',
  })
}

export function getNewApplyNumber() {
  return request({
    url: `/getNewApplyNumber`,
    method: 'get',
  })
}

export function passOrRefuse(id, s) {
  return request({
    url: `/passOrRefuse?s=${s}&id=${id}`,
    method: 'get',
  })
}

export function getCity() {
  return request({
    url: `/getCity`,
    method: 'get',
  })
}

export function addCity(data) {
  return request({
    url: `/addCity`,
    method: 'post',
    data
  })
}

export function deleteCity(data) {
  return request({
    url: `/deleteCity`,
    method: 'delete',
    params: {
      data
    }
  })
}

export function switchAuto(data) {
  return request({
    url: `/switchAuto`,
    method: 'post',
    data
  })
}

export function deleteStu(data) {
  return request({
    url: `/deleteStu`,
    method: 'delete',
    params: {
      data
    }
  })
}