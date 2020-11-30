<template>
	<view class="login-container">
		<view class="header">
			<view class="header">
				<view class="imgChesk" @click="backInto">
					<image src="../../static/img/fanhui.png" mode="" ></image>
				</view>
				<text>学员中心</text>
			</view>
		</view>
		<view class="login-header">
			<image src="../../static/img/headerBackground.png" mode="widthFix"></image>
		</view>
		<view class="login-enter">
			<view class="enter">
				<view class="field">
					<text>姓名</text>
					<input type="text" value="" placeholder="请输入姓名" v-model="form.real_name" />
				</view>
				<view class="field">
					<text>编号</text>
					<input type="text" value="" placeholder="请输入编号" v-model="form.num" />
				</view>
				<view class="btn">
					<button type="primary" @click="binding">绑定学员</button>
				</view>
			</view>
		</view>
		<view class="not-sign">
			<rich-text :nodes="strings.title" @click='goTo(strings.link)'></rich-text>
		</view>
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 :indicator-active-color='activecolor'>
				<swiper-item v-for="(item,index) in banner.value" :key='index'>
					<image :src="item.title" mode="widthFix" @click="linkTo(item.link)"></image>
				</swiper-item>
			</swiper>
		</view>
		<u-popup v-model="show" mode="center" border-radius="14">
			<view style="width: 400upx;height: 200upx;text-align: center;font-size: 34upx;padding: 40upx;color: red;">
				{{content}}
			</view>
		</u-popup>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				indicatorDots: true, //是否显示分页器
				autoplay: true, //是否自动轮播
				interval: 2000, //自动切换时间
				duration: 500, //滑动时长
				activecolor: '#E49908',
				form: { //学员名字和编号
					real_name: '',
					num: '',
				},
				decorates: {
					menu_name: 'query_page_shuffling,sign_link'
				},
				ALLdecoratesMessage: '', //装修的所有信息
				banner: '', //轮播信息
				strings: '', //报名外部链接
				show:false,
				content: '',
			}
		},
		onLoad() {
			// 获取URL 上code
			let that = this															
			let KT=uni.getStorageSync('user')
			if(!KT){
				const code = that.getUrlParam('code')
				if (code == null || code == '') {
					// 重新获取code
					that.getCode()
				} else {
					// 发送code 							
					that.$request({
						url: '/api/wxLogin',
						method: 'POST',
						data: {
							code: code
						}
					}).then(res => {
						if (res.status == 200) {
							uni.setStorage({
								key: "user",
								data: res.data
							})
						}
					}).catch(erro => {
				
					})
				}
			}			
			this.decorate()
		},
		methods: {
			backInto() { //点击返回按钮返回上一页
				uni.navigateBack({
					delta: 1
				})
			},
			getUrlParam(name) { //解析URL参数
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if (r != null) {
					return unescape(r[2])
				}
				return null
			},
			getCode() {
				let appid = 'wx4bace1f9916738be'
				let REDIRECT_URI = encodeURIComponent('http://hpjy.xzg2016.com/h5/#/pages/index/index') //使用 urlEncode 对链接进行处理
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
					REDIRECT_URI + '&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect'
			},
			binding() { //绑定学员  缓存学员ID
				if (this.form.real_name.length <= 0) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					});

					setTimeout(function() {
						uni.hideToast();;
					}, 2000);
					return
				}
				if (this.form.num.length <= 0) {
					uni.showToast({
						title: '请填写编号',
						icon: 'none'
					});

					setTimeout(function() {
						uni.hideToast();;
					}, 2000);
					return
				}
				let that = this
				that.$request({
					url: '/api/bind',
					method: 'POST',
					data: that.form,
				}).then(res => {
					if (res.status == 200) {
						uni.setStorage({
							key: "ID",
							data: res.data
						})
						uni.setStorage({
							key: "Name",
							data: that.form.real_name
						})
						uni.setStorage({
							key: "Form",
							data:that.form
						})
						uni.navigateTo({
							url: '../studentsCenter/studentsCenter'
						})
					} 
					if(res.status == 400){
						that.show=true
						that.content='学员不存在或者帐号,编号填写有误'
					}
				}).catch(erro => {

				})
			},
			decorate() { //获取页面装修
				let that = this
				that.$request({
					url: '/api/getPageDer',
					method: 'GET',
					data: that.decorates,
				}).then(res => {
					if (res.status == 200) {
						for (let i = 0; i < res.data.length; i++) {
							if ('query_page_shuffling' == res.data[i].menu_name) {
								that.banner = res.data[i]
							}
							if ('sign_link' == res.data[i].menu_name) {
								that.strings = res.data[i].value[0]
							}
						}
					}
				}).catch(erro => {

				})
			},
			linkTo(item) { //点击轮播跳转外部链接
				location.href = item
			},
			goTo(link) { //点击报名跳转外部链接
				location.href = link
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		overflow: hidden;
	}

	.login-container {
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
	.imgChesk{width: 80upx;height: 80upx;position: absolute;top: 25upx;left: 0;}
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






	.login-header {
		width: 100%;
		height: 353upx;
	}

	.login-header image {
		width: 100%;
	}

	.login-enter {
		width: 100%;
		height: 330upx;
		position: relative;
	}

	.enter {
		width: 710upx;
		height: 359upx;
		position: absolute;
		top: -100upx;
		left: 24upx;
		background: #FFFFFF;
		box-shadow: 1upx 6upx 14upx 0upx rgba(81, 81, 81, 0.1);
		border-radius: 16upx;
	}

	.field {
		width: 100%;
		height: 98upx;
		padding: 0 30upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #f6f5f5;
	}

	.field text {
		display: inline-block;
		float: left;
		line-height: 98upx;
		font-size: 30upx;
		color: #333;
	}

	.field input {
		display: block;
		float: left;
		line-height: 38upx;
		font-size: 30upx;
		color: #808080;
		height: 38upx;
		margin-top: 30upx;
		text-indent: 2em;
	}

	.btn {
		width: 100%;
		overflow: hidden;
		margin-top: 40upx;
	}

	.btn button {
		width: 360upx;
		height: 76upx;
		font-size: 30upx;
		color: #fff;
		background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);
		box-shadow: 0upx 4upx 10upx 0upx rgba(51, 126, 39, 0.45);
		border-radius: 38upx;
		margin: 0 auto;
	}

	.not-sign {
		width: 100%;
		overflow: hidden;
		font-size: 28upx;
		color: #337E27;
		text-align: center;
	}

	.lunbo {
		width: 702upx;
		height: 310upx;
		margin: 69upx auto 69upx;
	}

	.lunbo swiper {
		width: 100%;
		height: 100%;
	}

	.lunbo image {
		width: 702upx;
		height: 310upx;
		display: block;
	}
</style>
