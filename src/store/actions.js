/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  RECEIVE_BOOKS,
  RECEIVE_BOOKINFO,
  RECEIVE_CLASS_BOOKS,
  RECEIVE_ORDER,
  RECEIVE_ORDERS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo,
  reqSearchShop,
  reqShopBooks,
  reqBookInfo,
  reqClassBooks,
  reOrderList
} from '../api'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取图书分类列表
  async getCategorys({commit}) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表
  async getShops({commit, state}) {
    // 发送异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  // 同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  // 异步登出
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家信息
  async getBookInfo({commit},isbn) {
    const result = await reqBookInfo(isbn)
    if (result.code === 0) {
      const bookinfo = result.data
      commit(RECEIVE_BOOKINFO, {bookinfo})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  // async getShopGoods({commit}, callback) {
  //   const result = await reqShopGoods()
  //   if (result.code === 0) {
  //     const goods = result.data
  //     commit(RECEIVE_GOODS, {goods})
  //     // 数据更新了, 通知一下组件
  //     callback && callback()
  //   }
  // },

  // 异步获取图书列表
  async getShopBooks({commit}) {
    const result = await reqShopBooks()
    if (result.code === 0) {
      const books = result.data
      commit(RECEIVE_BOOKS, {books})
    }
  },

  // 同步更新food中的count值
  updateFoodCount({commit}, {isAdd, book}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {book})
    } else {
      commit(DECREMENT_FOOD_COUNT, {book})
    }
  },

  // 同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },

  // 异步获取搜索列表
  async searchShops({commit, state}, keyword) {
    const result = await reqSearchShop( keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
  // 异步获取图书分类列表
  async getClassBooks({commit}, callback) {
    const result = await reqClassBooks()
    const classbooks = result
    commit(RECEIVE_CLASS_BOOKS, {classbooks})
    // 数据更新了, 通知一下组件
        callback && callback()
  },
  // 异步获取订单列表
  async getOrderByUserId({commit}, userId) {
    const result = await reOrderList(userId)
    if(result.code === 200) {
      const orders = result.data
      commit(RECEIVE_ORDERS, {orders})
    }
  }
}
