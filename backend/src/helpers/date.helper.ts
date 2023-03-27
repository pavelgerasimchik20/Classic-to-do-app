export class DateHelper {

    public static currentDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = this.padTo2Digits(today.getMonth() + 1);
        const day = this.padTo2Digits(today.getDate());
        const hour = this.padTo2Digits(today.getHours());
        const minute = this.padTo2Digits(today.getMinutes());

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }

    private static padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
      }

}