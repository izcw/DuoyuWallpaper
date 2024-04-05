<template>
	<view class="themeItem">
		<navigator url="" class="box" v-if="!isMore">
			<image class="pic" src="../../common/images/preview2.jpg" mode="aspectFill"></image>
			<view class="mask">明细美女</view>
			<view class="tab">3天前更新</view>
		</navigator>
		<navigator url="" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<text class="text">更多</text>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	defineProps({
		isMore: {
			typeo: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped>
	.themeItem {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.mask {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 70rpx;
				background: rgb(0, 0, 0, 0.2);
				backdrop-filter: blur(10rpx);
				color: #fff;
				font-size: 30rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.tab {
				position: absolute;
				left: 0;
				top: 0;
				background: rgba(250, 129, 90, 0.7);
				backdrop-filter: blur(10rpx);
				color: #fff;
				font-size: 22rpx;
				transform: scale(0.8);
				transform-origin: left top; // 以左上脚为基准缩小
				padding: 6rpx 14rpx;
				border-radius: 0 0 20rpx 0;
			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				flex-direction: column;
			}

			.text {
				font-size: 28rpx;
			}
		}

	}
</style>