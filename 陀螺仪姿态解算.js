// 陀螺仪磁场数据帧解析程序 - 支持混合数据流
(function main() {
    try {
        // 使用全局对象来存储状态，避免重复声明
        if (typeof global === "undefined") {
            global = this;
        }

        // 初始化全局变量
        if (!global.gyroFrameBuffer) {
            global.gyroFrameBuffer = [];
            global.gyroFrameState = 0; // 0:等待帧头1, 1:等待帧头2, 2:收集数据
        }

        // 获取原始字节数据
        var buf = receive.getBytes();
        if (!buf || buf.length === 0) {
            return;
        }

        // 逐字节处理数据流
        for (var i = 0; i < buf.length; i++) {
            var byte = buf[i];

            switch (global.gyroFrameState) {
                case 0: // 等待第一个帧头字节 0x55
                    if (byte === 0x55) {
                        global.gyroFrameBuffer = [0x55];
                        global.gyroFrameState = 1;
                    }
                    break;

                case 1: // 等待第二个帧头字节
                    if (byte === 0x54) {
                        // 找到目标帧头 0x55 0x54
                        global.gyroFrameBuffer.push(0x54);
                        global.gyroFrameState = 2;
                    } else if (byte === 0x55) {
                        // 新的0x55开始，重新开始
                        global.gyroFrameBuffer = [0x55];
                        global.gyroFrameState = 1;
                    } else {
                        // 其他字节，如0x52, 0x53等，重新开始搜索
                        global.gyroFrameState = 0;
                    }
                    break;

                case 2: // 收集数据字节
                    global.gyroFrameBuffer.push(byte);

                    if (global.gyroFrameBuffer.length === 11) {
                        // 收集到完整的11字节数据帧
                        parseGyroFrame(global.gyroFrameBuffer);

                        // 重置状态，准备接收下一帧
                        global.gyroFrameBuffer = [];
                        global.gyroFrameState = 0;
                    }

                    // 如果数据太长，重新开始
                    if (global.gyroFrameBuffer.length > 11) {
                        global.gyroFrameBuffer = [];
                        global.gyroFrameState = 0;
                    }
                    break;
            }
        }

        // 清空当前接收的数据
        receive.clearLastReceived();
    } catch (error) {
        console.error("Parse Error:", error);
    }
})();

// 解析完整的陀螺仪数据帧
function parseGyroFrame(frame) {
    try {
        // 显示原始帧数据
        var hexStr = "";
        for (var j = 0; j < frame.length; j++) {
            var hex = frame[j].toString(16).toUpperCase();
            if (hex.length < 2) hex = "0" + hex;
            hexStr += hex + " ";
        }

        console.log("Gyroscope frame: " + hexStr);

        // 解析三轴磁场数据（小端序，16位有符号整数）
        var hx_raw = (frame[3] << 8) | frame[2];
        var hy_raw = (frame[5] << 8) | frame[4];
        var hz_raw = (frame[7] << 8) | frame[6];

        // 转换为有符号数
        if (hx_raw > 32767) hx_raw -= 65536;
        if (hy_raw > 32767) hy_raw -= 65536;
        if (hz_raw > 32767) hz_raw -= 65536;

        // 应用比例因子 0.1μT
        var hx = hx_raw * 0.1;
        var hy = hy_raw * 0.1;
        var hz = hz_raw * 0.1;

        // 计算磁场矢量模
        var magnitude = Math.sqrt(hx * hx + hy * hy + hz * hz);

        // 获取时间戳
        var timestamp = "";
        try {
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            var ms = d.getMilliseconds();

            if (h < 10) h = "0" + h;
            if (m < 10) m = "0" + m;
            if (s < 10) s = "0" + s;
            if (ms < 10) ms = "00" + ms;
            else if (ms < 100) ms = "0" + ms;

            timestamp = "[" + h + ":" + m + ":" + s + "." + ms + "] ";
        } catch (e) {
            timestamp = "";
        }

        // 格式化输出到接收窗口（不显示温度）
        receive.write(timestamp + "Gyro: ", "gray");
        receive.write("X:" + hx.toFixed(1) + " ", "green");
        receive.write("Y:" + hy.toFixed(1) + " ", "blue");
        receive.write("Z:" + hz.toFixed(1) + " ", "purple");
        receive.write("Mag:" + magnitude.toFixed(1), "orange");
        receive.write("\n");

        // 发送数据到图表
        try {
            chart.write("Hx=" + hx.toFixed(1) + "\n");
            chart.write("Hy=" + hy.toFixed(1) + "\n");
            chart.write("Hz=" + hz.toFixed(1) + "\n");
            chart.write("Magnitude=" + magnitude.toFixed(1) + "\n");
        } catch (chartError) {
            // 图表功能可选
        }
    } catch (error) {
        console.error("Frame parse error:", error);
    }
}
