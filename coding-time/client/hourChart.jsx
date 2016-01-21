//Give your component a name called HourChart - use React.createClass to create the object
HourChart = React.createClass({

  // Create the SVG when component is mounted and call renderChart
  componentDidMount: function() {   
    // Get the div from this component using findDOMNode
    var el = ReactDOM.findDOMNode(this),
    // Create a canvas (svg) using D3s select method and 
    // this.props.weight & this.props.height as attributes
        svg = d3.select(el)
                .append('svg')
                .attr('width', this.props.width)
                .attr('height', this.props.height);
    
    // Call this.renderChart and pass props      
    this.renderChart(this.props);
  },

  // Call the renderChart function with the newly passed props
  componentWillUpdate: function(newProps) {      
    this.renderChart(newProps);
  },

  // Set default props here 
  getDefaultProps: function() {
    // Set a default for width & height
    return {
      width: 590,
      height: 350
    }
  },

  // Render the D3 chart using the passed in props
  renderChart: function(props) {
    // Store this.props.data in a variable
    var data = this.props.data,
    // Use _ max function to return the maximum value from q
        max = _.max(_.pluck(data, 'q')),
    // Use D3s select to get the svg
        svg = d3.select('svg'),
    // Select all 'rect' from svg - use selectAll 
        bars = svg.selectAll('rect').data(data),
    // Construct a new linear scale https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear for the y axis
        yScale = d3.scale.linear()
                   .domain([0, max])
                   .range([0, props.height - 35]),
    // Construct a new ordinal scale https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal for the x axis
        xScale = d3.scale.ordinal()
                   .domain(d3.range(data.length))
                   .rangeRoundBands([0, props.width], 0.05);

    // Set up the code for the bars
    this.setupBars(bars, xScale, yScale);

    // Set up the labels for the x axis
    this.setupQLabels(svg, xScale, yScale);

    // Set up the labels for each bar 
    this.setupLabels(svg, xScale);
  },

  setupBars: function(bars, xScale, yScale) {
    var self = this;

    // Use D3s enter to start the bars https://github.com/mbostock/d3/wiki/Selections#enter
    bars.enter()
        .append('rect')
        .attr('fill', '#337ab7')         

    // Use D3s transition to start a transition for the bars https://github.com/mbostock/d3/wiki/Selections#transition
    bars.transition()
        .duration(1000) // Use a duration of 1 second
        .attr('x', function(d, i) {         
          // Return xScale for this - pass i
          return xScale(i);
        })
        .attr('y', function(d, i) {
          // Return this.props.height minus the yScale for this
          return self.props.height - yScale(d.q) - 20;
        })
        .attr('width', xScale.rangeBand())
        .attr('height', function(d, i) {
          // Return the yScale for this - pass d.q
          return yScale(d.q)
        });

    // Use D3s exit and remove to finish the bars 
    // exit - https://github.com/mbostock/d3/wiki/Selections#exit 
    // remove - https://github.com/mbostock/d3/wiki/Selections#remove
    bars.exit()
        .remove();
  },

  setupQLabels: function(svg, xScale, yScale) {
    var self = this,
    // Select all qLabels from the svg and call data on it, passing this.props.data
        qLabel = svg.selectAll('.qLabel').data(this.props.data);

    // Enter the qLabel and append some text. Use attr to give it a qLabel class. Style it appropriately.
    qLabel.enter()
        .append('text')
        .attr('class', 'qLabel')
        .style('font-weight', 'bold')
        .attr('text-anchor', 'middle')

    // Start a transition 
    qLabel.transition()
          .duration(1000)                 
          .attr('x', function(d, i) {
            // Return the xScale (pass the passed in index) plus the rangeBand of the xScale divided by 2
            return xScale(i) + xScale.rangeBand()/2;
          })
          .attr('y', function(d, i) {
            // Return props.height minus the yScale (pass d.q to it), subtract 25
            return self.props.height - yScale(d.q) - 25
          })
          .text(function(d, i) {  
            // Return d.q          
            return d.q; 
          });
  },

  setupLabels: function(svg, xScale) {
    var self = this,
    // Select all label classes from the svg and call data on it passing this.props.data
        label = svg.selectAll('.label').data(this.props.data);

    // Enter the label and append some text. Use attr to give it a label class.
    label.enter()
        .append('text')
        .attr('class', 'label')

    // Use D3s text method to add the text to the label
    label.text(function(d, i) {            
         // Return the label of the passed in d   
            return d.label; 
         })
         .attr('text-anchor', 'middle')
         .attr('x', function(d, i) {
           // Return xScale (pass the index) plus the rangeBand of xScale divided by 2
           return xScale(i) + xScale.rangeBand()/2;
         })
         .attr('y', function(d, i) {
           // Return props.height minus 5
           return self.props.height - 5; 
         });
  },

  // Render a simple div with class "chart"
  render: function() {
    return (
      <div className="chart"></div>            
    );
  }

});