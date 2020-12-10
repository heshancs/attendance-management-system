<template>
  <v-container>
    <p class='text-h5'>View My Mentoring Groups</p>      

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
        :headers="headers"
        :items="filteredStudents" 
        :items-per-page="10"
        :search="searchReg || searchName"
         v-on:click:row="selectCourse"
        class="elevation-1">
        <template v-slot:item.percentage="{ item }">
          <v-chip
            :color="getColor(item.percentage)"
            dark>
                {{ item.percentage }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>    
  </v-container>
</template>

<script>
import { MentorsStudent } from "../data/data";
  export default {
    data () {
      return {
        searchReg: '',
        searchName: '',
        filteredStudents: null,
        selectedLevel: '',
        headers: MentorsStudent.headers,
        students: MentorsStudent.students,
        levels: MentorsStudent.levels,
       
      }
    },
    methods: {
      filterLevels(selected) {
        if(selected!=null){
          this.selectedLevel = selected;
          this.filteredStudents = this.students.filter(student => student.level === selected)
        }        
      },
      resetStudents(){
        this.selectedLevel = ''
        this.filteredStudents = this.students
      },
      resetDisplayed(){
        this.filteredStudents = this.students.filter(student => student.level === this.selectedLevel)
      },
      getColor(percentage){
            if(percentage < 80) return 'red'
            else if(percentage > 80) return 'green'
            else return 'orange'
        },
        selectCourse(course){
          this.$router.push("/SetMahapolaDuration");
      }
    },
    
    beforeMount(){
      this.resetStudents()
    }
  }
</script>