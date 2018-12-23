import Vue from 'vue'
import Vuex from 'vuex'
import style from './modules/style_module'
import moment from 'moment'
const firebase = require('firebase/app')
require('firebase/database')
require('firebase/auth')
require('firebase/storage')
const { config } = require('@/config')
firebase.initializeApp(config)
const storage = firebase.storage().ref()
let provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  'display': 'popup'
})
const db = firebase.database()
const documentRef = db.ref('documents')
const backUpDocumentRef = db.ref('backUpDocuments')
const userRef = db.ref('users')
Vue.use(Vuex)
const state = {
  documents: [],
  scanQRCodeDocuments: [],
  backupDocuments: [],
  user: {},
  users: []
}

const getters = {
  user: state => state.user,
  receiveIdArray: (state) => {
    let result = []
    state.documents.forEach(element => {
      if (result.findIndex(res => res === element.receiveId) === -1) {
        result.push(element.receiveId)
      }
    })
    return result
  },
  documentIdArray: (state) => {
    let result = []
    state.documents.forEach(element => {
      if (result.findIndex(res => res === element.documentId) === -1) {
        result.push(element.documentId)
      }
    })
    return result
  },
  fromArray: (state) => {
    let result = []
    state.documents.forEach(element => {
      if (result.findIndex(res => res === element.from) === -1) {
        result.push(element.from)
      }
    })
    return result
  },
  nameArray: (state) => {
    let result = []
    state.documents.forEach(element => {
      if (result.findIndex(res => res === element.name) === -1) {
        result.push(element.name)
      }
    })
    return result
  },
  toArray: (state) => {
    let result = []
    state.documents.forEach(element => {
      if (result.findIndex(res => res === element.to) === -1) {
        result.push(element.to)
      }
    })
    return result
  },
  workArray: (state) => {
    let result = []
    state.documents.forEach(element => {
      if (element.work !== '' && (result.findIndex(res => res === element.work) === -1)) {
        result.push(element.work)
      }
    })
    return result
  }
}

const actions = {
  logout ({commit}) {
    firebase.auth().signOut().then(() => {
      commit('LOG_OUT')
    })
  },
  async changeRoles ({commit}, payload) {
    if (payload.roles !== 'user') {
      const temp = await userRef.orderByChild('roles').equalTo(payload.roles).once('value')
      const userResult = temp.val()
      for (const key in userResult) {
        await userRef.child(key).update({
          roles: 'user'
        })
      }
    }
    await userRef.child(payload.firebaseId).update({
      roles: payload.roles
    })
  },
  async getAllUsers ({commit}, payload) {
    const snapshot = await userRef.once('value')
    const rawData = snapshot.val()
    let data = []
    for (const key in rawData) {
      if (rawData.hasOwnProperty(key)) {
        data.push({
          firebaseId: key,
          ...rawData[key]
        })
      }
    }
    await commit('SET_USERS', data)
  },
  async createDocument ({commit}, payload) {
    const result = await documentRef.push({
      user: payload.user,
      receiveDate: moment(payload.receiveDate).format('DD-MM-YYYY'),
      date: moment(payload.date).format('DD-MM-YYYY'),
      receiveId: payload.receiveId,
      documentId: payload.documentId,
      from: payload.from,
      to: payload.to,
      name: payload.name,
      work: payload.work,
      status: payload.status,
      note: payload.note
    })
    return result
  },
  async register ({commit}, payload) {
    let finalResult = {
      success: 1,
      message: ''
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    } catch (error) {
      finalResult.success = 0
      finalResult.message = error.message
    }
    return finalResult
  },
  forgotPassword ({commit}, payload) {
    firebase.auth().sendPasswordResetEmail(payload)
  },
  async login ({commit}, payload) {
    let finalResult = {
      success: 1,
      message: ''
    }
    try {
      let result = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      let userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        roles: 'user'
      }
      const temp = await userRef.orderByChild('email').equalTo(userData.email).once('value')
      const userResult = temp.val()
      if (userResult !== null) {
        const key = Object.keys(userResult)[0]
        userData = userResult[key]
      } else {
        await userRef.push(userData)
      }
      commit('SET_USER', userData)
    } catch (error) {
      finalResult.success = 0
      finalResult.message = 'Email หรือ Password ไม่ถูกต้อง'
      console.log(error)
    }
    return finalResult
  },
  loginWithGoogle ({commit}) {
    firebase.auth().signInWithPopup(provider).then(async (result) => {
      let userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        roles: 'user'
      }
      const temp = await userRef.orderByChild('email').equalTo(userData.email).once('value')
      const userResult = temp.val()
      if (userResult !== null) {
        const key = Object.keys(userResult)[0]
        userData = userResult[key]
      } else {
        await userRef.push(userData)
      }
      commit('SET_USER', userData)
    })
  },
  async getDocuments ({commit}, payload) {
    const snapshot = await documentRef.once('value')
    const rawData = snapshot.val()
    let data = []
    for (const key in rawData) {
      if (rawData.hasOwnProperty(key)) {
        data.push({
          firebaseId: key,
          ...rawData[key]
        })
      }
    }
    await commit('SET_DOCUMENTS', data)
  },
  async getBackUpDocuments ({commit}) {
    const snapshot = await backUpDocumentRef.once('value')
    const rawData = snapshot.val()
    let data = []
    for (const key in rawData) {
      if (rawData.hasOwnProperty(key)) {
        data.push({
          firebaseId: key,
          ...rawData[key]
        })
      }
    }
    await commit('SET_BACK_UP_DOCUMENTS', data)
  },
  async getScanQRCodeDocuments ({commit}, payload) {
    let receiveId = payload.split(':;:')
    let data = []
    for (let i = 0; i < receiveId.length; i++) {
      const temp = await documentRef.orderByChild('receiveId').equalTo(receiveId[i]).once('value')
      const result = temp.val()
      if (result !== null) {
        const key = Object.keys(result)[0]
        data.push(result[key])
      }
    }
    console.log(data)
    await commit('SET_SCAN_QR_CODE_DOCUMENT', data)
  },
  async removeDocument ({commit}, payload) {
    const result = await documentRef.child(payload.firebaseId).remove()
    return result
  },
  async createSaveDocument ({ commit }, payload) {
    const message = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
    let name = ''
    for (let i = 0; i < 5; i++) {
      name += message.charAt(Math.floor(Math.random() * message.length))
    }
    console.log(payload.file)
    await storage.child(`documents/${name}.pdf`).put(payload.file)
    const dowloadUrl = await storage.child(`documents/${name}.pdf`).getDownloadURL()
    const result = await backUpDocumentRef.push({
      user: payload.user,
      receiveDate: moment(payload.receiveDate).format('DD-MM-YYYY'),
      date: moment(payload.date).format('DD-MM-YYYY'),
      receiveId: payload.receiveId,
      documentId: payload.documentId,
      from: payload.from,
      to: payload.to,
      name: payload.name,
      work: payload.work,
      dowloadUrl
    })
    return result
  }
}
const mutations = {
  SET_DOCUMENTS (state, payload) {
    state.documents = payload.reverse()
  },
  SET_SCAN_QR_CODE_DOCUMENT (state, payload) {
    state.scanQRCodeDocuments = payload
  },
  SET_BACK_UP_DOCUMENTS (state, payload) {
    state.backupDocuments = payload
  },
  LOG_OUT (state) {
    state.user = {}
  },
  SET_USER (state, data) {
    state.user = data
  },
  SET_USERS (state, payload) {
    state.users = payload
  }
}

const modules = {
  style
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
