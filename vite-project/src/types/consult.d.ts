/*
 * @Author: xiewenhao
 * @Date: 2023-02-21 15:09:30
 * @LastEditTime: 2023-02-24 15:34:55
 * @Description:
 */
import type { pageValue, PageParams } from "./page";
import { ConsultType, IllnessTime } from "@/enums/hospital";
export type Knowledge = {
  id: string;
  /** 标题 */
  title: string;
  /** 封面[] */
  coverUrl: string[];
  /** 标签[] */
  topics: string[];
  /** 收藏数 */
  collectionNumber: number;
  /** 评论数 */
  commentNumber: number;
  /** 医生名称 */
  creatorName: string;
  /** 医生头像 */
  creatorAvatar: string;
  /** 医生医院 */
  creatorHospatalName: string;
  /** 关注文章 0:未关注 1：已关注 */
  likeFlag: 0 | 1;
  /** 内容 */
  content: string;
  /** 医生科室 */
  creatorDep: string;
  /** 医生职称 */
  creatorTitles: string;
  /** 医生ID */
  creatorId: string;
};

export type KnowledgeList = Knowledge[];

export type KnowledgePage = pageValue<Knowledge>;

export type KnowledgeType = "like" | "recommend" | "fatReduction" | "food";

export type KnowledgeParams = PageParams & {
  type: KnowledgeType;
};

export type Doctor = {
  /** 医生ID */
  id: string;
  /** 医生名称 */
  name: string;
  /** 头像 */
  avatar: string;
  /** 医院名称 */
  hospitalName: string;
  /** 医院等级 */
  gradeName: string;
  /** 科室 */
  depName: string;
  /** 职称 */
  positionalTitles: string;
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1;
  /** 接诊服务费 */
  serviceFee: number;
  /** 接诊人数 */
  consultationNum: number;
  /** 评分 */
  score: number;
  /** 主攻方向 */
  major: string;
};

export type DoctorList = Doctor[];

export type DoctorPage = pageValue<Doctor>;

/** 关注的类型，医生|文章|百科话题|疾病 */
export type FollowType = "doc" | "knowledge" | "topic" | "disease";

export type Image = {
  id: string;
  /** 图片地址 */
  url: string;
};

// 问诊记录
export type Consult = {
  /** 问诊记录ID */
  id: string;
  /** 问诊类型 */
  type: ConsultType;
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1;
  /** 科室ID */
  depId: string;
  /** 疾病描述 */
  illnessDesc: string;
  /** 疾病持续时间 */
  illnessTime: IllnessTime;
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1;
  /** 图片数组 */
  pictures: Image[];
  /** 患者ID */
  patientId: string;
  /** 优惠券ID */
  couponId: string;
};

// 问诊记录-全部可选
export type PartialConsult = Partial<Consult>;
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型

// 科室
export type SubDep = {
  /** 科室ID */
  id: string;
  /** 科室姓名 */
  name: string;
};

export type TopDep = SubDep & {
  /** 二级科室 */
  child: SubDep[];
};
