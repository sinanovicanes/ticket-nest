ALTER TABLE "events" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description" varchar(2000) NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" varchar(500) NOT NULL;