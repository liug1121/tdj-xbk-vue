/**
 * 获得base64
 * @param {Object} options
 * @param {Number} [options.width] 图片需要压缩的宽度，高度会跟随调整
 * @param {Number} [options.quality=0.8] 压缩质量，不压缩为1
 * @param {Function} [options.before(this, blob, file)] 处理前函数,this指向的是input:file
 * @param {Function} options.success(options) 处理后函数
 * @example
 *
 */
$.fn.localResizeIMG = function (options)
{
	var IMG_MAX_WIDTH = 900;
	var IMG_QUALITY = 0.8;

	options.width = options.width || IMG_MAX_WIDTH;
	options.quality = options.quality || IMG_QUALITY;

	var file, blob, URL;
	file = $(this)[0].files[0];
	URL = window.URL || window.webkitURL;
	blob = URL.createObjectURL(file);

	// 执行前函数
	if ($.isFunction(options.before))
	{
		options.before(this, blob, file)
	}

	var imgInfo = getImgInfo(file); //Orientation, lng, lat, dateTime等信息
	getImageBase64(blob, options, function (base64)
	{
		imgInfo.base64 = base64;
		imgInfo.clearBase64 = base64.substr(base64.indexOf(',') + 1);
		options.success(imgInfo);
	})

	function getImgInfo($file)
	{
		var result = {};
		//获取照片方向角属性，用户旋转控制
		EXIF.getData($file, function ()
		{
			try
			{
				EXIF.getAllTags(this);
				result.Orientation = EXIF.getTag(this, 'Orientation');
			}
			catch (e)
			{
				result.Orientation = 0;
			}

			result.lng = EXIF.getTag(this, 'GPSLongitude');
			result.lat = EXIF.getTag(this, 'GPSLatitude');
			result.dateTime = EXIF.getTag(this, 'DateTime');
		});
		return result;
	}

	/**
	 * 生成base64
	 * @param blob 通过file获得的二进制
	 */
	function getImageBase64($blob, $options, $callBack)
	{
		var canvas, ctx, base64, w, h, result;
		var img = new Image();
		img.onload = onLoaded_img;
		img.src = $blob;

		function onLoaded_img()
		{
			w = img.width;
			h = img.height
			var scale = w / h;
			w = $options.width || w;
			w = Math.min(IMG_MAX_WIDTH, w); //规定生成的图片最大宽度
			h = w / scale;

			canvas = document.createElement('canvas');
			ctx = canvas.getContext('2d');
			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(img, 0, 0, w, h);
			if (imgInfo.Orientation != 0)
			{
				var mpImg = new MegaPixImage(this);
				mpImg.onrender = onRotate_img;
				mpImg.render(canvas, {
					maxWidth: w,
					maxHeight: h,
					quality: 1,
					orientation: imgInfo.Orientation
				});
			}
			else
			{
				onRotate_img();
			}
		}

		function onRotate_img()
		{

// 			var ua = navigator.userAgent;
// 			if (ua.match(/Android/i))
// 			{
// 				var encoder = new JPEGEncoder();
// 				base64 = encoder.encode(ctx.getImageData(0, 0, w, h), $options.quality * 100 || 80);
// 			}
// 			else
// 			{
// 				base64 = canvas.toDataURL('image/jpeg', $options.quality || 0.8);
// 			}
			base64 = canvas.toDataURL('image/jpeg', 0.8);
			$callBack(base64);
		}
	}
};
