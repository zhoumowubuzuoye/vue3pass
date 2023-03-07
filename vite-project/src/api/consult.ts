/*
 * @Author: xiewenhao
 * @Date: 2023-02-21 15:29:15
 * @LastEditTime: 2023-03-07 09:31:47
 * @Description:
 */
import { request } from "@/utils/request";
import type {
  KnowledgePage,
  KnowledgeType,
  Doctor,
  DoctorList,
  DoctorPage,
  FollowType,
  TopDep,
  Image,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult,
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPage,
} from "@/types/consult";

import type { PageParams } from "@/types/page";

export const getKnowledgePage = (params: PageParams) =>
  request<KnowledgePage>("/patient/home/knowledge", "GET", params);

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>("/home/page/doc", "GET", params);

export const followOrUnfollow = (id: string, type: FollowType = "doc") =>
  request("/like", "POST", { id, type });

export const getAllDep = () => request<TopDep[]>("/dep/all");

export const uploadImage = (file: File) => {
  const fd = new FormData();
  fd.append("file", file);
  return request<Image>("/upload", "POST", fd);
};

export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>("/patient/consult/order/pre", "GET", params);

export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>("/patient/consult/order", "POST", data);

export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1;
  orderId: string;
  payCallback: string;
}) => request<{ payUrl: string }>("/patient/consult/pay", "POST", params);

export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>("/patient/consult/order/detail", "GET", {
    orderId,
  });

export const getPrescriptionPic = (id: string) =>
  request<{ url: string }>(`/patient/consult/prescription/${id}`);

export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>("/patient/consult/order/list", "GET", params);

// 取消订单
export const cancelOrder = (id: string) =>
  request(`/patient/order/cancel/${id}`, "PUT");

// 删除订单
export const deleteOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')
