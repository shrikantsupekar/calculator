import { Schema, Document } from 'mongoose';
import mongoClient from '../../common/clients/mongo.client';

export interface IAuditLog extends Document {
  id: string;
  event: string;
  value: string;
  timestamp: number;
  userId: string;
}

const auditLogSchema = new Schema({
  id: { type: String, required: true },
  event: { type: String, required: true },
  value: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

auditLogSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  },
});

auditLogSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  },
});

const AuditLog = mongoClient.model(
  'AuditLog', // Use singular AssessmentRoll for model name
  auditLogSchema,
);

export default AuditLog;
