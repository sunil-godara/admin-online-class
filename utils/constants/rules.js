const ukPhoneNumberRegex =
  // eslint-disable-next-line no-useless-escape
  /^(((\+?44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

const ukOfficePhoneNumberRegex =
  /^(((\+?44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?(ext|x|extension)\s?\d{3,4})?$/i;

export const usPhoneNumberRegex =
  // /^(\+1\s?)?(\(?[2-9][0-9]{2}\)?[\s.-]?)?[2-9][0-9]{2}[\s.-]?[0-9]{4}$/;
  /^\+?[0-9]{10,15}$/;

let ecommerceRegex = "-_";

export const loginRules = {
  email: [
    {
      name: "required",
      message: "Please provide an email."
    },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    }
  ],
  password: [
    {
      name: "required",
      message: "Please provide a password."
    }
  ]
};

export const signupRules = {
  name: [
    {
      name: "required",
      message: "Please enter your full name."
    }
  ],
  email: [
    {
      name: "required",
      message: "Please enter your email."
    },
    {
      name: "email",
      message: "Please enter a valid email address.",
      strictMode: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    }
  ],
  password: [
    {
      name: "required",
      message: "Please enter a password."
    },
    {
      name: "minLength",
      value: 6,
      message: "Password must be at least 6 characters."
    }
  ],
  phone: [
    {
      name: "required",
      message: "Please enter your phone number."
    },
    {
      name: "pattern",
      message: "Please enter a valid phone number.",
      pattern: /^[2-9]{1}[0-9]{9}$/ // US 10-digit (excluding starting with 0 or 1)
    }
  ],
  location: [
    {
      name: "required",
      message: "Please enter your location."
    }
  ],
  bio: [
    {
      name: "required",
      message: "Please enter a short bio."
    },
    {
      name: "minLength",
      value: 10,
      message: "Bio must be at least 10 characters."
    }
  ],
  modalities: [
    {
      name: "required",
      message: "Please select at least one modality."
    },
    {
      name: "minLength",
      value: 1,
      message: "Please select at least one modality."
    }
  ]
};

export const forgotPasswordRules = {
  email: [
    {
      name: "required",
      message: "Please provide an email."
    },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    }
  ]
};

export const otpRules = {
  email: [
    {
      name: "required",
      message: "Please provide an email."
    },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  otp: [
    {
      name: "required",
      message: "Please provide an otp."
    }
  ]
};

export const resetPasswordRules = {
  password: [
    {
      name: "required",
      message: "Please provide a password."
    },
    {
      name: "minLength",
      message: "The password length should be atleast 8 characters long.",
      value: 8
    },
    {
      name: "strongPassword",
      message: "Strong password criteria: ex. Rab123@a.",
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  ],
  confirm_password: [
    {
      name: "required",
      message: "Please provide a confirm password."
    },
    {
      name: "isEqual",
      message: "Confirm password should be same as password."
    }
  ]
};

export const customerRules = {
  usertype: [
    {
      name: "required",
      message: "Please provide a user type."
    }
  ],
  name: [
    {
      name: "required",
      message: "Please provide a name."
    },
    {
      name: "alpha",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  email: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  phone: [
    {
      name: "pattern",
      message: "Please provide a valid UK phone number.",
      pattern: ukPhoneNumberRegex
    }
  ],
  scheme_id: [
    {
      name: "required",
      message: "Please select a scheme type."
    }
  ],
  website: [
    {
      name: "uri",
      message: "Please provide a valid URL (e.g., https://www.example.com)."
    }
  ],
  reporting_url: [
    {
      name: "uri",
      message: "Please provide a valid URL (e.g., https://www.example.com)."
    }
  ],
  reporting_user_login: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  reporting_password: [
    {
      name: "minLength",
      message: "The password length should be atleast 8 characters long.",
      value: 8
    },
    {
      name: "strongPassword",
      message: "Strong password criteria: ex. Rab123@a.",
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  ],
  user_details: {
    address_line1: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    address_line2: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    address_line3: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    state: [
      {
        name: "maxLength",
        message: "County should contain no more than 50 characters.",
        value: 50
      }
    ],
    post_code: [
      {
        name: "postalCode",
        message: "Please provide a valid UK post code.",
        locale: "GB"
      }
    ],
    account_name: [
      {
        name: "maxLength",
        message: "Account Name should contain no more than 50 characters.",
        value: 50
      },
      {
        name: "minLength",
        message: "Name should contain at least 3 characters.",
        value: 3
      }
    ],
    account_number: [
      {
        name: "minLength",
        message: "Account number at least 8 characters long.",
        value: 8
      }
    ]
  },
  user_main_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_signatory_details: {
    signatory_email1: [
      {
        name: "email",
        message: "Please provide a valid signatory email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    signatory_office_number1: [
      {
        name: "pattern",
        message: "Please provide a valid UK signatory office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    signatory_mobile1: [
      {
        name: "pattern",
        message: "Please provide a valid UK signatory mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ],
    signatory_email2: [
      {
        name: "email",
        message: "Please provide a valid signatory email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    signatory_office_number2: [
      {
        name: "pattern",
        message: "Please provide a valid UK signatory office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    signatory_mobile2: [
      {
        name: "pattern",
        message: "Please provide a valid UK signatory mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_finance_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_technical_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  }
};

export const multipleSchoolRules = {
  school_name: [
    {
      name: "alpha",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  school_email: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  password: [
    {
      name: "minLength",
      message: "The password length should be atleast 8 characters long.",
      value: 8
    },
    {
      name: "strongPassword",
      message: "Strong password criteria: ex. Rab123@a.",
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  ]
};

export const supplierRules = {
  type: [
    {
      name: "required",
      message: "Please provide a user type."
    }
  ],
  name: [
    {
      name: "required",
      message: "Please provide a name."
    },
    {
      name: "alpha",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  email: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  phone: [
    {
      name: "pattern",
      message: "Please provide a valid UK phone number.",
      pattern: ukPhoneNumberRegex
    }
  ],
  website: [
    {
      name: "uri",
      message: "Please provide a valid URL (e.g., https://www.example.com)."
    }
  ],
  reporting_url: [
    {
      name: "uri",
      message: "Please provide a valid URL (e.g., https://www.example.com)."
    }
  ],
  reporting_user_login: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  reporting_password: [
    {
      name: "minLength",
      message: "The password length should be atleast 8 characters long.",
      value: 8
    },
    {
      name: "strongPassword",
      message: "Strong password criteria: ex. Rab123@a.",
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  ],
  user_details: {
    address_line1: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    address_line2: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    address_line3: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    state: [
      {
        name: "maxLength",
        message: "County should contain no more than 50 characters.",
        value: 50
      }
    ],
    post_code: [
      {
        name: "postalCode",
        message: "Please provide a valid UK post code.",
        locale: "GB"
      }
    ],
    account_name: [
      {
        name: "maxLength",
        message: "Account Name should contain no more than 50 characters.",
        value: 50
      },
      {
        name: "minLength",
        message: "Name should contain at least 3 characters.",
        value: 3
      }
    ],
    account_number: [
      {
        name: "minLength",
        message: "Account number at least 8 characters long.",
        value: 8
      }
    ]
  },
  user_main_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_account_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_finance_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_support_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  }
};

export const introducerRules = {
  type: [
    {
      name: "required",
      message: "Please provide a user type."
    }
  ],
  name: [
    {
      name: "required",
      message: "Please provide a name."
    },
    {
      name: "alpha",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  email: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  phone: [
    {
      name: "pattern",
      message: "Please provide a valid UK phone number.",
      pattern: ukPhoneNumberRegex
    }
  ],
  website: [
    {
      name: "uri",
      message: "Please provide a valid URL (e.g., https://www.example.com)."
    }
  ],
  notes: [
    {
      name: "maxLength",
      message: "Notes should contain no more than 250 characters.",
      value: 250
    },
    {
      name: "minLength",
      message: "Notes should contain at least 3 characters.",
      value: 3
    }
  ],
  agreed_commission: [
    {
      name: "maxLength",
      message: "Agreed commission should contain no more than 250 characters.",
      value: 250
    },
    {
      name: "minLength",
      message: "Agreed commission should contain at least 3 characters.",
      value: 3
    }
  ],
  reporting_url: [
    {
      name: "uri",
      message: "Please provide a valid URL (e.g., https://www.example.com)."
    }
  ],
  reporting_user_login: [
    // {
    //   name: "required",
    //   message: "Please provide a reporting user login email."
    // },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  reporting_password: [
    // {
    //   name: "required",
    //   message: "Please provide a reporting password."
    // },
    {
      name: "minLength",
      message: "The password length should be atleast 8 characters long.",
      value: 8
    },
    {
      name: "strongPassword",
      message: "Strong password criteria: ex. Rab123@a.",
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  ],
  user_details: {
    address_line1: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    address_line2: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    address_line3: [
      {
        name: "maxLength",
        message: "Address Line should contain no more than 100 characters.",
        value: 100
      }
    ],
    state: [
      {
        name: "maxLength",
        message: "County should contain no more than 50 characters.",
        value: 50
      }
    ],
    post_code: [
      {
        name: "postalCode",
        message: "Please provide a valid UK post code.",
        locale: "GB"
      }
    ],
    account_name: [
      {
        name: "maxLength",
        message: "Account Name should contain no more than 50 characters.",
        value: 50
      },
      {
        name: "minLength",
        message: "Name should contain at least 3 characters.",
        value: 3
      }
    ],
    account_number: [
      {
        name: "minLength",
        message: "Account number at least 8 characters long.",
        value: 8
      }
    ]
  },
  user_main_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  },
  user_account_contact_details: {
    contact_email: [
      {
        name: "email",
        message: "Please provide a valid contact email.",
        strictMode: true,
        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
      }
    ],
    contact_office_number: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact office number.",
        pattern: ukOfficePhoneNumberRegex
      }
    ],
    contact_mobile: [
      {
        name: "pattern",
        message: "Please provide a valid UK contact mobile number.",
        pattern: ukPhoneNumberRegex
      }
    ]
  }
};

export const choicesSchemeRules = {
  scheme_type: [
    {
      name: "required",
      message: "Please provide a scheme type."
    }
  ],
  scheme_name: [
    {
      name: "required",
      message: "Please provide a name."
    },
    {
      name: "alphanumeric",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  notify_scheme_email: [
    {
      name: "required",
      message: "Please provide a notify scheme email."
    },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  customer_id: [
    {
      name: "required",
      message: "Please select customer."
    }
  ],
  // old_scheme_id: [
  //   {
  //     name: "required",
  //     message: "Please provide scheme ID."
  //   },
  //   {
  //     name: "number",
  //     message: "Please provide valid ID"
  //   }
  // ],
  hardware_supplier_id: [
    {
      name: "required",
      message: "Please select hardware supplier."
    }
  ],
  insurance_cover_supplier_id: [
    {
      name: "required",
      message: "Please select insurance cover supplier."
    }
  ],
  live_date: [
    {
      name: "required",
      message: "Please provide a live date."
    }
  ],
  products: {
    sku_number: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    // supplier_id: [
    //   {
    //     name: "required",
    //     message: "This field is required."
    //   }
    // ],
    product_name: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "maxLength",
        message: "Product name should contain no more than 50 characters.",
        value: 50
      },
      {
        name: "minLength",
        message: "Product name should contain at least 3 characters.",
        value: 3
      }
    ],
    supplier_cost: [
      // {
      //   name: "required",
      //   message: "This field is required."
      // },
      // {
      //   name: "currency",
      //   message: "Please enter a numeric value."
      // },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid supplier cost."
      }
    ],
    school_cash_price: [
      // {
      //   name: "required",
      //   message: "This field is required."
      // },
      // {
      //   name: "currency",
      //   message: "Please enter a numeric value."
      // },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid school cash price."
      }
    ]
  }
};

export const storeSchemeRules = {
  scheme_type: [
    {
      name: "required",
      message: "Please provide a scheme type."
    }
  ],
  scheme_name: [
    {
      name: "required",
      message: "Please provide a name."
    },
    {
      name: "alphanumeric",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  notify_scheme_email: [
    {
      name: "required",
      message: "Please provide a notify scheme email."
    },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  customer_id: [
    {
      name: "required",
      message: "Please select customer."
    }
  ],
  // old_scheme_id: [
  //   {
  //     name: "required",
  //     message: "Please provide scheme ID."
  //   },
  //   {
  //     name: "number",
  //     message: "Please provide valid ID"
  //   }
  // ],
  hardware_supplier_id: [
    {
      name: "required",
      message: "Please select hardware supplier."
    }
  ],
  insurance_cover_supplier_id: [
    {
      name: "required",
      message: "Please select insurance cover supplier."
    }
  ],
  live_date: [
    {
      name: "required",
      message: "Please provide a live date."
    }
  ],
  products: {
    sku_number: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    // supplier_id: [
    //   {
    //     name: "required",
    //     message: "This field is required."
    //   }
    // ],
    name: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "maxLength",
        message: "Product name should contain no more than 50 characters.",
        value: 50
      },
      {
        name: "minLength",
        message: "Product name should contain at least 3 characters.",
        value: 3
      }
    ],
    supplier_cost: [
      // {
      //   name: "required",
      //   message: "This field is required."
      // },
      // {
      //   name: "currency",
      //   message: "Please enter a numeric value."
      // },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid supplier cost."
      }
    ],
    school_cash_price: [
      // {
      //   name: "required",
      //   message: "This field is required."
      // },
      // {
      //   name: "currency",
      //   message: "Please enter a numeric value."
      // },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid school cash price."
      }
    ]
  }
};

export const directDebitPaymentRules = {
  relevant_month: [
    {
      name: "required",
      message: "Please select a month."
    }
  ],
  relevant_year: [
    {
      name: "required",
      message: "Please select a year."
    }
  ],
  direct_debit_file: [
    {
      name: "required",
      message: "Please upload a file."
    }
  ]
};

export const invoiceRules = {
  supplier_id: [
    {
      name: "required",
      message: "Please select supplier."
    }
  ],
  invoice_order: [
    {
      name: "required",
      message: "Please provide invoice order."
    }
  ],
  reference: [
    {
      name: "required",
      message: "Please provide reference."
    }
  ],
  date: [
    {
      name: "required",
      message: "Please select date."
    }
  ],
  due_date: [
    {
      name: "required",
      message: "Please select due date."
    }
  ],
  payment_terms: [
    {
      name: "required",
      message: "Please select payment term."
    }
  ],
  shipment_preferences: [
    {
      name: "required",
      message: "Please provide shipment preferences."
    }
  ],
  notes: [
    {
      name: "required",
      message: "Please provide note."
    }
  ],
  terms_conditions: [
    {
      name: "required",
      message: "Please provide terms & conditions."
    }
  ],
  sub_total: [
    {
      name: "required",
      message: "Please provide a sub total."
    }
  ],
  total: [
    {
      name: "required",
      message: "Please provide a total."
    }
  ],
  discount_percent: [
    {
      name: "required",
      message: "Please provide a discount percent."
    }
  ],
  tcs_price: [
    {
      name: "required",
      message: "Please provide a tcs price."
    }
  ],
  invoiceItems: {
    name: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "maxLength",
        message: "Item name should contain no more than 50 characters.",
        value: 50
      },
      {
        name: "minLength",
        message: "Item name should contain at least 3 characters.",
        value: 3
      }
    ],
    quantity: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "quantity",
        message: "Please enter a valid quantity."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid supplier cost."
      }
    ],
    rate: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "currency",
        message: "Please enter a numeric value."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid school cash price."
      }
    ],
    amount: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "currency",
        message: "Please enter a numeric value."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid school cash price."
      }
    ]
  }
};

export const userRules = {
  usertype: [
    {
      name: "required",
      message: "Please provide a user type."
    }
  ],
  first_name: [
    {
      name: "required",
      message: "Please provide a first name."
    },
    {
      name: "alpha",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  second_name: [
    {
      name: "required",
      message: "Please provide a second name."
    },
    {
      name: "alpha",
      message: "Please provide a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  email: [
    {
      name: "required",
      message: "Please provide an email."
    },
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  department_email: [
    {
      name: "required",
      message: "Please provide a department email."
    }
  ],
  phone: [
    {
      name: "required",
      message: "Please provide a phone no."
    },
    {
      name: "pattern",
      message: "Please provide a valid UK phone number.",
      pattern: ukPhoneNumberRegex
    }
  ],
  password: [
    {
      name: "required",
      message: "Please provide a password."
    },
    {
      name: "minLength",
      message: "The password length should be atleast 8 characters long.",
      value: 8
    },
    {
      name: "strongPassword",
      message: "Strong password criteria: ex. Rab123@a.",
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  ],
  status: [
    {
      name: "required",
      message: "Please select a status."
    }
  ]
};

export const passwordFieldRules = {
  currentPassword: [
    {
      name: "required",
      message: "Please enter your current password"
    }
  ],
  newPassword: [
    {
      name: "required",
      message: "Please enter a new password"
    },
    {
      name: "minLength",
      value: 6,
      message: "Password should be at least 6 characters"
    }
  ],
  confirmPassword: [
    {
      name: "required",
      message: "Please confirm your new password"
    },
    {
      name: "matchField",
      fieldToMatch: "newPassword",
      message: "Passwords do not match"
    }
  ]
};

export const profileFieldRules = {
  name: [
    {
      name: "required",
      message: "Please provide your name."
    },
    {
      name: "alpha",
      message: "Please enter a valid name.",
      ignorePattern: "/^[-sa-zA-Z' ]+$/i"
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  phone: [
    {
      name: "required",
      message: "Please provide a phone number."
    },
    {
      name: "pattern",
      message: "Please provide a valid US phone number.",
      pattern: usPhoneNumberRegex
    }
  ],
  preferred_location: [
    {
      name: "maxLength",
      message: "Location should not exceed 100 characters.",
      value: 100
    }
  ],
  profile_photo_url: [
    {
      name: "pattern",
      message: "Please enter a valid image URL.",
      pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp))(?:\?.*)?$/i
    }
  ]
};

export const refundRules = {
  order_sl: [
    {
      name: "required",
      message: "Please provide an account number."
    }
  ],
  amount: [
    {
      name: "required",
      message: "Please provide an amount."
    },
    {
      name: "currency",
      message: "Please enter a numeric value."
    },
    {
      name: "minValue",
      value: 0,
      message: "Please provide a valid amount."
    }
  ],
  notes: [
    {
      name: "required",
      message: "Please provide a note."
    }
  ]
};

export const poCreationRules = {
  supplier_type: [
    {
      name: "required",
      message: "Please select a supplier type."
    }
  ],
  supplier_id: [
    {
      name: "required",
      message: "Please select a supplier."
    }
  ],
  scheme_type: [
    {
      name: "required",
      message: "Please select a scheme type."
    }
  ],
  customer_id: [
    {
      name: "required",
      message: "Please select a customer."
    }
  ],
  scheme_customer: [
    {
      name: "required",
      message: "Please select a scheme customer."
    }
  ],
  scheme_id: [
    {
      name: "required",
      message: "Please select a scheme."
    }
  ],
  selection_criteria: [
    {
      name: "required",
      message: "Please select a selection criteria."
    }
  ],
  delivery_address: [
    {
      name: "required",
      message: "Please select a delivery address."
    }
  ],
  delivery_list_required: [
    {
      name: "required",
      message: "Please select a delivery list."
    }
  ],
  is_replacement_po: [
    {
      name: "required",
      message: "Please select a replacement."
    }
  ],
  po_creation_type: [
    {
      name: "required",
      message: "Please select a po creation type."
    }
  ],
  purchase_order_line_items: {
    scheme_sku: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    sku_number: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    product_name: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    supplier_cost: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "currency",
        message: "Please enter a numeric value."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid rate."
      }
    ],
    product_qty: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "currency",
        message: "Please enter a numeric value."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid quantity."
      }
    ]
  }
};

export const customPoCreationRules = {
  supplier_type: [
    {
      name: "required",
      message: "Please select a supplier type."
    }
  ],
  supplier_id: [
    {
      name: "required",
      message: "Please select a supplier."
    }
  ],
  scheme_type: [
    {
      name: "required",
      message: "Please select a scheme type."
    }
  ],
  customer_id: [
    {
      name: "required",
      message: "Please select a customer."
    }
  ],
  scheme_customer: [
    {
      name: "required",
      message: "Please select a scheme customer."
    }
  ],
  scheme_id: [
    {
      name: "required",
      message: "Please select a scheme."
    }
  ],
  selection_criteria: [
    {
      name: "required",
      message: "Please select a selection criteria."
    }
  ],
  delivery_address: [
    {
      name: "required",
      message: "Please select a delivery address."
    }
  ],
  delivery_list_required: [
    {
      name: "required",
      message: "Please select a delivery list."
    }
  ],
  is_replacement_po: [
    {
      name: "required",
      message: "Please select a replacement."
    }
  ],
  purchase_order_line_items: {
    scheme_sku: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    sku_number: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    product_name: [
      {
        name: "required",
        message: "This field is required."
      }
    ],
    supplier_cost: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "currency",
        message: "Please enter a numeric value."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid rate."
      }
    ],
    quantity: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "quantity",
        message: "Please enter a valid quantity."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid quantity."
      }
    ]
  }
};

export const poNoteRules = {
  notes: [
    {
      name: "required",
      message: "Please enter your note."
    }
  ]
};

export const invoiceNoteRules = {
  notes: [
    {
      name: "required",
      message: "Please enter your note."
    }
  ]
};

export const poInvoiceRules = {
  invoice_number: [
    {
      name: "required",
      message: "Please enter a invoice number."
    }
  ],
  invoice_value: [
    {
      name: "required",
      message: "Please enter a invoice value."
    },
    {
      name: "currency",
      message: "Please enter a numeric value."
    },
    {
      name: "minValue",
      value: 0,
      message: "Please provide a valid invoice amount."
    }
  ],
  invoice_date: [
    {
      name: "required",
      message: "Please select a invoice date."
    }
  ],
  files: [
    {
      name: "required",
      message: "Please upload a file."
    }
  ]
};

export const invoicePaymentRules = {
  invoice_paid_amount: [
    {
      name: "required",
      message: "Please enter a invoice amount."
    },
    {
      name: "currency",
      message: "Please enter a numeric value."
    },
    {
      name: "minValue",
      value: 0,
      message: "Please provide a valid invoice amount."
    }
  ],
  invoice_paid_date: [
    {
      name: "required",
      message: "Please select a invoice paid date."
    }
  ]
};

export const poCancelRules = {
  cancel_new_po_send: [
    {
      name: "required",
      message: "Please select."
    }
  ],
  reason_for_cancelation: [
    {
      name: "required",
      message: "Please enter reason for po cancelation."
    },
    {
      name: "maxLength",
      value: 250,
      message: "Cancelation Reason should contain no more than 250 characters."
    }
  ]
};

export const refundCancelRules = {
  note: [
    {
      name: "required",
      message: "Please provide a note to submit the request."
    }
  ]
};

export const emailTemplateRules = {
  title: [
    {
      name: "required",
      message: "Please enter a title."
    },
    {
      name: "maxLength",
      message: "Title should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ],
  subject: [
    {
      name: "required",
      message: "Please enter a subject."
    }
  ],
  from_email: [
    {
      name: "required",
      message: "Please provide a from email."
    },
    {
      name: "email",
      message: "Please provide a valid from email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  reply_email: [
    {
      name: "required",
      message: "Please provide a reply email."
    },
    {
      name: "email",
      message: "Please provide a valid reply email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  description: [
    {
      name: "required",
      message: "Please enter a description."
    }
  ]
};

export const attributeRules = {
  title: [
    {
      name: "required",
      message: "Please provide a name."
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  scheme_type: [
    {
      name: "required",
      message: "Please select a scheme type."
    }
  ]
};

export const themeRules = {
  theme_name: [
    {
      name: "required",
      message: "Please provide a theme name."
    },
    {
      name: "maxLength",
      message: "Theme name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Theme name should contain at least 3 characters.",
      value: 3
    }
  ],
  theme_type: [
    {
      name: "required",
      message: "Please select preview type."
    }
  ],
  status: [
    {
      name: "required",
      message: "Please select a status."
    }
  ]
};

export const storeBasicRules = {
  scheme_type: [
    {
      name: "required",
      message: "Please select a scheme type."
    }
  ],
  customer_id: [
    {
      name: "required",
      message: "Please select a customer."
    }
  ],
  scheme_id: [
    {
      name: "required",
      message: "Please select a scheme."
    }
  ],
  ordering_portal_csv_id: [
    {
      name: "required",
      message: "Please select a ordering portal csv."
    }
  ],
  ecommerce_name: [
    {
      name: "required",
      message: "Please provide a portal identification."
    },
    {
      name: "maxLength",
      message: "Portal identification must not exceed 100 characters.",
      value: 50
    },
    {
      name: "alpha",
      message: "Please provide a valid portal identification.",
      ignorePattern: ecommerceRegex
    }
  ],
  ecommerce_label: [
    {
      name: "maxLength",
      message: "Ecommerce name must not exceed 100 characters.",
      value: 100
    }
  ],
  status: [
    {
      name: "required",
      message: "Please select a status."
    }
  ],
  theme_id: [
    {
      name: "required",
      message: "Please select a theme."
    }
  ],
  catalogue_description: [
    {
      name: "maxLength",
      message: "Title contain no more than 2000 characters.",
      value: 2000
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ]
};

export const storeHeaderRules = {
  header_logo: [
    {
      name: "required",
      message: "Please provide a header logo."
    }
  ],
  email_address: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  phone_no: [
    {
      name: "pattern",
      message: "Please provide a valid UK phone number.",
      pattern: ukPhoneNumberRegex
    }
  ]
};

export const storeFooterRules = {
  show_contact_form: [
    {
      name: "required",
      message: "Please select this field."
    }
  ],
  // footer_logo: [
  //   {
  //     name: "required",
  //     message: "Please provide a footer logo."
  //   }
  // ],
  store_address: [
    {
      name: "maxLength",
      message: "Title contain no more than 255 characters.",
      value: 255
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ]
};

export const storeBannerRules = {
  banner_heading: [
    {
      name: "maxLength",
      message: "Heading must not exceed 100 characters.",
      value: 100
    }
  ],
  background_transparency: [
    {
      name: "minValue",
      value: 0,
      message: "Please provide a valid value."
    },
    {
      name: "maxValue",
      message: "Max value should be 1.",
      value: 1
    }
  ],
  image_type: [
    {
      name: "required",
      message: "Please select a banner image type."
    }
  ],
  description: [
    {
      name: "maxLength",
      message: "Title contain no more than 1000 characters.",
      value: 1000
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ]
};

export const storeCheckoutRules = {
  show_year_group_title: [
    {
      name: "maxLength",
      message: "Title contain no more than 100 characters.",
      value: 100
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ],
  show_year_group_dropdown_name: [
    {
      name: "maxLength",
      message: "Dropdown name contain no more than 200 characters.",
      value: 200
    },
    {
      name: "minLength",
      message: "Dropdown name should contain at least 3 characters.",
      value: 3
    }
  ],
  additional_school_field_title: [
    {
      name: "maxLength",
      message: "Title contain no more than 100 characters.",
      value: 100
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ],
  additional_school_dropdown_name: [
    {
      name: "maxLength",
      message: "Additional school contain no more than 200 characters.",
      value: 200
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  disclaimer_email: [
    {
      name: "email",
      message: "Please provide a valid email.",
      strictMode: true,
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
    }
  ],
  warranty_title: [
    {
      name: "maxLength",
      message: "Title contain no more than 100 characters.",
      value: 100
    },
    {
      name: "minLength",
      message: "Title should contain at least 10 characters.",
      value: 10
    }
  ],
  protective_case_title: [
    {
      name: "maxLength",
      message: "Title contain no more than 100 characters.",
      value: 100
    },
    {
      name: "minLength",
      message: "Title should contain at least 10 characters.",
      value: 10
    }
  ],
  stylus_pen_title: [
    {
      name: "maxLength",
      message: "Title contain no more than 100 characters.",
      value: 100
    },
    {
      name: "minLength",
      message: "Title should contain at least 10 characters.",
      value: 10
    }
  ],
  checkout_content: [
    {
      name: "maxLength",
      message: "Title contain no more than 1000 characters.",
      value: 1000
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ],
  no_protection_description: [
    {
      name: "maxLength",
      message: "Title contain no more than 1000 characters.",
      value: 1000
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ],
  finance_content: [
    {
      name: "maxLength",
      message: "Title contain no more than 1000 characters.",
      value: 1000
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 3
    }
  ]
};

export const quoteEmailRules = {
  to_email: [
    {
      name: "required",
      message: "Please enter a email."
    }
  ],
  from_email: [
    {
      name: "required",
      message: "Please enter a email."
    }
  ],
  email_content: [
    {
      name: "required",
      message: "Please enter a email body."
    }
  ]
};

export const statementCreationRules = {
  user_id: [
    {
      name: "required",
      message: "Please select a user."
    }
  ],
  address: [
    {
      name: "required",
      message: "Please provide an address."
    },
    {
      name: "maxLength",
      message: "Address should contain no more than 250 characters.",
      value: 250
    },
    {
      name: "minLength",
      message: "Address should contain at least 5 characters.",
      value: 5
    }
  ],
  directDebitAmount: [
    {
      name: "currency",
      message: "Please enter a numeric value."
    },
    {
      name: "minValue",
      value: 0,
      message: "Please provide a valid value."
    }
  ],
  transaction_details: {
    description: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "maxLength",
        message: "Description should contain no more than 250 characters.",
        value: 250
      },
      {
        name: "minLength",
        message: "Description should contain at least 5 characters.",
        value: 5
      }
    ],
    transaction_value: [
      {
        name: "required",
        message: "This field is required."
      },
      {
        name: "currency",
        message: "Please enter a numeric value."
      },
      {
        name: "minValue",
        value: 0,
        message: "Please provide a valid rate."
      }
    ]
  }
};

export const contentRules = {
  title: [
    {
      name: "required",
      message: "Please provide a title."
    },
    {
      name: "maxLength",
      message: "Title should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Title should contain at least 3 characters.",
      value: 1
    }
  ],
  status: [
    {
      name: "required",
      message: "Please select a status."
    }
  ],
  isPublish: [
    {
      name: "required",
      message: "Please select content publish status."
    }
  ],
  content: [
    {
      name: "required",
      message: "Please provide content."
    },
    {
      name: "maxLength",
      message: "Content should contain no more than 200 characters.",
      value: 200
    },
    {
      name: "minLength",
      message: "Content should contain at least 5 characters.",
      value: 5
    }
  ]
};

export const modalityRules = {
  name: [
    {
      name: "required",
      message: "Please provide a modality name."
    },
    {
      name: "maxLength",
      message: "Name should contain no more than 50 characters.",
      value: 50
    },
    {
      name: "minLength",
      message: "Name should contain at least 3 characters.",
      value: 3
    }
  ],
  status: [
    {
      name: "required",
      message: "Please select a status."
    }
  ],
  description: [
    {
      name: "required",
      message: "Please provide a description."
    },
    {
      name: "maxLength",
      message: "Description should contain no more than 300 characters.",
      value: 300
    },
    {
      name: "minLength",
      message: "Description should contain at least 5 characters.",
      value: 5
    }
  ],
  iconUrl: [
    {
      name: "pattern",
      message: "Please provide a valid URL.",
      value:
        /^(https?:\/\/)([\da-z.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?.*\.(jpg|jpeg|png|svg|webp)$/i
    }
  ]
};
