import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue, push, onChildAdded, onChildChanged, onChildRemoved, get, remove, query}
    from "firebase/database";
import * as fns from "./serv";
import {getAuth, onAuthStateChanged, signInAnonymously,} from "firebase/auth";


const elements={
    uidPlace:null,
    createBtn:null,
    sesKey:null,
    connectBtn:null,
    connectInput:null,
    update(){
        return;
        if(uid){
            console.log(uid)
            console.log(this.uidPlace)
            this.uidPlace.innerText = uid.slice(0,8);
        }
        if(mySession){
            this.sesKey.innerText = mySession.Key;
            this.createBtn.innerText = "Удалить пати";
            this.sesKey.style.display="flex";
            this.connectBtn.style.display="none";
        }else{
            this.sesKey.innerText = "";
            this.createBtn.innerText = "Создать пати";
            this.sesKey.style.display="none";
            this.connectBtn.style.display="flex";
        }
        connectKeyValue =  elements.connectInput.value;
        if(connectKey){
            elements.connectInput.disabled=true;
            elements.createBtn.style.display = "none";
            elements.connectBtn.innerText = "Отключиться";
        }else{
            elements.connectInput.disabled=false;
            elements.connectBtn.innerText = "Подключиться";
            elements.createBtn.style.display = "flex";
        }
    }
}

const Data = {
    app: null,
    auth: null,
    set mySession(e) {
        console.log("New session value:", e)
        this._mySession = e;
    },
    get mySession() {
        return this._mySession;
    },
    uid: null,
    connectKey: null,
    connectKeyValue: null,
}

export function Load() {
    //ElementGeneration();
    Data.firebaseApp = initializeApp(fns.firebaseConfig);
    Data.auth = getAuth();
    signInAnonymously(Data.auth).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
    onAuthStateChanged(Data.auth, onAuth);
}

function onAuth(user) {
    if (user && user.uid) {
        Data.uid = user.uid;
        onValue(ref(getDatabase(), 'Sessions/' + Data.uid), (data) => Data.mySession = data.val())

    } else {
        console.log("No User")
    }
}

/*




function createSession() {
    get(ref(getDatabase(), 'Sessions/' + uid)).then((data) => {
        if (!data.val()) {
            set(ref(getDatabase(), 'Sessions/' + uid), new fns.Session()).then();
        }
    });
}

function connect() {
    get(ref(getDatabase(), 'Sessions')).then((data) => {
        const sessions = data.val();
        let sessionKey = null;
        for (const fdKey in sessions)
            if (sessions[fdKey].Key === connectKeyValue)
                sessionKey = fdKey;
        if (!sessionKey){
            connectKeyValue = null;
            connectKey = null;
            return;
        }
        const sessionUsersRef = ref(getDatabase(), 'Sessions/' + sessionKey + "/Users/" + uid);
        set(sessionUsersRef, {state: "online"}).then();
        connectKey = connectKeyValue;

    })
}

function disconnect() {
    get(ref(getDatabase(), 'Sessions')).then((data) => {
        const sessions = data.val();
        let sessionKey = null;
        for (const fdKey in sessions)
            if (sessions[fdKey].Key === connectKey)
                sessionKey = fdKey;
        console.log(sessionKey);
        if (!sessionKey) return;
        const sessionUsersRef = ref(getDatabase(), 'Sessions/' + sessionKey + "/Users/" + uid);
        remove(sessionUsersRef).then();
        connectKey = null;
       
    })
}

function removeSession() {
    remove(ref(getDatabase(), 'Sessions/' + uid)).then();
}


function createBtnClicked(){
    if(mySession==null){
        createSession();
    }else{
        removeSession();
    }
   
}

function connectBtnClicked() {
    if(connectKey){
        disconnect()
    }else{
        connect();
    }
    
}

function ElementGeneration() {
    const dta = document.querySelector(".reader-header-actions_right");
    function REc() {
        const dtx = document.createElement("div");
        dtx.classList.add("reader-header-action_icon");
        dtx.classList.add("reader-header-action");
        return dtx;
    }
    {
        const dtx = REc();
        elements.uidPlace = dtx;
        console.log(elements.uidPlace)
        dta.insertBefore(dtx, dta.childNodes[0]);
    }
    {
        const dtx = REc();
        elements.createBtn = dtx;
        dtx.style.userSelect="none";
        dtx.onclick=createBtnClicked;
        dta.insertBefore(dtx, dta.childNodes[0]);
    }
    {
        const dtx = REc();
        elements.connectBtn = dtx;
        dtx.style.userSelect="none";
        dtx.onclick=connectBtnClicked;
        dtx.innerText="Присоединиться";
        dta.insertBefore(dtx, dta.childNodes[0]);
    }
    {
        const dtx = REc();
        elements.sesKey = dtx;
        dtx.style.userSelect="all";
        dta.insertBefore(dtx, dta.childNodes[0]);
    }
    {
        const dtx = document.createElement("input");
        dtx.classList.add("reader-header-action_icon");
        dtx.classList.add("reader-header-action");
        dtx.style.border="0";
        dtx.style.outline="0";
        dtx.style.textAlign="center";
        elements.connectInput = dtx;
        dta.insertBefore(dtx, dta.childNodes[0]);
    }
    setInterval(elements.update, 80);

}


*/