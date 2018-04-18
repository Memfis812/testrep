'use strict'

class CanvasImage {
  constructor(context, src, coordX, coordY, width, height) {
    this.context = context;
    this.src = src;
    this.coordX = coordX;
    this.coordY = coordY;
    this.width = width;
    this.height = height;
    this.img = new Image();
  }

  create() {
    this.img.src = this.src;
    this.context.drawImage(this.img, this.coordX, this.coordY, this.width, this.height);
  }
}

class Planet {
  constructor(ctx, coordX, coordY, deg, route, radius, color, lineWidth, gco, type, orbitRadius = null, parent = null, speed = null, trajectory = null) {
    this.ctx = ctx;
    this.coordX = coordX;
    this.coordY = coordY;
    this.deg = deg;
    this.route = route;
    this.radius = radius;
    this.color = color;
    this.lineWidth = lineWidth;
    this.gco = gco;
    this.type = type;
    this.orbitRadius = orbitRadius;
    this.parent = parent;
    this.speed = speed;
    this.trajectory = trajectory;
  }

  create() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color;
    this.ctx.arc(this.coordX, this.coordY, this.radius, 0 , this.deg, this.route);
    this.ctx.globalCompositeOperation = this.gco;
    this.ctx.stroke();

    if (this.type === 'dynamic' && this.trajectory.route === 'normal') {
      this.trajectory.f += this.trajectory.step; 
      this.coordX = this.parent.coordX + this.orbitRadius * Math.cos(this.trajectory.f / this.speed);
      this.coordY = this.parent.coordY + this.orbitRadius * Math.sin(this.trajectory.f / this.speed);
    }

    if (this.type === 'dynamic' && this.trajectory.route === 'reverse') {
      this.trajectory.f += this.trajectory.step; 
      this.coordX = this.parent.coordX + this.orbitRadius * Math.sin(this.trajectory.f / this.speed);
      this.coordY = this.parent.coordY + this.orbitRadius * Math.cos(this.trajectory.f / this.speed);
    }
  }
}

let init = () => {

  let canvas = document.getElementById('cnvs');
  let ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let cw = canvas.width;
  let ch = canvas.height;

  let reqAnimID;
  let reqAnimTextID;
  let counter = 0;
  let textCounter = 0;

  let sunProps = {
    positionX: cw / 2,
    positionY: ch / 2,
    deg: 2 * Math.PI,
    route: false,
    radius: cw / 10,
    color: 'yellow',
    lineWidth: 2,
    gco: 'source-over',
    type: 'static'
  };

  let earthProps = {
    deg: 2 * Math.PI,
    route: false,
    radius: cw / 30,
    color: 'blue',
    lineWidth: 2,
    gco: 'source-over',
    type: 'dynamic',
    orbitRadius: sunProps.radius * 2, 
    speed: 10,
    trajectory: {
      route: 'reverse',
      step: Math.PI / 90,
      f: 0
    }
  };

  let moonProps = {
    deg: 2 * Math.PI,
    route: false,
    radius: cw / 300,
    color: 'white',
    lineWidth: 5,
    gco: 'source-over',
    type: 'dynamic',
    orbitRadius: earthProps.radius * 1.5,
    speed: 10,
    trajectory: {
      route: 'normal',
      step: Math.PI / 90,
      f: 0
    }
  };

  let space = new CanvasImage(ctx, 'stars.jpg', 0, 0, canvas.width, canvas.height);
  let sun = new Planet(ctx, sunProps.positionX, sunProps.positionY, sunProps.deg, sunProps.route, sunProps.radius, sunProps.color, sunProps.lineWidth, sunProps.gco, sunProps.type);
  let earth = new Planet(ctx, sun.coordX, sun.coordY, earthProps.deg, earthProps.route, earthProps.radius, earthProps.color, earthProps.lineWidth, earthProps.gco, earthProps.type, earthProps.orbitRadius, sun, earthProps.speed, earthProps.trajectory);
  let moon = new Planet(ctx, earth.coordX, earth.coordY, moonProps.deg, moonProps.route, moonProps.radius, moonProps.color, moonProps.lineWidth, moonProps.gco, moonProps.type, moonProps.orbitRadius, earth, moonProps.speed, moonProps.trajectory);

  let createPanel = () => {
    let size_1 = cw / 60;
    let size_2 = cw / 30;

    //иконка остановки/запуска
    ctx.beginPath();
    ctx.rect(size_1, size_1 , size_2, size_2);
    ctx.moveTo(cw / 40, cw / 40);
    ctx.lineTo(cw / 40, cw / 24);
    ctx.moveTo(cw / 24, cw / 40);
    ctx.lineTo(cw / 24, cw / 24);
    ctx.moveTo(cw / 40, cw / 40);
    ctx.lineTo(cw / 30, cw / 30);
    ctx.lineTo(cw / 40, cw / 24);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.stroke();

    //иконка вращения земли по ч.с.
    ctx.beginPath();
    ctx.rect(size_1, 2 * size_1 + size_2, size_2, size_2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 2 * size_1 + size_2 + cw / 60, cw / 80, 0 , Math.PI / 2, true);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cw / 22,  3 * size_1 + cw / 30);
    ctx.lineTo(cw / 21,  3 * size_1 + cw / 40);
    ctx.moveTo(cw / 22,  3 * size_1 + cw / 30);
    ctx.lineTo(cw / 26,  3 * size_1 + cw / 40);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();

    //иконка вращения земли ппротив ч.с.
    ctx.beginPath();
    ctx.rect(size_1, 3 * size_1 + 2 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 3 * size_1 + 2 * size_2 + cw / 60, cw / 80, 0.5 * Math.PI , Math.PI, true);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cw / 48,  6 * size_1 + cw / 30);
    ctx.lineTo(cw / 52,  6 * size_1 + cw / 40);
    ctx.moveTo(cw / 48,  6 * size_1 + cw / 30);
    ctx.lineTo(cw / 35,  6 * size_1 + cw / 40);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
  
    //иконка вращения луны по ч.с.
    ctx.beginPath();
    ctx.rect(size_1, 4 * size_1 + 3 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 4 * size_1 + 3 * size_2 + cw / 60, cw / 80, 0 , Math.PI / 2, true);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cw / 22,  9 * size_1 + cw / 30);
    ctx.lineTo(cw / 21,  9 * size_1 + cw / 40);
    ctx.moveTo(cw / 22,  9 * size_1 + cw / 30);
    ctx.lineTo(cw / 26,  9 * size_1 + cw / 40);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    //иконка вращения луны против ч.с.
    ctx.beginPath();
    ctx.rect(size_1, 5 * size_1 + 4 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 5 * size_1 + 4 * size_2 + cw / 60, cw / 80, 0.5 * Math.PI , Math.PI, true);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cw / 48,  12 * size_1 + cw / 30);
    ctx.lineTo(cw / 52,  12 * size_1 + cw / 40);
    ctx.moveTo(cw / 48,  12 * size_1 + cw / 30);
    ctx.lineTo(cw / 35,  12 * size_1 + cw / 40);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    //иконка удаления земли
    ctx.beginPath();
    ctx.rect(size_1, 6 * size_1 + 5 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 6 * size_1 + 5 * size_2 + cw / 60, cw / 80, 0 , 2 * Math.PI, true);
    ctx.moveTo(size_1, 6 * size_1 + 5 * size_2);
    ctx.lineTo(cw / 20, 6 * size_1 + 5 * size_2 + cw / 30);
    ctx.moveTo(size_1, 6 * size_1 + 5 * size_2 + cw / 30);
    ctx.lineTo(cw / 20, 6 * size_1 + 5 * size_2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();

    //иконка удаления луны
    ctx.beginPath();
    ctx.rect(size_1, 7 * size_1 + 6 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 7 * size_1 + 6 * size_2 + cw / 60, cw / 80, 0 , 2 * Math.PI, true);
    ctx.moveTo(size_1, 7 * size_1 + 6 * size_2);
    ctx.lineTo(cw / 20, 7 * size_1 + 6 * size_2 + cw / 30);
    ctx.moveTo(size_1, 7 * size_1 + 6 * size_2 + cw / 30);
    ctx.lineTo(cw / 20, 7 * size_1 + 6 * size_2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    //иконка удаления солнца
    ctx.beginPath();
    ctx.rect(size_1, 8 * size_1 + 7 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 8 * size_1 + 7 * size_2 + cw / 60, cw / 80, 0 , 2 * Math.PI, true);
    ctx.moveTo(size_1, 8 * size_1 + 7 * size_2);
    ctx.lineTo(cw / 20, 8 * size_1 + 7 * size_2 + cw / 30);
    ctx.moveTo(size_1, 8 * size_1 + 7 * size_2 + cw / 30);
    ctx.lineTo(cw / 20, 8 * size_1 + 7 * size_2);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 1;
    ctx.stroke();

    //иконка вызова подсказки
    ctx.beginPath();
    ctx.rect(size_1, 9 * size_1 + 8 * size_2 , size_2, size_2);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size_2, 9 * size_1 + 8 * size_2 + cw / 60, cw / 80, 0 , 2 * Math.PI, true);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(size_2, 9 * size_1 + 8 * size_2 + cw / 60);
    ctx.lineTo(size_2, 8 * size_1 + 8 * size_2 + cw / 40);
    ctx.moveTo(size_2, 9 * size_1 + 8 * size_2 + cw / 60);
    ctx.lineTo(size_2, 8 * size_1 + 8 * size_2 + cw / 24);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  let drawEarthAndMoon = () => {
    cancelAnimationFrame(reqAnimTextID);
    reqAnimID = requestAnimationFrame(drawEarthAndMoon);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    space.create();
    sun.create();
    earth.create();
    moon.create();
    createPanel();
  }

  let drawText = () => {
    cancelAnimationFrame(reqAnimID);
    reqAnimTextID = requestAnimationFrame(drawText);
    space.create();
    ctx.fillStyle = 'yellow';
    let text = 'ИЗМЕНИТЕ РАЗМЕР ОКНА';
    ctx.fillText(text, cw / 2 - ctx.measureText(text).width / 2, ch / 2);

    if (textCounter % 12 === 0) {
      ctx.font = "0px Arial";
      textCounter++;
    } else if (textCounter % 12 !== 0) {
      ctx.font = "30px Arial";
      textCounter++;
    }
  };

  if ((cw / ch) > 2 ) {
    drawText();
  } else {
    drawEarthAndMoon();
  }
  
  window.onresize = () => {
    cancelAnimationFrame(reqAnimID);
    cancelAnimationFrame(reqAnimTextID);
    document.querySelector('.modal-table').classList.remove('modal-table-active');
    init();
  };

  document.onclick = (e) => {
    let size_1 = cw / 60;
    let size_2 = cw / 30;

    if ((cw / ch) > 2 ) {
      return false;
    }
    
    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > size_1 && e.pageY < cw / 20) {

      if (counter % 2 === 0 && !document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        cancelAnimationFrame(reqAnimID);
        counter++;
      } else if (counter % 2 !== 0 && !document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        cancelAnimationFrame(reqAnimID);
        drawEarthAndMoon();
        counter++;
      } else if (document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        document.querySelector('.modal-table').classList.remove('modal-table-active');
        cancelAnimationFrame(reqAnimID);
        drawEarthAndMoon();
      }
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 2 * size_1 + size_2 && e.pageY < 2 * size_1 + 2 * size_2) {
      earth.trajectory.route = 'normal';
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 3 * size_1 + 2 * size_2 && e.pageY < 3 * size_1 + 3 * size_2) {
      earth.trajectory.route = 'reverse';
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 4 * size_1 + 3 * size_2 && e.pageY < 4 * size_1 + 4 * size_2) {
      moon.trajectory.route = 'normal';
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 5 * size_1 + 4 * size_2 && e.pageY < 5 * size_1 + 5 * size_2) {
      moon.trajectory.route = 'reverse';
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 6 * size_1 + 5 * size_2 && e.pageY < 6 * size_1 + 6 * size_2) {

      if (earth.gco === 'source-over' && moon.gco === 'source-over') {
        earth.gco = 'destination-over';
        moon.gco = 'destination-over';
      } else if (earth.gco === 'destination-over' && moon.gco === 'destination-over') {
        console.log(1);
        earth.gco = 'source-over';
        moon.gco = 'source-over';
      } else if (earth.gco === 'source-over' && moon.gco === 'destination-over') {
        earth.gco = 'destination-over';
      } else if (earth.gco === 'destination-over' && moon.gco === 'source-over') {
        earth.gco = 'source-over';
      }
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 7 * size_1 + 6 * size_2 && e.pageY < 7 * size_1 + 7 * size_2) {

      if (moon.gco === 'source-over') {
        moon.gco = 'destination-over';
      } else if (moon.gco === 'destination-over') {
        moon.gco = 'source-over';
      }
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 8 * size_1 + 7 * size_2 && e.pageY < 8 * size_1 + 8 * size_2) {

      if (sun.gco === 'source-over') {
        sun.gco = 'destination-over';
      } else if (sun.gco === 'destination-over') {
        sun.gco = 'source-over';
      }
    }

    if (e.pageX > size_1 && e.pageX < cw / 20 && e.pageY > 9 * size_1 + 8 * size_2 && e.pageY < 9 * size_1 + 9 * size_2) {

      if (!document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        document.querySelector('.modal-table').classList.add('modal-table-active');
        cancelAnimationFrame(reqAnimID);
      } else if (document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        document.querySelector('.modal-table').classList.remove('modal-table-active');
        drawEarthAndMoon();
      }
    }
  };

  document.onkeydown = (e) => {

    if ((cw / ch) > 2 ) {
      return false;
    }

    if (e.keyCode === 32) {
      if (counter % 2 === 0 && !document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        cancelAnimationFrame(reqAnimID);
        counter++;
      } else if (counter % 2 !== 0 && !document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        cancelAnimationFrame(reqAnimID);
        drawEarthAndMoon();
        counter++;
      } else if (document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        document.querySelector('.modal-table').classList.remove('modal-table-active');
        cancelAnimationFrame(reqAnimID);
        drawEarthAndMoon();
      }
    }

    if (e.keyCode === 38) {
      earth.trajectory.route = 'normal';
    }

    if (e.keyCode === 40) {
      earth.trajectory.route = 'reverse';
    }

    if (e.keyCode === 49) {

      if (earth.gco === 'source-over' && moon.gco === 'source-over') {
        earth.gco = 'destination-over';
        moon.gco = 'destination-over';
      } else if (earth.gco === 'destination-over' && moon.gco === 'destination-over') {
        console.log(1);
        earth.gco = 'source-over';
        moon.gco = 'source-over';
      } else if (earth.gco === 'source-over' && moon.gco === 'destination-over') {
        earth.gco = 'destination-over';
      } else if (earth.gco === 'destination-over' && moon.gco === 'source-over') {
        earth.gco = 'source-over';
      }
    }

    if (e.keyCode === 37) {
      moon.trajectory.route = 'normal';
    }

    if (e.keyCode === 39) {
      moon.trajectory.route = 'reverse';
    }

    if (e.keyCode === 50) {

      if (moon.gco === 'source-over') {
        moon.gco = 'destination-over';
      } else if (moon.gco === 'destination-over') {
        moon.gco = 'source-over';
      }
    }

    if (e.keyCode === 51) {

      if (sun.gco === 'source-over') {
        sun.gco = 'destination-over';
      } else if (sun.gco === 'destination-over') {
        sun.gco = 'source-over';
      }
    }

    if (e.keyCode === 72) {

      if (!document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        document.querySelector('.modal-table').classList.add('modal-table-active');
        cancelAnimationFrame(reqAnimID);
      } else if (document.querySelector('.modal-table').classList.contains('modal-table-active')) {
        document.querySelector('.modal-table').classList.remove('modal-table-active');
        drawEarthAndMoon();
      }
    }
  };
};

window.onload = init;