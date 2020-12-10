<template>
  <v-container>
      <p class='text-h5'>All Students in Department </p>   

      <v-card>
          <v-card-title>
            <v-row>
                <v-col>
                    <v-select
                    :items="levels"
                    label="Select Level"
                    outlined
                    clearable
                    v-on:change="filterLevels"
                    v-on:click:clear="resetStudents">
                    </v-select>
                </v-col>
                <v-col>
                    <v-select
                    :items="degrees"
                    label="Select Degree Program"
                    outlined
                    clearable
                    :disabled = "this.selectedLevel==''"
                    v-on:change="filterDegrees"
                    v-on:click:clear="resetDisplayed">
                    </v-select>
                </v-col>
                <v-col>
                    <v-text-field
                    v-model="search"
                    label="Search"
                    placeholder="Enter Registration Number or Name to search"
                    append-icon="mdi-magnify"
                    outlined
                    clearable
                    single-line>
                    </v-text-field>
            </v-col>
            </v-row>
        </v-card-title>

        <v-data-table
        :headers="headers"
        :items="filteredStudents"
        :items-per-page="10"
        :search="search"
        v-on:click:row="selectStudent"
        class="elevation-1">
        <template v-slot:item.attendance_percentage="{ item }">
          <v-chip
            :color="getColor(item.attendance_percentage)"
            dark>
                {{ item.attendance_percentage }}
          </v-chip>
        </template>
        </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
import { viewAllStudents } from "../data/data";
export default {
    data() {
        return {
            search: '',
            filteredStudents: null,
            selectedLevel: '',
            //students:[],
           headers:viewAllStudents.headers,
           students:viewAllStudents.students,
           levels:viewAllStudents.levels,
           degrees:viewAllStudents.degrees,
        }
    },
    methods: {
        ...mapMutations(["setStudent"]),   
      ...mapGetters(["getToken", "getUser"]),
        getColor(percentage){
            if(percentage < 80) return 'red'
            else if(percentage > 80) return 'green'
            else return 'orange'
        },
        async getStudents() {
        
          const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/registration_no/",{
            registration_no,
          });
          console.log(result);
          this.students = result.data.students;
      
      },
        filterLevels(selected) {
            if(selected!=null){
                this.selectedLevel = selected;
                this.filteredStudents = this.students.filter(student => student.level === selected)
            }        
        },
        filterDegrees(selected) {
            if(selected!=null)
                this.filteredStudents = this.students.filter(student => student.degree === selected && student.level === this.selectedLevel)
        },
        resetStudents(){
            this.selectedLevel = ''
            this.filteredStudents = this.students
        },
        resetDisplayed(){
            this.filteredStudents = this.students.filter(student => student.level === this.selectedLevel)
        },
        selectStudent(student){
         this.setStudent({
           registration_no: student.registration_no,
           student_name: student.student_name
         });
          this.$router.push("/ViewStudentDetails");
      }
    },
    beforeMount(){
      this.resetStudents()
    }
}
</script>

<style>

</style>