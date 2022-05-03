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
    url: `/applyList?number=${passed}`,
    method: 'get',
  })
}