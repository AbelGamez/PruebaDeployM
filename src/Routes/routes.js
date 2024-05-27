const apiURL = import.meta.env.VITE_BACKEND_URL;

/* ---------------------------------------------------------------- */
/*                             PRODUCTS                             */
/* ---------------------------------------------------------------- */

function listAllProductsInStock() {
    return `${apiURL}/products`;
}

function listAllProductsInStockPaginated(page) {
    console.log(`Ruta paginación: ${apiURL}/paginatedProducts?page=${page}`);
    return `${apiURL}/paginatedProducts?page=${page}`;
}

function listProductInStock(id) {
    return `${apiURL}/productDetail/${id}`;
}

function listRndProductsInStock() {
    return `${apiURL}/randomProducts`;
}

function addStock(stockId, userId) {
    return `${apiURL}/addStock/${stockId}/${userId}`;
}

function uniqueProductCategories() {
    return `${apiURL}/uniqueProductCategories`;
}

function getSkins(value) {
    return `${apiURL}/getSkins/${value}`;
}

function getProducts(value) {
    return `${apiURL}/getProducts/${value}`;
}

function listskins(selectedProduct, value) {
    return `${apiURL}/list-skins/${selectedProduct}/${value}`;
}

function getDescription(name, pattern) {
    return `${apiURL}/getdescription/${name}/${pattern}`;
}

function editProductInStock(productId, userId) {
    return `${apiURL}/editProduct/${productId}/${userId}`;
}

function deleteProductInStock(stockId, userId) {
    return `${apiURL}/deleteProduct/${stockId}/${userId}`
}

// function listProductsInStockByCategory(category, page) {
//     return `${apiURL}/productsCategory/${category}?page=${page}`;
// }

function listProductsInStockByCategory(category, page, filters) {
    // Construye la parte de la URL para los filtros
    const filterParams = new URLSearchParams(filters).toString();
    // Retorna la URL completa con la categoría, los parámetros de filtro y la página
    return `${apiURL}/productsCategory/${category}?page=${page}&${filterParams}`;
}

function listProductsInStockFiltered(page, filters) {
    // Construye la parte de la URL para los filtros
    const filterParams = new URLSearchParams(filters).toString();
    // Retorna la URL completa con los parámetros de filtro y la página
    return `${apiURL}/products/filtered?page=${page}&${filterParams}`;
}

function listUserActions() {
    return `${apiURL}/user-actions`;
}

/* ---------------------------------------------------------------- */
/*                               USERS                              */
/* ---------------------------------------------------------------- */

function listAllUsers() {
    return `${apiURL}/listAllUsers`;
}

function getUser(id) {
    return `${apiURL}/getUser/${id}`;    
}

function UserRegister() {
    return `${apiURL}/register`;
}

function UserEdit(id) {
    return `${apiURL}/editUser/${id}`;  
}

function UserDelete(id) {
    return `${apiURL}/deleteUser/${id}`;
}

function UserExistsData() {
    return `${apiURL}/check-existing-data`; 
}

function LogInUser() {
    return `${apiURL}/login`;
}

function forgotPassword() {
    return `${apiURL}/forgot-password`;
}

function resetPassword() {
    return `${apiURL}/reset-password`;
}

function banUser(id) {
    return `${apiURL}/ban/${id}`;
}

function getAdmin(id) {
    return `${apiURL}/admin/${id}`;
}


function checkEmail() {
    return `${apiURL}/check-email`;
}
function pieChart() {
    return `${apiURL}/get-buyer-profile-data`;
}
function contUsers() {
    return `${apiURL}/get-contUsers`;
}
function sumUnitPrice() {
    return `${apiURL}/get-sumUnitPrice`;
}
function processPayment(userId) {
    return `${apiURL}/payment/${userId}`;
}

function randomProductsHome() {
    return `${apiURL}/randomProductsHome`;
}
function showPaymentsByUser(userId) {
    return `${apiURL}/transactions/${userId}`;
}

function listProductsInStockByPaymentId(paymentId) {
    return `${apiURL}/productsByPayment/${paymentId}`;
}

function datosTablaFacturas() {
    return `${apiURL}/obtener-datos-tabla/`;
}

function obtenerDatosTablaPorUsuario(id) {
    return `${apiURL}/usuarios/${id}/datos-tabla/`;
}
function datosListFacturas() {
    return `${apiURL}/obtener-list-datos-tabla`;
}
function getMonthlyTransactions() {
    return `${apiURL}/MonthlyTransactions`;
}
function getTotalSales() {
    return `${apiURL}/total-sales`;
}
export {
    listAllProductsInStock,
    listAllProductsInStockPaginated,
    listProductInStock,
    listRndProductsInStock,
    addStock,
    uniqueProductCategories,
    getSkins,
    getProducts,
    listskins,
    getDescription,
    editProductInStock, 
    deleteProductInStock,
    listProductsInStockByCategory,
    listProductsInStockFiltered,
    listUserActions,
    UserRegister,
    UserExistsData,
    UserEdit,
    UserDelete,
    getUser,
    LogInUser,
    forgotPassword,
    resetPassword,
    listAllUsers,
    banUser,
    getAdmin,
    checkEmail,
    pieChart,
    contUsers,
    sumUnitPrice,
    processPayment,
    randomProductsHome,
    showPaymentsByUser,
    listProductsInStockByPaymentId,
    datosTablaFacturas,
    obtenerDatosTablaPorUsuario,
    datosListFacturas,
    getMonthlyTransactions,
    getTotalSales
}