;
(function (w) {
  function WaterBall(option) {
    this.oCanvas = document.getElementById(option.id);
    this.context = this.oCanvas.getContext('2d');
    this.boxH = this.oCanvas.offsetHeight;
    this.boxW = this.oCanvas.offsetWidth;
    this.radius = this.boxH > this.boxW ? this.boxW : this.boxH
    this.width = 10;
    this.height = 10;
    this.speed = option.speed / 100;
    this.moveY = 0;
    this.moveX = 0;
    this.timeGogogo = '';
    this.moveYAdd = 4;
    this.moveYMax = option.moveY;
  }

  //开放点击事件
  WaterBall.prototype.clickHandle = function () {
    alert(1)
  }
  //描绘背景透明波浪
  WaterBall.prototype.drawTransparentBack = function () {
    var context = this.context;
    var width = this.width;
    var height = this.height;
    var moveX = this.moveX;
    var moveY = this.moveY;
    var radius = this.radius;
    context.beginPath();
    context.globalCompositeOperation = "source-over";
    for (var i = 0; i < radius; i += 0.1) {
      context.lineTo(i * width, height * Math.sin(i * width * 0.03 + moveX / 2.5) + height + radius * (100 - moveY) / 100 + 1);
    }
    context.lineTo(i * width, radius);
    context.lineTo(0, radius);
    var my_gradient = context.createLinearGradient(0, 0, 0, radius);
    my_gradient.addColorStop(0, "rgba(11,255,235,0.3)");
    my_gradient.addColorStop(1, "rgba(0,174,255,0.3)");
    context.fillStyle = my_gradient;
    context.fill();
    context.closePath();
  }
  //描绘前景波浪
  WaterBall.prototype.drawBack = function () {
    var context = this.context;
    var width = this.width;
    var height = this.height;
    var moveX = this.moveX;
    var moveY = this.moveY;
    var radius = this.radius;
    context.beginPath();
    context.globalCompositeOperation = "source-over";
    for (var i = 0; i < radius; i += 0.1) {
      context.lineTo(i * width, height * Math.sin(i * width * 0.03 + moveX) + height + radius * (100 - moveY) / 100 + 1);
    }
    context.lineTo(i * width, radius);
    context.lineTo(0, radius);
    var my_gradient = context.createLinearGradient(0, 0, 0, radius);
    my_gradient.addColorStop(0, "rgba(11,255,235,1)");
    my_gradient.addColorStop(1, "rgba(0,174,255,1)");
    context.fillStyle = my_gradient;
    context.fill();
    context.closePath();
  }
  //描绘圆
  WaterBall.prototype.drawArc = function () {
    var context = this.context;
    var width = this.width;
    var height = this.height;
    var moveX = this.moveX;
    var moveY = this.moveY;
    var radius = this.radius;

    context.beginPath();
    context.globalCompositeOperation = "destination-in";
    context.arc(radius / 2, radius / 2, radius / 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }
  //描绘
  WaterBall.prototype.draw = function () {
    var radius = this.radius;

    this.context.clearRect(0, 0, radius, radius)

    this.drawTransparentBack();
    this.drawBack();
    this.drawArc();
  }
  //初始化
  WaterBall.prototype.init = function () {
    var _this = this;
    _this.oCanvas.onclick = function () {
      _this.clickHandle()
    };
    _this.timeGogogo = setInterval(function () {
      _this.moveX += _this.speed;
      _this.moveY < _this.moveYMax ? (_this.moveY += _this.moveYAdd) : _this.moveY = _this.moveYMax;
      _this.draw();
    }, 50)
  }
  //销毁
  WaterBall.prototype.dispose = function () {
    clearInterval(this.timeGogogo)
  }

  w.WaterBall = WaterBall;

})(window);
