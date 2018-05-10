// ========== matrixgl.min.js ==========
!function(t,e){for(var r in e)t[r]=e[r]}(window,function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),o=function(){function t(t,e,r,n){this._values=new Float32Array([t,e,r,n])}return t.identity=function(){return new t(1,0,0,1)},Object.defineProperty(t.prototype,"values",{get:function(){return this._values},enumerable:!0,configurable:!0}),t.prototype.toString=function(){return this._values.toString()},t}();e.Matrix2x2=o;var i=function(){function t(t,e,r,n,o,i,u,s,a){this._values=new Float32Array([t,e,r,n,o,i,u,s,a])}return t.identity=function(){return new t(1,0,0,0,1,0,0,0,1)},Object.defineProperty(t.prototype,"values",{get:function(){return this._values},enumerable:!0,configurable:!0}),t.prototype.toString=function(){return this._values.toString()},t}();e.Matrix3x3=i;var u=function(){function t(t,e,r,n,o,i,u,s,a,c,l,f,h,p,y,v){this._values=new Float32Array([t,e,r,n,o,i,u,s,a,c,l,f,h,p,y,v])}return t.identity=function(){return new t(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},t.translation=function(e,r,n){return new t(1,0,0,0,0,1,0,0,0,0,1,0,e,r,n,1)},t.scaling=function(e,r,n){return new t(e,0,0,0,0,r,0,0,0,0,n,0,0,0,0,1)},t.rotationX=function(e){var r=Math.sin(e),n=Math.cos(e);return new t(1,0,0,0,0,n,r,0,0,-r,n,0,0,0,0,1)},t.rotationY=function(e){var r=Math.sin(e),n=Math.cos(e);return new t(n,0,-r,0,0,1,0,0,r,0,n,0,0,0,0,1)},t.rotationZ=function(e){var r=Math.sin(e),n=Math.cos(e);return new t(n,r,0,0,-r,n,0,0,0,0,1,0,0,0,0,1)},t.rotationAround=function(t,e){return n.Quaternion.rotationAround(t,e).toRotationMatrix4()},t.lookAt=function(e,r,n){var o=e.sub(r).normalize(),i=n.cross(o).normalize(),u=o.cross(i).normalize();return new t(i.x,u.x,o.x,0,i.y,u.y,o.y,0,i.z,u.z,o.z,0,-e.dot(i),-e.dot(u),-e.dot(o),1)},t.orthographic=function(e){var r=e.top,n=e.bottom,o=e.left,i=e.right,u=e.near,s=e.far;return new t(2/(i-o),0,0,0,0,2/(r-n),0,0,0,0,-2/(s-u),0,-(i+o)/(i-o),-(r+n)/(r-n),-(s+u)/(s-u),1)},t.frustum=function(e){var r=e.top,n=e.bottom,o=e.left,i=e.right,u=e.near,s=e.far;return new t(2*u/(i-o),0,0,0,0,2*u/(r-n),0,0,(i+o)/(i-o),(r+n)/(r-n),-(s+u)/(s-u),-1,0,0,-2*s*u/(s-u),0)},t.perspective=function(e){var r=e.near*Math.tan(.5*e.fovYRadian),n=2*r,o=e.aspectRatio*n,i=-.5*o,u=i+o,s=r-n;return t.frustum({top:r,bottom:s,left:i,right:u,near:e.near,far:e.far})},t.prototype.mulByMatrix4x4=function(e){var r=this._values[0],n=this._values[4],o=this._values[8],i=this._values[12],u=this._values[1],s=this._values[5],a=this._values[9],c=this._values[13],l=this._values[2],f=this._values[6],h=this._values[10],p=this._values[14],y=this._values[3],v=this._values[7],_=this._values[11],b=this._values[15],x=e.values[0],d=e.values[4],g=e.values[8],w=e.values[12],m=e.values[1],z=e.values[5],M=e.values[9],O=e.values[13],j=e.values[2],P=e.values[6],B=e.values[10],A=e.values[14],S=e.values[3],V=e.values[7],F=e.values[11],R=e.values[15];return new t(r*x+n*m+o*j+i*S,u*x+s*m+a*j+c*S,l*x+f*m+h*j+p*S,y*x+v*m+_*j+b*S,r*d+n*z+o*P+i*V,u*d+s*z+a*P+c*V,l*d+f*z+h*P+p*V,y*d+v*z+_*P+b*V,r*g+n*M+o*B+i*F,u*g+s*M+a*B+c*F,l*g+f*M+h*B+p*F,y*g+v*M+_*B+b*F,r*w+n*O+o*A+i*R,u*w+s*O+a*A+c*R,l*w+f*O+h*A+p*R,y*w+v*O+_*A+b*R)},t.prototype.mulByMatrix4=function(t){return this.mulByMatrix4x4(t)},t.prototype.translate=function(e,r,n){var o=t.translation(e,r,n);return this.mulByMatrix4x4(o)},t.prototype.scale=function(e,r,n){var o=t.scaling(e,r,n);return this.mulByMatrix4x4(o)},t.prototype.rotateX=function(e){var r=t.rotationX(e);return this.mulByMatrix4x4(r)},t.prototype.rotateY=function(e){var r=t.rotationY(e);return this.mulByMatrix4x4(r)},t.prototype.rotateZ=function(e){var r=t.rotationZ(e);return this.mulByMatrix4x4(r)},t.prototype.rotateAround=function(e,r){var n=t.rotationAround(e,r);return this.mulByMatrix4x4(n)},Object.defineProperty(t.prototype,"values",{get:function(){return this._values},enumerable:!0,configurable:!0}),t.prototype.toString=function(){return this._values.toString()},t}();e.Matrix4x4=u,e.Matrix2=o,e.Matrix3=i,e.Matrix4=u},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),o=function(){function t(t,e,r,n){this._values=new Float32Array([t,e,r,n])}return t.rotationAround=function(e,r){var n=Math.sin(r/2),o=Math.cos(r/2);return new t(e.x*n,e.y*n,e.z*n,o)},t.prototype.normalize=function(){var e=this.magnitude;if(0===e)return this;var r=1/e;return new t(this.x*r,this.y*r,this.z*r,this.w*r)},t.prototype.add=function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z,this.w+e.w)},t.prototype.mulByScalar=function(e){return new t(this.x*e,this.y*e,this.z*e,this.w*e)},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w},t.prototype.slerp=function(t,e,r){void 0===r&&(r={chooseShorterAngle:!0});var n=this.dot(t),o=t;n<0&&(n=-n,o=t.mulByScalar(-1));var i=Math.acos(n),u=Math.sin(i),s=this.mulByScalar(Math.sin((1-e)*i)/u),a=o.mulByScalar(Math.sin(e*i)/u);return s.add(a)},Object.defineProperty(t.prototype,"magnitude",{get:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"norm",{get:function(){return this.magnitude},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this._values[0]},set:function(t){this._values[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._values[1]},set:function(t){this._values[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this._values[2]},set:function(t){this._values[2]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"w",{get:function(){return this._values[3]},set:function(t){this._values[3]=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"values",{get:function(){return this._values},enumerable:!0,configurable:!0}),t.prototype.toRotationMatrix4=function(){var t=this.x,e=this.y,r=this.z,o=this.w,i=1-2*e*e-2*r*r,u=2*t*e-2*o*r,s=2*t*r+2*o*e,a=2*t*e+2*o*r,c=1-2*t*t-2*r*r,l=2*e*r-2*o*t,f=2*t*r-2*o*e,h=2*e*r+2*o*t,p=1-2*t*t-2*e*e;return new n.Matrix4x4(i,a,f,0,u,c,h,0,s,l,p,0,0,0,0,1)},t.prototype.toString=function(){return"Quaternion("+this.x+", "+this.y+", "+this.z+", "+this.w+")"},t}();e.Quaternion=o},function(t,e,r){"use strict";function n(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}Object.defineProperty(e,"__esModule",{value:!0}),n(r(3)),n(r(0)),n(r(1))},function(t,e,r){"use strict";var n=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=r(4),i=function(t){function e(e,r){var n=t.call(this)||this;return n._values=new Float32Array([e,r]),n}return n(e,t),e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y)},e.prototype.sub=function(t){return new e(this.x-t.x,this.y-t.y)},e.prototype.mulByScalar=function(t){return new e(this.x*t,this.y*t)},e}(o.Vector2Base);e.Float32Vector2=i;var u=function(t){function e(e,r,n){var o=t.call(this)||this;return o._values=new Float32Array([e,r,n]),o}return n(e,t),e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y,this.z+t.z)},e.prototype.sub=function(t){return new e(this.x-t.x,this.y-t.y,this.z-t.z)},e.prototype.mulByScalar=function(t){return new e(this.x*t,this.y*t,this.z*t)},e.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},e.prototype.cross=function(t){return new e(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)},e.prototype.normalize=function(){var t=this.magnitude;return 0===t?this:new e(this.x/t,this.y/t,this.z/t)},Object.defineProperty(e.prototype,"xy",{get:function(){return new i(this.x,this.y)},enumerable:!0,configurable:!0}),e}(o.Vector3Base);e.Float32Vector3=u;var s=function(t){function e(e,r,n,o){var i=t.call(this)||this;return i._values=new Float32Array([e,r,n,o]),i}return n(e,t),e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y,this.z+t.z,this.w+t.w)},e.prototype.sub=function(t){return new e(this.x-t.x,this.y-t.y,this.z-t.z,this.w-t.w)},e.prototype.mulByScalar=function(t){return new e(this.x*t,this.y*t,this.z*t,this.w*t)},Object.defineProperty(e.prototype,"xyz",{get:function(){return new u(this.x,this.y,this.z)},enumerable:!0,configurable:!0}),e}(o.Vector4Base);e.Float32Vector4=s,e.Vector2=i,e.Vector3=u,e.Vector4=s},function(t,e,r){"use strict";var n=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(){}return Object.defineProperty(t.prototype,"values",{get:function(){return this._values},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"magnitude",{get:function(){var t=this._values.reduce(function(t,e){return t+Math.pow(e,2)},0);return Math.sqrt(t)},enumerable:!0,configurable:!0}),t.prototype.toString=function(){return"Vector"+this._values.length+"("+this._values.join(", ")+")"},t}();e.VectorBase=o;var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),Object.defineProperty(e.prototype,"x",{get:function(){return this._values[0]},set:function(t){this._values[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._values[1]},set:function(t){this._values[1]=t},enumerable:!0,configurable:!0}),e}(o);e.Vector2Base=i;var u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),Object.defineProperty(e.prototype,"x",{get:function(){return this._values[0]},set:function(t){this._values[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._values[1]},set:function(t){this._values[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"z",{get:function(){return this._values[2]},set:function(t){this._values[2]=t},enumerable:!0,configurable:!0}),e}(o);e.Vector3Base=u;var s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),Object.defineProperty(e.prototype,"x",{get:function(){return this._values[0]},set:function(t){this._values[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._values[1]},set:function(t){this._values[1]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"z",{get:function(){return this._values[2]},set:function(t){this._values[2]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"w",{get:function(){return this._values[3]},set:function(t){this._values[3]=t},enumerable:!0,configurable:!0}),e}(o);e.Vector4Base=s}]));

Vector4.prototype.mulByMatrix4 = function(matrix) {
    return new Vector4(
        matrix.values[0 * 4 + 0] * this.x + matrix.values[1 * 4 + 0] * this.y + matrix.values[2 * 4 + 0] * this.z + matrix.values[3 * 4 + 0] * this.w,
        matrix.values[0 * 4 + 1] * this.x + matrix.values[1 * 4 + 1] * this.y + matrix.values[2 * 4 + 1] * this.z + matrix.values[3 * 4 + 1] * this.w,
        matrix.values[0 * 4 + 2] * this.x + matrix.values[1 * 4 + 2] * this.y + matrix.values[2 * 4 + 2] * this.z + matrix.values[3 * 4 + 2] * this.w,
        matrix.values[0 * 4 + 3] * this.x + matrix.values[1 * 4 + 3] * this.y + matrix.values[2 * 4 + 3] * this.z + matrix.values[3 * 4 + 3] * this.w
    );
};

// ====================

(function(ext){
    var device = null;
    var rawData = null;
    
    function WaveParam(r = 255, g = 255, b = 255, speed = 100) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.speed = speed;
        this.isVisible = false;
    };
    
    WaveParam.prototype.init = function() {
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.speed = 100;
    };
    
    WaveParam.prototype.send = function() {
        if (this.isVisible) {
            var cmd = arrToBuff([1, 0, 1, this.r, this.g, this.b, this.speed]);
            device.send(cmd.buffer);
        } else {
            var cmd = arrToBuff([1, 0, 0]);
            device.send(cmd.buffer);            
        }
    };
    
    var waveParam = new WaveParam();
    
    
    function BubbleParam(x = 3, y = 3, z = 3, r1 = 255, g1 = 255, b1 = 255, r2 = 255, g2 = 255, b2 = 255, r = 5) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r1 = r1;
        this.g1 = g1;
        this.b1 = b1;
        this.r2 = r2;
        this.g2 = g2;
        this.b2 = b2;
        this.r = r;
        this.isVisible = false;
    };
    
    BubbleParam.prototype.init = function() {
        this.x = 3;
        this.y = 3;
        this.z = 3;
        this.r1 = 255;
        this.g1 = 255;
        this.b1 = 255;
        this.r2 = 255;
        this.g2 = 255;
        this.b2 = 255;
        this.r = 5;
    };
    
    BubbleParam.prototype.send = function() {
        var cmd = arrToBuff([1, 2, this.x, this.y, this.z, this.r1, this.g1, this.b1, this.r2, this.g2, this.b2, this.r]);
        device.send(cmd.buffer);
    };
    
    var bubbleParam = new BubbleParam();
    
    
    function BallParam(x = 3, y = 3, z = 3, r = 255, g = 255, b = 255, radius = 0) {
        this.setPosition(x, y, z);
        this.r = r;
        this.g = g;
        this.b = b;
        this.radius = radius;
    };
    
    BallParam.prototype.init = function() {
        this.setPosition();
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.radius = 0;
    }
    
    BallParam.prototype.setPosition = function(x = 3, y = 3, z = 3) {
        this.startPos = new Vector4(0, 0, 0, 1);
        this.transform = Matrix4.identity();
        this.transform = this.transform.translate(x, y, z);
        this.pos = this.startPos.mulByMatrix4(this.transform);
    };
    
    BallParam.prototype.go = function() {
        this.transform = this.transform.translate(0, 0, 1);
        this.pos = this.startPos.mulByMatrix4(this.transform);
    };

    BallParam.prototype.turnLeft = function() {
        this.transform = this.transform.rotateY(Math.PI / 2);
        this.pos = this.startPos.mulByMatrix4(this.transform);
    };

    BallParam.prototype.turnRight = function() {
        this.transform = this.transform.rotateY(-Math.PI / 2);
        this.pos = this.startPos.mulByMatrix4(this.transform);
    };

    BallParam.prototype.turnUp = function() {
        this.transform = this.transform.rotateX(-Math.PI / 2);
        this.pos = this.startPos.mulByMatrix4(this.transform);
    };

    BallParam.prototype.turnDown = function() {
        this.transform = this.transform.rotateX(Math.PI / 2);
        this.pos = this.startPos.mulByMatrix4(this.transform);
    };
    
    BallParam.prototype.send = function() {
        var cmdArr = null;
        if (this.isVisible) {
            cmdArr = [1, 3, 1, Math.round(this.pos.x), Math.round(this.pos.y), Math.round(this.pos.z), this.r, this.g, this.b, this.radius];
        } else {
            cmdArr = [1, 3, 0];
        }
        
        if (cmdArr) {
            var cmd = arrToBuff(cmdArr);
            device.send(cmd.buffer);
        }
    };

    var ballParam = new BallParam();
    
    
    function DotParam(x = 3, y = 3, z = 3, r = 255, g = 255, b = 255) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.g = g;
        this.b = b;
    };

    DotParam.prototype.init = function() {
        this.x = 3;
        this.y = 3;
        this.z = 3;
        this.r = 255;
        this.g = 255;
        this.b = 255;
    };
    
    DotParam.prototype.send = function() {
        var cmd = arrToBuff([1, 4, 1, this.x, this.y, this.z, this.r, this.g, this.b]);
        device.send(cmd);
    };
    
    DotParam.prototype.clear = function() {
        var cmd = arrToBuff([1, 4, 0]);
        device.send(cmd);
    };
    
    var dotParam = new DotParam();
    
    
    function strToBuff(str) {
        var arr = new Uint8Array(str.length);
        for (var i in [...Array(str.length).keys()]) {
            arr[i]= str.charCodeAt(i);
        }
        return arr;
    };
    
    function arrToBuff(arr) {
        return strToBuff(arr.map(n => n.toString()).join(',') + "\r\n");
    };
    
    var potentialDevices = [];
    ext._deviceConnected = function(dev){
        potentialDevices.push(dev);
        if (!device) {
            tryNextDevice();
        }
    };

    function tryNextDevice() {
        device = potentialDevices.shift();
        if (!device) return;
        
        device.open( { bitRate: 115200, dataBits: 8, parityBit: 0, stopBits: 0, ctsFlowControl: 0 });
        console.log("connect");
        device.set_receive_handler(function(data) {
            rawData = new Uint8Array(data);
            console.log(rawData.map(c => String.fromCharCode(c)).join(''));
        });
    };
    
    ext._deviceRemoved = function(dev){
        if(device != dev) return;
        device = null;
    };
    
    ext._shutdown = function() {
        if (device) device.close();
        device = null;
    };
    
    ext._getStatus = function() {
        if (!device) return { status: 1, msg: 'bord disconnected' };
        return { status: 2, msg: 'bord connected' };
    };

    ext.L3D_Stop = function(){
        console.log('stop');
        var cmd = arrToBuff([0]);
        device.send(cmd.buffer);
    };

    ext.L3D_Wave_Start = function(){
        waveParam.isVisible = true;
        waveParam.send();
    };

    ext.L3D_Wave_Color = function(r, g, b){
        waveParam.r = r;
        waveParam.g = g;
        waveParam.b = b;
        waveParam.send();
    };

    ext.L3D_Wave_Speed = function(speed){
        waveParam.speed = speed;
        waveParam.send();
    };
    
    ext.L3D_Wave_Stop = function(){
        waveParam.isVisible = false;
        waveParam.send();
    };
    
    ext.L3D_Wave_Clear = function() {
        waveParam.init();
        waveParam.send();
    };
    
    ext.L3D_Bubble_Start = function() {
        bubbleParam.send();
    };
    
    ext.L3D_Bubble_SetPosition = function(x, y, z) {
        bubbleParam.x = x;
        bubbleParam.y = y;
        bubbleParam.z = z;
    };
    
    ext.L3D_Bubble_SetStartColor = function(r, g, b) {
        bubbleParam.r1 = r;
        bubbleParam.g1 = g;
        bubbleParam.b1 = b;
        bubbleParam.r2 = r;
        bubbleParam.g2 = g;
        bubbleParam.b2 = b;
    };

    ext.L3D_Bubble_SetEndColor = function(r, g, b) {
        bubbleParam.r2 = r;
        bubbleParam.g2 = g;
        bubbleParam.b2 = b;
    };
    
    ext.L3D_Bubble_SetRadius = function(r) {
        bubbleParam.r = r;
    };
    
    ext.L3D_Bubble_Clear = function() {
        bubbleParam.init();
    };
    
    ext.L3D_Ball_Start = function() {
        ballParam.isVisible = true;
        console.log(ballParam.pos.values);
        ballParam.send();
    };

    ext.L3D_Ball_SetPosition = function(x, y, z) {
        ballParam.setPosition(x, y, z);
        console.log(ballParam.pos.values);
        ballParam.send();
    };
    
    ext.L3D_Ball_SetColor = function(r, g, b) {
        ballParam.r = r;
        ballParam.g = g;
        ballParam.b = b;
        ballParam.send();
    };
    
    ext.L3D_Ball_SetRadius = function(r) {
        ballParam.radius = r;
        ballParam.send();
    };
    
    ext.L3D_Ball_Go = function() {
        ballParam.go();
        console.log(ballParam.pos.values);
        ballParam.send();
    };

    ext.L3D_Ball_RotateLeft = function() {
        ballParam.turnLeft();
        console.log(ballParam.pos.values);
    };

    ext.L3D_Ball_RotateRight = function() {
        ballParam.turnRight();
        console.log(ballParam.pos.values);
    };

    ext.L3D_Ball_RotateUp = function() {
        ballParam.turnUp();
        console.log(ballParam.pos.values);
    };

    ext.L3D_Ball_RotateDown = function() {
        ballParam.turnDown();
        console.log(ballParam.pos.values);
    };
    
    ext.L3D_Ball_Stop = function() {
        console.log("Ball Stop");
        ballParam.isVisible = false;
        ballParam.send();
    };
    
    ext.L3D_Ball_Clear = function() {
        ballParam.init();
        ballParam.send();
    }
    
    ext.L3D_Dot_Add = function() {
        dotParam.send();
    }
    
    ext.L3D_Dot_SetPosition = function(x, y, z) {
        dotParam.x = x;
        dotParam.y = y;
        dotParam.z = z;
    }
    
    ext.L3D_Dot_SetColor = function(r, g, b) {
        dotParam.r = r;
        dotParam.g = g;
        dotParam.b = b;
    }
    
    ext.L3D_Dot_Erase = function() {
        dotParam.clear();
    }
    
    ext.L3D_Dot_Clear = function() {
        dotParam.init();
    }

    var descriptor = {
        blocks: [
            ["", "L3DCube ストップ", "L3D_Stop"],
            ["", "L3DCube 波 スタート", "L3D_Wave_Start"],
            ["", "L3DCube 波 赤:%d 緑:%d 青:%d", "L3D_Wave_Color", 255, 255, 255],
            ["", "L3DCube 波 速さ:%d", "L3D_Wave_Speed", 100],
            ["", "L3DCube 波 ストップ", "L3D_Wave_Stop"],
            ["", "L3DCube 波 設定を元に戻す", "L3D_Wave_Clear"],
            ["", "L3DCube 花火 発射", "L3D_Bubble_Start"],
            ["", "L3DCube 花火 位置設定, X:%d, Y:%d, Z:%d", "L3D_Bubble_SetPosition", 3, 3, 3],
            ["", "L3DCube 花火 色設定 赤:%d, 緑:%d, 青:%d", "L3D_Bubble_SetStartColor", 255, 255, 255],
            ["", "L3DCube 花火 終わりの色設定 赤:%d, 緑:%d, 青:%d", "L3D_Bubble_SetEndColor", 255, 255, 255],
            ["", "L3DCube 花火 半径設定 %d", "L3D_Bubble_SetRadius", 5],
            ["", "L3DCube 花火 設定を元に戻す", "L3D_Bubble_Clear"],
            ["", "L3DCube ボール 表示", "L3D_Ball_Start"],
            ["", "L3DCube ボール 位置指定 X:%d, Y:%d, Z:%d", "L3D_Ball_SetPosition", 3, 3, 3],
            ["", "L3DCube ボール 色設定 R:%d, G:%d, B:%d", "L3D_Ball_SetColor", 255, 255, 255],
            ["", "L3DCube ボール 半径指定 %d", "L3D_Ball_SetRadius", 0],
            ["", "L3DCube ボール 前に進む", "L3D_Ball_Go"],
            ["", "L3DCube ボール 左を向く", "L3D_Ball_RotateLeft"],
            ["", "L3DCube ボール 右を向く", "L3D_Ball_RotateRight"],
            ["", "L3DCube ボール 上を向く", "L3D_Ball_RotateUp"],
            ["", "L3DCube ボール 下を向く", "L3D_Ball_RotateDown"],
            ["", "L3DCube ボール 消す", "L3D_Ball_Stop"],
            ["", "L3DCube ボール 設定を元に戻す", "L3D_Ball_Clear"],
            ["", "L3DCube ドット 追加", "L3D_Dot_Add"],
            ["", "L3DCube ドット 位置指定 X:%d, Y:%d, Z:%d", "L3D_Dot_SetPosition", 3, 3, 3],
            ["", "L3DCube ドット 色指定 赤:%d, 緑:%d, 青:%d", "L3D_Dot_SetColor", 255, 255, 255],
            ["", "L3DCube ドット 全て消す", "L3D_Dot_Erase"],
            ["", "L3DCube ドット 設定を元に戻す", "L3D_Dot_Clear"],
        ],
        menus: {},
        url: 'http://localhost:9000'
    };
    
    var serial_info = {type: 'serial'};
    ScratchExtensions.register('SerialTest', descriptor, ext, serial_info);
})({});