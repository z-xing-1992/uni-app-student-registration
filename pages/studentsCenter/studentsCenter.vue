<template>
	<view class="studentsCenter-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>{{Name}}的学员中心</text>
		</view>
		<view class="studentsCenter-header">
			<view class="title">
				如信息有误，请联系招生老师
			</view>
			<view class="studentsMesage">
				<image :src="studentInformation.avatar" mode="" @click="choose"></image>
				<view class="name-class">
					<text>{{studentInformation.real_name}}</text>
					<text>{{studentInformation.title}}{{studentInformation.class_name}}</text>
				</view>
				<view class="tab" @click="tabchange">
					<text>切换学员</text>
				</view>
			</view>
		</view>
		<view class="zhanwei"></view>
		<view class="notice">
			<view class="notice-title">
				基地通知
			</view>
			<view class="notice-main">
				<scroll-view scroll-y="true" class="noticeScroll">
					<view class="notice-message">
						<rich-text :nodes="strings.title"></rich-text>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="type-list">
			<view>
				<navigator url="../video/video">
					<image src="../../static/img/live.png" mode=""></image>
					<text>视频照片</text>
				</navigator>
			</view>
			<view @click="chainLink">
				<image src="../../static/img/dingzhi.png" mode=""></image>
				<text>直播入口</text>
			</view>
			<view>
				<navigator url="../speech/speech">
					<image src="../../static/img/xinfeng.png" mode=""></image>
					<text>家长感言</text>
				</navigator>
			</view>
			<view>
				<navigator url="../notice/notice" hover-class="none">
					<image src="../../static/img/tongzhishux.png" mode=""></image>
					<text>入营通知书</text>
				</navigator>
			</view>
			<view>
				<navigator url="../financial/financial" hover-class="none">
					<image src="../../static/img/caiwujiaokuan.png" mode=""></image>
					<text>交款信息</text>
				</navigator>
			</view>
			<view @click="locationTo">
				<!-- <navigator url="../reportingGuidelines/reportingGuidelines">
					<image src="../../static/img/xuzhi.png" mode=""></image>
					<text>报到须知</text>
				</navigator> -->
				<image src="../../static/img/xuzhi.png" mode=""></image>
				<text>报到须知</text>
			</view>
		</view>
		<view class="not-sign">
			<rich-text :nodes="title.title" @click='linkTo(title.link)'></rich-text>
		</view>
		<view class="attention">
			<view class="teacherMsg" style="font-size: 26upx;color: #333333;text-align: center;width: 100%;overflow: hidden;">
				生活老师:{{classMessage.teacher}}（电话：{{classMessage.teacher_phone}}）
			</view>
			<view class="classmessage" style="margin-top: 20upx;font-size: 26upx;color: #333333;text-align: center;width: 100%;overflow: hidden;margin-bottom: 64upx;">
				{{classMessage.msg}}
			</view>
		</view>
		<view class="change-message" @click="changeMesage">
			修改入营信息
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				studentInformation: '', //学员信息
				Name: '',
				strings: '', //基地通知
				title: '', //未报名跳转
				chain: '', //外部链接
				classMessage: '', //班级信息
				decorates: {
					menu_name: 'base_to_inform,sign_link'
				},
			};
		},
		onLoad() {
			let that = this
			let studentsINFO = uni.getStorageSync('Form')
			if (!studentsINFO) {
				uni.showModal({
					title: '提示',
					content: '还没有绑定学员,去绑定',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../index/index'
							})
						}
					}
				});
			}
			// this.getstudentsInfo()//获取学员信息
			this.getDecorate() //获取页面装修数据
			this.getCustom() //获取私人订制链接
			this.getName()
		},
		onShow() {
			this.getName()
			this.getCustom() //获取私人订制链接
			this.getstudentsInfo() //获取学员信息
			this.getBootom()
		},
		methods: {
			getstudentsInfo() { //获取学员信息
				let studentsINFO = uni.getStorageSync('Form')
				if (!studentsINFO) return
				let that = this
				let ID = {}
				uni.getStorage({
					key: 'ID',
					success: function(res) {
						ID = res.data
					}
				});
				that.$request({
					url: '/api/getCapmersInfo',
					method: 'GET',
					data: ID
				}).then(res => {
					if (res.status == 200) {
						that.studentInformation = res.data
					}
				}).catch(erro => {})
			},
			getBootom() { //获取底部信息
				let studentsINFO = uni.getStorageSync('Form')
				if (!studentsINFO) return
				let that = this
				let ID = {}
				uni.getStorage({
					key: 'ID',
					success: function(res) {
						ID = res.data
					}
				});
				that.$request({
					url: '/api/getClassInfo',
					method: 'GET',
					data: ID
				}).then(res => {
					console.log(res.data)
					if (res.status == 200) {
						that.classMessage = res.data
					}
				}).catch(erro => {})
			},
			backInto() { //点击返回按钮返回上一页
				uni.navigateBack({
					delta: 1
				})
			},
			tabchange() { //点击进入切换学员页面
				uni.navigateTo({
					url: '../switchStudents/switchStudents'
				})
			},
			changeMesage() { //点击进入修改学员信息页面
				uni.navigateTo({
					url: '../studentInformation/studentInformation'
				})
			},
			choose() {
				let that = this;
				let token = uni.getStorageSync('user').token
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 1, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						console.log(res.tempFilePaths[0]); //成功则返回图片的本地文件路径列表 tempFilePaths
						uni.uploadFile({ //将本地资源上传到开发者服务器
							url: '/api/upload/image', //接口地址
							filePath: res.tempFilePaths[0], //图片地址
							header: {
								'Authori-zation': 'Bearer ' + token
							},
							name: 'file',
							formData: {
								id: '1212'
							},
							success: (uploadFileRes) => {
								let form = {
									campers_id: '',
									avatar: '',
								}
								uni.getStorage({
									key: 'ID',
									success: function(res) {
										form.campers_id = res.data.campers_id
									}
								});
								form.avatar = JSON.parse(uploadFileRes.data).data.url
								that.$request({
									url: '/api/updateAvatar',
									method: 'POST',
									data: form
								}).then(res => {
									if (res.status == 200) {
										this.getstudentsInfo()
									}
									console.log(res)
								}).catch(erro => {})
							}
						});
					}
				});

			},
			linkTo(link) {
				location.href = link
			},
			getCustom() { //获取私人订制
				let that = this
				that.$request({
					url: '/api/get_private_custom',
					method: 'GET',
					data: '',
				}).then(res => {
					console.log(res)
					if (res.status == 200) {
						that.chain = res.msg
					}
				}).catch(erro => {})
			},
			getDecorate() { //获取页面装修数据
				let that = this
				that.$request({
					url: '/api/getPageDer',
					method: 'GET',
					data: that.decorates,
				}).then(res => {
					if (res.status == 200) {
						for (let i = 0; i < res.data.length; i++) {
							if ('base_to_inform' == res.data[i].menu_name) {
								that.strings = res.data[i].value[0]
							}
							if ('sign_link' == res.data[i].menu_name) {
								that.title = res.data[i].value[0]
							}
						}
					}
				}).catch(erro => {

				})
			},
			chainLink() { //点击跳转外链
				location.href = this.chain
			},
			getName() {
				let that = this
				uni.getStorage({
					key: 'Name',
					success: function(res) {
						console.log(res)
						that.Name = res.data
					}
				});
			},
			locationTo() { //跳转到报道须知
				uni.navigateTo({
					url: '../reportingGuidelines/reportingGuidelines'
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.studentsCenter-container {
		width: 100%;
		height: 100%;
		background: url(../../static/img/allbackground.jpg) no-repeat;
		background-size: 100%;
		position: relative;
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




	.studentsCenter-header {
		width: 750upx;
		height: 488upx;
		position: relative;
		background: url(../../static/img/studentsCenterdingbu.png) no-repeat;
		background-size: 100%;
	}

	.title {
		width: 100%;
		height: 85upx;
		text-align: center;
		font-size: 24upx;
		color: #fff;
		line-height: 85upx;
	}

	.studentsMesage {
		width: 100%;
		overflow: hidden;
		position: absolute;
		top: 100upx;
		left: 0;
	}

	.studentsMesage image {
		width: 150upx;
		height: 150upx;
		margin-left: 71upx;
		display: block;
		float: left;
	}

	.name-class {
		float: left;
		overflow: hidden;
		margin: 0 0 0 25upx;
	}

	.name-class text {
		display: block;
	}

	.name-class text:nth-of-type(1) {
		font-size: 34upx;
		color: #337e27;
		font-weight: bold;
	}

	.name-class text:nth-of-type(2) {
		font-size: 24upx;
		color: #333;
		margin-top: 20upx;
	}

	.tab {
		display: block;
		position: absolute;
		left: 606upx;
		top: 45upx;
		font-size: 26upx;
		color: #333;
	}

	.zhanwei {
		width: 100%;
		height: 418upx;
	}

	.notice {
		width: 706upx;
		height: 518upx;
		background: #FFFFFF;
		box-shadow: 0upx 3upx 20upx 0upx rgba(0, 0, 0, 0.06);
		border-radius: 20upx;
		position: absolute;
		top: 481upx;
		left: 24upx;
	}

	.notice-title {
		width: 100%;
		height: 87upx;
		text-align: center;
		line-height: 87upx;
		color: #3c902e;
		font-size: 35upx;
		font-weight: bold;
	}

	.notice-main {
		width: 628upx;
		height: 398upx;
		margin: 0 auto;
		background: #F9F9F9;
	}

	.noticeScroll {
		width: 568upx;
		height: 334upx;
		padding: 28upx 0 0 45upx;
	}

	.notice-message {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
		font-size: 30upx;
		color: #333;
	}

	.type-list {
		width: 702upx;
		height: 413upx;
		margin: 20upx auto;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		background: #FFFFFF;
		box-shadow: 0upx 3upx 20upx 0upx rgba(0, 0, 0, 0.06);
		border-radius: 20upx;
	}

	.type-list view {
		width: 30%;
		overflow: hidden;
	}

	.type-list image {
		display: block;
		width: 100upx;
		height: 100upx;
		margin: 40upx auto 20upx;
	}

	.type-list text {
		display: block;
		text-align: center;
		font-size: 28upx;
		color: #333;
		font-weight: bold;
	}

	.not-sign {
		width: 100%;
		overflow: hidden;
		font-size: 28upx;
		color: #337e27;
		text-align: center;
		margin: 81upx 0 79upx 0;
	}

	.contact {
		width: 100%;
		overflow: hidden;
		font-size: 26upx;
		color: #333;
		text-align: center;
		margin-bottom: 20upx;
	}

	.attention {
		width: 100%;
		overflow: hidden;
		font-size: 26upx;
		color: #333;
		text-align: center;
		padding: 0 89upx;
		box-sizing: border-box;
		margin-bottom: 64upx;
	}

	.change-message {
		width: 100%;
		height: 76upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);
		line-height: 76upx;
		text-align: center;
		font-size: 30upx;
		color: #fff;
	}
</style>
