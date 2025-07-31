ALTER TABLE `todos` ADD `deleted_at` integer;--> statement-breakpoint
ALTER TABLE `todos` ADD `is_deleted` integer DEFAULT false;