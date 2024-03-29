/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:8087/bookstore'
// const BASE_URL = '/bookstore'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取图书分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/bookclassify/all')
// 3、根据经纬度获取商铺信息
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据关键字搜索图书列表
export const reqSearchShop = (keyword) => ajax(BASE_URL+'/book/getFuzzy', {keyword})
// 6、用户名密码登陆
export const reqPwdLogin = (email, userPassword, verCode) => ajax(BASE_URL+'/user/userLogin', {email, userPassword, verCode}, 'POST')
//注册
export const reqRegLogin = (email, nickName, phoneNumber, userPassword, name, sex)=> ajax(BASE_URL+'/user/register', {email, nickName, phoneNumber, userPassword, name, sex}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL+'/user/userLogout')
// 11、图书详情
export const reqBookInfo = (isbn) => ajax(BASE_URL+'/book/get',{isbn})


export const sendOrderList = (orderlist) => ajax(BASE_URL+'/orderlist/add',{orderlist},'POST')
/**
 * 获取店家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取店家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')


/**
 * 获取商家图书分类
 */
export const reqClassBooks = () => ajax(BASE_URL+'/book/getBookInfo')

// 12、获取订单列表
export const reOrderList = (userId) => ajax(BASE_URL + '/orderlist/getOrderListByUserId', {userId})

/**
 * 获取商家图书数组
 */
export const reqShopBooks = () => ajax(BASE_URL+'/book/listTopBook')
