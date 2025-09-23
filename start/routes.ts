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

router.delete('/student/delete', [StudentController, 'delete'])

router.get('/student/cronogram', [StudentController, 'getCronogram'])

// PROFESOR ROUTES
router.patch('/professor/edit', [ProfessorController, 'edit'])

router.post('/professor/create/classroom', [ProfessorController, 'createClassroom'])

router.patch('/professor/edit/classroom', [ProfessorController, 'editClassroom'])

router.delete('/professor/delete/classroom/:id', [ProfessorController, 'deleteClassroom'])

router.get('/professor/get/classroom', [ProfessorController, 'getClassroom'])

router.patch('/professor/add/student/:student_id/classroom/:classroom_id', [ProfessorController, 'addStudentToClassroom'])

router.delete('/professor/remove/student/:student_id/classroom/:classroom_id', [ProfessorController, 'removeStudentFromClassroom'])

router.get('/professor/students-from-classroom', [ProfessorController, 'getAllStudentsFromClassroom'])