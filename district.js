/**
 * district.js
 * https://github.com/jundayw/district
 *
 * 插件扩展联动功能
 * @Author:Mr.Alex
 * @Email:<mail@wangqiqiang.com>
 * @version:1.0.0
 * @date:2018-11-08 18:00:07
 *
 * @demo:$('[name=province_code],[name=city_code],[name=country_code]').district({data:ChineseDistricts});
 */
(function(window,$,undefined){
	
	$.fn.district = function(options)
	{
		// 将选择器字符串转化为数组
		var elements = this.selector.split(',');
		// 默认配置
		var defaults = {
				data:[],// 数据来源
				load:'load',// 默认事件
				change:'change',// 通用事件
				target:'rel-target',// 联动操作目标
				option:'rel-option',// 编辑模式默认值
				install:true,// 装载函数:{true:使用select2(优化下拉菜单)插件;false:使用select原生下拉菜单;function(){}:自定义装载函数}
				index:-1,// 默认值，可提供后端判断是否已经选择
				callback:{
					items:function(element){return element;},
					item:function(data){return data;}
				},// 回调函数{items:通用事件回调;item:特定事件回调}
				map:{
					id:'value',
					text:'text',
					children:'children'
				}// 映射关系
		};
		// 合并默认配置、自定义配置到自定义配置
		options = $.extend(defaults,options);
		// 获取地区数据
		var getRegon = function(data,parent)
		{
			if( parent === undefined )
			{
				return data;
			}
			// 递归函数
			var recursion = function(data,parent)
			{
				// 匹配到结果
				if( data.value == parent ){return data.hasOwnProperty(options.map.children) ? data[options.map.children] : data;}
				// 未匹配到查询子节点
				if( data.hasOwnProperty(options.map.children) )
				{
					for(var k=0;k<data[options.map.children].length;k++)
					{
						var regon = recursion(data[options.map.children][k],parent);
						if( regon !== false ){return regon;}
					}
				}
				// 无效
				return false;
			};
			// 多维数组
			for(var i=0;i<data.length;i++)
			{
				var regon = recursion(data[i],parent);
				
				if( regon !== false ){return regon;}
			}
			
			return false;
		};
		// 装载select2插件方法
		var select2 = function(element,items,option)
		{
			var list = new Array();
			
			var value = options.index;
			
			list.push({
				id:value,
				text:$(element).data('placeholder')
			});
			
			for(var key in items)
			{
				list.push({
					id:items[key][options.map.id],
					text:items[key][options.map.text]
				});
				
				if( items[key][options.map.id] == option )
				{
					value = option;
				}
			}
			
			$(element).empty().select2({
				data:list
			}).val(value).trigger(options.change);
		};
		// 装载select方法
		var select = function(element,items,option)
		{
			var item = "<option value='" + options.index + "'>" + $(element).data('placeholder') + "</option>";
			
			for(var key in items)
			{
				if( items[key][options.map.id] == option )
				{
					item += "<option value='" + items[key][options.map.id] + "' selected>" + items[key][options.map.text] + "</option>";
				}else{
					item += "<option value='" + items[key][options.map.id] + "'>" + items[key][options.map.text] + "</option>";
				}
			}
			
			$(element).empty().html(item).trigger(options.change);
		};
		// 执行方法
		var change = function(target,data,parent,option)
		{
			// 默认支持select2插件
			if( options.install === true )
			{
				return select2(target,getRegon(data,parent),option);
			}
			// 可使用原生select
			if( options.install === false )
			{
				return select(target,getRegon(data,parent),option);
			}
			// 自定义其他方式
			return options.install(target,getRegon(data,parent),option);
		}
		// 遍历选择器数组
		$.each(elements,function(i,element)
		{
			// 确定当前选择器绑定的事件，第一个选择器绑定默认事件，其他选择器绑定通用事件
			if( i == 0 )
			{
				$(element).bind(options.load,function()
				{
					var option = $(element).attr(options.option) || options.index;
					
					return change(element,options.data,undefined,option);
				});
			}
			
			$(element).bind(options.change,function()
			{
				// 当前被选中项
				var parent = $(element).children('option:selected').val();
				
				if( parent === undefined )
				{
					return false;
				}
				
				if( parent != options.index )
				{
					options.callback.items(element);
				}
				
				// 操作目标
				var target = $(element).attr(options.target);
				
				if( target === undefined )
				{
					return options.callback.item(getRegon(options.data,parent));
				}
				
				// 默认值
				var option = $(target).attr(options.option) || options.index;
				
				return change(target,options.data,parent,option);
			});
		});
		
		// 触发第一个元素的默认时间
		$(elements.slice(0,1).join()).trigger(options.load);
		// 返回jQuery对象
		return this;
	}
})(window,jQuery);
