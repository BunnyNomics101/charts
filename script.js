var chartContainer = document.getElementById('chart-container');
var switchContainer = document.getElementById('switch-container');

var toggleButton = document.createElement('button');
toggleButton.setAttribute('type', 'button');
toggleButton.setAttribute('id', 'chart-toggle');
toggleButton.className = 'chart-toggle';

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
    backgroundColor: '#060B13',
    textColor: '#6CD19D',
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
	},
});

var startTime = 1556877600;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var candleArr = [];

for(let i = 0; i < 7*24; i++) {
	const time = startTime + 3600 * i;
	const high = Number(getRandomArbitrary(225, 230).toFixed(2));
	const low = Number(getRandomArbitrary(220, high).toFixed(2));
	const open = Number(getRandomArbitrary(low, high).toFixed(2));
	const close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

// candle data

var candleDayData = candleArr.slice(0, 23);

var candleWeekData = candleArr.slice(0, (7*24 - 1));

candleArr = [];

for(let i = 0; i < 3*31; i++) {
	const time = startTime + 3600*24 * i;
	const high = Number(getRandomArbitrary(225, 230).toFixed(2));
	const low = Number(getRandomArbitrary(220, high).toFixed(2));
	const open = Number(getRandomArbitrary(low, high).toFixed(2));
	const close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

var candleMonthData = candleArr.slice(0, (31 - 1));

var candleThreeMonthsData = candleArr.slice(0, (3*31 - 1));

candleArr = [];

for(let i = 0; i < 5*12; i++) {
	const time = startTime + 3600*24*31 * i;
	const high = Number(getRandomArbitrary(225, 230).toFixed(2));
	const low = Number(getRandomArbitrary(220, high).toFixed(2));
	const open = Number(getRandomArbitrary(low, high).toFixed(2));
	const close = Number(getRandomArbitrary(low, high).toFixed(2));

	var obj = {
		time: time,
		open: open,
		high: high,
		low: low,
		close: close
	}

	candleArr.push(obj);obj
}

var candleYearData = candleArr.slice(0, (12 - 1));

var candleFiveYearData = candleArr.slice(0, (5*12 - 1));

var candleSeriesesData = new Map([
  ['1D', candleDayData ],
  ['1W', candleWeekData ],
  ['1M', candleMonthData ],
  ['3M', candleThreeMonthsData ],
  ['1Y', candleYearData ],
  ['5Y', candleFiveYearData ],
]);

// candle DATA
var lineArr = [];

for(let i = 0; i < 7*24; i++) {
	const time = startTime + 3600 * i;
	const value = Number(getRandomArbitrary(220, 230).toFixed(2));

	var obj = {
		time: time,
		value: value
	}

	lineArr.push(obj);obj
}

var lineDayData = lineArr.slice(0, 23);

var lineWeekData = lineArr.slice(0, (7*24 - 1));

lineArr = [];

for(let i = 0; i < 3*31; i++) {
	const time = startTime + 3600*24 * i;
	const value = Number(getRandomArbitrary(220, 230).toFixed(2));

	var obj = {
		time: time,
		value: value
	}

	lineArr.push(obj);obj
}

var lineMonthData = lineArr.slice(0, (31 - 1));

var lineThreeMonthsData = lineArr.slice(0, (3*31 - 1));

lineArr = [];

for(let i = 0; i < 5*12; i++) {
	const time = startTime + 3600*24*31 * i;
	const value = Number(getRandomArbitrary(220, 230).toFixed(2));

	var obj = {
		time: time,
		value: value
	}

	lineArr.push(obj);obj
}

var lineYearData = lineArr.slice(0, (12 - 1));

var lineFiveYearData = lineArr.slice(0, (5*12 - 1));

var lineSeriesesData = new Map([
  ['1D', lineDayData ],
  ['1W', lineWeekData ],
  ['1M', lineMonthData ],
  ['3M', lineThreeMonthsData ],
  ['1Y', lineYearData ],
  ['5Y', lineFiveYearData ],
]);

// Switcher

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

var areaSeries = null;

function syncToInterval(interval) {
  if (areaSeries) {
    chart.removeSeries(areaSeries);
    areaSeries = null;
  }

  if(!isChartSwitched) {
    areaSeries = chart.addCandlestickSeries({
      upColor: '#6ACF9E',
      downColor: '#CE5D47',
      borderUpColor: '#6ACF9E',
      borderDownColor: '#CE5D47',
      wickUpColor: '#6ACF9E',
      wickDownColor: '#CE5D47'
    });
    areaSeries.setData(candleSeriesesData.get(interval));
  } else {
    areaSeries = chart.addLineSeries({
      color: '#6CD19D', 
      lineWidth: 2
    });
    areaSeries.setData(lineSeriesesData.get(interval));
  }
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
  console.log('businessDay', businessDay);
	return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
}



var width = Math.min(992, document.body.offsetWidth);
var height = Math.round(width * 0.5625);
var toolTipWidth = 125;

var toolTip = document.createElement('div');
toolTip.className = 'tooltip';
chartContainer.appendChild(toolTip);

// update tooltip

chart.subscribeCrosshairMove(function(param) {
	if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
		toolTip.style.display = 'none';
		return;
	}

	toolTip.style.display = 'block';

  console.log('param.time', param.time);

	var dateStr = LightweightCharts.isBusinessDay(param.time) ? businessDayToString(param.time) : new Date(param.time * 1000).toLocaleDateString();

  let myDate = (new Date(param.time * 1000));
  console.log('myDate', myDate);

  myDate = myDate.toString('MM dd yyyy');

console.log('myDate', myDate);

	toolTip.innerHTML = dateStr;

	var left = param.point.x - toolTipWidth / 2;
	left = Math.max(0, Math.min(width - toolTipWidth, left));

	toolTip.style.left = left + 'px';
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