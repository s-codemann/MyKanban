let users = [];


/**
 * This function loaded the smallest_backend js
 * 
 *  @param {*}
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}