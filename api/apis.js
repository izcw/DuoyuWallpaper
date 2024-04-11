import {
	request
} from "@/utils/request.js"
export function apiGetBanner() {
	return request({
		url: "/homeBanner"
	})
}

export function apiGetDayRandom() {
	return request({
		url: "/randomWall"
	})
}

export function apiGetNotice(data = {}) {
	return request({
		url: "/wallNewsList",
		data
	})
}


export function apiGetClassify(data = {}) {
	return request({
		url: "/classify",
		data
	})
}

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