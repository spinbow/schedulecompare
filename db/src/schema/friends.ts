import { check, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { lt, RelationsBuilder } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';
import type { AllTables } from '.';

export const friendsTable = pgTable(
  'friends',
  {
    lowerId: text('lower_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    higherId: text('higher_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ name: 'friends_pk', columns: [t.lowerId, t.higherId] }),
    check('id_order', lt(t.lowerId, t.higherId)),
  ],
);

export const friendRelationsConfig = (r: RelationsBuilder<AllTables>) => ({
  friendsTable: {
    lowerUser: r.one.user({
      from: r.friendsTable.lowerId,
      to: r.user.id,
      optional: false,
    }),
    higherUser: r.one.user({
      from: r.friendsTable.higherId,
      to: r.user.id,
      optional: false,
    }),
  },
});

export const friendDataSchema = createSelectSchema(friendsTable);

export type FriendData = z.infer<typeof friendDataSchema>;
