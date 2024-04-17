import { ILabel } from '@/validators/label';
import { Model, Schema, model, models } from 'mongoose';

const labelSchema = new Schema<ILabel>({
    name: {
        type: String,
        required: true,
    },
    });

    labelSchema.virtual('id').get(function getVirtualId () {
        return this._id?.toHexString();
    }
);
labelSchema.set("toObject", { virtuals: true });
labelSchema.set("toJSON", { virtuals: true });

const LabelModel = (Model<ILabel> = models.Label || model<ILabel>("Label", labelSchema));

export default LabelModel;