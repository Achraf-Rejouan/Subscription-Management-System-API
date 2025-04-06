import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Subs name is required'], trim: true, minLength: 2, maxLength: 100, },
  price: { type: Number, required: [true, 'Subs price is required'], min: [ 0, 'Price must be greater than 0'] },
  currency: { type: String, enum: ['USD', 'EUR', 'GBP'], default: 'USD' },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], default: 'monthly' },
  category: { type: String, enum: ['entertainment', 'productivity', 'education', 'health'], required: true},
  paymentMethod: { type: String, required: true, trim: true, },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  startDate: { type: Date, required: true, validate: {
    validator: function (value) {
      return value <= new Date();
    },
    message: 'Start date must be in the past or present',
  },},
  renewalDate: { type: Date, validate: {
    validator: function (value) {
      return value > this.startDate;
    },
    message: 'End date must be after start date',
  },},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    this.renewalPeriode = {daily: 1, weekly: 7, monthly: 30, yearly: 365};
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + this.renewalPeriode[this.frequency]);
  }
  if (this.renewalDate < this.startDate) {
    this.status = 'expired';
  }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;