"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 0;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let {
      top,
      height
    } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - getStatusBarHeight()) * 2;
  } else {
    return 40;
  }
};
const navBarHeight = () => getStatusBarHeight() + getTitleBarHeight();
const getLeftIconLeft = () => {
  let {
    leftIcon: {
      left,
      width
    }
  } = tt.getCustomButtonBoundingClientRect();
  return left + parseInt(width) + 3;
};
exports.getLeftIconLeft = getLeftIconLeft;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.navBarHeight = navBarHeight;
