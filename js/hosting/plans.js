const CHAT_BOT_NAME = process.env.CHAT_BOT_NAME

const plans = {
  starterPlan: {
    name: 'Starter Plan',
    storage: '10 GB SSD',
    bandwidth: '100 GB',
    domains: '1 domain',
    emailAccounts: '5 email accounts',
    databases: '1 MySQL database',
    price: 10.0,
    idealFor: 'Personal blogs, small business websites, or portfolios',
  },
  businessPlan: {
    name: 'Business Plan',
    storage: '50 GB SSD',
    bandwidth: '200 GB',
    domains: '5 domains',
    emailAccounts: '20 email accounts',
    databases: '5 MySQL databases',
    price: 20.0,
    idealFor: 'Business websites, larger projects',
  },
  proPlan: {
    name: 'Pro Plan',
    storage: '100 GB SSD',
    bandwidth: '500 GB',
    domains: '10 domains',
    emailAccounts: '50 email accounts',
    databases: '10 MySQL databases',
    price: 50.0,
    idealFor: 'E-commerce sites, high-traffic websites',
  },
}

const generatePlanText = planKey => {
  const plan = plans[planKey]
  return `
🚀 <b>${plan.name}:</b>
<b>- Storage:</b> ${plan.storage}
<b>- Bandwidth:</b> ${plan.bandwidth}
<b>- Domains:</b> ${plan.domains}
<b>- Email Accounts:</b> ${plan.emailAccounts}
<b>- Databases:</b> ${plan.databases}
<b>- Free SSL:</b> Yes
<b>- Firewall Rules:</b> Country, IP, Device
<b>- cPanel Features:</b> Full access to cPanel for managing files, database & emails, etc.
<b>- Ideal for:</b> ${plan.idealFor}`
}

const generatePlanStepText = step => {
  const commonSteps = {
    buyText: 'Great choice! Do you need a new domain or want to use an existing one?',
    registerNewDomainText: 'Please enter the domain name you want to register (e.g., example.com).',
    domainNotFound:
      'The domain you entered could not be found. Please ensure the right domain or try using a different one.',
    useExistingDomainText: 'Please enter your existing domain name (e.g., example.com).',
    useExistingDomainNotFound:
      'The domain you entered is not associated with your account. Please ensure you are using the correct domain or contact support for assistance.',
    enterYourEmail: 'Please provide your email address to create your account and send your receipt.',
    invalidEmail: 'Please provide a valid email',
    paymentConfirmation: 'Please confirm the transaction to proceed with your purchase.',
    paymentSuccess: `Payment successful. Thank you!,
    Check your email for details.
    Best regards!
    ${CHAT_BOT_NAME}`,
    paymentFailed: 'Payment failed. Please try again.',
  }

  return `${commonSteps[step]}`
}

const generateDomainFoundText = (websiteName, price) =>
  `The domain ${websiteName} is available!. The cost is $${price}.`
const generateExistingDomainText = websiteName => `You have selected ${websiteName} as your domain.`
const confirmEmailBeforeProceeding = email => `Are you sure you want to proceed with this ${email} email?`

const generateInvoiceText = payload => `
<b>Domain Registration</b>
<b>- Domain: </b> ${payload.domainName}
<b>- Price: </b> $${payload?.existingDomain ? '0 (using existing domain)' : payload.domainPrice}
${payload.existingDomain ? `
<b>Nameservers</b>
  - ns1.priv.host
  - ns2.priv.host
` : ''}
<b>Web Hosting</b>
<b>- Duration: </b> 1 Month
<b>- Price: </b> $${payload.hostingPrice}

<b>Total Amount Due:</b>
<b>- Coupon Discount: </b> $${payload.couponDiscount}
<b>- USD: </b> $${payload?.couponApplied ? payload.newPrice : payload.totalPrice}
<b>- Tax: </b> $0.00

<b>Payment Terms</b>
This is a prepayment invoice. Please ensure payment is completed within 1 hr to activate your domain and hosting services. Once payment is received, we will proceed with the activation of your service.
`

const showCryptoPaymentInfo = (priceCrypto, tickerView, address, plan) => `
Please remit ${priceCrypto} ${tickerView} to

<code>${address}</code>

Please note, crypto transactions can take up to 30 minutes to complete. Once the transaction has been confirmed, you will be promptly notified, and your ${plan} will be seamlessly activated.

Best regards,
${CHAT_BOT_NAME}`

module.exports = {
  generatePlanText,
  generatePlanStepText,
  generateDomainFoundText,
  generateExistingDomainText,
  generateInvoiceText,
  confirmEmailBeforeProceeding,
  showCryptoPaymentInfo,
}
