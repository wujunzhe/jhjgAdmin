import {
    get,
    post,
    put
} from '../utils/request';

/** 登陆 */
const loginReq = params => post('/login', params);

/** 获取餐桌列表 */
const queryTableList = params => get('/order/table/getList', params);

/** 获取订单列表 */
const queryOrderList = params => get('/order/order/getAdminOrder', params);

/** 添加餐桌 */
const addTable = params => put('/order/table/add', params);

/** 修改餐桌 */
const editTable = params => post('/order/table/update', params);

/** 删除餐桌 */
const deleteTable = params => post('/order/table/delete', params);

export {
    loginReq,
    queryTableList,
    queryOrderList,
    addTable,
    editTable,
    deleteTable
}