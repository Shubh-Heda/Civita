// ============================================
// Content Moderation Utilities
// ============================================

// Basic profanity filter word list (expandable)
const PROFANITY_LIST = [
  'badword1', 'badword2', 'offensive', 'inappropriate',
  // Add actual words as needed for production
];

// Spam detection patterns
const SPAM_PATTERNS = [
  /(.)\1{10,}/gi, // Character repetition (aaaaaaaaaa)
  /https?:\/\/[^\s]+/gi, // Multiple URLs
  /\b(buy|click|free|winner|prize)\b/gi, // Common spam words
];

/**
 * Check if content contains profanity
 */
export function containsProfanity(content: string): boolean {
  const lowerContent = content.toLowerCase();
  return PROFANITY_LIST.some(word => lowerContent.includes(word));
}

/**
 * Filter/censor profanity in content
 */
export function filterProfanity(content: string): string {
  let filtered = content;
  PROFANITY_LIST.forEach(word => {
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '*'.repeat(word.length));
  });
  return filtered;
}

/**
 * Detect potential spam patterns
 */
export function isSpam(content: string): boolean {
  // Check for excessive repetition
  if (/(.)\1{10,}/.test(content)) return true;
  
  // Check for too many URLs
  const urlMatches = content.match(/https?:\/\/[^\s]+/g);
  if (urlMatches && urlMatches.length > 3) return true;
  
  // Check for all caps (excluding short messages)
  if (content.length > 20 && content === content.toUpperCase()) return true;
  
  return false;
}

/**
 * Rate limiter for messages
 */
export class MessageRateLimiter {
  private timestamps: Map<string, number[]> = new Map();
  private maxMessages: number;
  private windowMs: number;

  constructor(maxMessages = 5, windowMs = 10000) {
    this.maxMessages = maxMessages;
    this.windowMs = windowMs;
  }

  /**
   * Check if user can send message
   */
  canSend(userId: string): boolean {
    const now = Date.now();
    const userTimestamps = this.timestamps.get(userId) || [];
    
    // Filter out old timestamps
    const recentTimestamps = userTimestamps.filter(
      ts => now - ts < this.windowMs
    );
    
    if (recentTimestamps.length >= this.maxMessages) {
      return false;
    }
    
    recentTimestamps.push(now);
    this.timestamps.set(userId, recentTimestamps);
    return true;
  }

  /**
   * Get time until user can send next message
   */
  getWaitTime(userId: string): number {
    const now = Date.now();
    const userTimestamps = this.timestamps.get(userId) || [];
    
    if (userTimestamps.length < this.maxMessages) return 0;
    
    const oldestTimestamp = Math.min(...userTimestamps);
    const waitTime = this.windowMs - (now - oldestTimestamp);
    
    return Math.max(0, waitTime);
  }

  /**
   * Reset rate limit for user
   */
  reset(userId: string): void {
    this.timestamps.delete(userId);
  }
}

/**
 * Content validation before sending
 */
export interface ContentValidationResult {
  valid: boolean;
  reason?: string;
  filtered?: string;
}

export function validateMessageContent(
  content: string,
  options: {
    checkProfanity?: boolean;
    checkSpam?: boolean;
    maxLength?: number;
  } = {}
): ContentValidationResult {
  const {
    checkProfanity = true,
    checkSpam = true,
    maxLength = 2000
  } = options;

  // Check length
  if (content.length > maxLength) {
    return {
      valid: false,
      reason: `Message too long (max ${maxLength} characters)`
    };
  }

  // Check empty
  if (content.trim().length === 0) {
    return {
      valid: false,
      reason: 'Message cannot be empty'
    };
  }

  // Check profanity
  if (checkProfanity && containsProfanity(content)) {
    return {
      valid: false,
      reason: 'Message contains inappropriate language',
      filtered: filterProfanity(content)
    };
  }

  // Check spam
  if (checkSpam && isSpam(content)) {
    return {
      valid: false,
      reason: 'Message detected as spam'
    };
  }

  return { valid: true };
}
