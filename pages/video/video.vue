<template>
	<view class="video-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode="" ></image>
			</view>
			<text v-if="tableActive==0">{{classType.title}}{{classType.class_name}}相册</text>
			<text v-if="tableActive==1">{{classType.title}}视频</text>
		</view>
		<view class="video-phonto-table">
			<text :class="tableActive==0?'active':''" @click="tabselect(0)">相册</text>
			<text :class="tableActive==1?'active':''" @click="tabselect(1)">视频</text>
		</view>
		<view v-if="tableActive==1">
			<scroll-view class="session" scroll-x="true">
				<view class="list" v-for="(item,index) in child" :key='index' @click="check(index,item.id)">
					<text class="status" :class="activeIndex==index?'actove':'noneStyle'">{{item.class_name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="phonto" v-if="tableActive==0">
			<view style="width: 519upx;overflow: hidden;margin: 50upx auto 0;" v-if='phontoShow'>
				<image src="../../static/img/noPicture.png" mode="" style="width: 519upx;height: 410upx;"></image>
				<text style="width: 100%;text-align: center;display: block;">抱歉,暂时还没有图片</text>
			</view>
			<image :src="item.url" mode="" v-for="(item,index) in videoList" :key='index'
			@tap="_previewImage(item.url)" class="pictureItem"></image>
		</view>
		<view class="video" v-if="tableActive==1" style="margin-bottom: 20upx;">
			<view style="width: 519upx;overflow: hidden;margin: 50upx auto 0;" v-if='videoShow'>
				<image src="../../static/img/noVideo.png" mode="" style="width: 519upx;height: 410upx;"></image>
				<text style="width: 100%;text-align: center;display: block;">抱歉,暂时还没有视频</text>
			</view>
			<view v-for="(item,index) in videoList" :key='index' >
				<video :src="item.url" :enable-progress-gesture="false"  :poster='item.cover_photo' controls
				style="width: 341upx;height: 188upx;"></video>
				<text>{{item.title}}</text>
			</view>	
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				tableActive:0,//切换相册和视频作用
				activeIndex:0,//点击切换班级作用
				videoList:[],
				status: 'loadmore',
				form:{
					page:1, //页数
					limit:14,//加载条数
					type:2,//1：视频，2：图片
					class_id:'',//筛选，班级id
					class_cate_id:'',//筛选班级分类id
				},
				classType:'',
				child:{},
				isTrue:false, //正在加载中
				isTTrue:false, //到底了
				phontoShow:false,//判断没有图片的图片提示
				videoShow:false,//判断有没有视频图片的提示
			};
		},
		onLoad() {
			this.getClasstype()
		},
		methods:{
			backInto(){
				uni.navigateBack({
					delta:1
				})
			},
			getClasstype(){ //获取班级
				let that=this
				let ID = {}
				uni.getStorage({
					key: 'ID',
					success: function(res) {
						ID = res.data
					}
				});
				that.$request({  
					url:'/api/getClassCatge',
					method: 'GET',
				    data:ID,
				}).then(res => {
					console.log(res)
					if(res.status==200){
						that.classType=res.data[0]
						that.child=that.classType.child
						that.child.unshift(
							{
								class_name:'全部',
								id:''
							}
						)
						this.getClassCatge()
					}		
				}).catch(erro=>{
					
				})		
			},
			getClassCatge(){ //获取视频或者图片列表
				let that=this				
				if(that.isTrue)return;
				if(that.isTTrue)return ;
				that.isTrue=true;
				that.form.class_cate_id=that.classType.id			
				that.$request({  
					url:'/api/getMedisList',
					method: 'GET',
				    data:that.form,
				}).then(res => {
					console.log(res)
					if(res.data.length<=0){
						that.phontoShow=true
						that.videoShow=true
					}else{
						that.phontoShow=false
						that.videoShow=false
					}
					
					that.isTrue=false;
					if(res.status==200){
							that.form.page++; //每触底一次 page +1
							that.videoList=that.videoList.concat(res.data) //将数据拼接在一起							
						    that.isTTrue =  res.data.length < that.form.limit;
						}
										
				}).catch(erro=>{
					
				})		
			},
			tabselect(index){ //相册视频切换
				let that=this
				this.tableActive=index
				that.isTrue=false //正在加载中
				that.isTTrue=false//到底了
				if(index==0){
					this.form={
						page:1, //页数
						limit:14,//加载条数
						type:2,//1：视频，2：图片
						class_id:'',//筛选，班级id
						class_cate_id:that.classType.id,//筛选班级分类id
					}
					this.videoList=[]
					this.getClassCatge()
				}
				if(index==1){
					this.form={
						page:1, //页数
						limit:14,//加载条数
						type:1,//1：视频，2：图片
						class_id:'',//筛选，班级id
						class_cate_id:that.classType.id,//筛选班级分类id
					}
					this.videoList=[]
					this.getClassCatge()
				}
				
			},
			check(index,id){ //点击选择班级
				let that=this
				that.activeIndex=index
				if(index==0){
					that.isTrue=false, //正在加载中
					that.isTTrue=false, //到底了
					this.form={
						page:1, //页数
						limit:14,//加载条数
						type:1,//1：视频，2：图片
						class_id:'',//筛选，班级id
						class_cate_id:that.classType.id,//筛选班级分类id
					}
					this.videoList=[]
					this.getClassCatge()
				}else{
					that.isTrue=false, //正在加载中
					that.isTTrue=false, //到底了
					this.form={
						page:1, //页数
						limit:14,//加载条数
						type:1,//1：视频，2：图片
						class_id:id,//筛选，班级id
						class_cate_id:that.classType.id,//筛选班级分类id
					}
					this.videoList=[]
					this.getClassCatge()
				}
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
		},
		onReachBottom(){ //触底发生加载			
		    if(!this.isTTrue){
				this.getClassCatge()
			}
		},
	}
</script>

<style lang="scss">
	page{width: 100%;height: 100%;}
	.video-container{width: 100%;overflow: hidden;
	background: url(../../static/img/allbackground.jpg) no-repeat;
	background-size: 100% 100%;
	}
	.header{width: 100%;height: 128upx;background: url(../../static/img/allheaderPicture.jpg) no-repeat;
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
	.video-phonto-table{width: 100%;height: 87upx;display: flex;justify-content: space-evenly;line-height: 87upx;font-size: 30upx;}
	.video-phonto-table text{display: block;text-align: center;width: 30%;height: 87upx;}
	.active{color:#337E27;font-weight: bold;}
	.phonto{width: 702upx;overflow: hidden;margin: 0 auto 30upx;display: flex;justify-content: space-between;flex-wrap: wrap;}
	.pictureItem{width: 341upx;height: 188upx;margin-top: 20upx;margin-bottom: 20upx;}
	.session{white-space: nowrap;width: 100%;background: #fff;}
	.list{width: 25%;height: 100upx;display: inline-block;}
	.list text{display: block;width: 120upx;height: 80upx;text-align: center;line-height: 80upx;margin: 0 auto;}
	.actove{background: #D4E5D1;border: 2upx solid #D4E5D1;border-radius: 4upx;}
	.noneStyle{border: 2upx solid #BABABA;border-radius: 4upx;}
	.video{width: 702upx;overflow: hidden;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;}
	.video view{width: 341upx;overflow: hidden;margin-top: 20upx;}
	.video view text{display: block;width: 100%;text-align: center;font-size: 28upx;color: #333;}
	.bottom{width: 100%;overflow: hidden;margin: 50upx 0;}
</style>
