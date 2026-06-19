CREATE TABLE "course_reg" (
	"id" uuid PRIMARY KEY,
	"user_id" text NOT NULL,
	"section_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "courseId" TO "course_id";--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "startTime" TO "start_time";--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "endTime" TO "end_time";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "code" SET DATA TYPE varchar(16) USING "code"::varchar(16);--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "title" SET DATA TYPE text USING "title"::text;--> statement-breakpoint
ALTER TABLE "sections" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid;--> statement-breakpoint
ALTER TABLE "sections" ALTER COLUMN "course_id" SET DATA TYPE uuid USING "course_id"::uuid;--> statement-breakpoint
ALTER TABLE "sections" ALTER COLUMN "code" SET DATA TYPE varchar(8) USING "code"::varchar(8);--> statement-breakpoint
ALTER TABLE "course_reg" ADD CONSTRAINT "course_reg_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "course_reg" ADD CONSTRAINT "course_reg_section_id_sections_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE;