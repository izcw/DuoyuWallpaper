<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onUnload,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		apiGetClassList,
		apiUserWallList
	} from "@/api/apis.js"

	import {
		onShareAppMessage,
		onShareTimeline
	} from "@dcloudio/uni-app"
	import {
		gotoHome
	} from "@/utils/common.js"

	let queryParams = {
		pageNum: 1,
		pageSize: 12
	}
	let pageNamer;
	onLoad((e) => {
		let {
			id = null,
				name = null,
				type = null
		} = e;
		if (type) queryParams.type = type;
		if (id) queryParams.classid = id;
		if (!id) gotoHome();

		pageNamer = name
		uni.setNavigationBarTitle({ // 设置标题名
			title: pageNamer
		})

		// 	执行获取分类列表的方法
		getClassList()
	})

	// 触底刷新
	onReachBottom(() => {
		if (noData.value) return
		queryParams.pageNum++
		getClassList()
	})

	const classList = ref([])
	const noData = ref(false)
	// 获取分类列表网络数据
	const getClassList = async () => {
		let res;
		if (queryParams.classid) res = await apiGetClassList(queryParams);
		if (queryParams.type) res = await apiUserWallList(queryParams);
		if (queryParams.pageSize > res.data.length) noData.value = true;
		classList.value = [...classList.value, ...res.data]; // 刷新值，老数据和新数据拼接

		uni.setStorageSync("strogClassList", classList.value)

	}

	// 骨架屏
	let loading = ref(true)
	let animate = ref(true)
	let skeleton = ref([{
		type: 'custom',
		style: 'width:240rpx;height:400rpx;'
	}])

	// 用户点击右上角分享
	onShareAppMessage((e) => {
		return {
			title: "多鱼壁纸-" + pageNamer,
			path: "pages/classList/classList?id=" + queryParams.classid + "&name=" + pageNamer
		}
	})

	// 朋友圈
	onShareTimeline((e) => {
		return {
			title: "多鱼壁纸-" + pageNamer,
			query: "id=" + queryParams.classid + "&name=" + pageNamer
			// imageUrl:"https://picserver.duoyu.link/picfile/image/202403/31-1711876576139.webp"
		}
	})

	onUnload(() => {
		// 当离开时清除缓存数据
		uni.removeStorageSync("strogClassList")
	})
</script>

<template>
	<view class="classList">
		<view class="content">
			<uv-skeletons v-if="!classList.length  && !noData" v-for="(item) in 12" :key="index" :loading="loading"
				:skeleton="skeleton" :animate="animate">
			</uv-skeletons>
			<navigator :url="'/pages/preView/preView?id='+item._id" v-for="item in classList" :key="item._id"
				class="item">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>

		<view class="loadingLayout" v-if="classList.length  || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<style lang="scss" scoped>
	.classList {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 400rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>