export function getTimeAgoDescription(timestamp) {
  const now = new Date().getTime(); // 获取当前时间的时间戳
  const diff = now - timestamp; // 计算时间差

  const minute = 60 * 1000; // 一分钟的毫秒数
  const hour = 60 * minute; // 一小时的毫秒数
  const day = 24 * hour; // 一天的毫秒数
  const month = 30 * day; // 一个月（平均30天）的毫秒数

  if (diff < minute) {
    // 如果差异小于1分钟，显示“一分钟”
    return "一分钟";
  } else if (diff < hour) {
    // 如果差异小于1小时，显示多少分钟
    return Math.floor(diff / minute) + "分钟";
  } else if (diff < day) {
    // 如果差异小于1天，显示多少小时
    return Math.floor(diff / hour) + "小时";
  } else if (diff < month) {
    // 如果差异小于1个月，显示多少天
    return Math.floor(diff / day) + "天";
  } else if (diff < 3 * month) {
    // 如果差异小于3个月，显示多少月
    return Math.floor(diff / month) + "月";
  } else {
    // 如果差异超过3个月，返回null
    return null;
  }
}

// 使用示例：
// const timestamp = Date.parse(new Date().toDateString()); // 假设传入的时间戳是今天的某个时间点
// console.log(getTimeAgoDescription(timestamp));