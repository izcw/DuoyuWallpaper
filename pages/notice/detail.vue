<script setup>
	
</script>

<template>
	<view class="noticeLayout">
		<view class="title">
			<uni-tag class="tag" inverted text="置顶" type="error" size="small"></uni-tag>
			<view class="font">这个区域天蝎标题</view>
		</view>
		
		<view class="info">
			<view class="item">多鱼壁纸</view>
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>
		
		<view class="content">
			内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域内容区域
		</view>
		
		<view class="count">
			阅读 568
		</view>
		
	</view>
</template>

<style lang="scss" scoped>
.noticeLayout{
	padding: 30rpx;
	.title{
		font-size: 40rpx;
		color: #111;
		line-height: 1.6em;
		padding-bottom: 30rpx;
		display: flex;
		align-items: center;
		.tag{
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font{
			padding-left: 6rpx;
		}
	}
	.info{
		display: flex;
		align-items: center;
		color: #999;
		font-size: 28rpx;
		.item{
			padding-right: 20rpx;
		}
	}
	.content{
		padding: 50rpx 0;
	}
	.count{
		color: #999;
		font-size: 28rpx;
	}
}
</style>
