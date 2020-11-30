<template>
	<view class="wanRelease-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>我要发布</text>
		</view>
		<view class="layout">
			<image src="../../static/img/layout.png" mode="widthFix"></image>
		</view>
		<view class="mian">
			<view class="identity">
				<view class="idcard">
					<text>你的身份：</text>
					<input type="text" value="" placeholder="请输入你的身份（如：某某妈妈）" v-model="form.blood" />
				</view>
				<view class="leitong">
					<text>寄语类容：</text>
					<textarea value="" placeholder=" 请输入寄语内容（例：孩子，这些话再心里藏很久了，我很想对你说）" v-model="form.msg" />
					</view>
				<view class="prompt">
					寄语提交经审核后，方可显示。
				</view>
				<view class="submite" @click="successSub">
					提交寄语
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default{
		data(){
			return{
				form:{
					blood:'',//与孩子关系
					msg:'',//发布的类容
				}
			}
		},
		methods:{
			backInto(){ //点击返回按钮返回上一页
				uni.navigateBack({
					delta:1
				})
			},
			successSub(){ //点击提交	
			if(this.form.blood.length<=0){
				uni.showToast({
				    title: '请填写你的身份',
					icon:'none'
				});
				
				setTimeout(function() {
				   uni.hideToast();;
				}, 3000);
				return
			}
			if(this.form.msg.length<=0){
				uni.showToast({
				    title: '请填写寄语类容',
					icon:'none'
				});
				
				setTimeout(function() {
				   uni.hideToast();;
				}, 3000);
				return
			}		
				let that=this
				uni.getStorage({
					    key: 'ID',
					    success: function (res) {
							that.form.campers_id=res.data.campers_id
					    }
				});
				console.log(that.form)				
				that.$request({
					url:'/api/releaseSpeech',
					method: 'GET',
				    data:that.form,
				}).then(res => {
					console.log(res)
					if(res.status==200){
						uni.showModal({
						    title: '提示',
						    content: '寄语已提交',
							showCancel:false,
						    success: function (res) {
						        if (res.confirm) {
						           uni.navigateTo({
						           	url:'../speech/speech'
						           })
						        } 
						    }
						});
					}					
				}).catch(erro=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
	page{width: 100%;height: 100%;background: #f6f5f5;}
	.wanRelease-container{width: 100%;height: 100%;
	background: url(../../static/img/allbackground.jpg) no-repeat;
	background-size: 100% 100%;
	}
	.header{width: 100%;height: 128upx;
	background: url(../../static/img/allheaderPicture.jpg) no-repeat;
	background-size: 100%;line-height: 128upx;text-align: center;font-size: 34upx;color: #fff;position: relative;}
	.imgChesk{width: 80upx;height: 80upx;position: absolute;top: 20upx;left: 0;}
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
	.layout{width: 100%;height: 320upx;}
	.layout image{width: 100%;}
	.mian{width: 100%;overflow: hidden;background: #fff;margin-top: 22upx;}
	.idcard{width: 100%;height: 80upx;line-height: 80upx;padding: 0 35upx;border-bottom: 2upx solid #f6f5f5;}
	.idcard text{display: block;font-size: 28upx;float: left;}
	.idcard input{width: 500upx;display: block;height: 100%;float: left;font-size: 28upx;}
	.leitong{width: 100%;overflow: hidden;}
	.leitong text{display: block;width: 100%;height: 76upx;line-height: 76upx;padding: 0 35upx;}
	.leitong textarea{width: 702upx;height: 204upx;margin: 0 auto;background: #F9F9F9;border-radius: 10upx;font-size: 28upx;padding: 26upx 21upx 0 30upx;box-sizing: border-box;}
	.prompt{width: 100%;overflow: hidden;font-size: 24upx;color: #666;margin: 30upx 0;text-align: center;}
	.submite{width: 702upx;height: 76upx;line-height: 76upx;text-align: center;font-size: 30upx;color: #fff;
background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);border-radius: 8upx;margin: 0 auto 30upx;}
</style>
