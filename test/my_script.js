//namespacing with an IIFE
(function newsQuestScatterPlot2017() {

	var width = 760;
	var height = 500;

	var padding = [10, 54, 44, 40];

	var tooltip = d3.select("#svganchor").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var formatNumber = d3.format(".3g");

	var colors = d3.scaleOrdinal()
		.range(['#08A789', '#8F53A1', '#FFEA82', '#F79435', '#00AEEF', '#000000', '#ED1D24']);

	var xScale = d3.scaleLinear()
		.range([padding[3], width - padding[1]]);

	var yScale = d3.scaleLinear()
		.range([height - padding[2], padding[0]]);

	var xAxis = d3.axisBottom(xScale)
		.tickSizeOuter(0)
		.tickSizeInner(-height + (padding[0] + padding[2]))
		.ticks(8)
		.tickPadding(6);

	var yAxis = d3.axisLeft(yScale)
		.tickSizeOuter(0)
		.tickSizeInner(-width + (padding[1] + padding[3]))
		.ticks(8);

	var svg = d3.select("#svganchor")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var xTitle = svg.append("text")
		.attr("class", "axisTitle")
		.attr("text-anchor", "middle")
		.attr("y", height - 10)
		.attr("x", (padding[3] + (width - padding[1])) / 2)
		.text("Likelihood")
		.on("mousemove", function() {
			tooltip.html("Respondents were asked to rate each risk by likelihood on a scale of 1-5 (1 being very low, 2 being low, 3 being medium, 4 being high and 5 being very high).")
				.style('top', d3.event.pageY - 60 + 'px')
				.style('left', d3.event.pageX + 25 + 'px')
				.style("opacity", 0.9);
		}).on("mouseout", function() {
			tooltip.style("opacity", 0)
		});

	var yTitle = svg.append("text")
		.attr("class", "axisTitle")
		.attr("transform", "rotate(-90)")
		.attr("text-anchor", "middle")
		.attr("y", 14)
		.attr("x", -(padding[0] + (height - padding[2])) / 2)
		.text("Financial Impact")
		.on("mousemove", function() {
			tooltip.html("Respondents were asked to rate each risk by financial impact on a scale of 1-5 (1 being very low, 2 being low, 3 being medium, 4 being high and 5 being very high).")
				.style('top', d3.event.pageY - 12 + 'px')
				.style('left', d3.event.pageX + 25 + 'px')
				.style("opacity", 0.9);
		}).on("mouseout", function() {
			tooltip.style("opacity", 0)
		});

	var symbolsLegend = svg.append("g")
		.attr("class", "symbolsLegend")
		.attr("transform", "translate(" + (padding[3] + 20) + "," + (padding[0] + 76) + ")");

	var symbolsTypes = {
		year2015: "symbolCircle",
		year2016: "symbolTriangle",
		year2017: "symbolSquare"
	};

	var defs = svg.append("defs")

	defs.append("marker")
		.attr("id", "arrow")
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 20)
		.attr("refY", 0)
		.attr("markerWidth", 10)
		.attr("markerHeight", 6)
		.attr("orient", "auto")
		.append("path")
		.attr("d", "M0,-5L10,0L0,5")
		.style("opacity", 0)
		.attr("class", "arrowHead");

	var chartState = {};

	chartState.currentYear = 2017;
	chartState.scaleType = "relative";
	chartState.chartType = "single";
	chartState.firstYear = null;
	chartState.secondYear = null;

	var xPositionLabel = {
		xPositionLabel2015: ["Man-made disaster", "IR risk", "Water", "Contractual risk",
			"Competition", "Systems failure", "Credit", "Strike"
		],
		xPositionLabel2016: ["Regulation", "D&O", "M&A", "IP", "Social unrest", "Credit",
			"Fraud", "Nat cat", "Strike", "Man-made disaster"
		],
		xPositionLabel2017: ["Economic", "Data loss", "D&O", "Environment"]
	};

	d3.csv("data/riskData.csv", function(data) {

		var tempData = data;

		data.forEach(function(d) {
			d.likelihood2017 = +d.likelihood2017;
			d.severity2017 = +d.severity2017;
			d.likelihood2016 = +d.likelihood2016;
			d.severity2016 = +d.severity2016;
			d.likelihood2015 = +d.likelihood2015;
			d.severity2015 = +d.severity2015;
		});

		colors.domain(["Governance", "Financial", "Environmental", "Operational", "Socioeconomic",
			"Technology", "Business and strategic"
		]);

		d3.select("#socioeconomicColor").style("color", colors("Socioeconomic"));
		d3.select("#environmentalColor").style("color", colors("Environmental"));
		d3.select("#technologyColor").style("color", colors("Technology"));
		d3.select("#operationalColor").style("color", colors("Operational"));
		d3.select("#businessColor").style("color", colors("Business and strategic"));
		d3.select("#governanceColor").style("color", colors("Governance"));
		d3.select("#financialColor").style("color", colors("Financial"));

		var xValue, yValue, xAverage, yAverage;

		var gX = svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height - padding[2]) + ")");

		var gY = svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + (padding[3]) + ",0)");

		var averageLineX = svg.append("line")
			.attr("y1", padding[0])
			.attr("y2", height - padding[2])
			.attr("class", "averageLineX");

		var averageLineY = svg.append("line")
			.attr("x1", padding[3])
			.attr("x2", width - padding[1])
			.attr("class", "averageLineX");

		var averageLineXText = svg.append("text")
			.attr("class", "averageLineText")
			.text("Average")
			.attr("transform", "rotate(-90)");

		var averageLineYText = svg.append("text")
			.attr("class", "averageLineText")
			.text("Average");

		var yearTitle = svg.append("text")
			.attr("class", "yearTitle")
			.attr("x", padding[3] + 20)
			.attr("y", padding[0] + 20);

		draw(chartState.currentYear, data);

		d3.selectAll(".button1").on("click", function() {
			var thisClicked = this.value;
			chartState.currentYear = +thisClicked
			chartState.chartType = "single";
			draw(chartState.currentYear, tempData);
		});

		d3.selectAll(".button2").on("click", function() {
			var thisValue = this.value;
			chartState.firstYear = +("20" + thisValue.slice(0, 2));
			chartState.secondYear = +("20" + thisValue.slice(4, 6));
			chartState.chartType = "pairs";
			drawPairs(chartState.firstYear, chartState.secondYear, tempData);
		});

		d3.select("#selection").on("change", function() {
			var thisValue = this.value;
			filter2(thisValue);
		});

		d3.selectAll("input[name=radiobutton]").on("change", function() {
			var thisValue = this.value;
			chartState.scaleType = thisValue;
			if (chartState.chartType == "single") {
				draw(chartState.currentYear, tempData);
			} else {
				drawPairs(chartState.firstYear, chartState.secondYear, tempData);
			}
		});

		d3.selectAll("input[name=riskCategory]").on("change", filter);

		var labelsCircle = svg.append("circle")
			.attr("cx", padding[3] + 28)
			.attr("cy", padding[0] + 40)
			.attr("r", 8)
			.attr("stroke-width", "2px")
			.attr("stroke", "darkslategray")
			.style("opacity", 0.5)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.attr("cursor", "pointer")
			.on("click", showLabels);

		var labelsCircleSmall = svg.append("circle")
			.attr("cx", padding[3] + 28)
			.attr("cy", padding[0] + 40)
			.attr("r", 5)
			.attr("stroke-width", "none")
			.style("opacity", 0.5)
			.attr("fill", "darkslategray")
			.attr("pointer-events", "none");

		var labelsCircleText = svg.append("text")
			.attr("class", "labelSelection")
			.attr("x", padding[3] + 40)
			.attr("y", padding[0] + 45)
			.text("Show/hide labels")
			.on("click", showLabels);

		var labelsCircleClicked = false;

		function showLabels() {
			labelsCircleClicked = !labelsCircleClicked;
			if (labelsCircleClicked) {
				labelsCircleSmall.style("opacity", 0);
				svg.selectAll(".selected").style("opacity", 0);
			} else {
				labelsCircleSmall.style("opacity", 0.5);
				svg.selectAll(".selected").style("opacity", 1);
			}
		};

		function draw(year, dataset) {

			if (dataset.length == 0) {
				return;
			};

			yearTitle.text("Year: " + year);

			symbolsLegend.selectAll("text, path")
				.transition()
				.duration(1000)
				.style("opacity", 0);

			var xPosition = xPositionLabel["xPositionLabel" + year];

			xValue = "likelihood" + year;

			yValue = "severity" + year;

			if (chartState.scaleType === "relative") {
				xScale.domain([d3.min(dataset, function(d) {
						return d[xValue]
					}) * 0.9,
					d3.max(dataset, function(d) {
						return d[xValue]
					}) * 1.025
				]);
				yScale.domain([d3.min(dataset, function(d) {
						return d[yValue]
					}) * 0.9,
					d3.max(dataset, function(d) {
						return d[yValue]
					}) * 1.025
				]);
			} else if (chartState.scaleType === "absolute") {
				xScale.domain([1, 5]);
				yScale.domain([1, 5]);
			};

			xAverage = d3.mean(dataset, function(d) {
				return d[xValue]
			});
			yAverage = d3.mean(dataset, function(d) {
				return d[yValue]
			});

			averageLineX.transition()
				.duration(1000)
				.attr("x1", xScale(xAverage))
				.attr("x2", xScale(xAverage));

			averageLineX.on("mousemove", function() {
				tooltip.html("This line shows the average likelihood for the selected categories. In " + chartState.currentYear + " it was: <strong>" + formatNumber(xAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			averageLineY.transition()
				.duration(1000)
				.attr("y1", yScale(yAverage))
				.attr("y2", yScale(yAverage));

			averageLineY.on("mousemove", function() {
				tooltip.html("This line shows the average financial impact for the selected categories. In " + chartState.currentYear + " it was: <strong>" + formatNumber(yAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			averageLineYText.transition()
				.duration(1000)
				.attr("x", padding[3] + 4)
				.attr("y", yScale(yAverage) - 6)
				.text("Average");

			averageLineYText.on("mousemove", function() {
				tooltip.html("This line shows the average financial impact for the selected categories. In " + chartState.currentYear + " it was: <strong>" + formatNumber(yAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			averageLineXText.transition()
				.duration(1000)
				.attr("x", -height + padding[2] + 4)
				.attr("y", xScale(xAverage) - 6)
				.text("Average");

			averageLineXText.on("mousemove", function() {
				tooltip.html("This line shows the average likelihood for the selected categories. In " + chartState.currentYear + " it was: <strong>" + formatNumber(xAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			var connectLines = svg.selectAll(".connectLines")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			connectLines.enter()
				.append("line")
				.attr("class", function(d) {
					return "connectLines " + d.label.split(" ")[0].replace("&", "")
				})
				.attr("x1", xScale(xAverage))
				.attr("x2", xScale(xAverage))
				.attr("y1", yScale(yAverage))
				.attr("y2", yScale(yAverage))
				.attr("stroke-width", 1)
				.attr("stroke", function(d) {
					return colors(d.category)
				})
				.transition()
				.duration(1000)
				.attr("x1", function(d) {
					return xScale(d[xValue])
				})
				.attr("x2", function(d) {
					return xScale(d[xValue])
				})
				.attr("y1", function(d) {
					return yScale(d[yValue])
				})
				.attr("y2", function(d) {
					return yScale(d[yValue])
				});

			connectLines.transition()
				.duration(1000)
				.attr("x1", function(d) {
					return xScale(d[xValue])
				})
				.attr("x2", function(d) {
					return xScale(d[xValue])
				})
				.attr("y1", function(d) {
					return yScale(d[yValue])
				})
				.attr("y2", function(d) {
					return yScale(d[yValue])
				});

			svg.selectAll(".arrowHead").transition()
				.duration(1000)
				.style("opacity", 0);

			connectLines.exit()
				.transition()
				.duration(1000)
				.attr("x1", xScale(xAverage))
				.attr("x2", xScale(xAverage))
				.attr("y1", yScale(yAverage))
				.attr("y2", yScale(yAverage))
				.remove();

			var firstSymbol = svg.selectAll(".firstSymbol")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			firstSymbol.enter()
				.append("path")
				.attr("class", function(d) {
					return "firstSymbol " + d.label.split(" ")[0].replace("&", "")
				})
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.attr("fill", function(d) {
					return colors(d.category)
				})
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(0))
				.transition()
				.duration(1000)
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(64))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue]) + "," + yScale(d[yValue]) + ")";
				});

			firstSymbol.transition()
				.duration(1000)
				.attrTween("d", pathTween(d3.symbol().type(d3[symbolsTypes["year" + year]]).size(64)(), 2))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue]) + "," + yScale(d[yValue]) + ")";
				});

			firstSymbol.exit()
				.transition()
				.duration(1000)
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(0))
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.remove();

			var secondSymbol = svg.selectAll(".secondSymbol")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			secondSymbol.enter()
				.append("path")
				.attr("class", function(d) {
					return "secondSymbol " + d.label.split(" ")[0].replace("&", "")
				})
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.attr("fill", function(d) {
					return colors(d.category)
				})
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(0))
				.transition()
				.duration(1000)
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(64))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue]) + "," + yScale(d[yValue]) + ")";
				});

			secondSymbol.transition()
				.duration(1000)
				.attrTween("d", pathTween(d3.symbol().type(d3[symbolsTypes["year" + year]]).size(64)(), 2))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue]) + "," + yScale(d[yValue]) + ")";
				});

			secondSymbol.exit()
				.transition()
				.duration(1000)
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(0))
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.remove();

			var labels = svg.selectAll(".labels")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			labels.enter()
				.append("text")
				.attr("opacity", 0)
				.attr("pointer-events", "none")
				.attr("font-size", function() {
					if (chartState.scaleType == "relative") {
						return "12px";
					} else {
						return "10px";
					}
				})
				.attr("class", function(d) {
					return "labels " + d.label.split(" ")[0].replace("&", "")
				})
				.classed("selected", true)
				.attr("x", xScale(xAverage))
				.attr("y", yScale(yAverage))
				.text(function(d) {
					if (chartState.scaleType == "relative") {
						return d.label;
					} else {
						return d.label.substring(0, 3);
					}
				})
				.transition()
				.duration(1000)
				.attr("opacity", 1)
				.attr("x", function(d) {
					if (chartState.scaleType === "relative") {
						d.thisSize = this.getComputedTextLength();
						d.thisSizeSmall = (d.thisSize / d.label.length) * 3;
					}
					if (chartState.scaleType === "relative") {
						if (xPosition.indexOf(d.label) > -1) {
							return xScale(d[xValue]) - 8 - d.thisSize;
						} else {
							return xScale(d[xValue]) + 8;
						}
					} else if (chartState.scaleType === "absolute") {
						if (xPosition.indexOf(d.label) > -1) {
							return xScale(d[xValue]) - 8 - d.thisSizeSmall;
						} else {
							return xScale(d[xValue]) + 8;
						}
					}
				})
				.attr("y", function(d) {
					return yScale(d[yValue])
				});

			labels.transition()
				.duration(1000)
				.attr("font-size", function() {
					if (chartState.scaleType == "relative") {
						return "12px";
					} else {
						return "10px";
					}
				})
				.attr("x", function(d) {
					if (chartState.scaleType === "relative") {
						if (xPosition.indexOf(d.label) > -1) {
							return xScale(d[xValue]) - 8 - d.thisSize;
						} else {
							return xScale(d[xValue]) + 8;
						}
					} else if (chartState.scaleType === "absolute") {
						if (xPosition.indexOf(d.label) > -1) {
							return xScale(d[xValue]) - 8 - d.thisSizeSmall;
						} else {
							return xScale(d[xValue]) + 8;
						}
					}
				})
				.attr("y", function(d) {
					return yScale(d[yValue])
				})
				.text(function(d) {
					if (chartState.scaleType == "relative") {
						return d.label;
					} else {
						return d.label.substring(0, 3);
					}
				});

			labels.exit()
				.transition()
				.duration(1000)
				.attr("font-size", "0px")
				.attr("x", xScale(xAverage))
				.attr("y", yScale(yAverage))
				.remove();

			secondSymbol.each(function(d) {
				d.previousOpacity = d3.select(this).style("opacity");
			});

			svg.selectAll(".secondSymbol").on("mouseover", function(d) {
				d3.select(this).transition()
					.duration(250)
					.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(121))
					.attr("stroke", "#444")
					.attr("stroke-width", 1.5);

				svg.selectAll(".secondSymbol, .firstSymbol, .labels").filter(function(e) {
						return e.label != d.label
					})
					.transition()
					.duration(250)
					.style("opacity", function(e) {
						return e.previousOpacity === "0" ? 0 : 0.15
					});

				svg.select(".labels." + d.label.split(" ")[0].replace("&", ""))
					.attr("x", function(e) {
						if (xPosition.indexOf(e.label) === -1) {
							return chartState.scaleType === "relative" ? xScale(e[xValue]) - 8 - e.thisSize : xScale(e[xValue]) - 8 - e.thisSizeSmall;
						} else {
							return d3.select(this).attr("x")
						}
					});

				var thisLikelihood, thisSeverity;
				if (d[xValue] > xAverage) {
					thisLikelihood = "higher";
				} else {
					thisLikelihood = "lower";
				};
				if (d[yValue] > yAverage) {
					thisSeverity = "higher";
				} else {
					thisSeverity = "lower";
				};
				tooltip.html("Risk: <strong>" + d.risk + "</strong><br>Category: " + d.category + "<br><em>Likelihood</em> in " + chartState.currentYear + ": " + d[xValue] + " <span class=\"" + thisLikelihood + "\">(" + thisLikelihood + "</span> than average)" + "<br><em>Financial impact</em> in " + chartState.currentYear + ": " + d[yValue] + " <span class=\"" + thisSeverity + "\">(" + thisSeverity + "</span> than average)")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 15 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function(d) {
				svg.selectAll(".secondSymbol, .firstSymbol, .labels").transition()
					.duration(250)
					.style("opacity", function(e) {
						return e.previousOpacity;
					});
				d3.select(this).transition()
					.duration(250)
					.attr("d", d3.symbol().type(d3[symbolsTypes["year" + year]]).size(64))
					.attr("stroke", "none");
				svg.select(".labels." + d.label.split(" ")[0].replace("&", ""))
					.attr("x", function(e) {
						if (xPosition.indexOf(e.label) === -1) {
							return xScale(e[xValue]) + 8;
						} else {
							return d3.select(this).attr("x")
						}
					});
				tooltip.style("opacity", 0);
			});

			gX.transition()
				.duration(1000)
				.call(xAxis);

			gY.transition()
				.duration(1000)
				.call(yAxis);

			if (chartState.scaleType == "absolute") {
				d3.selectAll(".y.axis .tick")
					.filter(function(d) {
						return d == 1.0;
					})
					.remove();
			}

			var sel = document.getElementById('selection')
			sel = sel.options[sel.selectedIndex].value;

			filter2(sel);

			//end of draw	
		}

		function drawPairs(firstYear, secondYear, dataset) {

			if (dataset.length == 0) {
				return;
			};

			var legendText = symbolsLegend.selectAll(".legendText")
				.data([firstYear, secondYear]);

			legendText.enter()
				.append("text")
				.attr("x", 0)
				.style("opacity", 0.5)
				.attr("y", function(d, i) {
					return i * 18
				})
				.attr("class", "legendText")
				.text(function(d) {
					return d + " symbol:"
				});

			legendText.transition()
				.duration(1000)
				.style("opacity", 0.5)
				.text(function(d) {
					return d + " symbol:"
				});

			legendText.exit().remove();

			var legendSymbols = symbolsLegend.selectAll(".legendSymbols")
				.data([firstYear, secondYear]);

			legendSymbols.enter()
				.append("path")
				.attr("class", "legendSymbols")
				.attr("transform", function(d, i) {
					return "translate(92," + (i * 18 - 4) + ")";
				})
				.attr("d", function(d) {
					return d3.symbol().type(d3[symbolsTypes["year" + d]]).size(64)()
				})
				.style("fill", "darkslategray")
				.style("opacity", 0.6);

			legendSymbols.each(function(d) {
				d3.select(this).transition()
					.duration(1000)
					.style("opacity", 0.6)
					.attrTween("d", pathTween(d3.symbol().type(d3[symbolsTypes["year" + d]]).size(64)(), 2));
			});

			legendSymbols.exit().remove();

			yearTitle.text("Years: Combined (" + firstYear + " to " + secondYear + ")")

			var xValue1 = "likelihood" + firstYear,
				xValue2 = "likelihood" + secondYear,
				yValue1 = "severity" + firstYear,
				yValue2 = "severity" + secondYear;

			var minX = d3.min([d3.min(dataset, function(d) {
					return d[xValue1]
				}),
				d3.min(dataset, function(d) {
					return d[xValue2]
				})
			]);

			var minY = d3.min([d3.min(dataset, function(d) {
					return d[yValue1]
				}),
				d3.min(dataset, function(d) {
					return d[yValue2]
				})
			]);

			var maxX = d3.max([d3.max(dataset, function(d) {
					return d[xValue1]
				}),
				d3.max(dataset, function(d) {
					return d[xValue2]
				})
			]);

			var maxY = d3.max([d3.max(dataset, function(d) {
					return d[yValue1]
				}),
				d3.max(dataset, function(d) {
					return d[yValue2]
				})
			]);

			if (chartState.scaleType == "relative") {
				xScale.domain([minX * 0.9, maxX * 1.025]);
				yScale.domain([minY * 0.9, maxY * 1.025]);
			} else if (chartState.scaleType == "absolute") {
				xScale.domain([1, 5]);
				yScale.domain([1, 5]);
			};

			xAverage = (d3.mean(dataset, function(d) {
				return d[xValue1]
			}) + d3.mean(dataset, function(d) {
				return d[xValue2]
			})) / 2;
			yAverage = (d3.mean(dataset, function(d) {
				return d[yValue1]
			}) + d3.mean(dataset, function(d) {
				return d[yValue2]
			})) / 2;

			averageLineX.transition()
				.duration(1000)
				.attr("x1", xScale(xAverage))
				.attr("x2", xScale(xAverage));

			averageLineX.on("mousemove", function() {
				tooltip.html("This line shows the average likelihood for the selected categories in " + firstYear + " and " + secondYear + ". The combined average was: <strong>" + formatNumber(xAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			averageLineY.transition()
				.duration(1000)
				.attr("y1", yScale(yAverage))
				.attr("y2", yScale(yAverage));

			averageLineY.on("mousemove", function() {
				tooltip.html("This line shows the average financial impact for the selected categories in " + firstYear + " and " + secondYear + ". The combined average was: <strong>" + formatNumber(yAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			averageLineYText.transition()
				.duration(1000)
				.attr("x", padding[3] + 4)
				.attr("y", yScale(yAverage) - 6)
				.text("Combined Average");

			averageLineYText.on("mousemove", function() {
				tooltip.html("This line shows the average financial impact for the selected categories in " + firstYear + " and " + secondYear + ". The combined average was: <strong>" + formatNumber(yAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			averageLineXText.transition()
				.duration(1000)
				.attr("x", -height + padding[2] + 4)
				.attr("y", xScale(xAverage) - 6)
				.text("Combined Average");

			averageLineXText.on("mousemove", function() {
				tooltip.html("This line shows the average likelihood for the selected categories in " + firstYear + " and " + secondYear + ". The combined average was: <strong>" + formatNumber(xAverage) + "</strong>")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function() {
				tooltip.style("opacity", 0)
			});

			var secondSymbol = svg.selectAll(".secondSymbol")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			secondSymbol.enter()
				.append("path")
				.attr("class", function(d) {
					return "secondSymbol " + d.label.split(" ")[0].replace("&", "")
				})
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.attr("fill", function(d) {
					return colors(d.category)
				})
				.transition()
				.duration(1000)
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + secondYear]]).size(64))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue2]) + "," + yScale(d[yValue2]) + ")";
				});

			secondSymbol.transition()
				.duration(1000)
				.attrTween("d", pathTween(d3.symbol().type(d3[symbolsTypes["year" + secondYear]]).size(64)(), 2))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue2]) + "," + yScale(d[yValue2]) + ")";
				});

			secondSymbol.exit()
				.transition()
				.duration(1000)
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.remove();

			var firstSymbol = svg.selectAll(".firstSymbol")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			firstSymbol.enter()
				.append("path")
				.attr("class", function(d) {
					return "firstSymbol " + d.label.split(" ")[0].replace("&", "")
				})
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.attr("fill", function(d) {
					return colors(d.category)
				})
				.transition()
				.duration(1000)
				.attr("d", d3.symbol().type(d3[symbolsTypes["year" + firstYear]]).size(64))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue1]) + "," + yScale(d[yValue1]) + ")";
				});

			firstSymbol.transition()
				.duration(1000)
				.attrTween("d", pathTween(d3.symbol().type(d3[symbolsTypes["year" + firstYear]]).size(64)(), 2))
				.attr("transform", function(d) {
					return "translate(" + xScale(d[xValue1]) + "," + yScale(d[yValue1]) + ")";
				});

			firstSymbol.exit()
				.transition()
				.duration(1000)
				.attr("transform", function(d) {
					return "translate(" + xScale(xAverage) + "," + yScale(yAverage) + ")";
				})
				.remove();

			var labels = svg.selectAll(".labels")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			labels.enter()
				.append("text")
				.attr("pointer-events", "none")
				.attr("font-size", "0px")
				.attr("class", function(d) {
					return "labels " + d.label.split(" ")[0].replace("&", "")
				})
				.classed("selected", true)
				.attr("x", xScale(xAverage))
				.attr("y", yScale(yAverage))
				.transition()
				.duration(1000)
				.attr("text-anchor", "start")
				.attr("font-size", function() {
					if (chartState.scaleType === "relative") {
						return "10px";
					} else {
						return "8px";
					}
				})
				.attr("x", function(d) {
					return xScale(d[xValue2]) + 7
				})
				.attr("y", function(d) {
					return yScale(d[yValue2])
				})
				.text(function(d) {
					if (chartState.scaleType === "relative") {
						return d.label + " (" + secondYear + ")";
					} else {
						return d.label.substring(0, 3) + " (" + secondYear + ")";
					}
				});

			labels.transition()
				.duration(1000)
				.attr("text-anchor", "start")
				.attr("font-size", function() {
					if (chartState.scaleType === "relative") {
						return "10px";
					} else {
						return "8px";
					}
				})
				.attr("x", function(d) {
					return xScale(d[xValue2]) + 7
				})
				.attr("y", function(d) {
					return yScale(d[yValue2])
				})
				.text(function(d) {
					if (chartState.scaleType === "relative") {
						return d.label + " (" + secondYear + ")";
					} else {
						return d.label.substring(0, 3) + " (" + secondYear + ")";
					}
				});

			labels.exit()
				.transition()
				.duration(1000)
				.attr("font-size", "0px")
				.attr("x", xScale(xAverage))
				.attr("y", yScale(yAverage))
				.remove();

			var connectLines = svg.selectAll(".connectLines")
				.data(dataset, function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

			connectLines.enter()
				.append("line")
				.attr("class", function(d) {
					return "connectLines " + d.label.split(" ")[0].replace("&", "")
				})
				.attr("x1", xScale(xAverage))
				.attr("x2", xScale(xAverage))
				.attr("y1", yScale(yAverage))
				.attr("y2", yScale(yAverage))
				.attr("stroke-width", 1)
				.attr("stroke", function(d) {
					return colors(d.category)
				})
				.transition()
				.duration(1000)
				.attr("x2", function(d) {
					return xScale(d[xValue2])
				})
				.attr("x1", function(d) {
					return xScale(d[xValue1])
				})
				.attr("y2", function(d) {
					return yScale(d[yValue2])
				})
				.attr("y1", function(d) {
					return yScale(d[yValue1])
				})
				.attr("marker-end", function() {
					var isIE = /*@cc_on!@*/ false || !!document.documentMode;
					var isEdge = !isIE && !!window.StyleMedia;
					if (!isIE && !isEdge) {
						return "url(#arrow)";
					}
				});

			connectLines.transition()
				.duration(1000)
				.attr("x2", function(d) {
					return xScale(d[xValue2])
				})
				.attr("x1", function(d) {
					return xScale(d[xValue1])
				})
				.attr("y2", function(d) {
					return yScale(d[yValue2])
				})
				.attr("y1", function(d) {
					return yScale(d[yValue1])
				})
				.attr("marker-end", function() {
					var isIE = /*@cc_on!@*/ false || !!document.documentMode;
					var isEdge = !isIE && !!window.StyleMedia;
					if (!isIE && !isEdge) {
						return "url(#arrow)";
					}
				});

			svg.selectAll(".arrowHead").transition()
				.duration(1000)
				.style("opacity", 1);

			connectLines.exit()
				.transition()
				.duration(1000)
				.attr("x1", xScale(xAverage))
				.attr("x2", xScale(xAverage))
				.attr("y1", yScale(yAverage))
				.attr("y2", yScale(yAverage))
				.remove();

			secondSymbol.each(function(d) {
				d.previousOpacity = d3.select(this).style("opacity");
			});

			firstSymbol.each(function(d) {
				d.previousOpacity = d3.select(this).style("opacity");
			});

			svg.selectAll(".secondSymbol").on("mouseover", function(d) {
				d3.select(this).transition()
					.duration(250)
					.attr("d", d3.symbol().type(d3[symbolsTypes["year" + secondYear]]).size(121))
					.attr("stroke", "#444")
					.attr("stroke-width", 1.5);

				svg.selectAll(".secondSymbol, .firstSymbol, .labels, .connectLines").filter(function(e) {
						return e.label != d.label
					})
					.transition()
					.duration(250)
					.style("opacity", function(e) {
						return e.previousOpacity === "0" ? 0 : 0.15
					});

				var thisLikelihood, thisSeverity;
				var likelihoodPercent, likelihoodPercentText;
				if (d[xValue2] > d[xValue1]) {
					likelihoodPercent = formatNumber(100 * ((d[xValue2] - 1) - (d[xValue1] - 1)) / (d[xValue1] - 1));
					likelihoodPercentText = "more";
				} else {
					likelihoodPercent = formatNumber(100 * (1 - ((d[xValue2] - 1) / (d[xValue1] - 1))));
					likelihoodPercentText = "less";
				};
				var severityPercent, severityPercentText;
				if (d[yValue2] > d[yValue1]) {
					severityPercent = formatNumber(100 * ((d[yValue2] - 1) - (d[yValue1] - 1)) / (d[yValue1] - 1));
					severityPercentText = "more";
				} else {
					severityPercent = formatNumber(100 * (1 - ((d[yValue2] - 1) / (d[yValue1] - 1))));
					severityPercentText = "less";
				};
				if (d[xValue2] > xAverage) {
					thisLikelihood = "higher";
				} else {
					thisLikelihood = "lower";
				};
				if (d[yValue2] > yAverage) {
					thisSeverity = "higher";
				} else {
					thisSeverity = "lower";
				};
				tooltip.html("Risk: <strong>" + d.risk + "</strong><br>Category: " + d.category + "<br>Likelihood in " + secondYear + ": " + d[xValue2] + " <span class=\"" + thisLikelihood + "\">(" + thisLikelihood + "</span> than combined average and " + likelihoodPercent + "% " + likelihoodPercentText + " than " + firstYear + ")" + "<br>Financial impact in " + secondYear + ": " + d[yValue2] + " <span class=\"" + thisSeverity + "\">(" + thisSeverity + "</span> than combined average and " + severityPercent + "% " + severityPercentText + " than " + firstYear + ")")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function(d) {
				svg.selectAll(".secondSymbol, .firstSymbol, .labels, .connectLines").transition()
					.duration(250)
					.style("opacity", function(e) {
						return e.previousOpacity;
					});
				d3.select(this).transition()
					.duration(250)
					.attr("d", d3.symbol().type(d3[symbolsTypes["year" + secondYear]]).size(64))
					.attr("stroke", "none");
				tooltip.style("opacity", 0);
			});

			svg.selectAll(".firstSymbol").on("mouseover", function(d) {
				d3.select(this).transition()
					.duration(250)
					.attr("d", d3.symbol().type(d3[symbolsTypes["year" + firstYear]]).size(121))
					.attr("stroke", "#444")
					.attr("stroke-width", 1.5);

				svg.selectAll(".secondSymbol, .firstSymbol, .labels, .connectLines").filter(function(e) {
						return e.label != d.label
					})
					.transition()
					.duration(250)
					.style("opacity", function(e) {
						return e.previousOpacity === "0" ? 0 : 0.15
					});

				var thisLikelihood, thisSeverity;
				if (d[xValue1] > xAverage) {
					thisLikelihood = "higher";
				} else {
					thisLikelihood = "lower";
				};
				if (d[yValue1] > yAverage) {
					thisSeverity = "higher";
				} else {
					thisSeverity = "lower";
				};
				tooltip.html("Risk: <strong>" + d.risk + "</strong><br>Category: " + d.category + "<br>Likelihood in " + firstYear + ": " + d[xValue1] + " <span class=\"" + thisLikelihood + "\">(" + thisLikelihood + "</span> than combined average)" + "<br>Financial impact in " + firstYear + ": " + d[yValue1] + " <span class=\"" + thisSeverity + "\">(" + thisSeverity + "</span> than combined average)")
					.style('top', d3.event.pageY - 12 + 'px')
					.style('left', d3.event.pageX + 25 + 'px')
					.style("opacity", 0.9);
			}).on("mouseout", function(d) {
				svg.selectAll(".secondSymbol, .firstSymbol, .labels, .connectLines").transition()
					.duration(250)
					.style("opacity", function(e) {
						return e.previousOpacity;
					});
				d3.select(this).transition()
					.duration(250)
					.attr("d", d3.symbol().type(d3[symbolsTypes["year" + firstYear]]).size(64))
					.attr("stroke", "none");
				tooltip.style("opacity", 0);
			});

			gX.transition()
				.duration(1000)
				.call(xAxis);

			gY.transition()
				.duration(1000)
				.call(yAxis);

			if (chartState.scaleType == "absolute") {
				d3.selectAll(".y.axis .tick")
					.filter(function(d) {
						return d == 1.0;
					})
					.remove();
			}

			var sel = document.getElementById('selection')
			sel = sel.options[sel.selectedIndex].value;

			filter2(sel);

			//end of drawPairs
		}

		function filter() {

			function getCheckedBoxes(chkboxName) {
				var checkboxes = document.getElementsByName(chkboxName);
				var checkboxesChecked = [];
				for (var i = 0; i < checkboxes.length; i++) {
					if (checkboxes[i].checked) {
						checkboxesChecked.push(checkboxes[i].defaultValue);
					}
				}
				return checkboxesChecked.length > 0 ? checkboxesChecked : null;
			}

			var checkedBoxes = getCheckedBoxes("riskCategory");

			var newData = [];

			if (checkedBoxes == null) {
				if (chartState.chartType == "single") {
					draw(chartState.currentYear, newData);
				} else {
					drawPairs(chartState.firstYear, chartState.secondYear, newData);
				}
				return;
			};

			for (var i = 0; i < checkedBoxes.length; i++) {
				var newArray = data.filter(function(d) {
					return d.category == checkedBoxes[i];
				});
				Array.prototype.push.apply(newData, newArray);
			}

			tempData = newData;

			if (chartState.chartType == "single") {
				draw(chartState.currentYear, newData);
			} else {
				drawPairs(chartState.firstYear, chartState.secondYear, newData);
			}

			//end of filter
		}

		function filter2(selection) {

			if (selection == "allRisks") {
				var top = data.map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				})
				show(top);
			}

			if (selection == "topLikelihood2017") {
				var top = data.sort(function(a, b) {
					return d3.descending(+a["likelihood2017"], +b["likelihood2017"]);
				}).slice(0, 10).map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

				show(top);
			}

			if (selection == "topLikelihood2016") {
				var top = data.sort(function(a, b) {
					return d3.descending(+a["likelihood2016"], +b["likelihood2016"]);
				}).slice(0, 10).map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

				show(top);
			}

			if (selection == "topLikelihood2015") {
				var top = data.sort(function(a, b) {
					return d3.descending(+a["likelihood2015"], +b["likelihood2015"]);
				}).slice(0, 10).map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

				show(top);
			}

			if (selection == "topSeverity2017") {
				var top = data.sort(function(a, b) {
					return d3.descending(+a["severity2017"], +b["severity2017"]);
				}).slice(0, 10).map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

				show(top);
			}

			if (selection == "topSeverity2016") {
				var top = data.sort(function(a, b) {
					return d3.descending(+a["severity2016"], +b["severity2016"]);
				}).slice(0, 10).map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

				show(top);
			}

			if (selection == "topSeverity2015") {
				var top = data.sort(function(a, b) {
					return d3.descending(+a["severity2015"], +b["severity2015"]);
				}).slice(0, 10).map(function(d) {
					return d.label.split(" ")[0].replace("&", "")
				});

				show(top);
			}

			if (selection == "biggestMovers15to16") {
				var temp = [];
				data.forEach(function(d) {
					var hyp = Math.sqrt(Math.pow((d.likelihood2016 - d.likelihood2015), 2) + Math.pow((d.severity2016 - d.severity2015), 2));
					var label = d.label.split(" ")[0].replace("&", "");
					temp.push({
						hyp: hyp,
						label: label
					});
				})

				temp.sort(function(a, b) {
					return d3.descending(+a.hyp, +b.hyp)
				});

				var top = temp.slice(0, 10).map(function(d) {
					return d.label
				});

				show(top);
			}

			if (selection == "biggestMovers16to17") {
				var temp = [];
				data.forEach(function(d) {
					var hyp = Math.sqrt(Math.pow((d.likelihood2017 - d.likelihood2016), 2) + Math.pow((d.severity2017 - d.severity2016), 2));
					var label = d.label.split(" ")[0].replace("&", "");
					temp.push({
						hyp: hyp,
						label: label
					});
				})

				temp.sort(function(a, b) {
					return d3.descending(+a.hyp, +b.hyp)
				});

				var top = temp.slice(0, 10).map(function(d) {
					return d.label
				});

				show(top);
			}

			if (selection == "biggestMovers15to17") {
				var temp = [];
				data.forEach(function(d) {
					var hyp = Math.sqrt(Math.pow((d.likelihood2017 - d.likelihood2015), 2) + Math.pow((d.severity2017 - d.severity2015), 2));
					var label = d.label.split(" ")[0].replace("&", "");
					temp.push({
						hyp: hyp,
						label: label
					});
				})

				temp.sort(function(a, b) {
					return d3.descending(+a.hyp, +b.hyp)
				});

				var top = temp.slice(0, 10).map(function(d) {
					return d.label
				});

				show(top);
			}

			if (selection == "smallestMovers15to16") {
				var temp = [];
				data.forEach(function(d) {
					var hyp = Math.sqrt(Math.pow((d.likelihood2016 - d.likelihood2015), 2) + Math.pow((d.severity2016 - d.severity2015), 2));
					var label = d.label.split(" ")[0].replace("&", "");
					temp.push({
						hyp: hyp,
						label: label
					});
				})

				temp.sort(function(a, b) {
					return d3.ascending(+a.hyp, +b.hyp)
				});

				var top = temp.slice(0, 10).map(function(d) {
					return d.label
				});

				show(top);
			}

			if (selection == "smallestMovers16to17") {
				var temp = [];
				data.forEach(function(d) {
					var hyp = Math.sqrt(Math.pow((d.likelihood2017 - d.likelihood2016), 2) + Math.pow((d.severity2017 - d.severity2016), 2));
					var label = d.label.split(" ")[0].replace("&", "");
					temp.push({
						hyp: hyp,
						label: label
					});
				})

				temp.sort(function(a, b) {
					return d3.ascending(+a.hyp, +b.hyp)
				});

				var top = temp.slice(0, 10).map(function(d) {
					return d.label
				});

				show(top);
			}

			if (selection == "smallestMovers15to17") {
				var temp = [];
				data.forEach(function(d) {
					var hyp = Math.sqrt(Math.pow((d.likelihood2017 - d.likelihood2015), 2) + Math.pow((d.severity2017 - d.severity2015), 2));
					var label = d.label.split(" ")[0].replace("&", "");
					temp.push({
						hyp: hyp,
						label: label
					});
				})

				temp.sort(function(a, b) {
					return d3.ascending(+a.hyp, +b.hyp)
				});

				var top = temp.slice(0, 10).map(function(d) {
					return d.label
				});

				show(top);
			}

			//end of filter2	
		}

		function show(array) {

			var all = svg.selectAll(".secondSymbol, .firstSymbol, .connectLines, .labels")
				.style("opacity", 0)
				.attr("pointer-events", "none");

			svg.selectAll(".labels").classed("selected", false);

			array.forEach(function(d) {
				var temp = svg.selectAll("." + d + "");
				temp.style("opacity", 1).attr("pointer-events", "all");
				var tempLabel = svg.selectAll(".labels." + d + "").classed("selected", true);
				svg.selectAll(".labels").attr("pointer-events", "none");
			});

			svg.selectAll(".firstSymbol").each(function(d) {
				d.previousOpacity = d3.select(this).style("opacity");
			});

			svg.selectAll(".secondSymbol").each(function(d) {
				d.previousOpacity = d3.select(this).style("opacity");
			});

			//end of show
		}

		function pathTween(d1, precision) {
			return function() {
				var path0 = this,
					path1 = path0.cloneNode(),
					n0 = path0.getTotalLength(),
					n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

				var distances = [0],
					i = 0,
					dt = precision / Math.max(n0, n1);
				while ((i += dt) < 1) distances.push(i);
				distances.push(1);

				var points = distances.map(function(t) {
					var p0 = path0.getPointAtLength(t * n0),
						p1 = path1.getPointAtLength(t * n1);
					return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
				});

				return function(t) {
					return t < 1 ? "M" + points.map(function(p) {
						return p(t);
					}).join("L") : d1;
				};
			};

			//end of pathTween
		}

		//end of d3.csv	
	})

	//end of newsQuestScatterPlot	
}());