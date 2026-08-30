/**
 * Application roles.
 *
 * Add a role here and it becomes available to `guardRole([...])` and to the
 * user schema enum — this file is the single source of truth for both.
 */
export type TRole = "admin" | "user";

export const ERole: TRole[] = ["admin", "user"];

/** Every role — shorthand for routes any signed-in account may hit. */
export const ALL_ROLES: TRole[] = ERole;
