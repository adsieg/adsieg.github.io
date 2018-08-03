var totalData = [{
	criterion: "Sex",
	description: "Distribution of males and females",
	groups: [{
		name: "Male",
		value: 50.43
	}, {
		name: "Female",
		value: 49.57
	}]
}, {
	criterion: "Body weight",
	description: "People above a weight considered healthy",
	groups: [{
		name: "Overweight",
		value: 21.88
	}, {
		name: "Not overweight",
		value: 78.12
	}]
},{
	criterion: "Undernourishment",
	description: "People with sufficient quantity or quality of nourishment",
	groups: [{
		name: "Undernourished",
		value: 10.00
	}, {
		name: "Not Undernourished",
		value: 90.00
	}]
},{
	criterion: "Age",
	description: "Distribution by age",
	groups: [{
		name: "Below 14 years of age",
		value: 26.30
	}, {
		name: "Between 15 and 64 years",
		value: 65.90
	}, {
		name: "65 years and over",
		value: 7.80
	}]
},{
	criterion: "Internet access",
	description: "People with an internet connection",
	groups: [{
		name: "With connection",
		value: 47.31
	}, {
		name: "Without connection",
		value: 52.69
	}]
},{
	criterion: "Homosexuality",
	description: "Distribution by sexual orientation",
	groups: [{
		name: "Heterosexual",
		value: 97.4
	}, {
		name: "Homosexual or Bisexual",
		value: 2.6
	}]
},{
	criterion: "Mobile phone",
	description: "People using mobile phones",
	groups: [{
		name: "Using a mobile",
		value: 63.90
	}, {
		name: "Not using a mobile",
		value: 36.10
	}]
},{
	criterion: "Electricity",
	description: "People with access to electricity",
	groups: [{
		name: "Access",
		value: 84.58
	}, {
		name: "No access",
		value: 15.42
	}]
},{
	criterion: "Water",
	description: "People with access to clean water",
	groups: [{
		name: "No access",
		value: 8.39
	}, {
		name: "Access",
		value: 91.61
	}]
},{
	criterion: "Unemployment",
	description: "Unemployment rate",
	groups: [{
		name: "Unemployed",
		value: 5.93
	}, {
		name: "Employed",
		value: 94.07
	}]
},{
	criterion: "Rule of the road",
	description: "Side of the road in bidirectional traffic",
	groups: [{
		name: "Drive on the right side",
		value: 66.00
	}, {
		name: "Drive on the left side",
		value: 34.00
	}]
},{
	criterion: "Income",
	description: "Dollars per day",
	groups: [{
		name: "Less than $2",
		value: 71.00
	}, {
		name: "Between $10 and $20",
		value: 13.00
	}, {
		name: "More than $20",
		value: 16.00
	}]
},{
	criterion: "Religion",
	description: "Distribution by religion",
	groups: [{
		name: "Christian",
		value: 31.50
	}, {
		name: "Muslim",
		value: 22.32
	}, {
		name: "Atheist",
		value: 15.35
	}, {
		name: "Hindu",
		value: 13.95
	}, {
		name: "Other",
		value: 16.88
	}]
},{
	criterion: "Continent",
	description: "People from different continents",
	groups: [{
		name: "Africa",
		value: 14.5
	}, {
		name: "Europe",
		value: 11.4
	}, {
		name: "Americas",
		value: 13.2
	},{
		name: "Asia",
		value: 60.3
	}, {
		name: "Oceania",
		value: 0.6
	}]
},{
	criterion: "Literacy",
	description: "People able to read and write",
	groups: [{
		name: "Literate",
		value: 83.7
	}, {
		name: "Illiterate",
		value: 16.3
	}]
},{
	criterion: "Handedness",
	description: "Preference to use one hand rather than the other",
	groups: [{
		name: "Left-handedness",
		value: 8.00
	}, {
		name: "Right-handedness",
		value: 92.00
	}]
},{
	criterion: "Blood type",
	description: "ABO blood group system",
	groups: [{
		name: "A",
		value: 33.90
	}, {
		name: "B",
		value: 16.20
	}, {
		name: "AB",
		value: 5.10
	}, {
		name: "O",
		value: 44.80
	}]
},{
	criterion: "Sanitation",
	description: "People with access to basic sanitation, like flush toilets and treated sewage",
	groups: [{
		name: "Access",
		value: 67.52
	}, {
		name: "No access",
		value: 32.48
	}]
}];

var headPath = "M -53.582954,-415.35856 C -67.309015,-415.84417 -79.137232,-411.40275 -86.431515,-395.45159 L -112.76807,-329.50717 C -131.95714,-324.21675 -140.31066,-310.27864 -140.75323,-298.84302 L -140.75323,-212.49705 L -115.44706,-212.49705 L -115.44706,-183.44029 C -116.67339,-155.74786 -71.290042,-154.67757 -70.275134,-183.7288 L -69.739335,-212.24976 L 94.421043,-212.24976 L 94.956841,-183.7288 C 95.971739,-154.67759 141.39631,-155.74786 140.16998,-183.44029 L 140.16998,-212.49705 L 165.43493,-212.49705 L 165.43493,-298.84302 C 164.99236,-310.27864 156.63886,-324.21677 137.44977,-329.50717 L 111.11322,-395.45159 C 103.81894,-411.40272 91.990714,-415.84414 78.264661,-415.35856 L -53.582954,-415.35856 z M -50.57424,-392.48409 C -49.426163,-392.49037 -48.215854,-392.45144 -46.988512,-392.40166 L 72.082372,-392.03072 C 82.980293,-392.28497 87.602258,-392.03039 92.236634,-381.7269 L 111.19565,-330.61998 L -86.30787,-330.86727 L -67.554927,-380.61409 C -64.630656,-390.57231 -58.610776,-392.44013 -50.57424,-392.48409 z M -92.036791,-305.02531 C -80.233147,-305.02529 -70.646071,-295.47944 -70.646071,-283.6758 C -70.646071,-271.87217 -80.233147,-262.28508 -92.036791,-262.28508 C -103.84043,-262.28508 -113.42751,-271.87216 -113.42751,-283.6758 C -113.42751,-295.47946 -103.84043,-305.02531 -92.036791,-305.02531 z M 117.91374,-305.02531 C 129.71738,-305.02533 139.26324,-295.47944 139.26324,-283.6758 C 139.26324,-271.87216 129.71738,-262.28508 117.91374,-262.28508 C 106.1101,-262.28507 96.523021,-271.87216 96.523021,-283.6758 C 96.523021,-295.47944 106.1101,-305.02531 117.91374,-305.02531 z M 103.2216,-333.14394 L 103.2216,-333.14394 z M 103.2216,-333.14394 C 103.11577,-333.93673 102.96963,-334.55679 102.80176,-335.21316 C 101.69663,-339.53416 100.2179,-342.16153 97.043938,-345.3793 C 93.958208,-348.50762 90.488134,-350.42644 86.42796,-351.28706 C 82.4419,-352.13197 45.472822,-352.13422 41.474993,-351.28706 C 33.885682,-349.67886 27.380491,-343.34759 25.371094,-335.633 C 25.286417,-335.3079 25.200722,-334.40363 25.131185,-333.2339 L 103.2216,-333.14394 z M 64.176391,-389.01277 C 58.091423,-389.00227 52.013792,-385.83757 48.882186,-379.47638 C 47.628229,-376.92924 47.532697,-376.52293 47.532697,-372.24912 C 47.532697,-368.02543 47.619523,-367.53023 48.822209,-364.99187 C 50.995125,-360.40581 54.081354,-357.67937 59.048334,-355.90531 C 60.598733,-355.35157 62.040853,-355.17797 64.86613,-355.27555 C 68.233081,-355.39187 68.925861,-355.58211 71.703539,-356.95492 C 75.281118,-358.72306 77.90719,-361.35074 79.680517,-364.96188 C 80.736152,-367.11156 80.820083,-367.68829 80.820085,-372.0392 C 80.820081,-376.56329 80.765213,-376.87662 79.470596,-379.50637 C 76.3443,-385.85678 70.261355,-389.02327 64.176391,-389.01277 z";

var criterionListData = totalData.map(d => d.criterion);

var divList = d3.select("#controler");

var criterionList = divList.selectAll(".criterionList")
	.data(criterionListData)
	.enter()
	.append("p")
	.attr("class", "criterionList");

criterionList.text(d => d);

var width = 850, height = 500;

var svg = d3.select("#svganchor")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var padding = [10, 10, 10, 10];

var xScale = d3.scalePoint()
	.range([padding[3], width - padding[1]])
	.padding(0.5);

var barScale = d3.scaleLinear()
	.range([padding[3], width - padding[1]])
	.domain([0,100]);

var colorScale = d3.scaleOrdinal()
	.range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e']);

var dataNodes = d3.range(100).map(() => ({id: "", xPosition:""}));

var simulation = d3.forceSimulation()
	.force("collide", d3.forceCollide(12))
	.force("x", d3.forceX(d => d.xPosition).strength(0.2))
	.force("y", d3.forceY(height / 2))
	.velocityDecay(0.7);

var chartTitle = svg.append("text")
	.attr("class", "chartTitle")
	.attr("x", width / 2)
	.attr("y", 20)
	.attr("text-anchor", "middle");

var chartSubTitle = svg.append("text")
	.attr("class", "chartSubTitle")
	.attr("x", width / 2)
	.attr("y", 44)
	.attr("text-anchor", "middle");

var preciseNumberTitle = svg.append("text")
	.attr("class", "preciseNumberTitle")
	.attr("y", 424)
	.attr("x", padding[3])
	.text("Precise numbers:");

draw("Sex");

function draw(criterion){

	chartTitle.text(criterion);

	var filteredData = totalData.filter(d => d.criterion === criterion);

	chartSubTitle.text(filteredData[0].description);

	xScale.domain(filteredData[0].groups.map(d => d.name));

	colorScale.domain(filteredData[0].groups.map(d => d.name));

	var counterData = 0;

	filteredData[0].groups.forEach(d=>{
		var rounded = Math.round(d.value);
		for(var i = counterData; i < rounded + counterData; i++){
			dataNodes[i].id = d.name;
			dataNodes[i].xPosition = xScale(d.name);
		};
		counterData += rounded;
	});

	var nodes = svg.selectAll(".g")
		.data(dataNodes)
		.enter()
		.append("g");

	nodes.attr("fill", d => colorScale(d.id));

	nodes.append("path")
		.attr("d", headPath)
		.attr("transform", "translate(-12,0) scale(0.045,0.045)");


	var nodesData = svg.selectAll(".nodesData")
		.data(filteredData[0].groups, d => d.name)
		.enter()
		.append("text")
		.attr("class", "nodesData")
		.attr("text-anchor", "middle")
		.attr("y", 100)
		.attr("x", d => xScale(d.name))
		.text(d => d.name + ": ")
		.append("tspan")
		.attr("class", "nodesDataSpan")
		.text(d => Math.round(d.value));

	var nodesDataPrecise = svg.selectAll(".nodesDataPrecise")
		.data(filteredData[0].groups, d => d.name)
		.enter()
		.append("text")
		.attr("class", "nodesDataPrecise")
		.attr("text-anchor", "middle")
		.attr("y", 440)
		.attr("x", d => xScale(d.name))
		.text(d => d.name + ": " + d.value + "%");

	dataNodes.forEach(d =>{
		d.x = width / 2;
		d.y = height / 2;
	});

	simulation.nodes(dataNodes)
		.on("tick", tick);

	var bars = svg.selectAll(".bars")
		.data(filteredData[0].groups);

	var barsEnter = bars.enter()
		.append("rect")
		.attr("class", "bars")
		.attr("y", 470)
		.attr("x", (d,i) => i ? barScale(filteredData[0].groups[i-1].value) : barScale(0))
		.attr("height", 20)
		.attr("width", d => barScale(d.value) - padding[3])
		.attr("fill", d => colorScale(d.name));

	var polylines = svg.selectAll(".polylines")
		.data(filteredData[0].groups)
		.enter()
		.append("polyline")
		.attr("class", "polylines")
		.attr("points", d => "" + xScale(d.name) + ",470 "
		+ xScale(d.name) + ",446")
		.attr("stroke-width", 1)
		.attr("stroke", "darkslategray");

	function tick(){
		nodes.attr('transform', (d) => {
			if (d.y < 120) {
				d.y = 120
			};
			if (d.y > 380) {
				d.y = 380
			};
			return 'translate(' + (d.x) + ',' + (d.y) + ')';
		});
	};

	function redraw(criterion){

		chartTitle.text(criterion);

		var filteredData = totalData.filter(d => d.criterion === criterion);

		chartSubTitle.text(filteredData[0].description);

		xScale.domain(filteredData[0].groups.map(d => d.name));

		colorScale.domain(filteredData[0].groups.map(d => d.name));

		var counterData = 0;

		filteredData[0].groups.forEach(d=>{
			var rounded = Math.round(d.value);
			for(var i = counterData; i < rounded + counterData; i++){
				dataNodes[i].id = d.name;
				dataNodes[i].xPosition = xScale(d.name);
			};
			counterData += rounded;
		});

		nodes.transition()
			.duration(500)
			.attr("fill", d => colorScale(d.id));

		var newNodesData = svg.selectAll(".nodesData")
			.data(filteredData[0].groups, d => d.name + d.value);

		var newNodesDataExit = newNodesData.exit()
			.remove();

		var newNodesDataEnter = newNodesData.enter()
			.append("text")
			.attr("class", "nodesData")
			.attr("text-anchor", "middle")
			.attr("y", 100)
			.attr("x", d => xScale(d.name))
			.text(d => d.name + ": ")
			.append("tspan")
			.attr("class", "nodesDataSpan")
			.text(d => Math.round(d.value));

		var newNodesDataPrecise = svg.selectAll(".nodesDataPrecise")
			.data(filteredData[0].groups, d => d.name + d.value);

		newNodesDataPrecise.exit()
			.transition()
			.delay(750)
			.duration(10)
			.remove();

		newNodesDataPrecise.enter()
			.append("text")
			.attr("class", "nodesDataPrecise")
			.attr("text-anchor", "middle")
			.attr("y", 440)
			.attr("x", d => xScale(d.name))
			.transition()
			.delay(750)
			.duration(10)
			.text(d => d.name + ": " + d.value + "%");

		var bars = svg.selectAll(".bars")
			.data(filteredData[0].groups);

		var barExit = bars.exit()
			.transition()
			.delay(750)
			.duration(500)
			.attr("x", width - padding[1])
			.attr("width", 0)
			.remove();

		var barsEnter = bars.enter()
			.append("rect")
			.attr("class", "bars")
			.attr("x", width - padding[1])
			.merge(bars)
			.attr("y", 470)
			.attr("height", 20);

		barsEnter.transition()
			.delay(750)
			.duration(500)
			.attr("x", (d,i) =>{
				if(i === 0){
					return barScale(0);
				} else {
					var counter = 0;
					for(var j = 0; j < i; j++){
						counter += filteredData[0].groups[j].value;
					};
					return barScale(counter);
				}
			})
			.attr("width", d => barScale(d.value) - padding[3])
			.attr("fill", d => colorScale(d.name));

		var polylines = svg.selectAll(".polylines")
			.data(filteredData[0].groups);

		var polylinesExit = polylines.exit()
			.transition()
			.delay(750)
			.duration(500)
			.attr("points", "" + width + ",470 "
				+ width + ",458 " + width + ",458 "
				+ width + ",446")
			.remove();

		var polylinesEnter = polylines.enter()
			.append("polyline")
			.attr("class", "polylines")
			.attr("points", "" + width + ",470 "
				+ width + ",458 " + width + ",458 "
				+ width + ",446")
			.merge(polylines)
			.transition()
			.delay(750)
			.duration(500)
			.attr("points", (d,i) =>{
				if(i === 0){
					return "" + (barScale(0) + (barScale(filteredData[0].groups[0].value))/2) + ",470 " + (barScale(0) + (barScale(filteredData[0].groups[0].value))/2) + ",458 "
						+ xScale(d.name) + ",458 " + xScale(d.name) + ",446";
				} else {
					var counter = 0;
					for(var j = 0; j < i; j++){
						counter += filteredData[0].groups[j].value;
					};
					var thisWidth = barScale(counter);
					return "" + (thisWidth + (barScale(d.value) - padding[3])/2) + ",470 " + (thisWidth + (barScale(d.value) - padding[3])/2) + ",458 " + xScale(d.name) + ",458 " + xScale(d.name) + ",446";
				}
			})
			.attr("stroke-width", 1)
			.attr("fill", "none")
			.attr("stroke", "darkslategray");

		setTimeout(function(){
			simulation.nodes(dataNodes);
			simulation.alpha(0.8).restart();
		}, 750)

		//end of redraw
	};

	d3.selectAll(".criterionList").on("click", function(d){
		redraw(d);
	});

	//end of draw
};