CREATE TABLE "courses" (
	"id" char(36) PRIMARY KEY,
	"code" varchar(63) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" char(36) PRIMARY KEY,
	"courseId" char(36) NOT NULL,
	"code" varchar(63) NOT NULL,
	"year" char(4) NOT NULL,
	"session" char(1) NOT NULL,
	"term" char(1),
	"startTime" time,
	"endTime" time,
	"monday" boolean DEFAULT false NOT NULL,
	"tuesday" boolean DEFAULT false NOT NULL,
	"wednesday" boolean DEFAULT false NOT NULL,
	"thursday" boolean DEFAULT false NOT NULL,
	"friday" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_courseId_courses_id_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE;