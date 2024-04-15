<script setup>
	import {
		ref
	} from 'vue';
	import {
		getStatusBarHeight,
		getTitleBarHeight
	} from "@/utils/system.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		onShareAppMessage,
		onShareTimeline
	} from "@dcloudio/uni-app"
	import {
		apiGetSetupScore,
		apiWriteDownload,
		apiDetaiWall
	} from "@/api/apis.js"

	const currentId = ref(null)
	const currentIndex = ref(0);
	const classList = ref([]);

	// 存看过的图，减少网络请求消耗
	const readImags = ref([])
	const currentInfo = ref(null); // 信息
	const isScore = ref(false) //判断有没有评分

	// 获取缓存中的数据
	const strogClassList = uni.getStorageSync("strogClassList") || [];
	// 将小图换成大图
	classList.value = strogClassList.map(item => {
		return {
			...item,
			picurl: item.smallPicurl.replace("_small.webp", ".jpg")
		}
	})

	// 遮罩状态
	const maskState = ref(true)
	const maskChange = () => {
		maskState.value = !maskState.value
	}

	// info弹窗
	const infoPopup = ref(null)
	const clickInfo = () => {
		infoPopup.value.open()
	}
	const clickInfoClose = () => {
		infoPopup.value.close()
	}

	// 评分弹窗
	const scorePopup = ref(null)
	const userScore = ref(0)
	const clickScore = () => {
		if (currentInfo.value.userScore) {
			isScore.value = true;
			userScore.value = currentInfo.value.userScore;
		}
		scorePopup.value.open()
	}
	const clickScoreClose = () => {
		scorePopup.value.close()
		userScore.value = 0;
		isScore.value = false;
	}

	// 确认评分
	const submiScore = async () => {
		uni.showLoading({
			title: "加载中..."
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value;
		let res = await apiGetSetupScore({
			classid,
			wallId,
			userScore: userScore.value
		})
		uni.hideLoading()
		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none"
			})
			classList.value[currentIndex.value].userScore = userScore.value;
			uni.setStorageSync("strogClassList", classList.value)
			clickScoreClose()
		}
	}

	// #ifdef MP-WEIXIN
	let {
		height
	} = uni.getMenuButtonBoundingClientRect(); //获取右上角胶囊按钮
	// #endif
	// #ifndef MP-WEIXIN
	let height = "20"
	// #endif



	// 返回上一页
	const goBack = () => {
		uni.navigateBack({
			success: () => {

			},
			fail(err) {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		})
	}

	onLoad(async (e) => {
		// 获取url id，知道点击的图片
		currentId.value = e.id
		if (e.type == 'share') {
			let res = await apiDetaiWall({
				id: currentId.value
			})
			classList.value = res.data.map(item => {
				return {
					...item,
					picurl: item.smallPicurl.replace("_small.webp", ".jpg")
				}
			})
		}
		currentIndex.value = classList.value.findIndex(item => {
			return item._id == currentId.value
		})
		currentInfo.value = classList.value[currentIndex.value]
		readImages()
	})

	// 改变swiper的index
	const swiperChange = (e) => {
		console.log(e, "hjghjghjghjgj");
		currentIndex.value = e.detail.current;
		currentInfo.value = classList.value[currentIndex.value]
		readImages()
	}

	// 加载三张图，当前，前面，后面的图，提升用户体验
	const readImages = () => {
		readImags.value.push(
			currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
		)
		readImags.value = [...new Set(readImags.value)]
	}

	// 下载图片
	const clickDownload = async () => {
		// #ifdef H5
		uni.showModal({
			content: "请长按保存壁纸",
			showCancel: false
		})
		// #endif
		// #ifndef H5
		try {

			uni.showLoading({
				title: "下载中...",
				mask: true
			})

			let {
				classid,
				_id: wallId
			} = currentInfo.value;
			let res = await apiWriteDownload({
				classid,
				wallId
			})
			if (res.errCode != 0) throw res;
			// 小程序下获取网络图片信息需先配置download域名白名单才能生效。
			// 开发者管理>服务器域名

			// 如果没有出现允许下载本地弹窗需要设置：设置>服务内容声明>用户隐私保护指引,更新
			uni.getImageInfo({
				src: currentInfo.value.picurl,
				success(res) {

					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success(rest) {
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: "none"
							})
						},
						fail: err => {
							if (err.errMsg == 'uni.saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: "保存失败，请重新点击下载",
									icon: "none"
								})
								return;
							}

							uni.showModal({
								title: "授权提示",
								content: "需要授权保存相册",
								success: resh => {
									if (resh.confirm) {
										uni.openSetting({
											success: (setting) => {
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: "获取授权成功",
														icon: "none"
													})
												} else {
													uni.showToast({
														title: "获取授权失败！",
														icon: "none"
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})

				}
			})

		} catch (err) {
			console.log(err);
			uni.hideLoading()
		}


		// #endif
	}

	// 用户点击右上角分享
	onShareAppMessage((e) => {
		return {
			title: "多鱼壁纸",
			path: "/pages/preView/preView?id=" + currentId.value + "&type=share"
		}
	})

	// 朋友圈
	onShareTimeline((e) => {
		return {
			title: "多鱼壁纸",
			query: "id=" + currentId.value + "&type=share"
			// imageUrl:"https://picserver.duoyu.link/picfile/image/202403/31-1711876576139.webp"
		}
	})
</script>

<template>
	<view class="preView" v-if="currentInfo">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<!-- v-if="index == currentIndex" 如果 index == currentIndex就渲染，节省带宽消耗-->
				<!-- 改进，将看过的图片存进数组中，readImags -->
				<image v-if="readImags.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill">
				</image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskState">
			<!-- #ifdef MP-WEIXIN -->
			<view class="goBack" @click="goBack"
				:style="{top:getStatusBarHeight()+'px',width:height+'px',height:height+'px'}">
				<uni-icons type="back" color="#ccc" size="20"></uni-icons>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="goBack" @click="goBack" style="top: 10px ;left: 10px; width:28px ;height: 28px;">
				<uni-icons type="back" color="#ccc" size="20"></uni-icons>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP -->
			<view class="goBack" @click="goBack" style="top: 50px ;left: 20px; width:28px ;height: 28px;">
				<uni-icons type="back" color="#ccc" size="20"></uni-icons>
			</view>
			<!-- #endif -->

			<view class="count">
				{{currentIndex+1}} / {{classList.length}}
			</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="20"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="20"></uni-icons>
					<view class="text">{{currentInfo.score}}分</view>
				</view>
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="20"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID： </view>
							<text selectable class="value">{{currentInfo._id}}</text>
						</view>
						<view class="row">
							<view class="label">发布者： </view>
							<text selectable class="value class">
								{{currentInfo.nickname}}
							</text>
						</view>
						<view class="row">
							<view class="label">评分： </view>
							<view selectable class="value roteBox">
								<uni-rate v-model="value" :value="currentInfo.score" size="16" readonly touchable />
								<text class="score">{{currentInfo.score}}分</text>
							</view>
						</view>
						<view class="row">
							<view class="label">摘要： </view>
							<text selectable class="value">
								{{currentInfo.description}}
							</text>
						</view>
						<view class="row">
							<view class="label">标签： </view>
							<view selectable class="value tabs">
								<view class="tab" v-for="(item,index) in currentInfo.tabs" :key="index">标签名{{item}}
								</view>
							</view>
						</view>
						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱2405824084@qq.com，管理员将删除侵权壁纸，维护您的权益。
						</view>
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorePopup" type="center" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{isScore?'评分过了～':'壁纸评分'}}</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#FFCA3E" />
					<text class="text">{{userScore}}分</text>
				</view>
				<view class="footer" v-show="!isScore">
					<button @click="submiScore" :disabled="!userScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<style lang="scss" scoped>
	.preView {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content; //根据内容给宽
			}

			.goBack {
				background: rgba(255, 255, 255, 0.4);
				left: 20rpx;
				margin: 4px 0;
				border-radius: 50%;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				backdrop-filter: blur(10rpx);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				backdrop-filter: blur(20rpx);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 12rpx;

					:deep() {

						//css控制，穿透组件内部
						.uni-icons {
							color: $text-font-color-2 !important;
						}
					}

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}

		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				color: $text-font-color-2;
				font-size: 26rpx;
			}

			.close {
				padding: 6rpx;

				:deep() {

					//css控制，穿透组件内部
					.uni-icons {
						color: $grey-color-digit9 !important;
					}
				}
			}
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;



			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1;
							width: 0;
						}

						.roteBox {
							display: flex;
							align-items: center;

							.score {
								font-size: 26rpx;
								color: $text-font-color-2;
								padding-left: 10rpx;
							}
						}

						.tabs {
							display: flex;
							flex-wrap: wrap;

							.tab {
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin: 0 10rpx 10rpx 0;
							}
						}

						.class {
							color: $brand-theme-color;
						}
					}

					.copyright {
						font-size: 28rpx;
						padding: 20rpx;
						background: #F6F6F6;
						color: $grey-color-digit6;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}
		}

		.scorePopup {
			background: #fff;
			padding: 30rpx;
			width: 80vw;
			border-radius: 30rpx;

			.content {
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					color: #FFCA3E;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
					white-space: nowrap;
				}
			}

			.footer {
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>