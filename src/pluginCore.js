import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue, push, onChildAdded, onChildChanged, onChildRemoved, get, remove, query}
    from "firebase/database";
import * as fns from "./serv";
import {getAuth, onAuthStateChanged, signInAnonymously,} from "firebase/auth";
import $ from "jquery"
import injContent from './content.html';

const elements = {
    uidPlace: null,
    createBtn: null,
    mySessionKey: null,
    connectBtn: null,
    connectInput: null,
    mySessionUsers: null,
    InitElements() {
        $(".reader-header-actions_right").prepend($(injContent));
        this.uidPlace = $("#fp_uid")[0];
        this.createBtn = $("#fp_create_btn")[0];
        this.mySessionKey = $("#fp_session_id")[0];
        this.connectInput = $("#fp_connect_id")[0];
        this.mySessionUsers = $("#fp_my_session_users")[0];
        this.connectBtn = $("#fp_connect_btn")[0];
        this.createBtn.onclick = () => {
            if (Data.mySession)
                removeSession();
            else
                createSession();
        }
        this.connectBtn.onclick = () => {
            const cKey = $(this.connectInput).val();
            if (Data.connectedSession)
                disconnect()
            else
                connect(cKey)
        }

        $(elements.uidPlace).css("display", "none");
    }
}


const Data = {
    app: null,
    auth: null,
    set mySession(e) {
        console.log("New session value:", e)
        this._mySession = e;
        if (e) {
            $(elements.createBtn).text("Remove group");

            $(elements.mySessionKey).text(e.Key);
            $(elements.mySessionKey).css("display", "flex");
            
            $(elements.connectBtn).css("display", "none");
            $(elements.connectInput).css("display", "none");

            $(elements.mySessionUsers).css("display", "flex");

        } else {
            $(elements.createBtn).text("Create group");

            $(elements.mySessionKey).css("display", "none");

            $(elements.connectBtn).css("display", "flex");
            $(elements.connectInput).css("display", "flex");

            $(elements.mySessionUsers).css("display", "none");
        }
    },
    get mySession() {
        return this._mySession;
    },
    get uid() {
        return this._uid;
    },
    set uid(e) {
        this._uid = e
        $(elements.uidPlace).text(e.slice(0, 5));
    },
    get connectedSession() {
        return this._connectedSession;
    },
    set connectedSession(e) {
        console.log("Connected to:", e);
        this._connectedSession = e;
        if (e) {
            $(elements.connectBtn).text("Disconnect");
            $(elements.connectInput).prop('disabled', true);
            $(elements.connectInput).val(e);
            $(elements.createBtn).css("display", "none");
        } else {
            $(elements.connectBtn).text("Connect");
            $(elements.connectInput).prop('disabled', false);
            $(elements.createBtn).css("display", "flex");
        }
    },
    get mySessionUsers(){
        return this._mySessionUsers;
    },
    set mySessionUsers(e){
        $(elements.mySessionUsers).text(e);
        this._mySessionUsers = e;
    }
}

export function Load() {
    elements.InitElements();
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
        onValue(ref(getDatabase(), 'Sessions/' + Data.uid), (data) => {
            const dt = data.val();
            Data.mySession = data.val();
            let count = 0;
            if (dt&&dt.Users) {
                for (const dtKey in dt.Users) {
                    count++;
                }
            }
            Data.mySessionUsers = `${count}`;
        })
        onValue(ref(getDatabase(), 'Sessions'), (data) => {
            const dt = data.val();
            let mdf = false;
            for (const dataKey in dt) {
                const val = dt[dataKey];
                if (val.Users) {
                    if (val.Users[Data.uid]) {
                        Data.connectedSession = val["Key"];
                        mdf = true;
                    }
                }
            }
            if (!mdf) {
                Data.connectedSession = null;
            }
        });

    } else {
        console.log("No User")
    }
}

function connect(key) {
    console.log("connecting to:", key)
    get(ref(getDatabase(), 'Sessions')).then((data) => {
        const sessions = data.val();
        let sessionKey = null;
        for (const fdKey in sessions)
            if (sessions[fdKey].Key === key)
                sessionKey = fdKey;
        if (!sessionKey) {
            return;
        }
        const sessionUsersRef = ref(getDatabase(), 'Sessions/' + sessionKey + "/Users/" + Data.uid);
        set(sessionUsersRef, {state: "online"}).then();
    })
}

function disconnect() {
    get(ref(getDatabase(), 'Sessions')).then((data) => {
        const sessions = data.val();
        let sessionKey = null;
        for (const fdKey in sessions)
            if (sessions[fdKey].Key === Data.connectedSession)
                sessionKey = fdKey;
        console.log(sessionKey);
        if (!sessionKey) return;
        const sessionUsersRef = ref(getDatabase(), 'Sessions/' + sessionKey + "/Users/" + Data.uid);
        remove(sessionUsersRef).then();
    })
}

function createSession() {
    get(ref(getDatabase(), 'Sessions/' + Data.uid)).then((data) => {
        if (!data.val()) {
            set(ref(getDatabase(), 'Sessions/' + Data.uid), new fns.Session()).then();
        }
    });
}

function removeSession() {
    remove(ref(getDatabase(), 'Sessions/' + Data.uid)).then();
}

/*










function connectBtnClicked() {
    if(connectKey){
        disconnect()
    }else{
        connect();
    }
    
}



*/