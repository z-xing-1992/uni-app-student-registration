<template>
	<view class="financial-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>{{Name}}的军事营财务信息</text>
		</view>
		<view class="seccion">
			<view>
				<text>学员姓名：</text>
				<text>{{information.real_name}}</text>
			</view>
			<view>
				<text>学籍号：</text>
				<text>{{information.num}}</text>
			</view>
			<view>
				<text>参报营期：</text>
				<text>{{information.camp_name}}
					{{information.which_period}}：{{information.begin_time}}-{{information.end_time}}
				</text>
			</view>
			<view>
				<text>所在班级：</text>
				<text>{{information.title}}{{information.class_name}}班</text>
			</view>
			<view>
				<text>报道信息：</text>
				<text>{{information.reported_info}}</text>
			</view>
			<view>
				<text>交款信息：</text>
				<text>{{paymoney}}</text>
			</view>
		</view>
		<view class="receipt">
			<image :src="information.image" mode="widthFix" @tap="_previewImage(information.image)"></image>
		</view>
		<view class="Information-right-erro">
			如信息有误，请联系招生老师
		</view>
		<view class="instructions" @click="reportingGuidelines">
			报道须知
		</view>
		<view class="backHome" @click="backstudentCenter">
			返回首页
		</view>
		<view class="notsign">
			<rich-text :nodes="title.title" @click='linkTo(title.link)'></rich-text>
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				information: '',
				Name: '',
				title: '',
				paymoney: '',
				decorates: {
					menu_name: 'sign_link'
				},
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
			this.getReceiptInfo()
			that.$request({
				url: '/api/getPageDer',
				method: 'GET',
				data: that.decorates,
			}).then(res => {
				if (res.status == 200) {
					for (let i = 0; i < res.data.length; i++) {
						if ('sign_link' == res.data[i].menu_name) {
							that.title = res.data[i].value[0]
						}
					}
				}
			}).catch(erro => {

			})
		},
		methods: {
			backInto() {
				uni.navigateBack({
					delta: 1
				})
			},
			backstudentCenter() { //点击返回首页 进入学员中心页面
				uni.navigateTo({
					url: '../studentsCenter/studentsCenter'
				})
			},
			reportingGuidelines() {
				uni.navigateTo({
					url: '../reportingGuidelines/reportingGuidelines'
				})
			},
			getReceiptInfo() { //获取财务信息
				let that = this
				let ID = {}
				uni.getStorage({
					key: 'ID',
					success: function(res) {
						ID = res.data
					}
				});
				that.$request({
					url: '/api/getReceiptInfo',
					method: 'GET',
					data: ID,
				}).then(res => {
					console.log(res)
					if (res.status == 200) {
						that.information = res.data
						let count = Number(res.data.tuition) - Number(res.data.deposit)
						if (count > 0) {
							that.paymoney = '已交定金'
						} else {
							that.paymoney = '已交全款'
						}

					}
				}).catch(erro => {

				})
			},
			linkTo(link) {
				location.href = link
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

	.financial-container {
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

	.seccion {
		width: 100%;
		overflow: hidden;
		margin: 40upx auto 0;
	}

	.seccion view {
		width: 100%;
		overflow: hidden;
		margin-bottom: 40upx;
		padding: 0 24upx;
	}

	.seccion view:nth-of-type(1) {
		background: #f0f0f0;
		height: 80upx;
		margin-bottom: 0;
		padding: 0;
		line-height: 80upx;
	}

	.seccion view:nth-of-type(1) text:nth-of-type(1),
	.seccion view:nth-of-type(2) text:nth-of-type(1) {
		margin-left: 24upx;
	}

	.seccion view:nth-of-type(2) {
		background: #f0f0f0;
		height: 80upx;
		padding: 0;
		line-height: 80upx;
	}

	.seccion view text {
		display: inline-block;
	}

	.seccion view text:nth-of-type(1) {
		font-size: 30upx;
		color: #333;
		font-weight: bold;
		min-width: 160upx;
		float: left;
	}

	.seccion view text:nth-of-type(2) {
		color: #337E27;
		font-size: 30upx;
		font-weight: bold;
		margin-left: 30upx;
	}

	.receipt {
		width: 702upx;
		height: 337upx;
		margin: 0 auto;
		position: relative;
	}

	.receipt image {
		width: 100%;
	}

	.Information-right-erro {
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 24upx;
		color: #333;
		margin: 33upx 0 61upx 0;
	}

	.instructions {
		width: 702upx;
		height: 76upx;
		text-align: center;
		line-height: 76upx;
		background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);
		border-radius: 8upx;
		font-size: 30upx;
		color: #fff;
		margin: 0 auto 60upx;
	}

	.backHome {
		width: 702upx;
		height: 76upx;
		text-align: center;
		line-height: 76upx;
		border: 2upx solid #337E27;
		border-radius: 8upx;
		font-size: 30upx;
		color: #337E27;
		margin: 0 auto 113upx;
	}

	.notsign {
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 28upx;
		color: #337E27;
		margin-bottom: 112upx;
	}

	.shouju-message {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.shouju-message text {
		display: inline-block;
	}
</style>
