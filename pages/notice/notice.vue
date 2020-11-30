<template>
	<view class="notice-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>{{Name}}的黄埔军事营入营通知书</text>
		</view>
		<view class="main">
			<view class="notice">
				<image :src="information.image" mode="widthFix" class="notice-back" @tap="_previewImage(information.image)"></image>
			</view>
			<view class="bottom" @click="backIndex">
				<button type="primary" class="btn">继续绑定</button>
			</view>
			<view class="prompt">
				长按可保存入营通知书，可以将通知书转发给好友和群
			</view>
			<view class="contactOffice">
				如营期有变动，请联系招生主任更改
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				information: "",
				Name: ''
			};
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: 'Name',
				success: function(res) {
					that.Name = res.data
				}
			});
			this.getNoticeInfo()
		},
		methods: {
			backInto() {
				uni.navigateBack({
					delta: 1
				})
			},
			backIndex() { //点击返回首页
				uni.navigateTo({
					url: '../index/index'
				})
			},
			getNoticeInfo() { //获取入营通知
				let that = this
				let ID = {}
				uni.getStorage({
					key: 'ID',
					success: function(res) {
						ID = res.data
					}
				});
				that.$request({
					url: '/api/getNoticeInfo',
					method: 'GET',
					data: ID,
				}).then(res => {
					console.log(res)
					if (res.status == 200) {
						that.information = res.data
					}
				}).catch(erro => {

				})
			},
			_previewImage(image) {
				var imgArr = [];
				imgArr.push(image)
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.notice-container {
		width: 100%;
		height: 100%;
		background: url(../../static/img/allbackground.jpg) no-repeat;
		background-size: 100%;
	}

	.header {
		width: 100%;
		height: 128upx;
		background: url(../../static/img/allheaderPicture.jpg) no-repeat;
		background-size: 100%;
		line-height: 128upx;
		text-align: center;
		font-size: 34upx;
		color: #fff;
		position: relative;
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

	.main {
		width: 100%;
		height: calc(100vh - 128upx);
		background-image: url(../../static/img/tongzhishubeijing.png);
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.notice {
		width: 100%;
		height: 539upx;
		margin-top: 43upx;
		position: relative;
	}

	.notice-back {
		width: 100%;
	}

	.code-erw {
		width: 80upx;
		overflow: hidden;
		position: absolute;
		left: 60upx;
		bottom: 50upx;
	}

	.erw {
		width: 80upx;
		height: 80upx;
	}

	.notice-detail {
		width: 100%;
		height: 539upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.notice-detail-title text {
		display: inline-block;
	}

	.notice-detail-title text:nth-of-type(1) {
		font-size: 34upx;
		color: #010101;
		font-weight: bold;
		margin-right: 11upx;
		min-width: 100upx;
		border-bottom: 4upx solid #426D6C;
	}

	.bottom {
		width: 100%;
		overflow: hidden;
		margin-top: 37upx;
	}

	.btn {
		width: 702upx;
		height: 76upx;
		text-align: center;
		line-height: 76upx;
		background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);
		border-radius: 8upx;
		font-size: 30upx;
		color: #fff;
		margin: 0 auto;
	}

	.prompt {
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 28upx;
		color: #FD9664;
		margin-top: 50upx;
	}

	.contactOffice {
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 24upx;
		color: #333;
		margin-top: 68upx;
	}
</style>
