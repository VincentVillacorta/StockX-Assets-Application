const StockXAPI = require('stockx-api')
const stockX = new StockXAPI()

const searchItem = async (name, id) => {
    return await stockX.newSearchProducts(name, {limit: 6})
};

const getFullItem = async (name, id) => {
    const items = await stockX.newSearchProducts(name, {limit: 5})
    const item = items.find(element => element.name === name)
    return item
};



module.exports = {
    getFullItem,
    searchItem
}