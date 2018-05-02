/*
(function(ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.test = function(str) {
        alert(str);
    };

    var descriptor = {
        blocks: [
            [' ', '%s と表示', 'test', 'テスト']
        ]
    };

    ScratchExtensions.register('Test', descriptor, ext);
})({});
*/

(function(ext){
    var device = null;
    var rawData = null;
    
    function BubbleParam(x = 3, y = 3, z = 3, r1 = 255, g1 = 255, b1 = 255, r2 = 255, g2 = 255, b2 = 255, r = 255) {
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
    }
    var bubbleParam = new bubbleParam();

    function strToBuff(str) {
        var arr = new Uint8Array(str.length);
        for (var i in [...Array(str.length).keys()]) {
            arr[i]= str.charCodeAt(i);
        }
        return arr;
    }
    
    function arrToBuff(arr) {
        return strToBuff(arr.map(n => n.toString()).join(',') + "\r\n");
    }
    
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
    }
    
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
        var cmd = arrToBuff([0]);
        device.send(cmd.buffer);
    };

    ext.L3D_Wave_Start = function(){
        var cmd = arrToBuff([1, 0, 1]);
        device.send(cmd.buffer);
    };

    ext.L3D_Wave_Color = function(r, g, b){
        var cmd = arrToBuff([1, 0, 1, r, g, b]);
        device.send(cmd.buffer);
    };

    ext.L3D_Wave_Speed = function(speed){
        var cmd = arrToBuff([1, 0, 1, -1, -1, -1, speed]);
        device.send(cmd.buffer);
    };
    
    ext.L3D_Wave_All = function(r, g, b, speed){
        var cmd = arrToBuff([1, 0, 1, r, g, b, speed]);
        device.send(cmd.buffer);
    };
    
    ext.L3D_Wave_Stop = function(){
        var cmd = arrToBuff([1, 0, 0]);
        device.send(cmd.buffer);
    };
    
    ext.L3D_Bubble_Start = function() {
        var cmd = arrToBuff([1, 2, bubbleParam.x, bubbleParam.y, bubbleParam.z, bubbleParam.r1, bubbleParam.g1, bubbleParam.b1, bubbleParam.r2, bubbleParam.g2, bubbleParam.b2, bubbleParam.r]);
        device.send(cmd.buffer);
    }
    
    ext.L3D_Bubble_SetPosition = function(x, y, z) {
        bubbleParam.x = x;
        bubbleParam.y = y;
        bubbleParam.z = z;
    }
    
    ext.L3D_Bubble_SetStartColor = function(r, g, b) {
        bubbleParam.r1 = r;
        bubbleParam.g1 = g;
        bubbleParam.b1 = b;
    }

    ext.L3D_Bubble_SetEndColor = function(r, g, b) {
        bubbleParam.r2 = r;
        bubbleParam.g2 = g;
        bubbleParam.b2 = b;
    }
    
    ext.L3D_Bubble_SetRadius = function(r) {
        bubbleParam.r = r;
    }
    
    ext.L3D_Bubble_Clear = function() {
        bubbleParam = new BubbleParam();
    }
    
    var descriptor = {
        blocks: [
            ["", "L3DCube ストップ", "L3D_Stop"],
            ["", "L3DCube 波 スタート", "L3D_Wave_Start"],
            ["", "L3DCube 波 赤:%d 緑:%d 青:%d", "L3D_Wave_Color", 255, 255, 255],
            ["", "L3DCube 波 速さ:%d", "L3D_Wave_Speed", 100],
            ["", "L3DCube 波 赤:%d 緑:%d 青:%d 速さ:%d", "L3D_Wave_All", 255, 255, 255, 100],
            ["", "L3DCube 波 ストップ", "L3D_Wave_Stop"],
            ["", "L3DCube 花火 発射", "L3D_Bubble_Start"],
            ["", "L3DCube 花火 位置設定, X:%d, Y:%d, Z:%d", "L3D_Bubble_SetPosition", 3, 3, 3],
            ["", "L3DCube 花火 始まりの色設定 赤:%d, 緑:%d, 青:%d", "L3D_Bubble_SetStartColor", 255, 255, 255],
            ["", "L3DCube 花火 終わりの色設定 赤:%d, 緑:%d, 青:%d", "L3D_Bubble_SetEndColor", 255, 255, 255],
            ["", "L3DCube 花火 半径設定 %d", "L3D_Bubble_SetRadius", 5],
            ["", "L3DCube 花火 設定を消す", "L3D_Bubble_Clear"],
        ],
        menus: {},
        url: 'http://localhost:9000'
    };
    
    var serial_info = {type: 'serial'};
    ScratchExtensions.register('SerialTest', descriptor, ext, serial_info);
})({});