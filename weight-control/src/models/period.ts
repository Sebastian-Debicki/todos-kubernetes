import mongoose, { Document, Model } from 'mongoose';

interface PeriodAttrs {
  name: string;
  from: Date;
  to: Date;
  bodyWeights: [];
  userId: string;
}

export interface PeriodDoc extends Document {
  name: string;
  from: Date;
  to: Date;
  bodyWeights: [];
  userId: string;
}

interface PeriodModel extends Model<PeriodDoc> {
  build(attrs: PeriodAttrs): PeriodDoc;
}

const periodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    bodyWeights: {
      type: Array,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

periodSchema.statics.build = (attrs: PeriodAttrs) => {
  return new Period(attrs);
};

export const Period = mongoose.model<PeriodDoc, PeriodModel>(
  'Period',
  periodSchema
);
