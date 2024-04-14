<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetDayRandom
	} from "@/api/apis.js"
	const randomList = ref([])
	const getDayRandom = async () => {
		let res = await apiGetDayRandom()
		randomList.value = res.data
	}
	getDayRandom()
</script>

<template>
	<view class="classList">
		<view class="content">
			<navigator :url="'/pages/preView/preView?id='+item._id" v-for="item in randomList" :key="item._id"
				class="item">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
			<view class="safe-area-inset-bottom"></view>
		</view>
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