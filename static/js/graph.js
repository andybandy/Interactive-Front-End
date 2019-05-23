/*Loads data*/
queue()
    .defer(d3.csv, "https://raw.githubusercontent.com/fivethirtyeight/data/master/births/US_births_2000-2014_SSA.csv")
    .await(makeGraphs);

/*Invokes and renders individual chart making functions */ 
    function makeGraphs(error, salaryData) {
        var ndx = crossfilter(salaryData);
       
        show_year(ndx);

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