const baseUrl = 'http://hpjy.xzg2016.com/'; //此为测试地址,并非真实地址
var token=uni.getStorageSync('user').token
// 定义基础请求路径(后端服务器地址)
const request = (opts) => {
	if(token==undefined){
		token=uni.getStorageSync('user').token
	}
	let baseDefaultOpts = {
		url: baseUrl + opts.url,
		// 请求接口地址
		data: opts.data,
		// 传入请求参数
		method: opts.method,	
		// 配置请求类型
		header: opts.method == 'GET' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			'Authori-zation' : 'Bearer ' + token,
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Authori-zation' : 'Bearer ' + token,
		},
		// 配置请求头
		dataType: 'json',
	};
			// 显示加载中 效果
			uni.showLoading({
				mask: false,
			});

	let promise = new Promise(function(resolve, reject) {
		uni.request(baseDefaultOpts).then(
			(res) => {
					setTimeout(function() {
					    uni.hideLoading();
					}, 1000);
				// if(res[1].data.status == '200' || res[1].data.status == 200){
				// 	resolve(res[1].data)
				// }								
				if(res[1].data.status == '410000' || res[1].data.status ==410000||res[1].data.status == '410001'||res[1].data.status ==410001||res[1].data.status == '410002'||res[1].data.status == 410002){
					uni.removeStorageSync('user')
					location.href='http://hpjy.xzg2016.com/h5/#/pages/index/index'
				}
				resolve(res[1].data)
				
			}
		).catch(
			(erro) => {
				reject(erro)
			}
		)
	})
	return promise
};

export default request
