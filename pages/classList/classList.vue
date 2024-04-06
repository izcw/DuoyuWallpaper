<script setup>
	
</script>

<template>
	<view class="classList">
		<view class="content">
			<navigator url="" v-for="item in 9" class="item">
					<image src="../../common/images/preview1.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
		
	</view>
</template>

<style lang="scss" scoped>
.classList{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 400rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
