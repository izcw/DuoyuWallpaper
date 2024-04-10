"use strict";
function getTimeAgoDescription(timestamp) {
  const now = (/* @__PURE__ */ new Date()).getTime();
  const diff = now - timestamp;
  const minute = 60 * 1e3;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  if (diff < minute) {
    return "一分钟";
  } else if (diff < hour) {
    return Math.floor(diff / minute) + "分钟";
  } else if (diff < day) {
    return Math.floor(diff / hour) + "小时";
  } else if (diff < month) {
    return Math.floor(diff / day) + "天";
  } else if (diff < 3 * month) {
    return Math.floor(diff / month) + "月";
  } else {
    return null;
  }
}
exports.getTimeAgoDescription = getTimeAgoDescription;
