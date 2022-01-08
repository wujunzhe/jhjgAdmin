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

/** 上架餐桌 */
const useTable = params => post('/order/table/use', params);

/** 按时间段禁用餐桌 */
const disableTable = params => post('/order/table/off', params);

/** 查询一周内餐桌禁用情况 */
const getTableOffList = params => get('/order/table/offList', params);

/** 按时间段启用餐桌 */
const enableTable = params => post('/order/table/enable', params);

/** 刷新权限 */
const refreshAuth = params => get('/refreshApi', params);

export {
    loginReq,
    queryTableList,
    queryOrderList,
    addTable,
    editTable,
    deleteTable,
    useTable,
    refreshAuth,
    disableTable,
    getTableOffList,
    enableTable
}