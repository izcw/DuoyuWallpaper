<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		apiGetClassList
	} from "@/api/apis.js"

	let queryParams = {
		pageNum: 1,
		pageSize: 12
	}
	onLoad((e) => {
		let {
			id = null,
				name = null
		} = e;
		queryParams.classid = id;

		uni.setNavigationBarTitle({ // 设置标题名
			title: name
		})

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
	const getClassList = async () => {
		let res = await apiGetClassList(queryParams)
		if (queryParams.pageSize > res.data.length) noData.value = true;
		classList.value = [...classList.value, ...res.data]; // 刷新值，老数据和新数据拼接
		
	}

	// 骨架屏
	let loading = ref(true)
	let animate = ref(true)
	let skeleton = ref([{
		type: 'custom',
		style: 'width:240rpx;height:400rpx;'
	}])
</script>

<template>
	<view class="classList">
		<view class="content">
			<uv-skeletons v-if="!classList.length  && !noData" v-for="item in 12" :loading="loading" :skeleton="skeleton" :animate="animate">
			</uv-skeletons>
			<navigator url="" v-for="item in classList" :key="item._id" class="item">
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