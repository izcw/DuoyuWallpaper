<script setup>
	import {
		ref
	} from 'vue';
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
		scorePopup.value.open()
	}
	const clickScoreClose = () => {
		scorePopup.value.close()
	}
	
	const submiScore = ()=>{
		console.log("确认评分");
		scorePopup.value.close()
	}
</script>

<template>
	<view class="preView">
		<swiper circular>
			<swiper-item v-for="item in 5">
				<image @click="maskChange" src="../../common/images/classify1.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskState">
			<view class="goBack"></view>
			<view class="count">
				3 / 9
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
					<view class="text">5分</view>
				</view>
				<view class="box">
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
							<text selectable class="value">6374thff</text>
						</view>
						<view class="row">
							<view class="label">分类： </view>
							<text selectable class="value class">
								明星美女
							</text>
						</view>
						<view class="row">
							<view class="label">评分： </view>
							<view selectable class="value roteBox">
								<uni-rate v-model="value" value="3" size="16" readonly touchable />
								<text class="score">5分</text>
							</view>
						</view>
						<view class="row">
							<view class="label">摘要： </view>
							<text selectable class="value">
								摘要文字，摘要的说法蛋糕文字，摘要分的说法个文字，摘梵蒂冈要文字，摘要文字，摘要文字，摘要文字，的说法季后赛得分的说法还是大进口国
							</text>
						</view>
						<view class="row">
							<view class="label">标签： </view>
							<view selectable class="value tabs">
								<view class="tab" v-for="item in 9">标签名{{item}}</view>
							</view>
						</view>
						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱2405824084@qq.com，管理员将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorePopup" type="center" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" allowHalf />
					<text class="text">{{userScore}}分</text>
				</view>
				<view class="footer">
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

			.goBack {}

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
					white-space:nowrap;
				}
			}
			.footer{
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>