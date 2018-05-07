String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


module.exports = {
    returnSheduleByGroupForDay : function (group, day) {
        var mess = '';
        for(var key in group) {
            if (key == day.capitalize()) {
                mess = mess + key + ': \n';
                var i = 1;
                for (var k in group[key]) {
                    mess = mess + i + " - ";
                    if (group[key][k].length == 0) {
                        mess = mess + '' + ' \n';
                    } else {
                        mess = mess + group[key][k] + '; \n';
                    }
                    i++;
                }
                i = undefined;
                mess = mess + '\n';
            }
        }
        return mess;
    },

    returnSheduleByGroup : function (group) {
        var mess = '';
        for(var key in group) {
            mess = mess + key + ': \n';
            var i = 1;
            for (var k in group[key]) {
                mess = mess + i + " - ";
                if (group[key][k].length == 0) {
                    mess = mess + '' + ' \n';
                } else {
                    mess = mess + group[key][k] + '; \n';
                }
                i++;
            }
            i = undefined;
            mess = mess + '\n';
        }
        return mess;
    }
};
