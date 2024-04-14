<script setup>
	import {
		ref
	} from "vue";
	import {
		apiWallNewsDetail
	} from "@/api/apis.js"

	import {
		onLoad
	} from "@dcloudio/uni-app"

	let DetailID;
	const datail = ref({});

	onLoad(async (e) => {
		DetailID = e.id
		getNoticeDetail()
	})

	const getNoticeDetail = () => {
		apiWallNewsDetail({
			id: DetailID
		}).then(res => {
			datail.value = res.data
		})
	}
</script>

<template>
	<view class="noticeLayout">
		<view class="title">
			<uni-tag v-if="datail.select" class="tag" inverted text="置顶" type="error" size="small"></uni-tag>
			<view class="font">{{datail.title}}</view>
		</view>

		<view class="info">
			<view class="item">{{datail.author}}</view>
			<view class="item">
				<uni-dateformat :date="datail.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			<mp-html :content="datail.content" />
		</view>

		<view class="count">
			阅读 {{datail.view_count}}
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>

</template>

<style lang="scss" scoped>
	.noticeLayout {
		padding: 30rpx;

		.title {
			font-size: 40rpx;
			color: #111;
			line-height: 1.6em;
			padding-bottom: 30rpx;
			display: flex;
			align-items: center;

			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}

			.font {
				padding-left: 6rpx;
			}
		}

		.info {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 28rpx;

			.item {
				padding-right: 20rpx;
			}
		}

		.content {
			padding: 50rpx 0;
		}

		.count {
			color: #999;
			font-size: 28rpx;
		}
	}
</style>