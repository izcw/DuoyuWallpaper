const SYSTEM_INFO = uni.getSystemInfoSync(); //获取系统信息
// 状态栏高
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 0;

// 标题栏高度
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect(); //获取右上角胶囊按钮
		return height + (top - getStatusBarHeight()) * 2;
	} else {
		return 40;
	}
}

// 状态栏高的加标题栏高度
export const navBarHeight = () => getStatusBarHeight() + getTitleBarHeight();

// 抖音小程序左上角logo距离
export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtonBoundingClientRect();
	return left + parseInt(width) + 3
	// #endif
	// #ifdef MP-TOUTIAO
	return 0
	// #endif
}