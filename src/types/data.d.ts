export type ListType = {
  // 图片URL
  url: string;
  // 标题
  title: string;
  // 是否正在加载
  loading: boolean;
  // 头像
  avatar: string;
  // 用户名称
  name: string;
  // 点赞数
  dianzan: number;
  // 评论数
  pinglun: number;
  // 转发数
  zhuanfa: number;
  // 发布时间
  time: string;
  // 收藏
  favoriteStatus: boolean;
  // 是否有动画
  animation?: boolean;
  // ID
  id?: number;
  // 是否选中
  check?: boolean;
  // 任务列表
  taskList?: string[];
  // 已读未读
  readStatus?: boolean;
  // 关键词
  keywords?: string[];
};

// 定义突发事件类型
export type EmergencyType = {
  // id
  id: number;
  // 任务名称
  name: string;
  // 定位用户数量
  userNum: number;
  // 采集视频数量
  videoNum: number;
  // 开始时间
  startTime: string;
  //   截止时间
  endTime?: string;
  // 结束时间
  finishTime?: string;
  // 状态
  status: boolean;
};
