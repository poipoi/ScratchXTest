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
            console.log(rawData.map(c => String.fromCharCode(c)).join());
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

    var descriptor = {
        blocks: [
            ["", "L3DCube Stop", "L3D_Stop"],
            ["", "L3DCube Wave Start", "L3D_Wave_Start"],
            ["", "L3DCube Wave R:%d G:%d B:%d", "L3D_Wave_Color", 255, 255, 255],
            ["", "L3DCube Wave Speed:%d", "L3D_Wave_Speed", 100],
            ["", "L3DCube Wave R:%d G:%d B:%d Speed:%d", "L3D_Wave_All", 255, 255, 255, 100],
            ["", "L3DCube Wave Stop", "L3D_Wave_Stop"],
        ],
        menus: {},
        url: 'http://localhost:9000'
    };
    
    var serial_info = {type: 'serial'};
    ScratchExtensions.register('SerialTest', descriptor, ext, serial_info);
})({});