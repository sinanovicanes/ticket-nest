import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { eventSchema } from './event.schema';
import { createPgTimestamps } from '../utils';
import { InferSelectModel, relations } from 'drizzle-orm';

export type EventImage = InferSelectModel<typeof eventImageSchema>;
export const eventImageSchema = pgTable('event_images', {
  id: uuid('id').primaryKey(),
  eventId: uuid('event_id').references(() => eventSchema.id),
  url: varchar('url', { length: 255 }),
  ...createPgTimestamps(),
});

export const eventImageRelations = relations(eventImageSchema, ({ one }) => ({
  event: one(eventSchema, {
    fields: [eventImageSchema.eventId],
    references: [eventSchema.id],
  }),
}));
