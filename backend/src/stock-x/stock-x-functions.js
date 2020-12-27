const StockXAPI = require('stockx-api')
const stockX = new StockXAPI()

const getFullItem = async (name, id) => {
    const items = await stockX.newSearchProducts(name, {limit: 5})
    const item = items.find(element => element.id === id)
    return item
};

module.exports = {
    getFullItem
}