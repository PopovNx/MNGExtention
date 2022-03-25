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
    return Math.random().toString(16).slice(2)
}
export class Session {
    Key;
    Users;
    LHref;
    LPath;
    Page;
    constructor() {
        this.Key = newGuid();
        this.Users = {}
        this.LHref = null;
        this.LPath = null;
        this.Page = null;
    }
}