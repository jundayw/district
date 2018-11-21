## 简介

district 是一款 jQuery 插件，主要用于多级菜单联动（如省市县），可根据自己需求定制。支持 jQuery.select2（优化下拉菜单插件）插件，支持原生 select（下拉菜单）。

## 演示
[DEMO常规版](https://jundayw.github.io/district/district.html)

[DEMO插件版](https://jundayw.github.io/district/district-select2.html)

[DEMO原生版](https://jundayw.github.io/district/district-select.html)

## 开发特性支持

最新的 district 提供了这些支持包括：

*  多级联动
*  事件回调自定义
*  装载函数自定义（实现支持不同插件的可能）
*  数据源映射关系（可使用自己已用数据源）
*  回调函数支持（支持电话区号、邮政编码、详细地址自动补全）
*  支持表单的新增及修改

## 开发理念

简单、快速。

## 开使使用

加载依赖库
```html
<script src="jQuery.js"></script>
```
加载本插件
```html
<script src="districts.chinese.min.js"></script>
<script src="district.js"></script>
```
调用
```javascript
<script type="text/javascript">
$(function(){
	$('[name=province_code],[name=city_code],[name=country_code]').district({data:ChineseDistricts});
});
</script>
```
HTML代码
```html
<select class="form-control" name="province_code" rel-target="[name=city_code]" rel-option="130000" data-placeholder="请选择省/直辖市"></select>
<select class="form-control" name="city_code" rel-target="[name=country_code]" rel-option="130100" data-placeholder="请选择市/区"></select>
<select class="form-control" name="country_code" rel-option="130123" data-placeholder="请选择县"></select>
```
完成

## 商业友好的开源协议

遵循Apache2开源协议发布。Apache Licence是著名的非盈利开源组织Apache采用的协议，该协议和BSD类似，鼓励代码共享和尊重原作者的著作权，同样允许代码修改，再作为开源或商业软件发布。
