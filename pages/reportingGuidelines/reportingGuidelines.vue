<template>
	<view class="reportingGuidelines-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>报到须知</text>
		</view>
		<view class="mian">
			<rich-text :nodes="mian.title"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mian: '',
				decorates: {
					menu_name: 'reporting_guidelines'
				},
			};
		},
		onLoad() {
			let that = this
			that.$request({
				url: '/api/getPageDer',
				method: 'GET',
				data: that.decorates,
			}).then(res => {
				if (res.status == 200) {
					for (let i = 0; i < res.data.length; i++) {
						if ('reporting_guidelines' == res.data[i].menu_name) {
							that.mian = res.data[i].value[0]
						}
					}
				}
			}).catch(erro => {

			})
		},
		methods: {
			backInto() { //点击返回按钮返回上一页
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.reportingGuidelines-container {
		width: 100%;
		overflow: hidden;
		background: url(../../static/img/backTU.jpg) no-repeat;
		background-size: 100% 100%;
	}

	.header {
		width: 100%;
		height: 128upx;
		line-height: 128upx;
		text-align: center;
		font-size: 34upx;
		color: #fff;
		position: relative;
		background: url(../../static/img/allheaderPicture.jpg) no-repeat;
		background-size: 100%;
	}

	.imgChesk {
		width: 80upx;
		height: 80upx;
		position: absolute;
		top: 20upx;
		left: 0;
	}

	.imgChesk image {
		width: 12upx;
		height: 23upx;
		display: block;
		position: absolute;
		top: 0upx;
		left: 0upx;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 99;
	}

	.mian {
		width: 710upx;
		margin: 0 auto;
	}
</style>
