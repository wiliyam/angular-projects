export class Customer {
    constructor(
        public name: String,
        public email: String,
        public mobile: Number,
        public address: {
            city: String,
            state: String,
            country: String
        },
        public bank: {
            acno: String,
            ifsc: String,
            gst: String,
            formno: String
        }
    ) { }
}
