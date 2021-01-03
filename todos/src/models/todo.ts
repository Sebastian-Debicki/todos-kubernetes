import mongoose from 'mongoose';

interface TodoAttrs {
  title: string;
  subject: string;
  description: string;
  important: boolean;
  userId: string;
}

export interface TodoDoc extends mongoose.Document {
  title: string;
  subject: string;
  description: string;
  important: boolean;
  userId: string;
}

interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc;
}

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    important: {
      type: Boolean,
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

todoSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema);

export { Todo };
