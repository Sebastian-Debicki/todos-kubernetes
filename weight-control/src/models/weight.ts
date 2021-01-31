import mongoose, { Document, Model } from 'mongoose';

interface WeightAttrs {
  weight: string;
  date: string;
  userId: string;
}

export interface WeightDoc extends Document {
  weight: string;
  date: string;
  userId: string;
}

interface WeightModel extends Model<WeightDoc> {
  build(attrs: WeightAttrs): WeightDoc;
}

const weightSchema = new mongoose.Schema(
  {
    weight: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
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

weightSchema.statics.build = (attrs: WeightAttrs) => {
  return new Weight(attrs);
};

const Weight = mongoose.model<WeightDoc, WeightModel>('Weight', weightSchema);

export { Weight };
