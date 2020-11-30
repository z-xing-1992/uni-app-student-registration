<template>
	<view class="switchStudents-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode="" ></image>
			</view>
			<text>切换学员</text>
		</view>
		<view class="table">
			<u-tabs :list="list" :current="current" @change="change" height="87" active-color='#337E27' 
			inactive-color='#666666' item-width='180' :bold='true'></u-tabs>
		</view>
		<view class="students">
			<view class="students-item" v-for="(item,index) in allStudentslist" :key='index'>
				
				<image :src="item.avatar" mode=""></image>
				<view class="name-class">
					<text>{{item.real_name}}</text>
					<text>{{item.title}}{{item.class_name}}班</text>
				</view>
				<view class="tab-unbundling">
					<text @click="switchStudents(item.id,item.real_name)">切换</text>
					<text @click="unbundling(item.id)">解绑</text>
				</view>
			</view>
		</view>
		<view class="bootm" @click="bindInto">
			绑定学员
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	export default {
		data() {
			return {
				list: [],
				current: 0,
				allStudentslist:[],//所有学员
				allStudents:[],//学员列表中间转阶层
				typeList:[],//绑定列表类型
			};
		},
		onLoad() {
			this.bindingList()
			this.bindingTypelist()
		},
		methods: {
			backInto(){ //点击返回按钮返回上一页
				uni.navigateBack({
					delta:1
				})
			},
			change(index) {  //点击筛选学员期数
				this.current = index;
				let studentList=[]
				for(let i=0;i<this.list.length;i++){
					if(index==0){
						studentList=this.allStudents
					}
					if(index==i){
						this.allStudentslist=this.allStudents
						for(let j=0;j<this.allStudentslist.length;j++){
							if(this.list[i].name==this.allStudentslist[j].title){
								studentList.push(this.allStudentslist[j])
							}
						}
					}
				}
				this.allStudentslist=studentList
			},
			bindInto(){ //跳到绑定学员页面
				uni.navigateTo({
					url:'../index/index'
				})
			},
			bindingTypelist(){ //获取绑定类型列表
					let that=this
					let ID={}
					uni.getStorage({
						    key: 'ID',
						    success: function (res) {
								ID=res.data
						    }
					});	
					that.$request({
						url:'/api/bindListCate',
						method: 'GET',
					    data:ID,
					}).then(res => {
						if(res.status==200){
							let list=[
								{
									name:'全部'
								}
							]
							for(let i=0;i<res.data.length;i++){
								list.push({name:res.data[i].title})
							}
							that.list=list
						}
					}).catch(erro=>{
						
					})
			},						
			bindingList(){ //获取绑定列表
					let that=this
					let ID={}
					uni.getStorage({
						    key: 'ID',
						    success: function (res) {
								ID=res.data
						    }
					});	
					that.$request({
						url:'/api/bindList',
						method: 'GET',
					    data:ID,
					}).then(res => {
						console.log(res)
						if(res.status==200){
							// let arr=res.data
							// for(let i=0;i<arr.length;i++){
							// 	if(ID==arr[i].real_name){
							// 		arr.splice()
							// 	}
							// }
							that.allStudentslist=res.data
							that.allStudents=res.data
						}
					}).catch(erro=>{
						
					})
			},
			unbundling(id){ //解绑学员
			    let that=this
				uni.showModal({
				    title: '提示',
				    content: '确定解绑该学员吗？',
				    success: function (res) {
				        if (res.confirm) {
				           let form={
				           	campers_id:id
				           }
				           that.$request({
				           	url:'/api/enbind',
				           	method: 'POST',
				               data:form,
				           }).then(res => {
				           	if(res.status==200){
				           		uni.redirectTo({
									url:'../switchStudents/switchStudents'
				           		})
				           	}					
				           }).catch(erro=>{
				           	
				           })
				        } 
				    }
				});							
			},
			switchStudents(id,name){ //切换学员
					let that=this
					let ID={}
					ID.campers_id=id	
					uni.setStorage({
							key:"ID",
							data:ID
					})
					uni.setStorage({
							key:"Name",
							data:name
					})
					uni.navigateTo({						
						url:'../studentsCenter/studentsCenter'
					})																	
			}
		}
	}
</script>

<style lang="scss">
	page {width: 100%;overflow: hidden;background: #f5f6f6;}
	.switchStudents-container {width: 100%;height: 100%;position: relative;
	background: url(../../static/img/allbackground.jpg) no-repeat;
	background-size: 100% 100%;
	}
	.header {width: 100%;height: 128upx;background: url(../../static/img/allheaderPicture.jpg) no-repeat;
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
	.table {width: 100%;height: 87upx;background: #fff;}
	.students{width: 100%;overflow: hidden;margin-top: 30upx;}
	.students-item{width: 100%;overflow: hidden;background: #fff;}
	.students-item image{width: 80upx;height: 80upx;display: block;float: left;margin: 23upx 22upx 29upx 51upx;}
	.name-class{float: left;}
	.name-class text{display: block;}
	.name-class text:nth-of-type(1){font-size: 28upx;color: #333;margin: 18upx 0 15upx 0;}
	.name-class text:nth-of-type(2){font-size: 24upx;color: #666;}
	.tab-unbundling{float: left;margin: 36upx 0 0 98upx;}
	.tab-unbundling text{display: inline-block;}
	.tab-unbundling text:nth-of-type(1){width: 152upx;height: 54upx;line-height: 54upx;text-align: center;color: #fff;font-size: 28upx;
background: #3E9130;border-radius: 8upx;margin-right: 60upx;}
.tab-unbundling text:nth-of-type(2){width: 104upx;height: 56upx;line-height: 56upx;text-align: center;color: #3E9130;font-size: 28upx;
border: 2upx solid #999999;border-radius: 8upx;}
.bootm{width: 100%;position: fixed;left: 0;bottom: 0;background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);
line-height: 76upx;text-align: center;color: #fff;font-size: 30upx;}

</style>
