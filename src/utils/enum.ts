// 认证状态
export const STATUS_OPTIONS = [
  {
    label: "全部",
    value: "1"
  },
  {
    label: "已认证",
    value: "2"
  },
  {
    label: "未认证",
    value: "3"
  }
];
// 过滤发布时间
export const FILTER_PUB_TIME_LIST = [
  {
    label: "全部",
    value: "1"
  },
  {
    label: "<6h",
    value: "2"
  },
  {
    label: "<12h",
    value: "3"
  },
  {
    label: "<1d",
    value: "4"
  },
  {
    label: "<3d",
    value: "5"
  },
  {
    label: "<7d",
    value: "6"
  },
  {
    label: "<1m",
    value: "7"
  },
  {
    label: "<3m",
    value: "8"
  },
  {
    label: "<6m",
    value: "9"
  }
];

// 过滤入库时间
export const FILTER_INCOMING_TIME = [
  {
    label: "全部",
    value: "1"
  },
  {
    label: "<1d",
    value: "4"
  },
  {
    label: "<2d",
    value: "5"
  },
  {
    label: "<7d",
    value: "6"
  },
  {
    label: "<1m",
    value: "7"
  },
  {
    label: "<6m",
    value: "9"
  },
  {
    label: "<1y",
    value: "10"
  }
];

// 来源平台
export const SOURCE_PLATFORM = [
  {
    label: "全部",
    value: "1"
  },
  {
    label: "抖音",
    value: "2"
  },
  {
    label: "头条",
    value: "3"
  },
  {
    label: "快手",
    value: "4"
  }
];

// 排除危害 eliminateTheHazard
export const ELIMINATE_THE_HAZARD = [
  {
    label: "全部",
    value: "1"
  },
  {
    label: "危害1",
    value: "2"
  },
  {
    label: "危害2",
    value: "3"
  }
];

// 排序列表
export const SORT_LIST = [
  {
    label: "搜索匹配",
    value: "1"
  },
  {
    label: "发布时间",
    value: "2"
  },
  {
    label: "入库时间",
    value: "3"
  },
  {
    label: "点赞数",
    value: "4"
  },
  {
    label: "评论数",
    value: "5"
  },
  {
    label: "转发数",
    value: "6"
  }
];

// 用户信息
export const USER_DETAIL = {
  imgUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
  userAvatar: `https://picsum.photos/id/${Math.floor(
    Math.random() * 100
  )}/115/115`,
  // 昵称
  nickName: `昵称${Math.floor(Math.random() * 100)}`,
  // 抖音号
  tiktok: `${Math.floor(Math.random() * 100000)}`,
  // 性别
  gender: Math.random() > 0.5,
  // 地区
  city: `地区${Math.floor(Math.random() * 100)}`,
  // 语言
  language: `语言${Math.floor(Math.random() * 100)}`,
  // 粉丝数
  numberOfFans: `${Math.floor(Math.random() * 10000)}`,
  // 获赞数
  numberOfLikes: `${Math.floor(Math.random() * 10000)}`,
  // 关注数
  numberOfConcerns: `${Math.floor(Math.random() * 10000)}`,
  // 作品数
  numberOfWorks: `${Math.floor(Math.random() * 10000)}`,
  // 实采视频
  liveVideo: `${Math.floor(Math.random() * 10000)}`,
  //   标签列表
  labelList: [],
  //   同城列表
  sameCityList: []
};
