<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetBanner,
		apiGetDayRandom,
		apiGetNotice,
		apiGetClassify
	} from "@/api/apis.js"
	import {
		onShareAppMessage,
		onShareTimeline
	} from "@dcloudio/uni-app"

	const bannerList = ref([])
	const getBanner = async () => {
		let res = await apiGetBanner()
		bannerList.value = res.data
	}
	getBanner()

	const randomList = ref([])
	const getDayRandom = async () => {
		let res = await apiGetDayRandom()
		randomList.value = res.data
	}
	getDayRandom()

	const noticeList = ref([])
	const getNotice = async () => {
		let res = await apiGetNotice({
			select: true
		})
		noticeList.value = res.data
	}
	getNotice()

	const classifyList = ref([])
	const getClassify = async () => {
		let res = await apiGetClassify({
			select: true
		})
		classifyList.value = res.data
	}
	getClassify()

	// 跳转到预览页面
	const goPreview = (id) => {
		uni.setStorageSync("strogClassList", randomList.value)
		uni.navigateTo({
			url: "/pages/preView/preView?id=" + id
		})
	}


	// 用户点击右上角分享
	onShareAppMessage((e) => {
		return {
			title: "多鱼壁纸",
			path: "/pages/index/index",
			imageUrl: "https://picserver.duoyu.link/picfile/image/202403/31-1711876576139.webp"
		}
	})

	// 朋友圈
	onShareTimeline((e) => {
		return {
			title: "多鱼壁纸",
			path: "/pages/index/index",
			// imageUrl:"https://picserver.duoyu.link/picfile/image/202403/31-1711876576139.webp"
		}
	})
</script>

<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="首页"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay
				circular>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" :url="item.url" target="miniProgram"
						:app-id="item.appid" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else :url="`/pages/classList/classList?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/notice?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view><!-- 公告 -->

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view @click="goPreview(item._id)" class="box" v-for="item in randomList" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view><!-- 每日精选 -->

		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item isMore="true"></theme-item>
			</view>
		</view> <!-- 专题精选 -->
		
		<view class="selected">
			<common-title>
				<template #name>壁纸精选</template>
				<template #custom>
					<uni-icons type="fire" size="20"></uni-icons>
				</template>
			</common-title>
			<view class="content">
				<Wallpaper-Selection ></Wallpaper-Selection>
			</view>
		</view> <!-- 专题精选 -->
		
	</view>
</template>

<style lang="scss" scoped>
	.homeLayout {

		// banner
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 100%;
				height: 340rpx;

				&-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					.like {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
		}

		// 公告
		.notice {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #f1f1f1;
			margin: 0 auto;
			border-radius: 80rpx;
			display: flex;

			.left {
				width: 140rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.text {
					color: $brand-theme-color;
					font-weight: bold;
					font-size: 28rpx;
				}

				:deep() {

					//css控制，穿透组件内部
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.right {
				width: 70rpx;
			}
		}

		// 每日精选
		.select {
			padding-top: 50rpx;

			// 日期
			.date {
				color: $brand-theme-color;
				display: flex;
				align-items: center;

				.text {
					margin-left: 5rpx;
					font-size: 32rpx;
					line-height: 32rpx;
				}

				:deep() {
					//css控制，穿透组件内部
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 450rpx;
						display: inline-block;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}

						&:last-child {
							margin-right: 30rpx;
						}
					}
				}
			}
		}

		// 专题精选
		.theme {
			padding: 50rpx 0;

			.more {
				font-size: 32rpx;
				color: #999;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);

			}
		}
		.selected{
			padding: 50rpx 0;
			:deep() {
				//css控制，穿透组件内部
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
			}
		}
	}
</style>