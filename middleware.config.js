/**
 * Middleware configuration for handling large headers
 * This file should be imported in your middleware.js if you have custom middleware
 */

// Export middleware configuration
module.exports = {
  // Increase header size limits
  serverOptions: {
    maxHeaderSize: 32 * 1024, // 32KB
    bodyParser: {
      sizeLimit: "10mb"
    },
    responseLimit: "10mb"
  },

  // Helper function to parse large cookies
  parseCookies: cookieString => {
    if (!cookieString) return {};

    const cookies = {};
    const cookiePairs = cookieString.split(/;\s*/);

    for (const pair of cookiePairs) {
      const [key, value] = pair.split("=");
      if (key && value !== undefined) {
        cookies[key] = value;
      }
    }

    return cookies;
  },

  // Helper to clean up large session data if needed
  cleanupSession: session => {
    if (!session) return null;

    // Remove any very large objects that might be causing header bloat
    const cleanSession = { ...session };

    // Example cleanup - customize based on your session structure
    if (cleanSession.user && cleanSession.user.permissions) {
      // Keep only essential permissions data
      cleanSession.user.permissionSummary = {
        count: Object.keys(cleanSession.user.permissions).length
      };
    }

    return cleanSession;
  }
};
