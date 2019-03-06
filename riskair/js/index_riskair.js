var cat1pos = ["error", "accurate", "violation", "review", "fail", "issue"];
var cat2pos = ["control", "account", "transaction"];
var cat3pos = ["book", "record", "calculate", "offset", "offset"];
var cat4pos = ["segregate", "compliance", "procedure", "margin", "policy", "regulatory", "self"];
var cat5pos = ["customer", "capital", "requirement","employee","fund", "partner", "agent"];

var cat1neg = ["internal", "movement", "improvement", "commercial", "lack"];
var cat2neg = ["likelihood", "sufficient", "accurate"];
var cat3neg = ["collateral", "reduce", "call", "deficiency", "reduction", "contract", "trade"];
var cat4neg = ["clerical", "credit", "spread", "minimum"];
var cat5neg = ["software", "system", "warehouse", "supervise"];

var figures = ["1 million", "EUR 748,000"]
var dates = ["18 June 2013", "19 March 2009", "January 2012", "31 May 2011", "April 2011", "27 January 2012"]
var entities = ["US Commodity Futures Trading Commission (CFTC)", "ABN AMRO", "Clearing Chicago", "CME Group", "CFTC","Cutting humans in banking reduces risk says CEO."]

$("p1").highlight(cat1pos, {className: 'category_1_positif' });
$("p1").highlight(cat2pos, {className: 'category_2_positif' });
$("p1").highlight(cat3pos, {className: 'category_3_positif' });
$("p1").highlight(cat4pos, {className: 'category_4_positif' });
$("p1").highlight(cat5pos, {className: 'category_5_positif' });

$("p1").highlight(cat1neg, {className: 'category_1_negatif' });
$("p1").highlight(cat2neg, {className: 'category_2_negatif' });
$("p1").highlight(cat3neg, {className: 'category_3_negatif' });
$("p1").highlight(cat4neg, {className: 'category_4_negatif' });
$("p1").highlight(cat5neg, {className: 'category_5_negatif' });

$("p2").highlight(figures, {className: 'figures' });
$("p2").highlight(dates, {className: 'dates' });
$("p2").highlight(entities, {className: 'entities' });

$(function () {

  var data = [
    ['', '18 June 2013' , '1 million', 'US Commodity Futures Trading Commission (CFTC)'],
    ['', '19 March 2009', 'EUR 748,000', 'ABN AMRO' ],
    ['', 'January 2012', '','Clearing Chicago'],
    ['', '31 May 2011', '','CME Group'],
    ['', 'April 2011','' ,'CFTC'], 
    ['', '27 January 2012', '' ,'']
  ];
  
  var container = document.getElementById('grid'),
  hot = new Handsontable(container, {
    data: data,
    minSpareRows: 1,
    rowHeaders: true,
    colHeaders: [
    '',
    'Date',
    'Amount',
    'Entities',
    ''
  ],
    contextMenu: true,
    licenseKey: 'non-commercial-and-evaluation',
    filters: true
  });
  
  (function bindDumpButton() {
  
      Handsontable.Dom.addEvent(document.body, 'click', function (e) {
  
        var element = e.target || e.srcElement;
  
        if (element.nodeName == 'BUTTON' && element.name == 'dump') {
          var name = element.getAttribute('data-dump');
          var instance = element.getAttribute('data-instance');
          var hot = window[instance];
        }
     });
   })();

});