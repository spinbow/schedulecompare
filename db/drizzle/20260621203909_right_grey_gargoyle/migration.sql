CREATE TABLE "friends" (
	"lower_id" text,
	"higher_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "friends_pk" PRIMARY KEY("lower_id","higher_id"),
	CONSTRAINT "id_order" CHECK ("lower_id" < "higher_id")
);
--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_lower_id_user_id_fkey" FOREIGN KEY ("lower_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_higher_id_user_id_fkey" FOREIGN KEY ("higher_id") REFERENCES "user"("id") ON DELETE CASCADE;