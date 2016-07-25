/*
 * simpleDateFormat: convert a Date object into a 'yyyy-mm-dd' format string.
 */
module.exports = {
    simpleDateFormat: function(){
        var mm = this.getMonth() + 1;
        var dd = this.getDate();

        return [this.getFullYear(), '-', mm, '-', dd].join('');
    }
}