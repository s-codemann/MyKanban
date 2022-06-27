setURL('http://developerakademie.com/smallest_backend_ever')

let users = [];

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}