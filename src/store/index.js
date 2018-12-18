import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import style from './modules/style_module'
import moment from 'moment'
require('firebase/database')
require('firebase/auth')
const { config } = require('@/config')

const app = firebase.initializeApp(config)

const db = app.database()
const documentRef = db.ref('documents')

Vue.use(Vuex)
const state = {
  documents: []
}

const getters = {
}

const actions = {
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
    console.log(result)
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
  async removeDocument ({commit}, payload) {
    const result = await documentRef.child(payload.firebaseId).remove()
    return result
  },
  bindDocumnetsRef: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('documents', documentRef)
  }),
  unbindDocumnetsRef: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef('documents')
  })
}
const mutations = {
  ...firebaseMutations,
  SET_DOCUMENTS (state, payload) {
    state.documents = payload
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
