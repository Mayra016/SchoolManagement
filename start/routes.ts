/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import StudentController from '#controllers/StudentController'
import Controller from '#controllers/Controller'
import ProfesorController from '#controllers/ProfesorController'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// COMMON ROUTES
router.post('/registrate', [Controller, 'registrate'])

router.delete('/delete/:id', [Controller, 'delete'])

router.get('/profile/:id', [Controller, 'profile'])


// STUDENT ROUTES
router.patch('/student/edit', [StudentController, 'edit'])

router.get('/student/cronogram/:student_id', [StudentController, 'getSchedule'])


// PROFESOR ROUTES
router.patch('/professor/edit', [ProfesorController, 'edit'])

router.post('/professor/create/classroom', [ProfesorController, 'createClassroom'])

router.patch('/professor/edit/classroom', [ProfesorController, 'editClassroom'])

router.delete('/professor/delete/classroom/:id', [ProfesorController, 'deleteClassroom'])

router.get('/professor/get/classroom/:id', [ProfesorController, 'getClassroom'])

router.patch('/professor/add/student/:student_id/classroom/:classroom_id', [ProfesorController, 'addStudentToClassroom'])

router.delete('/professor/remove/student/:student_id/classroom/:classroom_id', [ProfesorController, 'removeStudentFromClassroom'])

router.get('/professor/students-from-classroom/:id', [ProfesorController, 'getAllStudentsFromClassroom'])