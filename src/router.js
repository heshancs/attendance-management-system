import Vue from 'vue'
import Router from 'vue-router'
import Courses from './views/Courses.vue'
import Medical from './views/Medical.vue'
import Timetable from './views/Timetable.vue'
import ViewAttendance from './views/ViewAttendance.vue'
import ViewMahapolaEligibility from './views/ViewMahapolaEligibility.vue'
import ViewDetailedAttendance from './views/ViewDetailedAttendance.vue'
import ViewAlerts from "./views/ViewAlerts.vue"
import MarkAttendance from "./views/MarkAttendance.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Courses',
      name: '',
      component: Courses
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
      path: '/ViewAlerts',
      name: 'viewalerts',
      component: ViewAlerts
    },
    {
      path: '/MarkAttendance',
      name: 'markattendance',
      component: MarkAttendance
    },
  ]
})
