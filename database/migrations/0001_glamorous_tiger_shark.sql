CREATE TABLE IF NOT EXISTS "ticket_sales_images" (
	"url" varchar(255) PRIMARY KEY NOT NULL,
	"ticket_sales_is" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_sales_images" ADD CONSTRAINT "ticket_sales_images_ticket_sales_is_ticket_sales_id_fk" FOREIGN KEY ("ticket_sales_is") REFERENCES "public"."ticket_sales"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
