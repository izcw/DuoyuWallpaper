<script setup>
	import {
		getTimeAgoDescription
	} from "@/utils/common.js"
	defineProps({
		isMore: {
			typeo: Boolean,
			default: false
		},
		item: {
			type: Object,
			default () {
				return {
					name: "默认名称",
					picurl: "@/common/images/preview2.jpg",
					updateTime: Date.now() - 1000 * 60 * 60 * 5
				}
			}
		}
	})
</script>

<template>
	<view class="themeItem">
		<navigator :url="'/pages/classList/classList?id='+item._id+'&name='+item.name" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab" v-if="getTimeAgoDescription(item.updateTime)">
				{{getTimeAgoDescription(item.updateTime)}}天前更新</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image class="pic" src="/common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<text class="text">更多</text>
			</view>
		</navigator>
	</view>
</template>

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