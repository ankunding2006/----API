// �����Ǵų�����֡�������� - ֧�ֻ��������
(function main() {
    try {
        // ʹ��ȫ�ֶ������洢״̬�������ظ�����
        if (typeof global === "undefined") {
            global = this;
        }

        // ��ʼ��ȫ�ֱ���
        if (!global.gyroFrameBuffer) {
            global.gyroFrameBuffer = [];
            global.gyroFrameState = 0; // 0:�ȴ�֡ͷ1, 1:�ȴ�֡ͷ2, 2:�ռ�����
        }

        // ��ȡԭʼ�ֽ�����
        var buf = receive.getBytes();
        if (!buf || buf.length === 0) {
            return;
        }

        // ���ֽڴ���������
        for (var i = 0; i < buf.length; i++) {
            var byte = buf[i];

            switch (global.gyroFrameState) {
                case 0: // �ȴ���һ��֡ͷ�ֽ� 0x55
                    if (byte === 0x55) {
                        global.gyroFrameBuffer = [0x55];
                        global.gyroFrameState = 1;
                    }
                    break;

                case 1: // �ȴ��ڶ���֡ͷ�ֽ�
                    if (byte === 0x54) {
                        // �ҵ�Ŀ��֡ͷ 0x55 0x54
                        global.gyroFrameBuffer.push(0x54);
                        global.gyroFrameState = 2;
                    } else if (byte === 0x55) {
                        // �µ�0x55��ʼ�����¿�ʼ
                        global.gyroFrameBuffer = [0x55];
                        global.gyroFrameState = 1;
                    } else {
                        // �����ֽڣ���0x52, 0x53�ȣ����¿�ʼ����
                        global.gyroFrameState = 0;
                    }
                    break;

                case 2: // �ռ������ֽ�
                    global.gyroFrameBuffer.push(byte);

                    if (global.gyroFrameBuffer.length === 11) {
                        // �ռ���������11�ֽ�����֡
                        parseGyroFrame(global.gyroFrameBuffer);

                        // ����״̬��׼��������һ֡
                        global.gyroFrameBuffer = [];
                        global.gyroFrameState = 0;
                    }

                    // �������̫�������¿�ʼ
                    if (global.gyroFrameBuffer.length > 11) {
                        global.gyroFrameBuffer = [];
                        global.gyroFrameState = 0;
                    }
                    break;
            }
        }

        // ��յ�ǰ���յ�����
        receive.clearLastReceived();
    } catch (error) {
        console.error("Parse Error:", error);
    }
})();

// ��������������������֡
function parseGyroFrame(frame) {
    try {
        // ��ʾԭʼ֡����
        var hexStr = "";
        for (var j = 0; j < frame.length; j++) {
            var hex = frame[j].toString(16).toUpperCase();
            if (hex.length < 2) hex = "0" + hex;
            hexStr += hex + " ";
        }

        console.log("Gyroscope frame: " + hexStr);

        // ��������ų����ݣ�С����16λ�з���������
        var hx_raw = (frame[3] << 8) | frame[2];
        var hy_raw = (frame[5] << 8) | frame[4];
        var hz_raw = (frame[7] << 8) | frame[6];

        // ת��Ϊ�з�����
        if (hx_raw > 32767) hx_raw -= 65536;
        if (hy_raw > 32767) hy_raw -= 65536;
        if (hz_raw > 32767) hz_raw -= 65536;

        // Ӧ�ñ������� 0.1��T
        var hx = hx_raw * 0.1;
        var hy = hy_raw * 0.1;
        var hz = hz_raw * 0.1;

        // ����ų�ʸ��ģ
        var magnitude = Math.sqrt(hx * hx + hy * hy + hz * hz);

        // ��ȡʱ���
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

        // ��ʽ����������մ��ڣ�����ʾ�¶ȣ�
        receive.write(timestamp + "Gyro: ", "gray");
        receive.write("X:" + hx.toFixed(1) + " ", "green");
        receive.write("Y:" + hy.toFixed(1) + " ", "blue");
        receive.write("Z:" + hz.toFixed(1) + " ", "purple");
        receive.write("Mag:" + magnitude.toFixed(1), "orange");
        receive.write("\n");

        // �������ݵ�ͼ��
        try {
            chart.write("Hx=" + hx.toFixed(1) + "\n");
            chart.write("Hy=" + hy.toFixed(1) + "\n");
            chart.write("Hz=" + hz.toFixed(1) + "\n");
            chart.write("Magnitude=" + magnitude.toFixed(1) + "\n");
        } catch (chartError) {
            // ͼ���ܿ�ѡ
        }
    } catch (error) {
        console.error("Frame parse error:", error);
    }
}
