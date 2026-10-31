import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";

export const DEFAULT_ADMIN_USER_ID = "user_3LSNrspqCrduvJyGYxKxuC3n3Vg";
export const DEFAULT_ADMIN_EMAIL = "pateldeepak9987@gmail.com";

/**
 * Checks if a user has administrative privileges.
 * Validates against ADMIN_CLERK_USER_ID, ADMIN_EMAIL, or Clerk metadata role.
 */
export function isUserAdmin(
  userId?: string | null,
  email?: string | null,
  metadata?: Record<string, any> | null
): boolean {
  const configuredAdminId = (process.env.ADMIN_CLERK_USER_ID || DEFAULT_ADMIN_USER_ID).trim();
  const configuredAdminEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();

  // Match Clerk User ID
  if (userId && (userId === configuredAdminId || userId === DEFAULT_ADMIN_USER_ID)) {
    return true;
  }

  // Match Admin Email
  if (email && email.trim().toLowerCase() === configuredAdminEmail) {
    return true;
  }

  // Match role in Clerk metadata
  if (metadata) {
    if (metadata.role === "admin" || metadata.isAdmin === true) {
      return true;
    }
  }

  return false;
}

/**
 * Retrieves the current session user and determines their admin status.
 */
export async function getCurrentUserAdminStatus() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { isAdmin: false, userId: null, email: null, user: null };
    }

    const user = await currentUser();
    if (!user) {
      return { isAdmin: false, userId, email: null, user: null };
    }

    const primaryEmail = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress || user.emailAddresses[0]?.emailAddress || null;

    const isAdmin = isUserAdmin(
      userId,
      primaryEmail,
      { ...(user.publicMetadata as any), ...(user.unsafeMetadata as any) }
    );

    return {
      isAdmin,
      userId,
      email: primaryEmail,
      user,
    };
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
    console.error("Error evaluating admin status:", error);
    return { isAdmin: false, userId: null, email: null, user: null };
  }
}

/**
 * Server-side guard that throws an error or returns admin data.
 * Used at the top of protected Admin Server Components and Admin API routes.
 */
export async function requireAdmin() {
  const status = await getCurrentUserAdminStatus();
  if (!status.isAdmin || !status.userId) {
    throw new Error("UNAUTHORIZED_ADMIN_ACCESS");
  }
  return status;
}

