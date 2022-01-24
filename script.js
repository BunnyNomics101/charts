var chartContainer = document.getElementById('chart-container');
var switchContainer = document.getElementById('switch-container');

const ws = new WebSocket('wss://api.serum-vial.dev/v1/ws')
const wsData = [];

var toggleButton = document.createElement('button');
toggleButton.setAttribute('type', 'button');
toggleButton.setAttribute('id', 'chart-toggle');
toggleButton.className = 'chart-toggle';

var width = Math.min(992, document.body.offsetWidth);
var height = Math.round(width * 0.5625);
var toolTipWidth = 125;

var toolTip = document.createElement('div');
toolTip.className = 'tooltip';
chartContainer.appendChild(toolTip);

var Colors = {
  RED: '#CE5D47',
  GREEN: '#6ACF9E',
  BLACK: '#060B13'
}
var areaSeries = null;

function setLineChart() {
  lineSeriesesData = new Map([
    ['1D', wsData ],
    ['1W', wsData ],
    ['1M', wsData ],
    ['3M', wsData ],
    ['1Y', wsData ],
    ['5Y', wsData ],
  ]);

  if (areaSeries) {
    chart.removeSeries(areaSeries);
    areaSeries = null;
  }
  
  var obj = {
    color: Colors.GREEN, 
    lineWidth: 2,
    series: {
      priceLineColor: Colors.GREEN
    }
  }
  areaSeries = chart.addLineSeries(obj);
  areaSeries.setData(lineSeriesesData.get(intervals[currentSwitchElem]));
  currentData = lineSeriesesData.get(intervals[currentSwitchElem]);
  
  if(currentData && currentData[currentData.length - 1] && currentData[0]) {
    if(currentData[currentData.length - 1].value < currentData[0].value) {
      obj.color = Colors.RED
      obj.priceLineColor = Colors.RED;
    }
  }
  areaSeries.applyOptions(obj);
}

// Switcher

var currentData;

var currentSwitchElem = 0;

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  var switcherElement = document.createElement('div');
  switcherElement.classList.add('switcher');

  var intervalElements = items.map(function(item) {
    var itemEl = document.createElement('button');
    itemEl.innerText = item;
    itemEl.classList.add('switcher-item');
    itemEl.classList.toggle('switcher-active-item', item === activeItem);
    itemEl.addEventListener('click', function() {
      onItemClicked(item);
    });
    switcherElement.appendChild(itemEl);
    return itemEl;
  });

  function onItemClicked(item) {
    if (item === activeItem) {
      return;
    }

    intervalElements.forEach(function(element, index) {
      element.classList.toggle('switcher-active-item', items[index] === item);
      if(items[index] === item) {
        currentSwitchElem = index;
      }
    });

    activeItem = item;

    activeItemChangedCallback(item);
  }

  return switcherElement;
}

var intervals = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

var switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);
switchContainer.appendChild(switcherElement);
switchContainer.appendChild(toggleButton);

var isChartSwitched = false;

var chart = LightweightCharts.createChart(chartContainer, {
	width: 992,
  height: 558,
	rightPriceScale: {
		visible: false,
	},
	leftPriceScale: {
		visible: false,
	},
  layout: {
    backgroundColor: Colors.BLACK,
    textColor: Colors.GREEN,
  },
  grid: {
    horzLines: {
      visible: false,
    },
    vertLines: {
      visible: false,
    },
  },
  crosshair: {
    horzLine: {
      visible: false,
    },
  },
	timeScale: {
    visible: false,
	},
	handleScroll: {
		vertTouchDrag: false,
	}
});

var startTime = 767477600;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// candle data

var candleArr = [];

for(let i = 0; i < 200; i++) {
	let time = startTime + 3600*24 * i;

	let open;
  if(i === 0) {
    open = Number(getRandomArbitrary(1000, 1200).toFixed(2));
  } else {
    open = candleArr[i - 1].close;
  }

  let high = Number(getRandomArbitrary(open, open + 100).toFixed(2));
	let low = Number(getRandomArbitrary( open - 100, open).toFixed(2));
  let close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);
}

var candleDayData = candleArr;

var candleArr = [];

for(let i = 0; i < 200; i++) {
	let time = startTime + 3600*24*7 * i;

	let open;
  if(i === 0) {
    open = Number(getRandomArbitrary(1000, 1200).toFixed(2));
  } else {
    open = candleArr[i - 1].close;
  }

  let high = Number(getRandomArbitrary(open, open + 100).toFixed(2));
	let low = Number(getRandomArbitrary( open - 100, open).toFixed(2));
  let close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

var candleWeekData = candleArr;

candleArr = [];

for(let i = 0; i < 200; i++) {
	let time = startTime + 3600*24*7*30 * i;
	let open;
  if(i === 0) {
    open = Number(getRandomArbitrary(1000, 1200).toFixed(2));
  } else {
    open = candleArr[i - 1].close;
  }

  let high = Number(getRandomArbitrary(open, open + 100).toFixed(2));
	let low = Number(getRandomArbitrary( open - 100, open).toFixed(2));
  let close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

var candleMonthData = candleArr;

var candleArr = [];

for(let i = 0; i < 200; i++) {
	let time = startTime + 3600*24*7*30*3 * i;
	let open;
  if(i === 0) {
    open = Number(getRandomArbitrary(1000, 1200).toFixed(2));
  } else {
    open = candleArr[i - 1].close;
  }

  let high = Number(getRandomArbitrary(open, open + 100).toFixed(2));
	let low = Number(getRandomArbitrary( open - 100, open).toFixed(2));
  let close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

var candleThreeMonthsData = candleArr;

candleArr = [];

for(let i = 0; i < 50; i++) {
	let time = startTime + 3600*24*365 * i;
	let open;
  if(i === 0) {
    open = Number(getRandomArbitrary(1000, 1200).toFixed(2));
  } else {
    open = candleArr[i - 1].close;
  }

  let high = Number(getRandomArbitrary(open, open + 100).toFixed(2));
	let low = Number(getRandomArbitrary( open - 100, open).toFixed(2));
  let close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}
var candleYearData = candleArr;

var candleArr = [];

for(let i = 0; i < 10; i++) {
	let time = startTime + 3600*24*365*5 * i;
	let open;
  if(i === 0) {
    open = Number(getRandomArbitrary(1000, 1200).toFixed(2));
  } else {
    open = candleArr[i - 1].close;
  }

  let high = Number(getRandomArbitrary(open, open + 100).toFixed(2));
	let low = Number(getRandomArbitrary( open - 100, open).toFixed(2));
  let close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

var candleFiveYearData = candleArr;

var candleSeriesesData = new Map([
  ['1D', candleDayData ],
  ['1W', candleWeekData ],
  ['1M', candleMonthData ],
  ['3M', candleThreeMonthsData ],
  ['1Y', candleYearData ],
  ['5Y', candleFiveYearData ],
]);

var lineSeriesesData;

// DATA API

let date;
ws.onmessage = (message) => {
  const dataPack = JSON.parse(message.data);

  if(dataPack['type'] === 'recent_trades') {
    for(let i = 0; i < dataPack.trades.length; i++) {
      const formatedObj = {};
      date = new Date();
      date.setDate(date.getDate() + i);
      formatedObj.time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      formatedObj.value = dataPack.trades[i].price;
      wsData.push(formatedObj);
    }
    setLineChart();
  }

  let newDate =  1;

  if(dataPack['type'] === 'trade') {
      const formatedObj = {};
      date.setDate(date.getDate() + newDate);
      formatedObj.time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      formatedObj.value = dataPack.price;
      wsData.push(formatedObj);
      syncToInterval(intervals[currentSwitchElem]);
  }
  console.clear();
  console.log('data update');
  console.log(wsData);
}

ws.onopen = () => {
  const subscribeL2 = {
    op: 'subscribe',
    channel: 'trades',
    markets: ['BTC/USDC']
  }

  ws.send(JSON.stringify(subscribeL2))
}

// END DATA API


function syncToInterval(interval) {
  if (areaSeries) {
    chart.removeSeries(areaSeries);
    areaSeries = null;
  }

  if(isChartSwitched) {
    areaSeries = chart.addCandlestickSeries({
      upColor: Colors.GREEN,
      downColor: Colors.RED,
      borderUpColor: Colors.GREEN,
      borderDownColor: Colors.RED,
      wickUpColor: Colors.GREEN,
      wickDownColor: Colors.RED
    });
    areaSeries.setData(candleSeriesesData.get(interval));
    currentData = candleSeriesesData.get(interval);
  } else {
    setLineChart();
  }

  outOfChart(currentData);
}

syncToInterval(intervals[currentSwitchElem]);

toggleButton.className = 'chart-toggle chart-toggle--candles';

toggleButton.addEventListener('click', function() {
  if(!isChartSwitched) {
      isChartSwitched = true;
      toggleButton.className = 'chart-toggle chart-toggle--line';
  } else {
      isChartSwitched = false;
      toggleButton.className = 'chart-toggle chart-toggle--candles';
  }
  syncToInterval(intervals[currentSwitchElem]);
});


function businessDayToString(businessDay) {
	return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
}

function formatPrice(price) {
  var hundredths = ((price%1).toFixed(2)).toString().slice(1);
  var hundreds = Math.floor(price%1000);
  while(hundreds.toString().length < 3) {
    hundreds = '0'+ hundreds;
  }
  var thousands = Math.floor(price/1000);
  (thousands === 0 ? thousands = '' : thousands += ',');

  var str = `<span class="tooltip__price-small">$</span>${thousands}${hundreds}<span class="tooltip__price-small">${hundredths}</span>`;
  return str;
}

function formatDifference(price, previousPrice) {
  var difference = (price - previousPrice).toFixed(2);
  var percent = '(' + Math.abs(((difference*100)/previousPrice).toFixed(2)) + '%)';
  var differenceClassname = 'green';
  if(difference > 0) {
    differenceClassname = 'green';
    difference = '+$' + difference;
  } else if (difference < 0) {
    differenceClassname = 'red';
    difference = '-$'  + Math.abs(difference);
  } else {
    differenceClassname = 'yellow';
    difference = '$'  + difference;
  }

  var str = `<span class="tooltip__difference ${differenceClassname}">${difference}${percent}</span>`;
  return str;
}

function outOfChart(currentData) {
  if(!currentData || !currentData[currentData.length - 1] || !currentData[currentData.length - 1]) {
    return
  }
  var previousPriceObj = currentData[currentData.length - 2];
  var currentPriceObj = currentData[currentData.length - 1];
  var previousPrice;
  var price;
  var pointDate = currentData[currentData.length - 1].time;
  var dateStr;
  if(typeof pointDate === 'object') {
    dateStr = `${pointDate.month}/${pointDate.day}/${pointDate.year}`;
  }

  if(typeof pointDate === 'number') {
    dateStr = new Date(currentData[currentData.length - 1].time * 1000).toLocaleDateString();
  }

  if('value' in previousPriceObj) {
    price = currentPriceObj.value;
    if(typeof(previousPriceObj) !== 'undefined') {
      previousPrice = previousPriceObj.value;
    }
  } else {
    price = currentPriceObj.close;
    if(typeof(previousPriceObj) !== 'undefined') {
      previousPrice = previousPriceObj.close;
    }
  }
  var differenceStr = '';

  if(typeof(previousPriceObj) !== 'undefined') {
    differenceStr = formatDifference(price, previousPrice);
  }

  var priceStr = formatPrice(price);

  toolTip.innerHTML = `<div class="tooltip__price">${priceStr}</div><div class="tooltip__time">${differenceStr} ${dateStr}</div>`;
  toolTip.style.left = 3 + 'px';
  toolTip.style.display = 'block';
}

// update tooltip

chart.subscribeCrosshairMove(function(param) {
  console.clear();
  if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
    outOfChart(currentData);
	} else {
    var previousPriceObj;
    var price = param.seriesPrices.get(areaSeries);
    var previousPrice;
    var dateStr;
    if(typeof param.time === 'object') {
      dateStr = `${param.time.month}/${param.time.day}/${param.time.year}`;
    } else {
      dateStr = LightweightCharts.isBusinessDay(param.time) ? businessDayToString(param.time) : new Date(param.time * 1000).toLocaleDateString();
    }

    previousPriceObj = currentData[currentData.indexOf(currentData.find(currentData => currentData.time === param.time)) - 1];
    if(typeof(price) !== 'object') {
      if(typeof(previousPriceObj) !== 'undefined') {
        previousPrice = previousPriceObj.value
      }
    } else {
      price = price.close;
      if(typeof(previousPriceObj) !== 'undefined') {
        previousPrice = previousPriceObj.close;
      }
    }

    var differenceStr = '';

    if(typeof(previousPriceObj) !== 'undefined') {
      differenceStr = formatDifference(price, previousPrice);
    }

    var priceStr = formatPrice(price);

    toolTip.innerHTML = `<div class="tooltip__price">${priceStr}</div><div class="tooltip__time">${differenceStr} ${dateStr}</div>`;
    var left = param.point.x - toolTipWidth / 2;
    left = Math.max(0, Math.min(width - toolTipWidth, left));
    toolTip.style.left = left + 'px';
    toolTip.style.display = 'block';
  }
});


// Resize

function resize() {
  var timerID;

  var width = Math.min(992, document.body.offsetWidth)
  var height = Math.round(width * 0.5625);
  if (timerID) clearTimeout(timerID);
  timerID = setTimeout(function() {
      chart.resize(width, height);
  }, 200);
}
resize();
document.body.onresize = resize;