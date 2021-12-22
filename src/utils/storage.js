const setData = (keyName, data) => window.localStorage.setItem(keyName, data);

const getData = (keyName) => window.localStorage.getItem(keyName);

export {
    setData,
    getData
}