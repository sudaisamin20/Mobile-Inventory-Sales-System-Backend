/**
 * Input validation utilities for the application
 */

export const validators = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
  },

  /**
   * Validate password strength
   * Requirements: min 6 chars, at least 1 uppercase, 1 number
   */
  isValidPassword: (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Validate IMEI (15 digits, passes Luhn algorithm)
   */
  isValidIMEI: (imei: string): boolean => {
    if (!/^\d{15}$/.test(imei)) return false;
    return validateLuhn(imei);
  },

  /**
   * Validate phone number (basic format)
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  },

  /**
   * Validate full name (2-100 characters, letters and spaces)
   */
  isValidFullName: (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    return nameRegex.test(name);
  },

  /**
   * Validate device brand
   */
  isValidBrand: (brand: string): boolean => {
    return brand.length >= 2 && brand.length <= 50;
  },

  /**
   * Validate device model
   */
  isValidModel: (model: string): boolean => {
    return model.length >= 2 && model.length <= 100;
  },

  /**
   * Validate device color
   */
  isValidColor: (color: string): boolean => {
    return color.length >= 2 && color.length <= 50;
  },

  /**
   * Validate device storage (e.g., "128GB", "256GB")
   */
  isValidStorage: (storage: string): boolean => {
    const storageRegex = /^(\d+)(GB|MB)$/i;
    return storageRegex.test(storage);
  },
};

/**
 * Luhn algorithm for IMEI validation
 */
function validateLuhn(imei: string): boolean {
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(imei[i], 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
