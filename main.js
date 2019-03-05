//Bring in axios to make requests
const axios =require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
   
} = require('graphql');





// student type
const StudentType = new GraphQLObjectType({
    name:'Student',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        groupid:{type:GraphQLString},
        age: {type: GraphQLInt},
    })
});
//Course type
const courseType = new GraphQLObjectType({
    name:'course',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        desc: {type: GraphQLString},
        teacher:{type:GraphQLString},
        
    })
});

//grade type
const gradeType = new GraphQLObjectType({
    name:'grade',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        desc: {type: GraphQLString},
        grade:{type:GraphQLInt},
        groupid:{type:GraphQLString},
        
    })
});

/* Find individual student. Pass the student id as argument, then, the fields we wanna get
{
  Student(id:"1"){
    id,
    name,
    email,
    age,
    groupid
  }
}*/
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Student:{
            type:StudentType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
            
                //Passing the student id, it returns the data from that student
                //it makes a request using axios to json server and returns it trough graphql
    return axios.get('http://localhost:3000/Students/'+args.id)//It returns a promise
    .then(res=>res.data);//Its maped to res.data
                

            }
        },
    
    //Getting individual course data. Tested
    /*{
  course(id:"2"){
    id,
    name,
    teacher,
    desc
    
  }
  } */

    course:{
        type:courseType,
        args:{
            id:{type:GraphQLString}
        },
        resolve(parentValue, args){
        

         
            //Passing the course id, it returns the data from that student
            //it makes a request using axios to json server and returns it trough graphql
return axios.get('http://localhost:3000/courses/'+args.id)//It returns a promise
.then(res=>res.data);//Its maped to res.data
            

        }
    },
    //individual grades
    /*query
    {
  grade(id:"2"){
    id,
    name,
    grade,
    desc
    
  }
  } */

    grade:{
        type:gradeType,
        args:{
            id:{type:GraphQLString}
        },
        resolve(parentValue, args){
        

         
          
return axios.get('http://localhost:3000/grades/'+args.id)//It returns a promise
.then(res=>res.data);//Its maped to res.data
            

        }
    },

        /*To fetch all the data
        {
  Students{
    id,
    name,
    email,
    age,
    groupid
  }
}*/ 
        Students:{
            type: new GraphQLList(StudentType),
            resolve(parentValue, args){
              //This was in use with the for  return Students;//The whole array is returned
              //Return all the students
              return axios.get('http://localhost:3000/Students/')//It returns a promise
              .then(res=>res.data);//Its maped to res.data
           
            }
        },
/* Tested all courses return
{
  courses{
    id,
    name,
    teacher,
    desc
  }
}*/
        courses:{
            type: new GraphQLList(courseType),
            resolve(parentValue, args){
              //This was in use with the for  return Students;//The whole array is returned
              //Return all the students
              return axios.get('http://localhost:3000/courses/')//It returns a promise
              .then(res=>res.data);//Its maped to res.data
           
            }
        },

        //Fetch all grades

        grades:{
            type: new GraphQLList(gradeType),
            resolve(parentValue, args){
              
              return axios.get('http://localhost:3000/grades/')//It returns a promise
              .then(res=>res.data);//Its maped to res.data
           
            }
        }


    }
});

//Mutations
/*example 
mutation{
 addStudent(name:"homer s", email:"simpson@hotmail.com", age:34, groupid:"first"){
  name,
  id,
  email,
  age,
  groupid,
}
}*/
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addStudent:{
            type:StudentType,
            args:{
                //ID is generated automatically
                name: {type: GraphQLString},
                email: {type:GraphQLString}, 
                groupid: {type: GraphQLString}, 
                age: {type: GraphQLInt},
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/students/',
              {name:args.name,
                email:args.email,
                groupid:args.groupid,
                age:args.age
                })
                .then(res=>res.data);
                }

       
            
                },
                //adding courses
                addcourse:{
                    type:courseType,
                    args:{
                        //ID is generated automatically
                        name: {type: GraphQLString},
                        desc: {type:GraphQLString}, 
                        teacher: {type: GraphQLString}, 
                        
                    },
                    resolve(parentValue,args){
                        return axios.post('http://localhost:3000/courses/',
                      {name:args.name,
                        desc:args.desc,
                        teacher:args.teacher,
                        
                        })
                        .then(res=>res.data);
                        }
        
               
                    
                        },
                         //adding grades
                addgrade:{
                    type:gradeType,
                    args:{
                        //ID is generated automatically
                        name: {type: GraphQLString},
                        desc: {type:GraphQLString}, 
                        grade: {type: GraphQLInt}, 
                        groupid:{type:GraphQLString}, 
                        
                    },
                    resolve(parentValue,args){
                        return axios.post('http://localhost:3000/grades/',
                      {name:args.name,
                        desc:args.desc,
                        grade:args.grade,
                        groupid:args.groupid,
                        
                        })
                        .then(res=>res.data);
                        }
        
               
                    
                        },

/*Deletes student
mutation{
deleteStudent(id:"1"){
  id
}
}
 */

deleteStudent:{
    type:StudentType,
    args:{
       
      id: {type: GraphQLString}, 
        
    },
    resolve(parentValue,args){
        return axios.delete('http://localhost:3000/students/'+args.id,)
        .then(res=>res.data);
       
        }


    
        },
/*same with grades
mutation{
deletegrade(id:"1"){
  id
}
}
*/
        deletegrade:{
            type:gradeType,
            args:{
               
              id: {type: GraphQLString}, 
                
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/grades/'+args.id,)
                .then(res=>res.data);
               
                }
        
        
            
                },

/*same with courses
mutation{
deletecourse(id:"1"){
  id
}
}
*/
deletecourse:{
    type:courseType,
    args:{
        
        id: {type: GraphQLString},
        
    },
    resolve(parentValue,args){
        return axios.delete('http://localhost:3000/courses/'+args.id,)
        .then(res=>res.data);
       
        }


    
        },
//Now to modify
/*Changing the age, then, showing the name, id, and new age
mutation{
editStudent(id:"3", age:70){
  id,
  name,
  age
}
} */
editStudent:{
    type:StudentType,
    args:{
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type:GraphQLString}, 
        groupid: {type: GraphQLString}, 
        age: {type: GraphQLInt},
    },
    resolve(parentValue,args){
        return axios.patch('http://localhost:3000/students/'+args.id,args,)
        .then(res=>res.data);
        }


    
        },
  //editing courses
  /**
   mutation{
editcourse(id:"3", name:"Mathematics"){
  id,
  name,
 
}
}
   */
  editcourse:{
    type:courseType,
    args:{
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        desc: {type:GraphQLString}, 
        teacher: {type: GraphQLString}, 
        
    },
    resolve(parentValue,args){
        return axios.patch('http://localhost:3000/courses/'+args.id,args,)
     
        .then(res=>res.data);
        }


    
        },
         //editing grades
         /*
         mutation{
editgrade(id:"2", grade:5){
  id,
  name,
  grade
 
}
}
         */
editgrade:{
    type:gradeType,
    args:{
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        desc: {type:GraphQLString}, 
        grade: {type: GraphQLInt}, 
        groupid:{type:GraphQLString}, 
        
    },
    resolve(parentValue,args){
        return axios.patch('http://localhost:3000/grades/'+args.id,args,)
        .then(res=>res.data);
        }


    
        },

//Fin
        }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
    
});