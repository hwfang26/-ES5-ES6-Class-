/* 
	ES5构造函数三个条件 
	1.一定要new
	2.原型上的属性和静态属性都不能枚举
	3.静态属性要放到构造函数本身里面
*/

//判断构造函数声明是否正确(有没有new)
function _classCallCheck(_this,_constructor){
	if(!(_this instanceof _constructor)){
		throw "TypeError: Class constructor Father cannot be invoked without 'new'";
	}
};

//给构造函数的原型对象上添加原型属性或方法
function _defineProperties(target,props){
	props.forEach(function(ele){
		//ele.key在这里指的是属性名,因为根据下面ele的定义,ele.value才是属性值
		Object.defineProperty(target,ele.key,{
			//给ele.key赋属性值
			value: ele.value,
			//默认为可写可配置
			writable: true,
			configurable: true
		});
	})
}

//处理公有属性和静态属性
function _createClass(_constructor,_prototypeProperties,_staticProperties){
	// 给原型上赋值
	if(_prototypeProperties){
		//调用赋值函数

		//给构造函数的原型对象上设置公有方法
		_defineProperties(_constructor.prototype,_prototypeProperties);
	}
	if(_staticProperties){
		//给构造函数添加静态方法(无需实例化就可以调用的方法就叫静态方法,Father.age = 26为设置静态属性,只能通过对象名本身调用)
		_defineProperties(_constructor,_staticProperties);
	}
}

//直接声明function Father()会把变量暴露到全局作用域,用立即执行函数封装作用域
var Father = (function(){
	function Father(name){
		//判断声明是否正确,如果不是通过new创建构造函数,this就指向window,通过构造函数,this就指向后面的Father本身
		_classCallCheck(this,Father);
		// var name = '老王';		//这种就是私有属性(私有属性和方法不能使用this调用)
		this.name = name || '老王';	//设置公有属性(需要实例化才可以调用)
		this.sex = '男';				//设置公有属性(需要实例化才可以调用)
	}
	//设置原型属性或方法
	_createClass(Father,
		[{		
			//key为所加属性名
			key: 'home',
			//value为key所对应的属性值
			value: function(){
				console.log('home');
			}
		}],
		[{
			key: 'age',
			value: function(){
				return '48';
			}
		}]
	);

	return Father;
})();

var oP = new Father();

//继承原型
function _inherit(sub,sup){
	//原型继承方法
	Object.setPrototypeOf(sub.prototype,sup.prototype);
}

var Son = (function(Father){
	//继承原型
	_inherit(Son,Father);

	function Son(name){
		//判断声明是否正确,如果不是通过new创建构造函数,this就指向window,通过构造函数,this就指向后面的Father本身
		_classCallCheck(this,Father);
		var _this = this;
		//继承Father的实例属性
		Father.call(_this,name);

		if(typeof that == 'object'){
			_this = that;
		}

		_this.major = '计算机';
		return _this;
	};
	//赋值
	_createClass(Son,[{
		key: 'play',
		value: function(){
			console.log('play');
		}
	}],
	[{
		key: 'age',
		value: function(){
			return '23';
		}
	}]);
	return Son;
})(Father);

var oAp = new Son('王富贵');


console.log(oAp)