import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { eventSchema } from './event.schema';
import { createPgTimestamps } from '../utils';
import { InferSelectModel, relations } from 'drizzle-orm';

export type EventImage = InferSelectModel<typeof eventImageSchema>;
export const eventImageSchema = pgTable('event_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: varchar('url', { length: 255 }).notNull().unique(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => eventSchema.id),
  ...createPgTimestamps(),
});

export const eventImageRelations = relations(eventImageSchema, ({ one }) => ({
  event: one(eventSchema, {
    fields: [eventImageSchema.eventId],
    references: [eventSchema.id],
  }),
}));
