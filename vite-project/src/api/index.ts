import { request } from '@/utils/request'
import type {
  User,
  CodeType,
  UserInfo,
  Patient,
  PatientList,
} from '@/types/user'
export const loginByPassword = (mobile, password) =>
  request<User>('/login/password', 'POST', { mobile, password })

export const loginByMobile = (mobile, code) => {
  return request<User>('/login/password', 'POST', { mobile, code })
}
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request<{ code: string }>('/code', 'GET', { mobile, type })

export const getUserInfo = () => request<UserInfo>('/patient/myUser')

export const getPatientList = () => request<PatientList>('/patient/mylist')

export const addPatient = (patient: Patient) =>
  request('/patient/add', 'POST', patient)

export const delPatient = (id: string) =>
  request(`/patient/del/${id}`, 'DELETE')
