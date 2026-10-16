const getTemplateOne = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let ipt = "";
  let total = "";
  let reference = "";

  for (let word of words) {
    if (word === "INVOICE" && words[i + 1] === "NO:") {
      invoiceNumber = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "INVOICE" && words[i + 1] === "AMOUNT") {
      subTotal = words[i + 8].replace(/Â£/g, "");
    }

    if (word === "IPT:") {
      ipt = words[i + 5].replace(/Â£/g, "");
    }

    if (word === "TOTAL" && words[i + 1] === "AMOUNT") {
      total = words[i + 5].replace(/Â£/g, "");
    }

    if (word === "REFERENCE:" && words[i + 1] === "PO" && words[i + 2]) {
      reference = words[i + 4].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    ipt: ipt ? ipt : details.ipt,
    total: total ? total : details.total,
    reference: reference ? reference : details.reference
  };
};

const getTemplateTwo = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let total = "";
  let vat = "";
  let totalPaid = "";
  let totalDue = "";
  let reference = "";

  for (let word of words) {
    if (word === "INVOICE") {
      invoiceNumber = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Sub" && words[i + 1] === "Total:") {
      subTotal = words[i - 1].replace(/Â/g, "");
    }

    if (word === "VAT:") {
      vat = words[i + 2].replace(/Â/g, "");
    }

    if (word === "Total:" && words[i + 1] === "Paid") {
      total = words[i - 2].replace(/Â/g, "");
    }

    if (word === "Paid" && words[i + 2] === "Date:") {
      totalPaid = words[i + 5].replace(/Â/g, "");
    }

    if (word === "Total" && words[i + 1] === "Due:") {
      totalDue = words[i + 3].replace(/Â/g, "");
    }

    if (word === "PO" && words[i + 1] === "No:") {
      reference = words[i + 9].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    total: total ? total : details.total,
    vat: vat ? vat : details.vat,
    totalPaid: totalPaid ? totalPaid : details.totalPaid,
    totalDue: totalDue ? totalDue : details.totalDue,
    reference: reference ? reference : details.reference
  };
};

const getTemplateThree = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let total = "";
  let vat = "";
  let totalPaid = "";
  let totalDue = "";
  let freight = "";
  let otherCharges = "";
  let reference = "";

  for (let word of words) {
    if (word === "Invoice") {
      invoiceNumber = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Net" && words[i + 1] === "Total") {
      subTotal = words[i + 12].replace(/Â/g, "");
    }

    if (word === "Freight" && words[i + 1] === "Misc.") {
      freight = words[i + 11].replace(/Â/g, "");
    }

    if (word === "Misc." && words[i + 1] === "Charges") {
      otherCharges = words[i + 11].replace(/Â/g, "");
    }

    if (word === "VAT" && words[i + 1] === "Total") {
      vat = words[i + 10].replace(/Â/g, "");
    }

    if (word === "Total" && words[i + 1] === "Amount") {
      total = words[i + 10].replace(/Â/g, "");
    }

    if (word === "Amount" && words[i + 1] === "Paid") {
      totalPaid = words[i + 10].replace(/Â/g, "");
    }

    if (word === "Balance" && words[i + 1] === "Due") {
      totalDue = words[i + 9].replace(/Â/g, "");
    }

    if (word === "PO" && words[i + 1] === "No.") {
      reference = words[i + 13].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    total: total ? total : details.total,
    vat: vat ? vat : details.vat,
    totalPaid: totalPaid ? totalPaid : details.totalPaid,
    totalDue: totalDue ? totalDue : details.totalDue,
    freight: freight ? freight : details.freight,
    otherCharges: otherCharges ? otherCharges : details.otherCharges,
    reference: reference ? reference : details.reference
  };
};

const getTemplateFour = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let vatTotal = "";
  let total = "";
  let reference = "";

  for (let word of words) {
    if (word === "Invoice" && words[i + 1] === "No.") {
      invoiceNumber = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "Net" && words[i + 1] === "Total") {
      subTotal = words[i + 7].replace(/Â£/g, "");
    }

    if (word === "VAT" && words[i + 1] === "Total(£)") {
      vatTotal = words[i + 5].replace(/Â£/g, "");
    }

    if (word === "Total" && words[i + 1] === "(£)") {
      total = words[i + 4].replace(/Â£/g, "");
    }

    if (word === "Reference:") {
      reference = words[i + 1].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    vatTotal: vatTotal ? vatTotal : details.vatTotal,
    total: total ? total : details.total,
    reference: reference ? reference : details.reference
  };
};

const getTemplateFive = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let net = "";
  let deliveryCharge = "";
  let subTotal = "";
  let vat = "";
  let total = "";
  let reference = "";

  for (let word of words) {
    if (
      word === "I" &&
      words[i + 1] === "n" &&
      words[i + 2] === "v" &&
      words[i + 3] === "o" &&
      words[i + 4] === "i" &&
      words[i + 5] === "c" &&
      words[i + 6] === "e"
    ) {
      invoiceNumber = words[i + 7].replace(/Â£/g, "");
    }

    if (word === "Net") {
      net = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Delivery" && words[i + 1] === "Charge") {
      deliveryCharge = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "Subtotal") {
      subTotal = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "VAT") {
      vat = words[i + 1].replace(/Â£/g, "");
    }

    if (
      word === "Total" &&
      words[i + 1] === "Invoice" &&
      words[i + 2] === "Amount"
    ) {
      total = words[i + 3].replace(/Â£/g, "");
    }

    if (word === "Your" && words[i + 1] === "Order" && words[i + 3] === "Ref") {
      reference = words[i + 13].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    net: net ? net : details.net,
    deliveryCharge: deliveryCharge ? deliveryCharge : details.deliveryCharge,
    subTotal: subTotal ? subTotal : details.subTotal,
    vat: vat ? vat : details.vat,
    total: total ? total : details.total,
    reference: reference ? reference : details.reference
  };
};

const getTemplateSix = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let vatTotal = "";
  let total = "";
  let reference = "";

  for (let word of words) {
    if (
      word === "Our" &&
      words[i + 1] === "Invoice" &&
      words[i + 2] === "Number"
    ) {
      invoiceNumber = words[i + 3].replace(/Â£/g, "");
    }

    if (word === "TOTAL" && words[i + 1] === "Net") {
      subTotal = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "VAT" && words[i - 2] === "Net" && words[i - 3] === "TOTAL") {
      vatTotal = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Gross") {
      total = words[i + 1].replace(/Â£/g, "");
    }

    if (
      word === "Your" &&
      words[i + 1] === "Order" &&
      words[i + 2] === "No" &&
      words[i + 3] === "PO"
    ) {
      reference = words[i + 4].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    vatTotal: vatTotal ? vatTotal : details.vatTotal,
    total: total ? total : details.total,
    reference: reference ? reference : details.reference
  };
};

const getTemplateSeven = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let vatTotal = "";
  let total = "";
  let reference = "";

  for (let word of words) {
    if (word === "Invoice" && words[i + 1] === "No.") {
      invoiceNumber = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "SUBTOTAL") {
      subTotal = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "VAT" && words[i + 1] === "TOTAL") {
      vatTotal = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "TOTAL") {
      total = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Your" && words[i + 1] === "Reference:") {
      reference = words[i + 2].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    vatTotal: vatTotal ? vatTotal : details.vatTotal,
    total: total ? total : details.total,
    reference: reference ? reference : details.reference
  };
};

const getTemplateEight = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let vatTotal = "";
  let total = "";
  let drcv = "";
  let reference = "";

  for (let word of words) {
    if (word === "Invoice" && words[i - 34] === "Number") {
      invoiceNumber = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Net" && words[i + 1] === "£") {
      subTotal = words[i + 6].replace(/Â£/g, "");
    }

    if (word === "VAT" && words[i + 1] === "£") {
      vatTotal = words[i + 5].replace(/Â£/g, "");
    }

    if (word === "DRCV") {
      drcv = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "Total" && words[i + 1] === "£") {
      total = words[i + 4].replace(/Â£/g, "");
    }

    if (word === "Your" && words[i + 1] === "Ref") {
      reference = words[i + 3].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    vatTotal: vatTotal ? vatTotal : details.vatTotal,
    total: total ? total : details.total,
    drcv: drcv ? drcv : details.drcv,
    reference: reference ? reference : details.reference
  };
};

const getTemplateNine = (words, details) => {
  let i = 0;
  let invoiceNumber = "";
  let subTotal = "";
  let vatTotal = "";
  let total = "";
  let reference = "";

  for (let word of words) {
    // console.log(i, "word", word);
    if (word === "Invoice" && words[i + 1] === "Number") {
      invoiceNumber = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "Subtotal") {
      subTotal = words[i + 1].replace(/Â£/g, "");
    }

    if (word === "TOTAL" && words[i + 1] === "VAT") {
      vatTotal = words[i + 3].replace(/Â£/g, "");
    }

    if (word === "TOTAL" && words[i + 1] === "GBP") {
      total = words[i + 2].replace(/Â£/g, "");
    }

    if (word === "S/N:") {
      reference = words[i + 2].replace(/Â£/g, "");
    }

    i++;
  }

  return {
    invoiceNumber: invoiceNumber ? invoiceNumber : details.invoiceNumber,
    subTotal: subTotal ? subTotal : details.subTotal,
    vatTotal: vatTotal ? vatTotal : details.vatTotal,
    total: total ? total : details.total,
    reference: reference ? reference : details.reference
  };
};

// Function to extract invoice number and total from PDF text
export function extractInvoiceInfo(text, templateType, details) {
  // const regexInvoice = /Invoice\s?#?\s?(\d+)/i; // Regular expression to match invoice number

  // const invoiceNumberMatch = text.match(regexInvoice);

  // let invoiceNumber = "";

  // if (invoiceNumberMatch) {
  //   invoiceNumber = invoiceNumberMatch[1];
  // } else {
  //   const invoiceRegexAlt = /INVOICE\s*NO\s*:\s*(\d+)/i;
  //   const matchAlt = text.match(invoiceRegexAlt);
  //   if (matchAlt) {
  //     invoiceNumber = matchAlt[1];
  //   } else {
  //     const invoiceRegexAlt = /Invoice\s*No.\s*:\s*(\d+)/i;
  //     const matchAlt = text.match(invoiceRegexAlt);

  //     if (matchAlt) {
  //       invoiceNumber = matchAlt[1];
  //     }
  //   }
  // }

  const words = text.split(/\s+/);
  let otherDetails = {};

  if (templateType == "1") {
    otherDetails = getTemplateOne(words, details);
  } else if (templateType == "2") {
    otherDetails = getTemplateTwo(words, details);
  } else if (templateType == "3") {
    otherDetails = getTemplateThree(words, details);
  } else if (templateType == "4") {
    otherDetails = getTemplateFour(words, details);
  } else if (templateType == "5") {
    otherDetails = getTemplateFive(words, details);
  } else if (templateType == "6") {
    otherDetails = getTemplateSix(words, details);
  } else if (templateType == "7") {
    otherDetails = getTemplateSeven(words, details);
  } else if (templateType == "8") {
    otherDetails = getTemplateEight(words, details);
  } else if (templateType == "9") {
    otherDetails = getTemplateNine(words, details);
  }

  return {
    // invoiceNumber,
    ...otherDetails
  };
}
