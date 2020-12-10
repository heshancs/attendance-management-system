<template>
  <v-container>
    <p class='text-h5'>View Mentor Groups</p>      

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
            <v-text-field
              v-model="searchReg"
              label="Search"
              placeholder="Enter Registration Number"
              append-icon="mdi-magnify"
              outlined
              clearable
              single-line>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="searchName"
              label="Search"
              placeholder="Enter Name"
              append-icon="mdi-magnify"
              outlined
              clearable
              single-line>
            </v-text-field>
          </v-col>
        </v-row>       
      </v-card-title>

      <v-data-table
        loading="isLoading"
        :headers="headers"
        :items="filteredStudents"
        :items-per-page="10"
        :search="searchReg || searchName"
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
import { viewMentorGroups } from "../data/data";
  export default {
    data () {
      return {
        isLoading: true,
        searchReg: '',
        searchName: '',
        filteredStudents: [],
        students:[],
        courses:[],
        selectedLevel: '',
        headers: viewMentorGroups.headers,
       // students: viewMentorGroups.students,
        levels: viewMentorGroups.levels,
       
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
        const token = this.getToken();
        const user = this.getUser();        

          const mentor_id = user.username;
          const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/mentor/",{
            mentor_id,
          });
          console.log(result);
          this.students = result.data.students;
      
      },
      filterLevels(selected) {
        if(selected!=null){
          this.selectedLevel = selected;
          this.filteredStudents = this.students.filter(student => students.level === selected)
        }        
      },
      resetStudents(){
        this.selectedLevel = ''
        this.filteredStudents = this.students
      },
      resetDisplayed(){
        this.filteredStudents = this.students.filter(students => students.level === this.selectedLevel)
      },
      selectStudent(student){
         this.setStudent({
           registration_no: student.registration_no,
           student_name: student.student_name
         });
          this.$router.push("/extraCourses");
      }
    },
    async mounted(){
      try {
        //this.getStudents();
        this.getStudents().then(() => {
        this.resetStudents();
        this.isLoading = false;
        });
      } catch(err) {
        console.log(err.toString());
      }
    }
  }
</script>