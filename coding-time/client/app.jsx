//Give your component a name called App - use React.createClass to create the object
App = React.createClass({
  // Add the ReactMeteorData mixin - we need to connect our data to our view
  mixins: [ReactMeteorData],
  
  // Get data from the database and store it in the hours variable 
  getMeteorData: function() {
    return {
      hours: Hours.find({}).fetch()
    }
  },
  
  // Use React's render function and write some JSX (which uses regular HTML) 
  // to support our 2 column structure and a div for each component we will have
  render: function() {
    //Return the JSX inside of brackets  
    return (
      <div>
        
        <div className="page-header text-center">
          <h1>
            <i className="fa fa-clock-o"></i> Hours Spent Coding 
          </h1>
        </div>
 
        <div className="container">
          
          <div className="row">
            
            <div className="col-md-4">
              <HourForm />    
            </div>
   
            <div className="col-md-offset-2 col-md-6"> 

            </div>

          </div>  

        </div>

      </div>    
    );
  }
});
