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
//            if (!rawData) rawData = new Uint8Array(data);
//            else rawData = rawData.concat(data);
//            else rawData = appendBuffer(rawData, data);
            rawData = new Uint8Array(data);

            console.log(rawData.join());
            /*
            if (data[data.length - 1] == 0x0a) {
                console.log(rawData);
                rawData = [];
            }
            */
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

    ext.L3D_Wave = function(r, g, b, speed){
        var cmd = strToBuff("1,0,1\r\n");
        device.send(cmd.buffer);
    };

    var descriptor = {
        blocks: [
        ["",  "L3DCube 波 R:%d G:%d B:%d Speed:%d", "L3D_Wave"]
        ],
        menus: {},
        url: 'http://localhost:9000'
    };
    
    var serial_info = {type: 'serial'};
    ScratchExtensions.register('SerialTest', descriptor, ext, serial_info);
})({});