$.fn.waterFall = function (options) {
	var defaults = {
		gap: 20
	}
	defaults = $.extend(defaults, options);
	var _this = $(this),
		items = _this.children(),
		width = items.width(),
		height = '',
		count = Math.floor(_this.width() / width),
		colums = [],
		gap = defaults.gap;
	items.each(function (key, val) {
		height = $(val).height();

		if(key < count) {
			colums[key] = height;
			$(val).css({
				top: 0,
				left: (width + gap) * key
			});
		} else {
			var min_val = colums[0];
			var min_key = 0;
			for(var i=0; i<colums.length; i++) {
				if(colums[i] < min_val) {
					min_val = colums[i];
					min_key = i;
				}
			}
			colums[min_key] += height + gap;
			$(val).css({
				top: min_val + gap,
				left: (width + gap) * min_key
			});
		}

	});
	var max_val = colums[0];
	for(var j=0; j<colums.length; j++) {
		if(colums[j] > max_val) {
			max_val = colums[j];
		}
	}
	_this.height(max_val);

}
