CREATE TABLE "classifiedMemories" (
	"id" text PRIMARY KEY NOT NULL,
	"memory" text NOT NULL,
	"status" "status" DEFAULT 'classified' NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restoredMemories" (
	"id" text PRIMARY KEY NOT NULL,
	"memory" text NOT NULL,
	"operator_id" text NOT NULL,
	"status" "status" DEFAULT 'restored' NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unclassifiedMemories" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"memory" text NOT NULL,
	"status" "status" DEFAULT 'unclassified' NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "restoredMemories" ADD CONSTRAINT "restoredMemories_operator_id_operators_id_fk" FOREIGN KEY ("operator_id") REFERENCES "public"."operators"("id") ON DELETE no action ON UPDATE no action;