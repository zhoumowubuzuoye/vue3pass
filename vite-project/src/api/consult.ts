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
