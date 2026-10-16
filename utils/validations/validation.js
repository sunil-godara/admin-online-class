import validator from "validator";

export function fieldValidation(rules, value, compareValue = null) {
  let errorMessage = "";
  let isValid = true;

  for (let __rule of rules) {
    const patternRegEx = new RegExp(__rule.pattern);

    switch (true) {
      case __rule.name === "required" &&
        (typeof value === "undefined" || value.length === 0): {
        errorMessage = __rule.message || "This is a required field.";
        isValid = false;
        break;
      }
      case __rule.name === "minLength" &&
        value &&
        value.length < __rule.value: {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "maxLength" &&
        value &&
        value.length > __rule.value: {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "alpha" &&
        value &&
        !validator.isAlpha(value, [__rule.locale || "en-GB"], {
          ignore: __rule.ignorePattern || false
        }): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "alphanumeric" &&
        value &&
        !validator.isAlphanumeric(value, [__rule.locale || "en-GB"], {
          ignore: __rule.ignorePattern || false
        }): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "isEqual" &&
        value &&
        !validator.equals(value, compareValue): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "email": {
        if (value && __rule.strictMode) {
          if (!patternRegEx.test(value)) {
            errorMessage = __rule.message || "Please provide a valid value.";
            isValid = false;
          }
        } else if (value && !validator.isEmail(value)) {
          errorMessage = __rule.message || "Please provide a valid value.";
          isValid = false;
        }
        break;
      }
      case __rule.name === "quantity" &&
        value &&
        !validator.isInt(value.toString(), { min: 0 }): {
        errorMessage = __rule.message || "Please enter a whole number.";
        isValid = false;

        break;
      }
      case __rule.name === "number" &&
        value &&
        !validator.isNumeric(value.toString()): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "postalCode" &&
        value &&
        !validator.isPostalCode(value, __rule.countryCode || "GB"): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "pattern" && value && !patternRegEx.test(value): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "strongPassword" &&
        value &&
        !validator.isStrongPassword(
          value,
          __rule.options || {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          }
        ): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "mobileNumber" &&
        value &&
        !validator.isMobilePhone(value, __rule.locale || "en-GB", {
          strictMode: __rule.strictMode || false
        }): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "currency" &&
        value &&
        !validator.isCurrency(
          value.toString(),
          __rule.options || {
            digits_after_decimal: [1]
          }
        ): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "dateFormat" &&
        value &&
        !validator.isDate(
          value,
          __rule.options || {
            format: "yyyy-mm-dd",
            strictMode: true,
            delimiters: ["/", "-"]
          }
        ): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "uri" &&
        value &&
        !validator.isURL(value, {
          require_protocol: true,
          require_host: true
        }): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "slug" && value && !validator.isSlug(value): {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "minValue" &&
        value &&
        parseInt(value) < __rule.value: {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "maxValue" &&
        value &&
        parseInt(value) > __rule.value: {
        errorMessage = __rule.message || "Please provide a valid value.";
        isValid = false;

        break;
      }
      case __rule.name === "validFile": {
        const isFile = value instanceof File;

        if (!isFile) {
          errorMessage = __rule.message || "Please select a file.";
          isValid = false;
        }

        break;
      }
      case __rule.name === "file": {
        const fileExtension = value.type.split("/")[1];

        if (!__rule.allowedExtensions.includes(fileExtension)) {
          errorMessage = __rule.message || "Please provide a valid value.";
          isValid = false;
        }

        break;
      }
      case __rule.name === "fileSize": {
        const isFile = value instanceof File;

        if (!isFile) {
          errorMessage = __rule.message || "Please select a file.";
          isValid = false;
        }

        const sizeInMB = parseInt(value.size) / (1024 * 1024);

        if (sizeInMB > __rule.allowedSize) {
          errorMessage =
            __rule.message ||
            `File size must not exceed ${__rule.allowedSize} MB.`;
          isValid = false;
        }

        break;
      }
      default:
      // Do nothing
    }

    if (errorMessage) break;
  }

  return !isValid && errorMessage;
}

export const formValidation = (inputs, rules) => {
  let errors = {};

  if (Object.keys(inputs).length) {
    for (let input of Object.keys(inputs)) {
      if (typeof rules !== "undefined" && typeof rules[input] !== "undefined") {
        let errorMessage = "";

        if (input === "confirm_password") {
          errorMessage = fieldValidation(
            rules[input],
            inputs[input],
            inputs.password
          );

          if (errorMessage) {
            errors[input] = errorMessage;
          }
        } else {
          if (inputs[input] && typeof inputs[input] === "object") {
            if (Array.isArray(inputs[input])) {
              let productErrors = [];

              for (let fieldArray of inputs[input]) {
                let errorFields = {};

                for (let field of Object.keys(fieldArray)) {
                  errorMessage =
                    rules[input] && rules[input][field]
                      ? fieldValidation(rules[input][field], fieldArray[field])
                      : "";

                  if (errorMessage) {
                    errorFields = {
                      ...errorFields,
                      [field]: errorMessage
                    };
                  }
                }

                if (Object.keys(errorFields).length) {
                  productErrors.push(errorFields);
                }
              }
              if (productErrors.length) {
                errors[input] = productErrors;
              }
            } else {
              for (let field of Object.keys(inputs[input])) {
                errorMessage =
                  rules[input] && rules[input][field]
                    ? fieldValidation(rules[input][field], inputs[input][field])
                    : "";

                if (errorMessage) {
                  errors = {
                    ...errors,
                    [input]: {
                      ...errors[input],
                      [field]: errorMessage
                    }
                  };
                }
              }
            }
          } else {
            if (Array.isArray(rules[input])) {
              const value = inputs[input] || "";
              errorMessage = fieldValidation(rules[input], value);

              if (errorMessage) {
                errors[input] = errorMessage;
              }
            }
          }
        }
      }
    }
  }

  return errors;
};
