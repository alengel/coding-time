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

  // Create a data object and return it
  mapData: function() {     
    // Create a key - value store using q on the y-axis and label on x-axis
    var data = [
      { q: 0, label: 'Mon' },
      { q: 0, label: 'Tue' },
      { q: 0, label: 'Wed' },
      { q: 0, label: 'Thu' },
      { q: 0, label: 'Fri' },
      { q: 0, label: 'Sat' },
      { q: 0, label: 'Sun' }
    ];

    // Loop over the data variable and map the dates from the database to a day of the week
    this.data.hours.map(function(d) {
      data[moment(d.date).weekday()].q += d.hours;
    });
    
    // Return the data variable
    return data;
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
              <HourList data={this.data.hours}/>    
            </div>
   
            <div className="col-md-offset-2 col-md-6"> 
              <HourChart data={this.mapData()} />
            </div>

          </div>  

        </div>

      </div>    
    );
  }
});
