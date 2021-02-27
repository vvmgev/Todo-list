import firebase from 'firebase'

// in this class I didn't cover the cases when request can fails

class FireBaseService {

    #db;
    #collectionName = 'users';

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBSQZcLzPBzeFRqGvwMOkb9TpU7ud1qr-A",
            authDomain: "todo-7b4ed.firebaseapp.com",
            projectId: "todo-7b4ed",
        };
        firebase.initializeApp(firebaseConfig)
        this.#db = firebase.firestore()
    }

    async addTask(id, text, todos) {
        const data = {
            todos: [{text, complete: false}, ...todos],
        }
        this.updateUser(id, data)
    }

    // this method also should be private
    // in this case it throws error as it still experemental
    async updateUser(id, data) {
        const docRef = await this.#db.collection(this.#collectionName).doc(id);
        docRef.update(data);
    }

    async updateStatus(id, complete, todos, index) {
        todos[index].complete = complete;
        const data = {todos};
        this.updateUser(id, data)
    }

    async getAllUsers() {
        const querySnapshot = await this.#db.collection(this.#collectionName).get();
        const arr = [];
        querySnapshot.forEach(item => arr.push({id: item.id, ...item.data()}));
        return arr;
    }

    async onChange(callback) {
        this.#db.collection(this.#collectionName)
        .onSnapshot(snapshot => {
            const data = [];
            snapshot.forEach(function(doc) {
                data.push({id: doc.id, ...doc.data()})
            });
            callback(data)
        })
    }
}


export default new FireBaseService();