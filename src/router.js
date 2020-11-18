import Vue from 'vue'
import Router from 'vue-router'
import ViewCourses from './views/ViewCourses.vue'
import Medical from './views/Medical.vue'
import Timetable from './views/Timetable.vue'
import ViewAttendance from './views/ViewAttendance.vue'
import ViewMahapolaEligibility from './views/ViewMahapolaEligibility.vue'
import ViewDetailedAttendance from './views/ViewDetailedAttendance.vue'
import ViewDetailedCourse from './views/ViewDetailedCourse.vue'
import ViewRegisteredStudents from './views/ViewRegisteredStudents.vue'
import ViewAlerts from './views/ViewAlerts.vue'
import MarkAttendance from './views/MarkAttendance.vue'
import RegisterUsers from './views/RegisterUsers.vue'
import SetMRAP from './views/SetMRAP.vue'
import SetMahapolaDuration from './views/SetMahapolaDuration.vue'
import ViewMentorGroups from './views/ViewMentorGroups.vue'
import ViewStudentDetails from './views/ViewStudentDetails.vue'
import ViewAttendanceSheet from './views/ViewAttendanceSheet.vue'
import SendAlert from './views/SendAlert.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ViewCourses',
      name: 'viewcourses',
      component: ViewCourses
    },
    {
      path: '/Medical',
      name: 'medical',
      component: Medical
    },
    {
      path: '/Timetable',
      name: 'timetable',     
      component: Timetable
    },
    {
      path: '/ViewAttendance',
      name: 'viewattendance',
      component: ViewAttendance
    },
    {
      path: '/MahapolaEligibility',
      name: 'mahapolaeligibility',
      component: ViewMahapolaEligibility
    },
    {
      path: '/DetailedAttendance',
      name: 'detailedattendance',
      component: ViewDetailedAttendance
    },
    {
      path: '/DetailedCourse',
      name: 'detailedcourse',
      component: ViewDetailedCourse
    },
    {
      path: '/RegisteredStudents',
      name: 'registeredstudents',
      component: ViewRegisteredStudents
    },
    {
      path: '/ViewAlerts',
      name: 'viewalerts',
      component: ViewAlerts
    },
    {
      path: '/MarkAttendance',
      name: 'markattendance',
      component: MarkAttendance
    },
    {
      path: '/RegisterUsers',
      name: 'registerusers',
      component: RegisterUsers
    },
    {
      path: '/SetMRAP',
      name: 'setmrap',
      component: SetMRAP
    },
    {
      path: '/SetMahapolaDuration',
      name: 'setmahapoladuration',
      component: SetMahapolaDuration
    },
    {
      path: '/ViewMentorGroups',
      name: 'viewmentorgroups',
      component: ViewMentorGroups
    },
    {
      path: '/ViewStudentDetails',
      name: 'viewstudentdetails',
      component: ViewStudentDetails
    },
    {
      path: '/ViewAttendanceSheet',
      name: 'viewattendancesheet',
      component: ViewAttendanceSheet
    },
    {
      path: '/SendAlert',
      name: 'sendalert',
      component: SendAlert
    },
  ]
})
