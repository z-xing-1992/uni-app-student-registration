<template>
	<view class="studentInformation-container">
		<view class="header">
			<view class="imgChesk" @click="backInto">
				<image src="../../static/img/fanhui.png" mode=""></image>
			</view>
			<text>黄埔军校{{Name}}学员信息收集表</text>
		</view>
		<view class="img">
			<image src="../../static/img/changetoutu.png" mode="widthFix"></image>
		</view>
		<view class="main">
			<view class="title">
				夏令营学员【{{Name}}】的信息收集表
			</view>
			<view class="tabcheck">
				<u-tabs name="cate_name" count="cate_count" :list="list" :is-scroll="false" :current="current" @change="change"
				 active-color='#337E27' bar-width='70'></u-tabs>
			</view>
			<view class="information" v-if="current==0">
				<view class="name">
					<view class="information-title">
						<text>姓名</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.real_name" />
					</view>
				</view>
				<view class="sex">
					<view class="information-title">
						<text>性别</text>
						<text>*</text>
					</view>
					<view class="int">
						<u-radio-group v-model="value" @change="radioGroupChange">
							<u-radio @change="radioChange" v-for="(item, index) in sexlist" :key="index" :name="item.name" :disabled="item.disabled"
							 style='margin-right: 40upx;' active-color='#337e27'>
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view class="born">
					<view class="information-title">
						<text>出生日期(例如：2010年1月1号填 20100101)</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.date_birth" />
					</view>
				</view>
				<view class="age">
					<view class="information-title">
						<text>年龄</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="number" value="" v-model="studentsInformation.age" />
					</view>
				</view>
				<view class="national">
					<view class="information-title">
						<text>民族</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.ethnic" />
					</view>
				</view>
				<view class="place">
					<view class="information-title">
						<text>籍贯</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.native_place" />
					</view>
				</view>
				<view class="Idcard">
					<view class="information-title">
						<text>身份证号码（请认真正确填写，将凭身份证购买保险；香港身份证可填写回乡证号码。)</text>
					</view>
					<view class="Idcard-input">
						<view class="select" @click="idCardPoup=true">
							<text style="display: block;width: 70%;float: left;">{{IDcardvalue}}</text>
						</view>
						<input type="text" value="" v-model="studentsInformation.idCard" />
					</view>
				</view>
				<view class="height">
					<view class="information-title">
						<text>身高（厘米）</text>
					</view>
					<view class="int">
						<input type="number" value="" v-model="studentsInformation.stature" />
					</view>
				</view>
				<view class="weight">
					<view class="information-title">
						<text>体重（KG 公斤）</text>
					</view>
					<view class="int">
						<input type="number" value="" v-model="studentsInformation.weight" />
					</view>
				</view>
				<view class="Interests">
					<view class="information-title">
						<text>兴趣爱好</text>
						<text>*</text>
					</view>
					<view class="int">
						<textarea value="" placeholder="" v-model="studentsInformation.interest" />
						</view>
				</view>
				<view class="specialty">
					<view class="information-title">
						<text>个人专长</text>
						<text>*</text>
					</view>
					<view class="int">
						<textarea value="" placeholder="" v-model="studentsInformation.specialty"/>
					</view>
				</view>
				<view class="Parentsmessage">
					<view class="information-title">
						<text>家长寄语，以及营员的身体状况及食物禁忌</text>
						<text>*</text>
					</view>
					<view class="int">
						<textarea value="" placeholder="" v-model="studentsInformation.remarks"/>
					</view>
				</view>
				<view class="invitationElse">
					您可邀请同学家长报名,让孩子们一起参加本期夏令营
				</view>
				<view class="Immediately" @click="changStuMessage">
					立即提交
				</view>
			</view>
			<view class="information" v-if="current==1">
				<view class="name">
					<view class="information-title">
						<text>监护人姓名</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.guardian_name"/>
					</view>
				</view>
				<view class="contact">
					<view class="information-title">
						<text>联系方式</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value=""  v-model="studentsInformation.guardian_contact"/>
					</view>
				</view>
				<view class="relationship">
					<view class="information-title">
						<text>与营员关系</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.guardian_blood"/>
					</view>
				</view>
				<view class="allDaycontact">
					<view class="information-title">
						<text>24小时紧急联系电话</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.emergency_contact"/>
					</view>
				</view>
				<view class="address">
					<view class="information-title">
						<text>详细住址（请务必填写可以收取快递的地址）</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.address"/>
					</view>
				</view>
				<view class="how">
					<view class="information-title">
						<text>您是如何获知基地招生信息的？</text>
						<text>*</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.message_way"/>
					</view>
				</view>
				<view class="note">
					<view class="information-title">
						<text>备注</text>
					</view>
					<view class="int">
						<input type="text" value="" v-model="studentsInformation.note"/>
					</view>
				</view>
				<view class="invitationElse">
					您可邀请同学家长报名,让孩子们一起参加本期夏令营
				</view>
				<view class="Immediately" @click="changParentInfo">
					立即提交
				</view>
			</view>
		</view>
		<u-popup v-model="idCardPoup" mode="center">
				<view style="width: 600upx;overflow: hidden;">
					<u-radio-group v-model="IDcardvalue" @change="IDcardradioGroupChange" style='width: 100%;overflow: hidden;'>
								<u-radio 
									@change="IDcardradioChange" 
									v-for="(item, index) in IDcardlist" :key="index" 
									:name="item.name"
									:disabled="item.disabled"
									style='height: 100upx;padding: 0 20upx;'
								>
									{{item.name}}
								</u-radio>
					</u-radio-group>
				</view>
		</u-popup>
		<u-popup v-model="show" mode="center" border-radius="14">
			<view style="width: 400upx;height: 200upx;text-align: center;line-height: 200upx;font-size: 34upx;color: red;">
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
				show:false,//控制信息弹出啊
				content: '信息已经修改成功,点击任意键返回查看',
				list: [{
					cate_name: '营员信息'
				}, {
					cate_name: '监护人信息'
				}, ],
				current: 0,
				sexlist: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					},
				],
				IDcardlist: [
								{
									name: '居民身份证',
									disabled: false
								},
								{
									name: '香港居民来往内地通行证(俗称回乡证)',
									disabled: false
								},
								{
									name: '澳门居民来往内地通行证(俗称回乡证)',
									disabled: false
								},
								{
									name: '台湾居民来往内地通行证(俗称台胞证)',
									disabled: false
								},
								{
									name: '护照',
									disabled: false
								}
							],
							// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				IDcardvalue:'居民身份证',//默认是居民身份证
				idCardPoup:false,//控制身份证卡选择弹窗
				// IDcardDetail:'居民身份证',//默认是居民身份证
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '男',
				studentsInformation:{
					  "id": 1,
					        "num": "zr4Th6tSI5s2",
					        "real_name": "陈嘉明",
					        "sex": 1,
					        "date_birth": "2020-09-29",
					        "avatar": "",
					        "age": 23,
					        "ethnic": "汉",
					        "native_place": "广东",
					        "idCard": "44522",
					        "idCard_type": 1,
					        "stature": 175,
					        "weight": 90,
					        "interest": "做人",
					        "specialty": "做好人",
					        "remarks": "好好做人",
					        "guardian_name": "陈爸爸",
					        "guardian_contact": "13794117895",
					        "guardian_blood": "父子",
					        "emergency_contact": "13794117895",
					        "address": "地球",
					        "message_way": "随便知道的",
					        "note": "你好",
					        "use_id": 1,
					        "add_time": 1603279835
				},
				Name:'',
			};
		},
		onLoad() {
			let that=this
			uni.getStorage({
				key: 'Name',
				success: function(res) {
					that.Name = res.data
				}
			});
			this.getStudentsInformation()
		},
		methods: {
			backInto(){ //返回上一个页面
				uni.navigateBack({
					delta:1
				})
			},
			change(index){ //
				this.current = index;
				console.log(index)
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				
			},
			getStudentsInformation(){ //获取学员信息
				let that=this
				let ID={}
				uni.getStorage({
					    key: 'ID',
					    success: function (res) {
							ID=res.data
					    }
					});				
					that.$request({
						url: '/api/getCampersInfo',
						method: 'POST',
						data: ID
					}).then(res => {
						if(res.status==200){
							that.studentsInformation=res.data
							that.studentsInformation.date_birth=res.data.date_birth.split('-')[0]+res.data.date_birth.split('-')[1]+res.data.date_birth.split('-')[2]
							if(res.data.sex==1)that.value='男'															
							if(res.data.sex==2)that.value='女'								
							if(res.data.idCard_type==1) that.IDcardvalue='居民身份证'
							if(res.data.idCard_type==2) that.IDcardvalue='香港居民来往内地通行证(俗称回乡证)'
							if(res.data.idCard_type==3) that.IDcardvalue='澳门居民来往内地通行证(俗称回乡证)'
							if(res.data.idCard_type==4) that.IDcardvalue='台湾居民来往内地通行证(俗称台胞证)'
							if(res.data.idCard_type==5) that.IDcardvalue='护照'
						}
					}).catch(erro => {
				
				})
			},
			// 选中任一radio时，由radio-group触发
			IDcardradioGroupChange(e) {
			},
			// 选中某个单选框时，由radio时触发
			IDcardradioChange(e) {
			},
			changStuMessage(){  //修改学员信息
				let that=this
				let form={}
				uni.getStorage({
					    key: 'ID',
					    success: function (res) {
							form.campers_id=res.data.campers_id
					    }
				});	
				if(that.studentsInformation.real_name.length<=0){
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.age.length<=0){
					uni.showToast({
						title: '请填写年龄',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.interest.length<=0){
					uni.showToast({
						title: '请填写兴趣爱好',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.specialty.length<=0){
					uni.showToast({
						title: '请填写专长',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.remarks.length<=0){
					uni.showToast({
						title: '请填写家长寄语',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}								
				form.real_name=that.studentsInformation.real_name				
				if(that.value=='男')form.sex=1
				if(that.value=='女')form.sex=2
				form.date_birth=that.studentsInformation.date_birth
				form.age=that.studentsInformation.age
				form.ethnic=that.studentsInformation.ethnic
				form.native_place=that.studentsInformation.native_place
				form.idCard=that.studentsInformation.idCard
				if(that.IDcardvalue=='居民身份证')form.idCard_type=1
				if(that.IDcardvalue=='香港居民来往内地通行证(俗称回乡证)')form.idCard_type=2
				if(that.IDcardvalue=='澳门居民来往内地通行证(俗称回乡证)')form.idCard_type=3
				if(that.IDcardvalue=='台湾居民来往内地通行证(俗称台胞证)')form.idCard_type=4
				if(that.IDcardvalue=='护照')form.idCard_type=5
				form.stature=that.studentsInformation.stature
				form.weight=that.studentsInformation.weight
				form.interest=that.studentsInformation.interest
				form.specialty=that.studentsInformation.specialty
				form.remarks=that.studentsInformation.remarks
				console.log("EPP”")
				that.$request({
					url: '/api/updateCampersInfo',
					method: 'POST',
					data: form
				}).then(res=>{
					console.log(res,"OK")
					if(res.status==200){
						that.show=true
						that.content=res.msg
						that.getStudentsInformation()
					}
					if(res.status==400){
						that.show=true
						that.content="未修改任何信息"
					}
				}).catch(erro=>{
					console.log(erro)
				})
				
			},
			changParentInfo(){
				let that=this
				let form={}
				uni.getStorage({
					    key: 'ID',
					    success: function (res) {
							form.campers_id=res.data.campers_id
					    }
				});	
				if(that.studentsInformation.guardian_name.length<=0){
					uni.showToast({
						title: '请填写监护人姓名',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.guardian_contact.length<=0){
					uni.showToast({
						title: '请填写联系方式',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.guardian_blood.length<=0){
					uni.showToast({
						title: '请填写与营员关系',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.emergency_contact.length<=0){
					uni.showToast({
						title: '请填写24小时紧急联系电话',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.address.length<=0){
					uni.showToast({
						title: '请填写详细住址',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}
				if(that.studentsInformation.message_way.length<=0){
					uni.showToast({
						title: '请填写获取招生信息方法',
						icon: 'none'
					});					
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
					return
				}					
				form.guardian_name=that.studentsInformation.guardian_name
				form.guardian_contact=that.studentsInformation.guardian_contact
				form.guardian_blood=that.studentsInformation.guardian_blood
				form.emergency_contact=that.studentsInformation.emergency_contact
				form.address=that.studentsInformation.address
				form.message_way=that.studentsInformation.message_way
				form.note=that.studentsInformation.note
				console.log(form)
				that.$request({
					url: '/api/updateCampersParentInfo',
					method: 'POST',
					data: form
				}).then(res=>{
					if(res.status==200){
						that.show=true
						that.content=res.msg
						that.getStudentsInformation()
					}
					if(res.status==400){
						that.show=true
						that.content="未修改任何信息"
					}
				}).catch(erro=>{})
			}
		}
	}
</script>

<style lang="scss">
	page {width: 100%;height: 100%;}
	.studentInformation-container {width: 100%;height: 100%;
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
	.img {width: 100%;height: 320upx;}
	.img image {width: 100%;}
	.main {width: 702upx;margin: 0 auto;overflow: hidden;}
	.title {width: 100%;height: 135upx;text-align: center;line-height: 135upx;font-size: 38upx;color: #333;font-weight: bold;border-bottom: 1upx solid #f6f5f5;}
	.information {width: 100%;overflow: hidden;margin-top: 40upx;}
	.name,
	.sex,.born,.age,.national,.place,.Idcard,.height,.weight,.Interests,.specialty ,.school,.schoolClass,.Parentsmessage,.jobName,
	.relationship,.contact,.allDaycontact,.address,.how,.note{
		width: 100%;overflow: hidden;margin-bottom: 50upx;
	}
	.information-title {width: 100%;overflow: hidden;}
	.information-title text {display: inline-block;font-size: 26upx;}
	.information-title text:nth-of-type(1) {font-weight: bold;color: #333;}
	.information-title text:nth-of-type(2) {color: #D70D0D;}
	.int,.Idcard-input {width: 100%;overflow: hidden;margin-top: 20upx;}
	.int input {width: 98%;height: 54upx;border: 2upx solid #D0D0D0;border-radius: 8upx;margin: 0 auto;text-indent: 1em;line-height: 54upx;font-size: 26upx;}
	.int textarea{width: 98%;height: 120upx;border: 2upx solid #D0D0D0;border-radius: 8upx;margin: 0 auto;text-indent: 1em;line-height: 54upx;font-size: 26upx;}
	.select{width: 260upx;height: 54upx;background: url(../../static/img/selesct.png) no-repeat;background-size: 100%;float: left;line-height: 54upx;text-indent: 1em;}
	.Idcard-input input{width: 390upx;height: 52upx;line-height: 52upx;border: 2upx solid #D0D0D0;margin-left: 32upx;text-indent: 1em;
	font-size: 26upx;border-radius: 8upx;float: left;}
	.invitationElse{width: 100%;overflow: hidden;font-size: 28upx;color: #FD9664;text-align: center;margin-bottom: 50upx;}
	.Immediately{width: 100%;height: 76upx;background: linear-gradient(-40deg, #337E27 0%, #3E9130 100%);border-radius: 8upx;line-height: 76upx;text-align: center;
	font-size: 30upx;color: #fff;margin-bottom: 40upx;}
</style>
