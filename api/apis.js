import {
	request
} from "@/utils/request.js"

// 首页海报列表
export function apiGetBanner() {
	return request({
		url: "/homeBanner"
	})
}

// 随机9张壁纸
export function apiGetDayRandom() {
	return request({
		url: "/randomWall"
	})
}

// 壁纸资讯公告列表
export function apiGetNotice(data = {}) {
	return request({
		url: "/wallNewsList",
		data
	})
}

// 壁纸大分类
export function apiGetClassify(data = {}) {
	return request({
		url: "/classify",
		data
	})
}

// 分类中壁纸列表（分类详情）
export function apiGetClassList(data = {}) {
	return request({
		url: "/wallList",
		data
	})
}

// 评分
export function apiGetSetupScore(data = {}) {
	return request({
		url: "/setupScore",
		data
	})
}

// 下载
export function apiWriteDownload(data = {}) {
	return request({
		url: "/downloadWall",
		data
	})
}

// 获取单张详情
export function apiDetaiWall(data = {}) {
	return request({
		url: "/detailWall",
		data
	})
}


// 用户个人信息
export function apiUserInfo(data = {}) {
	return request({
		url: "/userInfo",
		data
	})
}

// 我的评分/下载列表
export function apiUserWallList(data = {}) {
	return request({
		url: "/userWallList",
		data
	})
}

// 壁纸资讯公告详情
export function apiWallNewsDetail(data = {}) {
	return request({
		url: "/wallNewsDetail",
		data
	})
}

// 搜索壁纸
export function apiSearchWall(data = {}) {
	return request({
		url: "/searchWall",
		data
	})
}