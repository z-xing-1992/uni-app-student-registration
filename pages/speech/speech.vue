<template>
	<view class="speech-contianer">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>家长寄语</text>
		</view>
		<view class="layout">
			<image src="../../static/img/layout.png" mode="widthFix"></image>
		</view>
		<view class="release">
			<view class="release-number">
				<text>发布数</text>
				<text>{{number}}</text>
			</view>
			<image :src="userInfo.avatar" mode=""></image>
			<view class="release-now" @click="wanRelease">
				<text>我要发布</text>
			</view>
		</view>
		<view class="watch">
			<image src="../../static/img/hongbao.png" mode=""></image>
			<view>
				<rich-text :nodes="title.title" @click='linkTo(title.link)'></rich-text>
			</view>
		</view>
		<view class="broadcast">
			<u-notice-bar mode="horizontal" :list="list" :is-circular="true" type='success'></u-notice-bar>
		</view>
		<view class="allmessagelist">
			<view class="list" v-for="(item,index) in videoList" :key="index">
				<view class="messagelist-title">{{item.time}}</view>
				<view class="line"></view>
				<view class="logo-message" v-for="(logoItem,index) in item.list" :key='index'>
					<view class="logo-message-left">
						<image :src="logoItem.avatar" mode=""></image>
						<text>{{logoItem.add_time}}</text>
					</view>
					<view class="logo-message-right">
						<text>{{logoItem.blood}}</text>
						<text>{{logoItem.msg}}</text>
					</view>
				</view>
			</view>
			<view class="bottom">
				<u-loadmore :status="status" style />
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				list: [],
				number: '', //发布的条数
				messagelist: {
					page: 1,
					limit: 10
				},
				status: 'loadmore',
				videoList: [], //加载的所有数据
				title: '',
				userInfo: '', //获取授权人头像
				decorates: {
					menu_name: 'speech_page_link'
				},
			};
		},
		onLoad() {
			let that = this
			this.release()
			this.remarksList()
			this.getinfo()
			that.$request({
				url: '/api/getPageDer',
				method: 'GET',
				data: that.decorates,
			}).then(res => {
				if (res.status == 200) {
					for (let i = 0; i < res.data.length; i++) {
						if ('speech_page_link' == res.data[i].menu_name) {
							that.title = res.data[i].value[0]
						}
					}
				}
			}).catch(erro => {

			})
			uni.getStorage({
				key: 'user',
				success: function(res) {
					console.log(res.data)
					that.userInfo = res.data
				}
			});
		},
		methods: {
			backInto() { //点击返回按钮返回上一页
				uni.navigateTo({
					url: '../studentsCenter/studentsCenter'
				})
			},
			wanRelease() { //点击进入我要发布页面
				uni.navigateTo({
					url: '../speech/wanRelease'
				})
			},
			release() { //信息发布条数
				let that = this
				that.$request({
					url: '/api/parentsSpeechCount',
					method: 'GET',
					data: '',
				}).then(res => {
					if (res.status == 200) {
						that.number = res.msg
					}
					console.log(res)

				}).catch(erro => {

				})
			},
			remarksList() { //寄语列表
				let that = this
				that.$request({
					url: '/api/getSpeechLst',
					method: 'GET',
					data: that.messagelist,
				}).then(res => {
					console.log(res)
					if (res.status == 200) {
						that.videoList = that.videoList.concat(res.data)
						console.log(that.videoList)
						if (res.data.length < that.messagelist.limit) {
							that.status = 'nomore'
						} else {
							that.status = 'loading'
						}
					}

				}).catch(erro => {

				})

			},
			linkTo(link) { //点击上面领取红包跳转
				location.href = link
			},
			getinfo() {
				let that = this
				that.$request({
					url: '/api/get_speech_page_info',
					method: 'GET',
					data: '',
				}).then(res => {
					if (res.status == 200) {
						that.list.push(res.msg)
					}
					console.log(res)
				}).catch(erro => {

				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: #f6f5f5;
	}

	.speech-contianer {
		width: 100%;
		height: 100%;
		background: url(../../static/img/allbackground.jpg) no-repeat;
		background-size: 100% 100%;
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

	.layout {
		width: 100%;
		height: 320upx;
	}

	.layout image {
		width: 100%;
	}

	.release {
		width: 100%;
		height: 110upx;
		background: #fff;
		position: relative;
	}

	.release-number {
		width: 280upx;
		height: 110upx;
		float: left;
	}

	.release-number text {
		display: block;
		text-align: center;
	}

	.release-number text:nth-of-type(1) {
		font-size: 26upx;
		color: #666;
		margin: 21upx 0 8upx 0;
	}

	.release-number text:nth-of-type(2) {
		font-size: 26upx;
		color: #337E27;
	}

	.release image {
		width: 146upx;
		height: 146upx;
		position: absolute;
		top: -73upx;
		left: 302upx;
	}

	.release-now {
		float: right;
		width: 280upx;
		height: 100%;
	}

	.release-now text {
		display: block;
		width: 151upx;
		height: 54upx;
		text-align: center;
		line-height: 54upx;
		font-size: 26upx;
		color: #fff;
		background: #2AD53A;
		border-radius: 8upx;
		margin: 28upx auto;
	}

	.watch {
		width: 100%;
		height: 107upx;
	}

	.watch image {
		display: block;
		width: 56upx;
		height: 88upx;
		float: left;
		margin: -10upx 19upx 0 133upx;
	}

	.watch view {
		display: inline-block;
		font-size: 26upx;
		color: #FD9664 !important;
		line-height: 107upx;
		text-decoration: underline
	}

	.broadcast {
		width: 100%;
		height: 72upx;
	}

	.allmessagelist {
		width: 100%;
		overflow: hidden;
		padding: 0 23upx;
		margin-top: 39upx;
		position: relative;
	}

	.messagelist-title {
		width: 100%;
		overflow: hidden;
		position: relative;
		left: 0;
		padding: 0;
		z-index: 88;
	}

	.list {
		width: 100%;
		overflow: hidden;
		position: relative;
		margin-bottom: 30upx;
	}

	.line {
		width: 2upx;
		height: 100%;
		background: #337E27;
		position: absolute;
		left: 40upx;
		top: 38;
	}

	.logo-message {
		width: 100%;
		overflow: hidden;
		margin-top: 25upx;
	}

	.logo-message-left {
		float: left;
		overflow: hidden;
	}

	.logo-message-left image {
		width: 84upx;
		height: 84upx;
		position: relative;
		z-index: 88;
	}

	.logo-message-left text {
		display: block;
		width: 100%;
		text-align: center;
		background: #FFFFFF;
		border-radius: 2upx;
		position: relative;
		z-index: 88;
	}

	.logo-message-right {
		float: left;
		width: 550upx;
		margin-left: 19upx;
	}

	.logo-message-right text {
		display: block;
	}

	.logo-message-right text:nth-of-type(1) {
		width: 100%;
		overflow: hidden;
		font-size: 24upx;
		color: #337E27;
		font-weight: bold;
	}

	.logo-message-right text:nth-of-type(2) {
		width: 100%;
		min-height: 98upx;
		font-size: 24upx;
		color: #666666;
		margin-top: 22upx;
		background: #FFFFFF;
		border-radius: 8upx;
		padding: 10upx;
		line-height: 38upx;
	}

	.bottom {
		width: 100%;
		overflow: hidden;
		margin: 50upx 0;
	}
</style>
