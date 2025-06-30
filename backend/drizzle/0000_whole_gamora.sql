CREATE TYPE "public"."status" AS ENUM('unclassified', 'classified', 'in_progress', 'restored');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'operator');--> statement-breakpoint
CREATE TABLE "operators" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"operator_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'operator',
	"memory_level" numeric(5, 2) DEFAULT '0.00',
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "operators_operator_name_unique" UNIQUE("operator_name"),
	CONSTRAINT "operators_email_unique" UNIQUE("email"),
	CONSTRAINT "password_min_length" CHECK (char_length("operators"."password") >= 8)
);
