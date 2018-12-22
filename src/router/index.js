import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import AppMain from '@/views/AppMain'
import CreateDoc from '@/views/create-doc/index'
import Main from '@/views/main/index'
import GenQR from '@/views/gen-qr/index'
import PrintQRCode from '@/views/gen-qr/PrintQRCode'
import ScanQR from '@/views/scan-qr/index'
import ScanQRItem from '@/views/scan-qr/ScanItem'
import SaveDocument from '@/views/save-doc/index'
import ManageUser from '@/views/manage-user/index'
import DocumentStatus from '@/views/doc-status/index'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/print',
      name: 'print-qr-code',
      component: PrintQRCode
    },
    {
      path: '/',
      component: AppMain,
      children: [
        {
          path: '',
          name: 'main',
          component: Main
        },
        {
          path: 'create-doc',
          name: 'create-doc',
          component: CreateDoc
        },
        {
          path: 'gen-qr',
          name: 'gen-qr',
          component: GenQR
        },
        {
          path: 'scan-qr-code',
          name: 'scan-qr-code',
          component: ScanQR
        },
        {
          path: 'scan-qr-item',
          name: 'scan-qr-item',
          component: ScanQRItem
        },
        {
          path: 'save-document',
          name: 'save-document',
          component: SaveDocument
        },
        {
          path: 'manage-user',
          name: 'manage-user',
          component: ManageUser
        },
        {
          path: 'document-status',
          name: 'document-status',
          component: DocumentStatus
        }
      ]
    }
  ]
})
