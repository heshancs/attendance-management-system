<template>
  <v-container>
    <v-row>
        <p class='text-h5'>View Registered Students</p>
    </v-row>
    <v-row>
        <v-col>
            <v-card>
                <br>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col>
                        <p>Course Code :</p>
                    </v-col>
                    <v-col>
                        <v-chip>{{course.course_code}}</v-chip>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                        <p>Course Title :</p>
                    </v-col>
                    <v-col>
                        <v-chip>{{course.course_title}}</v-chip>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="8">
                        <v-card>
                            <v-card-title>
                                <v-text-field
                                    v-model="search"
                                    label="Search"
                                    placeholder="Enter Student Registration Number or Name to search"
                                    append-icon="mdi-magnify"
                                    outlined
                                    clearable
                                    single-line>
                                </v-text-field>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table
                                :search="search"
                                :headers="headers"
                                :items="student"                            
                                :items-per-page="5" >
                                    <template v-slot:student.percentage="{ student }">
                                        <v-chip
                                            :color="getColor(student.percentage)"
                                            dark>
                                                {{ student.percentage }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item.actions="{ item }">            
                                        <v-btn
                                            small
                                            @click="sendAlert(item)">
                                            <v-icon>mdi-message-alert</v-icon>
                                            Send Alert      
                                        </v-btn>
                                    </template>
                                   
                                </v-data-table>
                            </v-card-text>                            
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>        
    </v-row>
  </v-container>
</template>

<script>
import { viewRegisteredStudents } from '../data/data';
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            course:[],
            student:[],
            search:'',
            //search: '',
           // course:viewRegisteredStudents.course,
            //students: viewRegisteredStudents.students,
            headers:viewRegisteredStudents.headers,
            
        }
    },
    methods: {
        ...mapGetters(["getCourse"]),
        ...mapMutations(['setStudent']),
        
        getColor(percentage){
            if(percentage < 80) return 'red'
            else if(percentage > 80) return 'green'
            else return 'orange'
        },
        async setData(){
            this.course = this.getCourse();
            //this.selectedDate = this.$store.state.selectedDate;
            const co_id = this.course.co_id;
            //const co_id = this.course.co_id;
            //const date = this.selectedDate;
        //     this.date = this.getDate();
            // console.log(this.selectedDate);
            //console.log(this.course.co_id);
            //const year = '2020';

             return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/co_id/",{
             co_id,
             })
             .then(async result => {
                this.student = result.data.students;
                //console.log(result);
               // this.date_time = attendanceData.date_time;               
            })
            .catch(err => {
                console.log(err);
            });
        },
        sendAlert(student){
            this.setStudent({
                registration_no: student.registration_no,
                name: student.student_name,
                //level: student.level,
                mentor_name: student.lecturer_name,
                mentor_id: student.mentor_id
            });
            //console.log(student.lecturer_name);
            this.$router.push("/sendAlert");
        }
    },
    async created() {
        await this.setData();
    }
}
</script>

<style>

</style>