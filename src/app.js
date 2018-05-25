var statsEngine = {
    apiUrl: 'http://preview.rockstardevelopers.de/dashboard/api/v1/devices',
    getstatsData: function () {
        $.ajax({
            type: 'GET',
            url: statsEngine.apiUrl,
            success: function (data, textStatus, request) {
                statsEngine.setDate(request.getResponseHeader('date'));
                statsEngine.fillDataToView(data);
            },
            error: function (request, textStatus, errorThrown) {
                statsEngine.setDate(request.getResponseHeader('date'));
            }
        });
    },
    setDate: function (date) {
        const now = new Date(date);
        let d = now.getDate();
        let m = now.getMonth();
        m += 1;
        let y = now.getFullYear();
        $('.date').html(d + "-" + m + "-" + y);
        $('.hour').html(now.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}));
    },
    fillDataToView: function (devices) {
        for (let i=0;i<devices.length;i++) {
            for (let j=0;j<devices[i].status.length;j++) {
                let name = devices[i].status[j]['key'].key;
                (devices[i].status[j].value<devices[i].status[j].max) ? devices[i][name]='OK' : '';
            }
        }
        Templates.List.render('#app', {
            items: devices
        });
    }
};
$(function () {
    statsEngine.getstatsData();
});
