/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
// Mock.mock('/goods', {code:0, data: data.goods})
// 返回ratings的接口
Mock.mock('/ratings', {code:0, data: data.ratings})
// 返回info的接口
Mock.mock('/info', {code:0, data: data.info})
// 返回books的接口
// Mock.mock('/books', {code:0, data: data.books})
// 返回index_category的接口
// Mock.mock('/index_category', {code:0, data: data.category})

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
