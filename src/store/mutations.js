/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  RECEIVE_BOOKS,
  RECEIVE_BOOKINFO,
  RECEIVE_CLASS_BOOKS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_BOOKS](state, {books}) {
    state.books = books
  },
  [RECEIVE_BOOKINFO](state, {bookinfo}) {
    state.bookinfo = bookinfo
  },

  [INCREMENT_FOOD_COUNT](state, {book}) {
    if(!book.count) { // 第一次增加
      // food.count = 1  // 新增属性(没有数据绑定)
      /*
      对象
      属性名
      属性值
       */
      Vue.set(book, 'count', 1) // 让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(book)
    } else {
      book.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {book}) {
    if(book.count) {// 只有有值才去减
      book.count--
      if(book.count===0) {
        // 将book从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(book), 1)
      }
    }
  },

  [CLEAR_CART](state) {

    // 清除book中的count
    state.cartFoods.forEach(book => book.count = 0)
    // 移除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },

  [RECEIVE_CLASS_BOOKS](state, {classbooks}) {
    state.classbooks = classbooks
  },
}
