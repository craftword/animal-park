//HOME SECTION

// Sign Ups
$("#signup").on('click', function(e){
        e.preventDefault();
    
      var formData = {
            'name' : $('#name').val(),
            'email'  : $('#email').val(),
            'password': $('#password').val(),
            'phone' : $('#phone').val(),
            'role':'user'
            
        };

        console.log(formData);
    
      $.ajax({	
              
          url:' http://localhost:3000/users',
          type:'POST',
          data:formData,
          dataType: 'json',
          success:function(data) {
                console.log(data);
                let obj = {"id":data.id, 'name':data.name, 'role':data.role}
                localStorage.setItem("data", JSON.stringify(obj));
                window.location.href='admin/dashboard.html';
                
          },
          error: function(){
               alert('something went wrong'); 
            }				
        }); 
       
      });
  // Sign In
 $("#signin").on('click', function(e){
        e.preventDefault();
       var formData = {
            'email'  : $('#email1').val(),
            'password': $('#password1').val()           
            
        };
        
         $.ajax({	
                
        url:'http://localhost:3000/users',
        method: 'GET',
        dataType: 'json',
        success:function(data) {
                             
             let count = 0; 
            data.forEach(function(currentValue, index){
               if(currentValue.email === formData.email && currentValue.password === formData.password ) {
                   let obj = {"id":currentValue.id, 'name':currentValue.name, 'role':currentValue.role}
                   localStorage.setItem("data", JSON.stringify(obj));
                   ++count;                    
               }                            
               
            });
            console.log(count); 
            if(count > 0) {                
                console.log(count);
                //alert("welcome");
                window.location.replace('admin/dashboard.html');
            } else {

                window.location.reload();
                console.log('err');

            }
               
               
            
        
        },
        error: function(){
               alert('something went wrong'); 
            }				
    });	


}); 


// ADMIN SECTION
// Logout
 $("#logout").on('click', function(e){
        e.preventDefault();
    localStorage.clear();
    window.location.href='../index.html';

});



// ANIMAL SECTION 

// GET ALL ANIMALS
$(document).ready(function(){
// upload data in table
$.ajax({	
              
	  url:' http://localhost:3000/animals',
	  method: 'GET',
	  dataType: 'json',
	  success:function(data) {
          console.log(data);
          data.forEach(function(currentValue, index){
               var txt = "<tr><td>"+currentValue.name+"</td><td>"+currentValue.scientificname+"</td><td>"+currentValue.species+"</td><td>"+currentValue.likes+"</td><td><a href='view.html?"+currentValue.id+"' class='btn btn-xs btn-danger'>view</a> ";  
               txt += (obj.role === 'admin' ? "<a href='edit.html?"+currentValue.id+"' class='btn btn-xs btn-warning'>Edit</a> <a href='#' class='btn btn-xs btn-info' name='"+currentValue.id+"'>Delete</a></td></tr>":"");
                
               $('#animalTable').append(txt);
               console.log(currentValue);
        
       });
	},
  error: function(){
    alert('something went wrong'); 
   }
 });	

//CREATE AN ANIMALS
   $("#create").on('click', function(){
      var formData = {
            'name'              : $('#name').val(),
            'scientificname'    : $('#science').val(),
            'description'    : $('#textarea1').val(),
            'species'    : $('#species').val(),
            'image'    : $('#image').val(),
            'likes'    : 0,
        };
      $.ajax({	
              
          url:' http://localhost:3000/animals',
          type:'POST',
            data:formData,
          dataType: 'json',
          success:function(data) {
                console.log(data);
                $('#animalModal').modal('hide')
                location.reload();
                
          },
          error: function(){
               alert('something went wrong'); 
            }				
        }); 
       
      });

   

 });



//EDIT AN ANIMALS
$(document).ready(function(){    
 var query = window.location.search.substring(1);
  console.log(query);
    $.ajax({	
                
        url:' http://localhost:3000/animals/'+ query,
        method: 'GET',
        dataType: 'json',
        success:function(data) {
            console.log(data);
                  var txt = "<div class='col-xs-6'><div class='form-group'><input type='text' class='form-control' id='name' value='"+data.name+"'></div></div>";
                    txt += "<div class='col-xs-6'><div class='form-group'><input type='text' class='form-control' id='science' value='"+data.scientificname+"'></div></div>";              
                    txt +="<div class='col-xs-12'><div class='form-group'><textarea class='form-control' id='textarea1' rows='3'>"+data.description+"</textarea></div></div>";
                    txt +="<div class='col-xs-6'><div class='form-group'><select class='form-control' id='species' value='"+data.species+"'><option>Mammalia</option><option>Aves</option><option>Amphibia</option><option>Reptilia</option><option>Fish</option></select></div></div>";
                    txt +="<div class='col-xs-6'><div class='form-group'><input type='text' class='form-control' id='image' value='"+data.image+"'></div></div>";
                    
                    
                  $('.details').append(txt);
                  
              
        
        },
        error: function(){
               alert('something went wrong'); 
            }				
    });	
    
    $("#update").on('click', function(){
        
        
        var formData = {
                'name'              : $('#name').val(),
                'scientificname'    : $('#science').val(),
                'description'    : $('#textarea1').val(),
                'species'    : $('#species').val(),
                'image'    : $('#image').val(),
                
            };
        console.log(formData);    
        $.ajax({	
                
            url:' http://localhost:3000/animals/'+ query,
            type:'PATCH',
            data:formData,
            dataType: 'json',
            success:function(data) {
                    console.log(data);
                    location.reload();
                    
            },
            error: function(){
               alert('something went wrong'); 
            }				
            }); 
          
        });
  
});

//VIEW AN ANIMALS
$(document).ready(function(){    
 var query = window.location.search.substring(1);
  console.log(query);
    $.ajax({	
                
        url:' http://localhost:3000/animals/'+ query,
        method: 'GET',
        dataType: 'json',
        success:function(data) {
            console.log(data);
                  var txt = "<div class='col-sm-6 text-left'><h2>"+data.name+"</h2><i>"+data.scientificname+"</i> <br />";
                  txt += "<h5><strong> Description:</strong> </h5>"+data.description+"<h6><strong> Species: </strong></h6>"+data.species+"<br />";
                  txt += "<h6><label name='"+data.likes+"'><strong>Likes: </strong></label></h6>"+data.likes+"  <button class='btn btn-xs btn-danger' id='likes' name='"+data.id+"'>Like</button></div>";
                  txt += "<div class='col-sm-6'><img class='thumbnail img-responsive' src='"+data.image+"' alt='"+data.name+"' class='rounded-0'></div>";   
                    
                  $('.viewDetails').append(txt);
                  
              
        
        },
        error: function(){
               alert('something went wrong'); 
            }				
    });  
 });
 
 //likes
    $(document).on("click", '#likes', function(event){
        event.preventDefault();
        let id = $(this).attr("name");
        let likes = $('label').attr("name");
        ++likes
        let data = {
            "likes":likes
        } 
        $.ajax({	
                
            url:' http://localhost:3000/animals/'+ id,
            type:'PATCH',
            data:data,
            dataType: 'json',
            success:function(data) {
                location.reload();
                    
            },
            error: function(){
               alert('something went wrong'); 
            }				
        }); 
          
        

        
    });

//DELETE AN ANIMALS
 $(document).on("click", '.btn-info', function(event){
        event.preventDefault();
        let checkConfirm = confirm('Are You Sure You Want Delete It');
        if(checkConfirm == true) {
             var id = $(this).attr("name");
        
        $.ajax({
            url: '  http://localhost:3000/animals/'+id,
            type:'DELETE',
            success : function(data){
                alert('deleted successfully');
                location.reload(true);
            },
            error: function(){
               alert('something went wrong'); 
            }
        });
        } else {
            location.reload(true);
        }
       
    }); 


  


