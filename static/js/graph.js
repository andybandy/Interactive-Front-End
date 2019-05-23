/*Loads data*/
queue()
    .defer(d3.csv, "https://raw.githubusercontent.com/fivethirtyeight/data/master/births/US_births_2000-2014_SSA.csv")
    .await(makeGraphs);

/*Invokes and renders individual chart making functions */ 
    function makeGraphs(error, salaryData) {
        var ndx = crossfilter(salaryData);
       
        show_year(ndx);
        show_month(ndx);
        show_day_of_week(ndx)
        dc.renderAll();
    }
/* Bar chart showing yearly births*/
    function show_year(ndx) {
        var dim = ndx.dimension(dc.pluck('year'));
        var group = dim.group().reduceSum(dc.pluck('births'));
        
        dc.barChart("#year")
            .width(730)
            .height(400)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel("Year")
            .yAxisLabel("Births")
            .yAxis().ticks(10);
            
    }

/*Bar chart showing montly births */
function show_month(ndx){

    var dim = ndx.dimension(dc.pluck('month'));
    var group = dim.group().reduceSum(dc.pluck('births'));

    dc.rowChart("#month")
    .width(768)
    .height(400)
    .dimension(dim)
    .group(group)
    .ordering(function(d) { return +d.key; })
    .transitionDuration(900)
    .elasticX(true).group(group)
    .label(function(d){
        if(d.key == 1)
          return "January";
        if(d.key == 2)
          return "February";
        if(d.key == 3)
          return "March";
        if(d.key == 4)
          return "April";
        if(d.key == 5)
          return "May";
        if(d.key == 6)
          return "June";
        if(d.key == 7)
          return "July";
        if(d.key == 8)
          return "August";
        if(d.key == 9)
          return "September";
        if(d.key == 10)
          return "October";
        if(d.key == 11)
          return "November";
        if(d.key == 12)
          return "December";
       
      })
}

/*Pie chart showing days of the week*/
function show_day_of_week(ndx){
    var chart =   dc.pieChart('#day-of-week')

    var dim = ndx.dimension(dc.pluck('day_of_week'));
    
    var group = dim.group().reduceSum(dc.pluck('births'));
  
     chart
      .height(330)
      .radius(90)
      .innerRadius(20)
      .externalRadiusPadding(0)
      .transitionDuration(1500)
      .dimension(dim)
      .group(group)
      .legend(dc.legend().legendText(function(d ) {
                              if(d.name== 1)
                                return "Monday";
                                if(d.name== 2)
                              return "Tuesday";
                                if(d.name== 3)
                               return "Wednesday";
                              if(d.name== 4)
                               return "Thursday";
                              if(d.name== 5)
                                 return "Friday";
                                 if(d.name== 6)
                                return "Saturday";
                                 if(d.name== 7)
                                return "Sunday";
                                 
                             }))
      .ordering(function(d) {return d.name });
}