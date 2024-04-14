<script setup>
	import {
		ref
	} from "vue"
	import {
		navBarHeight
	} from "@/utils/system.js";

	import {
		apiUserInfo
	} from "@/api/apis.js"

	const userinfo = ref(null)

	const getUserInfo = () => {
		apiUserInfo().then(res => {
			userinfo.value = res.data
			console.log(res.data);
		})
	}
	getUserInfo()

	// 拨打电话
	const clickContact = () => {
		uni.makePhoneCall({
			phoneNumber: clickContact(17877059806)
		})
	}
</script>

<template>
	<view class="userLayout pageBg" v-if="userinfo">
		<view :style="{height:navBarHeight()+'px'}"></view>
		<view class="userInfo">
			<view class="avater">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">{{userinfo.IP}}</view>
			<view class="address">来自：{{userinfo.address.city || userinfo.address.province || userinfo.address.country}}
			</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator url="/pages/classList/classList?name=我的下载&type=download" class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">{{userinfo.downloadSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<navigator url="/pages/classList/classList?name=我的评分&type=score" class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{userinfo.scoreSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator url="/pages/classList/classList" class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="18" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<navigator url="/pages/classList/classList" class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="18" color="#aaa"></uni-icons>
					</view>
				</navigator>
			</view>
		</view>
	</view>
	<view class="loadingLayout"  v-else>
		<view :style="{height:navBarHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avater {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}
			
				
			.address{
				font-size: 26rpx;
				color: #666;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

			.list {
				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;
					height: 100rpx;
					border-bottom: 1px solid #eee;
					position: relative;
					background-color: #fff;

					&:last-child {
						border-bottom: 0;
					}

					.left {
						display: flex;
						align-items: center;

						.text {
							padding-left: 20rpx;
							font-size: 34rpx;
							color: #666;
						}

						:deep() {

							//css控制，穿透组件内部
							.uni-icons {
								color: $brand-theme-color !important;
							}
						}
					}

					.right {
						display: flex;
						align-items: center;

						.text {
							font-size: 28rpx;
							color: #aaa;
						}
					}

					button {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100rpx;
						opacity: 0;
					}
				}
			}
		}
	}
</style>