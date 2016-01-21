//Give your component a name called HourForm - use React.createClass to create the object
HourForm = React.createClass({
  
  handleSubmit: function(e) {
    // Use the preventDefault function on the passed in event
    e.preventDefault();
    
    // Access the input fields using React.findDOMNode and store them in a variable
    var numHours = ReactDOM.findDOMNode(this.refs.numHours),
        hourDate = ReactDOM.findDOMNode(this.refs.hourDate);
    
    // Use Meteor's call function 
    // Pass the insertHour function as first parameter
    // Pass the hours value as the second parameter
    // Pass the date value as the third parameter - Use Moments toDate function to pass it as an ISO date
    // Pass an anonymous callback as the fourth parameter that alerts if something goes wrong
    Meteor.call('insertHour', numHours.value, moment(hourDate.value).toDate(), function(e, r) {
      if (e) alert(e.reason)      
    });
    
    // Reset the input values to empty strings
    numHours.value = '';
    hourDate.value = '';
  },
 
  render: function() {    
    // Return your JSX within brackets - the HTML should display a simple form with 
    // 2 input elements and a submit button
    return (
      <div className="panel panel-default">
        
        <div className="panel-heading">
          <h3 className="panel-title">Hours Spent Coding</h3>
        </div>
        
        <div className="panel-body">
          
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
          
            <div className="form-group">            
              <div className="col-sm-10">
                <input type="number" className="form-control" 
                    placeholder="How many hours?" ref="numHours" />
              </div>
            </div>

            <div className="form-group">            
              <div className="col-sm-10">
                <input type="date" className="form-control" ref="hourDate"/>
              </div>
            </div>
            
            <div className="form-group">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary btn-block">Add</button>
              </div>
            </div>

          </form>
        
        </div>

      </div>
    );
  }
});