class Auth{
    constructor() {
        this.authenticated = false;
        this.userId = false;
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }
    
    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthed(){
        return this.authenticated;
    }
}

export default new Auth();