export default [
 {
   name: 'list',
   method: 'GET',
   path: '/article/list/:workspace',
   params: {
     workspace: ''
   }
 },
 {
   name: 'detail',
   method: 'GET',
   path: '/article/detail/:id',
   params: {
     id: ''
   }
 },
 {
   name: 'move',
   method: 'POST',
   path: '/article/move',
   params: {
     id: '',
     origin: '',
     target: ''
   }
 },
 {
   name: 'save',
   method: 'POST',
   path: '/article/save',
   params: {
     id: '',
     origin: '',
     target: ''
   }
 },
 {
   name: 'deleteSource',
   method: 'GET',
   path: '/article/deleteSource',
   params: {
     id: ''
   }
 }
]
