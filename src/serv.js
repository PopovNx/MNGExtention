export const firebaseConfig = {
    apiKey: "AIzaSyBGe-ZTBUSPT755tpYTbmC_ay_xiHd8WZ4",
    authDomain: "mngrd-a0d30.firebaseapp.com",
    projectId: "mngrd-a0d30",
    storageBucket: "mngrd-a0d30.appspot.com",
    messagingSenderId: "1014544936071",
    appId: "1:1014544936071:web:2e82f62b965d213ba51c22",
    measurementId: "G-GRV0ZY9ZFP"
};
function newGuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
export class Session {
    Key
    Users
    constructor() {
        this.Key = newGuid();
        this.Users = {}
    }
}