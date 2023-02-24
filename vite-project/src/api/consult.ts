import { request } from "@/utils/request";
import type {
  KnowledgePage,
  KnowledgeType,
  Doctor,
  DoctorList,
  DoctorPage,
  FollowType
} from "@/types/consult";
import type { PageParams  } from "@/types/page";

export const getKnowledgePage = (params: PageParams) =>
  request<KnowledgePage>("/patient/home/knowledge", "GET", params);

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>("/home/page/doc", "GET", params);

export const followOrUnfollow = (id: string, type: FollowType = "doc") =>
  request("/like", "POST", { id, type });
