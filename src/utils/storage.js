const setData = (keyName, data) => window.localStorage.setItem(keyName, data);

const getData = (keyName) => window.localStorage.getItem(keyName);

const removeData = (keyName) => window.localStorage.removeItem(keyName);

export {
    setData,
    getData,
    removeData
}