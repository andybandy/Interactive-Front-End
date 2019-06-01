/*Loads data*/
queue()
    .defer(d3.csv, "https://raw.githubusercontent.com/fivethirtyeight/data/master/births/US_births_2000-2014_SSA.csv")
    .await(initialise_graphs);

    function resize_graphs(error, birthData){
      var ndx = crossfilter(birthData);
      show_year(ndx, 0);
      show_month(ndx, 0);
      show_day_of_week(ndx, 0);
      show_day_of_month(ndx, 0);
      show_total_number(ndx, 0);
      dc.renderAll();
    }

/*Invokes and renders individual chart making functions */ 
    function initialise_graphs(error, birthData) {
        var ndx = crossfilter(birthData);
       
        show_year(ndx, 500);
        show_month(ndx, 500);
        show_day_of_week(ndx, 500);
        show_day_of_month(ndx, 500);
        show_total_number(ndx, 500);
        dc.renderAll();
    }
/* Bar chart showing yearly births*/
    function show_year(ndx, i) {
        var dim = ndx.dimension(dc.pluck('year'));
        var group = dim.group().reduceSum(dc.pluck('births'));
        
        dc.barChart("#year")
            .width(null)
            .height(null)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(dim)
            .group(group)
            .transitionDuration(i)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel("Year")
            .yAxisLabel("Births")
            .yAxis().ticks(10);
            
    }

/*Bar chart showing montly births */
function show_month(ndx, i){

    var dim = ndx.dimension(dc.pluck('month'));
    var group = dim.group().reduceSum(dc.pluck('births'));

    dc.rowChart("#month")
    .width(null)
    .height(null)
    .ordinalColors(['#1f77b4'])
    .dimension(dim)
    .group(group)
    .ordering(function(d) { return +d.key; })
    .transitionDuration(i)
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
function show_day_of_week(ndx, i){
    var chart =   dc.pieChart('#day-of-week')

    var dim = ndx.dimension(dc.pluck('day_of_week'));
    
    var group = dim.group().reduceSum(dc.pluck('births'));
  
     chart
      .height(null)
      .radius(120)
      .innerRadius(20)
      .externalRadiusPadding(0)
      .transitionDuration(i)
      .dimension(dim)
      .group(group)
      .legend(dc.legend().x(20).y(10).legendText(function(d ) {
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

/*Bar chart showing births daily*/
function show_day_of_month(ndx, i) {
    var dim = ndx.dimension(dc.pluck('date_of_month'));
    var group = dim.group().reduceSum(dc.pluck('births'));
  
    dc.barChart("#date-of-month")
        .width(null)
        .height(null)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(i)
        .ordering(function(d) { return +d.key; })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Day")
        .yAxisLabel("Births")
        .yAxis().ticks(10);
       
  }
/*Number display chart showing total births*/
function show_total_number(ndx, i){
    var group = ndx.groupAll().reduceSum(dc.pluck('births'));

    dc.numberDisplay("#total-number")
    .transitionDuration(i)
    .valueAccessor(function(d){return d})
    .group(group);   
}     





 
$(document).ready(function(){
  var resizeTimer;
$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {


    
    queue()
    .defer(d3.csv, "https://raw.githubusercontent.com/fivethirtyeight/data/master/births/US_births_2000-2014_SSA.csv")
    .await(resize_graphs);
  }, 50);

});
});
