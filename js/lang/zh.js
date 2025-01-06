const { areasOfCountry, carriersOf, countryCodeOf } = require('../areasOfCountry')

const format = (cc, n) => `+${cc}(${n.toString().padStart(2, '0')})`

/* global process */
require('dotenv').config()
const HIDE_BANK_PAYMENT = process.env.HIDE_BANK_PAYMENT
const SELF_URL = process.env.SELF_URL
const FREE_LINKS = Number(process.env.FREE_LINKS)
const SUPPORT_USERNAME = process.env.SUPPORT_USERNAME

const HIDE_SMS_APP = process.env.HIDE_SMS_APP
const HIDE_BECOME_RESELLER = process.env.HIDE_BECOME_RESELLER
const TG_HANDLE = process.env.TG_HANDLE
const TG_CHANNEL = process.env.TG_CHANNEL
const SMS_APP_NAME = process.env.SMS_APP_NAME
const SMS_APP_LINK = process.env.SMS_APP_LINK
const CHAT_BOT_NAME = process.env.CHAT_BOT_NAME
const CHAT_BOT_BRAND = process.env.CHAT_BOT_BRAND
const SUPPORT_HANDLE = process.env.SUPPORT_HANDLE

const PRICE_DAILY = Number(process.env.PRICE_DAILY_SUBSCRIPTION)
const PRICE_WEEKLY = Number(process.env.PRICE_WEEKLY_SUBSCRIPTION)
const PRICE_MONTHLY = Number(process.env.PRICE_MONTHLY_SUBSCRIPTION)
const DAILY_PLAN_FREE_DOMAINS = Number(process.env.DAILY_PLAN_FREE_DOMAINS)
const WEEKLY_PLAN_FREE_DOMAINS = Number(process.env.WEEKLY_PLAN_FREE_DOMAINS)
const FREE_LINKS_HOURS = Number(process.env.FREE_LINKS_TIME_SECONDS) / 60 / 60
const MONTHLY_PLAN_FREE_DOMAINS = Number(process.env.MONTHLY_PLAN_FREE_DOMAINS)
const APP_SUPPORT_LINK = process.env.APP_SUPPORT_LINK

const HOSTING_STARTER_PLAN_PRICE = parseFloat(process.env.HOSTING_STARTER_PLAN_PRICE)
const HOSTING_PRO_PLAN_PRICE = parseFloat(process.env.HOSTING_PRO_PLAN_PRICE)
const HOSTING_BUSINESS_PLAN_PRICE = parseFloat(process.env.HOSTING_BUSINESS_PLAN_PRICE)

const npl = {
  // New Zealand
  Spark: ['Spark'],
  Vocus: ['Vocus'],
  '2Degrees/Voyager': ['Voyager'],
  'Skinny Mobile': ['Skinny Mobile'],
  // Australia
  Telstra: ['Telstra'],
  Optus: ['Optus'],
  Vodafone: ['VODAFONE', 'Vodafone'],
  // UK
  EE: ['EE'],
  Three: ['Three'],
  'Virgin/O2': ['Virgin'],
}

const alcazar = {
  'T-mobile': ['T-MOBILE', 'OMNIPOINT', 'METROPCS', 'SPRINT', 'AERIAL'],
  'Metro PCS': ['T-MOBILE', 'OMNIPOINT', 'METROPCS', 'SPRINT', 'AERIAL'],
  Sprint: ['T-MOBILE', 'OMNIPOINT', 'METROPCS', 'SPRINT', 'AERIAL'],
  'Verizon Wireless': ['CELLCO', 'ONVOY'],
  'AT&T': ['CINGULAR'],
}

// Note: these button labels must not mix with each other, other wise it may mess up bot
const admin = {
  viewAnalytics: '📊 查看分析',
  viewUsers: '👀 查看用户',
  blockUser: '✋ 阻止用户',
  unblockUser: '👌 解除阻止用户',
  messageUsers: '👋 向所有用户发送消息',
}
const user = {
  // main keyboards
  cPanelWebHostingPlans: '私人 cPanel 主机计划 🔒',
  pleskWebHostingPlans: '私人 Plesk 主机计划 🔒',
  joinChannel: '📢 加入频道',
  phoneNumberLeads: '📲 HQ 短信线索',
  wallet: '👛 我的钱包',
  urlShortenerMain: '🔗✂️ URL 缩短器',
  buyPlan: '🔔 订阅这里',
  domainNames: '🌐 域名',
  viewPlan: '🔔 我的计划',
  becomeReseller: '💼 成为代理商',
  getSupport: '💬 获取支持',
  freeTrialAvailable: '📧🆓 BulkSMS - 免费试用',
  changeSetting: '🌍 更改设置',

  // Sub Menu 1: urlShortenerMain
  redSelectUrl: '🔀✂️ 重定向并缩短',
  urlShortener: '✂️🌐 自定义域名缩短器',
  viewShortLinks: '📊 查看短链接分析',

  // Sub Menu 2: domainNames
  buyDomainName: '🛒🌐 购买域名',
  viewDomainNames: '📂 我的域名',
  dnsManagement: '🔧 DNS 管理',

  // Sub Menu 3: cPanel/Plesk WebHostingPlansMain
  freeTrial: '💡 免费试用',
  starterPlan: '🔼 初级计划',
  proPlan: '🔷 专业计划',
  businessPlan: '👑 商业计划',
  contactSupport: '📞 联系支持',

  // Free Trial
  freeTrialMenuButton: '🚀 免费试用（12小时）',
  getFreeTrialPlanNow: '🛒 立即获取试用计划',
  continueWithDomainNameSBS: websiteName => `➡️ 继续使用 ${websiteName}`,
  searchAnotherDomain: '🔍 搜索其他域名',
  privHostNS: '🏢 PrivHost（快速安全的主机）',
  cloudflareNS: '🛡️ Cloudflare 防护（安全和隐私）',
  backToFreeTrial: '⬅️ 返回免费试用',

  // Paid Plans
  buyStarterPlan: '🛒 购买初级计划',
  buyProPlan: '🛒 购买专业计划',
  buyBusinessPlan: '🛒 购买商业计划',
  viewStarterPlan: '🔷 查看初级计划',
  viewProPlan: '🔼 查看专业计划',
  viewBusinessPlan: '👑 查看商业计划',
  backToHostingPlans: '⬅️ 返回主机计划',
  registerANewDomain: '🌐 注册新域名',
  useExistingDomain: '🔄 使用现有域名',
  backToStarterPlanDetails: '⬅️ 返回初级计划详情',
  backToProPlanDetails: '⬅️ 返回专业计划详情',
  backToBusinessPlanDetails: '⬅️ 返回商业计划详情',
  continueWithDomain: websiteName => `➡️ 继续使用 ${websiteName}`,
  enterAnotherDomain: '🔍 输入另一个域名',
  backToPurchaseOptions: '⬅️ 返回购买选项',
}

const u = {
  // other key boards
  deposit: '➕💵 存款',
  withdraw: '➖💵 撤回',

  // wallet
  usd: '美元',
  ngn: 'NGN',
}
const view = num => Number(num).toFixed(2)
const yesNo = ['是', '否']

const bal = (usd, ngn) =>
  HIDE_BANK_PAYMENT !== 'true'
    ? `$${view(usd)}
₦${view(ngn)}`
    : `$${view(usd)}`

const t = {
  yes: '是',
  no: '否',
  back: '返回',
  cancel: '取消',
  skip: '跳过',
  becomeReseller: `你好，

我联系您是为了向您提供一个绝佳的机会，成为${CHAT_BOT_BRAND}Bot强大SMS营销和托管软件的经销商。
  
关键细节：
  
利润分成：每笔销售可赚取65/35%的竞争性分成。
  
设置费用：详情请联系支持。
  
感兴趣？请通过${SUPPORT_HANDLE}与我们联系，以了解更多有关此盈利合作的信息。
  
期待与您合作！
  
最好的祝福，
  
${CHAT_BOT_BRAND}团队
  `,
  resetLoginAdmit: `${CHAT_BOT_BRAND} SMS: 您已成功退出您之前的设备。请立即登录。`,
  resetLoginDeny: '好的，不需要进一步操作。',
  resetLogin: `${CHAT_BOT_BRAND} SMS: 您是否试图从之前的设备上注销？`,
  select: `请选择一个选项：`,

  // cPanel/Plesk Plans initial select plan text
  selectPlan: `请选择一个计划：`,
  backButton: '⬅️ 返回',
  yesProceedWithThisEmail: email => `➡️ 使用 ${email} 继续`,
  proceedWithPayment: '➡️ 继续付款',
  iHaveSentThePayment: `我已发送付款 ✅`,
  trialAlreadyUsed: `您已经使用了您的免费试用。如果您需要更多的访问权限，请考虑订阅我们的付费计划之一。`,
  oneHourLeftToExpireTrialPlan: `您的 Freedom 计划将在 1 小时后到期。如果您想继续使用我们的服务，请考虑升级到付费计划！`,
  freePlanExpired: `🚫 您的 Freedom 计划已过期。希望您享受了试用期！要继续使用我们的服务，请购买我们的高级计划之一。`,
  freeTrialPlanSelected: hostingType => `
- 免费试用我们的 <b>Freedom 计划</b>！此计划包括一个以 .sbs 结尾的免费域名，有效期为 12 小时。

🚀 <b>Freedom 计划：</b>
<b>- 存储：</b> 1 GB SSD
<b>- 带宽：</b> 10 GB
<b>- 域名：</b> 1 个免费的 .sbs 域名
<b>- 邮箱账户：</b> 1 个邮箱账户
<b>- 数据库：</b> 1 个 MySQL 数据库
<b>- 免费 SSL：</b> 是
<b>- ${hostingType} 功能：</b> 完全访问 ${hostingType}，用于管理文件、数据库和邮箱等。
<b>- 时长：</b> 有效期 12 小时
<b>- 适合：</b> 测试和短期项目。
  `,
  getFreeTrialPlan: `请输入您想要的域名（例如：example.sbs）并将其作为消息发送。此域名以 .sbs 结尾，并且在您的试用计划中免费提供。`,
  trialPlanContinueWithDomainNameSBSMatched: websiteName => `域名 ${websiteName} 可用！`,
  trialPlanSBSDomainNotMatched: `您输入的域名未找到。请确保域名正确或尝试使用其他域名。`,
  trialPlanSBSDomainIsPremium: `此域名为高级价格，仅适用于付费计划。请搜索其他域名。`,
  trialPlanGetNowInvalidDomain: `请输入有效的域名，必须以 '.sbs' 结尾。域名应类似于 'example.sbs'，并且在您的试用计划中免费提供。`,
  trialPlanNameserverSelection: websiteName => `请选择您希望为 ${websiteName} 使用的名称服务器提供商。`,
  trialPlanDomainNameMatched: `请提供您的电子邮件地址以创建您的账户并发送您的收据。`,
  confirmEmailBeforeProceedingSBS: email => `您确定要使用此电子邮件 ${email} 订阅 Freedom 计划吗？`,
  trialPlanInValidEmail: `请输入有效的电子邮件。`,
  trialPlanActivationConfirmation: `谢谢！您的免费试用计划将很快激活。请注意，此计划仅在 12 小时内有效。`,
  trialPlanActivationInProgress: `您的免费试用计划正在激活。这可能需要一些时间……`,

  what: `请从键盘中选择一个选项。`,
  whatNum: `请选择一个有效的数字。`,
  phoneGenTimeout: `超时。`,
  phoneGenNoGoodHits: `请联系支持 ${SUPPORT_HANDLE} 或选择其他区号。`,

  subscribeRCS: p => `已订阅！随时通过点击<a href="${SELF_URL}/unsubscribe?a=b&Phone=${p}">链接</a>取消订阅。`,
  unsubscribeRCS: p => `您已取消订阅！要重新订阅，请点击<a href="${SELF_URL}/subscribe?a=b&Phone=${p}">链接</a>。`,
  argsErr: `开发：发送了错误的参数。`,
  showDepositNgnInfo:
    ngn => `请通过点击下方的“付款”按钮汇款 ${ngn} NGN。一旦交易确认，您将立即收到通知，并且您的钱包将更新。

此致,  
${CHAT_BOT_NAME}`,
  askEmail: `请提供用于支付确认的电子邮件。`,
  askValidAmount: '请提供一个有效的数字。',
  askValidEmail: '请提供一个有效的电子邮件。',
  askValidCrypto: '请选择一种有效的加密货币。',
  askValidPayOption: '请选择一个有效的支付选项。',
  chooseSubscription:
    HIDE_SMS_APP === 'true'
      ? `<b>通过我们的订阅计划提升您的品牌！</b>

- <b>每日:</b> $${PRICE_DAILY} 包含 ${DAILY_PLAN_FREE_DOMAINS} 个免费的 ".sbs" 域名，无限的 URL 缩短器。  
- <b>每周:</b> $${PRICE_WEEKLY} 包含 ${WEEKLY_PLAN_FREE_DOMAINS} 个免费的 ".sbs" 域名，无限的 URL 缩短器。  
- <b>每月:</b> $${PRICE_MONTHLY} 包含 ${MONTHLY_PLAN_FREE_DOMAINS} 个免费的 ".sbs" 域名，无限的 URL 缩短器。  

（仅适用于 ".sbs" 域名。）`
      : `<b>通过我们的订阅计划提升您的品牌！</b>

- <b>每日:</b> $${PRICE_DAILY} 包含 ${DAILY_PLAN_FREE_DOMAINS} 个免费的 ".sbs" 域名，无限的 URL 缩短器和无限的 BulkSMS。  
- <b>每周:</b> $${PRICE_WEEKLY} 包含 ${WEEKLY_PLAN_FREE_DOMAINS} 个免费的 ".sbs" 域名，无限的 URL 缩短器和无限的 BulkSMS。  
- <b>每月:</b> $${PRICE_MONTHLY} 包含 ${MONTHLY_PLAN_FREE_DOMAINS} 个免费的 ".sbs" 域名，无限的 URL 缩短器和无限的 BulkSMS。  

（仅适用于 ".sbs" 域名。）`,

  askCoupon: usd => `价格是 $${usd}。您是否想使用优惠券代码？如果有，请立即输入。否则，您可以按“跳过”。`,
  planAskCoupon: `您是否想使用优惠券代码？如果有，请立即输入。否则，您可以按“跳过”。`,
  enterCoupon: `请输入优惠券代码：`,
  planPrice: (plan, price) => `${plan} 订阅的价格是 $${price}。请选择支付方式。`,
  planNewPrice: (plan, price, newPrice) =>
    `${plan} 订阅的价格现在是 $${view(newPrice)} <s>($${price})</s>。请选择支付方式。`,
  domainPrice: (domain, price) => `${domain} 域名的价格是 $${price} USD。请选择支付方式。`,
  domainNewPrice: (domain, price, newPrice) =>
    `${domain} 域名的价格现在是 $${view(newPrice)} <s>($${price})</s>。请选择支付方式。`,
  couponInvalid: `优惠券代码无效，请重新输入：`,
  lowPrice: `提供的价格低于所需金额。`,
  freeTrialAvailable: `您的 BulkSMS 免费试用现已启用。请在此处下载 ${SMS_APP_NAME} 安卓应用程序：${SMS_APP_LINK}。需要 E-sim 卡吗？请联系 ${SUPPORT_HANDLE}。`,
  freeTrialNotAvailable: `您已使用过免费试用。`,
  planSubscribed:
    HIDE_SMS_APP === 'true'
      ? `您已成功订阅 {{plan}} 计划。享受我们的 URL 缩短工具和 ${SMS_APP_NAME}。需要 E-sim 卡吗？请联系 ${SUPPORT_HANDLE}。`
      : `您已成功订阅 {{plan}} 计划。享受我们的 URL 缩短工具和 ${SMS_APP_NAME}。请在此处下载应用程序：${SMS_APP_LINK}。需要 E-sim 卡吗？请联系 ${SUPPORT_HANDLE}。`,
  alreadySubscribedPlan: days => `您的订阅已激活，并将在 ${days} 天后到期。`,
  payError: `未找到支付会话，请重试或联系支持 ${SUPPORT_USERNAME}。了解更多信息，请访问 ${TG_HANDLE}。`,
  chooseFreeDomainText: `<b>好消息！</b> 此域名可随您的订阅免费提供。您想领取吗？`,

  chooseDomainToBuy: text => `<b>获取你的网络角落！</b> 请分享你希望购买的域名，例如“abcpay.com”。${text}`,
  askDomainToUseWithShortener: `你是否希望使用此域名进行链接简化？`,
  blockUser: `请分享需要被封锁的用户的用户名。`,
  unblockUser: `请分享需要解封的用户的用户名。`,
  blockedUser: `你目前被封锁，无法使用机器人。请联系支持 ${SUPPORT_USERNAME}。更多信息 ${TG_HANDLE}。`,
  greet: `请留意这个空间！我们正在准备推出一个将使您的链接简短、清晰和直观的URL简化应用程序。请关注我们的大揭示！

支持 ${SUPPORT_USERNAME} 在Telegram中。`,
  linkExpired: `您的 ${CHAT_BOT_BRAND} 测试期已结束，您的短链接已停用。我们邀请您订阅以继续访问我们的URL服务和免费域名。选择适当的计划并按照说明订阅。请联系我们的任何问题。
敬启者，
${CHAT_BOT_BRAND}团队
了解更多： ${TG_CHANNEL}`,
  successPayment: `支付成功处理！现在可以关闭此窗口。`,
  welcome: `感谢选择 ${CHAT_BOT_NAME}！请在下面选择一个选项：`,
  welcomeFreeTrial: `${CHAT_BOT_BRAND}欢迎您！享受我们的一次性免费试用 - 简化 ${FREE_LINKS} 个链接，有效期为 ${FREE_LINKS_HOURS} 小时。体验${CHAT_BOT_BRAND}的不同！`,
  unknownCommand: `找不到命令。按 /start 或联系支持 ${SUPPORT_USERNAME}。了解更多 ${TG_HANDLE}。`,
  support: `请联系支持 ${SUPPORT_USERNAME}。了解更多 ${TG_HANDLE}。`,
  joinChannel: `请加入频道 ${TG_CHANNEL}。`,
  dnsPropagated: `{{domain}}的DNS传播已完成，进行无限链接简化。`,
  dnsNotPropagated: `{{domain}}的DNS传播正在进行，您将会在完成后更新。 ✅`,
  domainBoughtSuccess: domain => `域名 ${domain} 现在属于您。谢谢选择我们。

敬启者，
${CHAT_BOT_NAME}`,

  domainBought: `您的域名 {{domain}} 已成功链接到您的账户，DNS传播即将完成。稍后您将自动收到更新。🚀`,
  domainLinking: domain =>
    `正在将域名与您的账户链接中。请注意，DNS更新可能需要最长 30 分钟。您可以在此处检查 DNS 更新状态：https://www.whatsmydns.net/#A/${domain}`,
  errorSavingDomain: `保存域名时出错，请联系支持 ${SUPPORT_USERNAME}。更多信息请访问 ${TG_HANDLE}。`,
  chooseDomainToManage: `请选择您要管理的域名。`,
  chooseDomainWithShortener: `请选择或购买您想要连接到短链接的域名。`,
  viewDnsRecords: `以下是 {{domain}} 的 DNS 记录`,
  addDns: `添加 DNS 记录`,
  updateDns: `更新 DNS 记录`,
  deleteDns: `删除 DNS 记录`,
  addDnsTxt: `请选择您想要添加的记录类型：`,
  updateDnsTxt: `请输入您要更新的记录 ID。例：3`,
  deleteDnsTxt: `请输入您要删除的记录 ID。例：3`,
  confirmDeleteDnsTxt: `确定吗？是或否`,
  a: `A 记录`,
  cname: `CNAME 记录`,
  ns: `NS 记录`,
  'A Record': `A 记录`,
  'CNAME Record': `CNAME 记录`,
  'NS Record': `NS 记录`,
  askDnsContent: {
    A: `请输入 A 记录。例：108.0.56.98`,
    'A Record': `请输入 A 记录。例：108.0.56.98`,
    CNAME: `请输入 CNAME 记录。例：abc.hello.org`,
    'CNAME Record': `请输入 CNAME 记录。例：abc.hello.org`,
    NS: `请输入您的 NS 记录。例：dell.ns.cloudflare.com。一个新的 NS 记录将添加到现有记录中。`,
    'NS Record': `请输入您的 NS 记录。例：dell.ns.cloudflare.com。如果 N1-N4 已存在，请更新记录。`,
  },
  askUpdateDnsContent: {
    A: `请输入 A 记录。例：108.0.56.98`,
    'A Record': `请输入 A 记录。例：108.0.56.98`,
    CNAME: `请输入 CNAME 记录。例：abc.hello.org`,
    'CNAME Record': `请输入 CNAME 记录。例：abc.hello.org`,
    NS: `一个新的 NS 记录将被更新到选定的 ID。如果要添加新记录，请选择“添加 DNS 记录”`,
    'NS Record': `一个新的 NS 记录将被更新到选定的 ID。如果要添加新记录，请选择“添加 DNS 记录”`,
  },
  dnsRecordSaved: `记录已添加`,
  dnsRecordDeleted: `记录已删除`,
  dnsRecordUpdated: `记录已更新`,
  provideLink: `请输入有效的 URL。例如：https://google.com`,
  comingSoonWithdraw: `提现即将上线。请联系支持 ${SUPPORT_USERNAME}。更多信息请访问 ${TG_HANDLE}。`,
  selectCurrencyToDeposit: `请选择要存入的货币`,
  depositNGN: `请输入 NGN 金额：`,
  askEmailForNGN: `请输入支付确认邮件`,
  depositUSD: `请输入 USD 金额，注意最小值为 $6：`,
  selectCryptoToDeposit: `请选择加密货币：`,
  'bank-pay-plan': (priceNGN, plan) =>
    `请点击“付款”按钮，发送 ${priceNGN} NGN。一旦交易确认，您将立即收到通知，您的 ${plan} 计划将顺利激活。

问候，
${CHAT_BOT_NAME}`,
  bankPayDomain: (priceNGN, domain) =>
    `请点击“付款”按钮，发送 ${priceNGN} NGN。一旦交易确认，您将立即收到通知，您的域名 ${domain} 将顺利激活。

问候，
${CHAT_BOT_NAME}`,
  showDepositCryptoInfoPlan: (priceCrypto, tickerView, address, plan) =>
    `请发送 ${priceCrypto} ${tickerView} 至\n\n<code>${address}</code>

请注意，加密货币交易可能需要最多 30 分钟完成。一旦交易确认，您将立即收到通知，您的 ${plan} 计划将顺利激活。

问候，
${CHAT_BOT_NAME}`,
  showDepositCryptoInfoDomain: (priceCrypto, tickerView, address, domain) =>
    `请发送 ${priceCrypto} ${tickerView} 至\n\n<code>${address}</code>

请注意，加密货币交易可能需要最多 30 分钟完成。一旦交易确认，您将立即收到通知，您的域名 ${domain} 将顺利激活。

问候，
${CHAT_BOT_NAME}`,

  showDepositCryptoInfo: (priceCrypto, tickerView, address) =>
    `请汇 ${priceCrypto} ${tickerView} 至\n\n<code>${address}</code>\n\n请注意，加密货币交易可能需要最多30分钟才能完成。一旦交易确认，您将立即收到通知，并且您的钱包将更新。\n\n问候,\n${CHAT_BOT_NAME}`,

  confirmationDepositMoney: (amount, usd) =>
    `您的 ${amount}（$${usd}）支付已处理。感谢您选择我们。\n问候,\n${CHAT_BOT_NAME}`,

  showWallet: (usd, ngn) => `钱包余额 :\n\n${bal(usd, ngn)}`,

  wallet: (usd, ngn) => `钱包余额 :\n\n${bal(usd, ngn)}\n\n请选择钱包选项:`,

  walletSelectCurrency: (usd, ngn) => `请选择从钱包余额中支付的货币:\n\n${bal(usd, ngn)}`,

  walletBalanceLow: `请为继续充值您的钱包`,

  sentLessMoney: (expected, got) =>
    `您发送的金额少于预期，所以我们将收到的金额存入您的钱包。我们预期 ${expected} 但收到 ${got}`,

  sentMoreMoney: (expected, got) =>
    `您发送的金额多于预期，因此我们将多余的金额存入您的钱包。我们预期 ${expected} 但收到 ${got}`,

  buyLeadsError: `抱歉，选择的区号不可用，并且您的钱包未收费`,
  buyLeadsProgress: (i, total) => `${((i * 100) / total).toFixed()}% leads 下载中。请稍候。`,

  phoneNumberLeads: `请选择一个选项`,

  buyLeadsSelectCountry: `请选择国家`,
  buyLeadsSelectSmsVoice: `请选择短信/语音`,
  buyLeadsSelectArea: `请选择区域`,
  buyLeadsSelectAreaCode: `请选择区号`,
  buyLeadsSelectCarrier: `请选择运营商`,
  buyLeadsSelectCnam: `您想查询所有者的姓名吗？CNAME 每 1000 leads 额外费用 15 美元`,
  buyLeadsSelectAmount: (min, max) => `您想购买多少 leads？选择或输入一个数量。最小值为 ${min} 最大值为 ${max}`,

  buyLeadsSelectFormat: `选择格式，例如本地 (212) 或国际 (+1212)`,

  buyLeadsSuccess: n => `恭喜，您的 ${n} leads 已下载。`,

  buyLeadsNewPrice: (leads, price, newPrice) => ` ${leads} leads 的价格现在为 $${view(newPrice)} <s>($${price})</s>`,
  buyLeadsPrice: (leads, price) => ` ${leads} leads 的价格为 $${price}。`,

  confirmNgn: (usd, ngn) => `${usd} USD ≈ ${ngn} NGN `,

  walletSelectCurrencyConfirm: `确认？`,

  validatorSelectCountry: `请选择国家`,
  validatorPhoneNumber: `请粘贴您的号码或上传包含国家代码的文件。`,
  validatorSelectSmsVoice: n => `${n} 个电话号码找到。请选择短信或语音拨号的选项。`,
  validatorSelectCarrier: `请选择运营商`,
  validatorSelectCnam: `您想查询所有者的姓名吗？CNAME 每 1000 leads 额外费用 15 美元`,
  validatorSelectAmount: (min, max) => `您想验证多少个电话号码？选择或输入一个数量。最小值为 ${min} 最大值为 ${max}`,

  validatorSelectFormat: `选择格式，例如本地 (212) 或国际 (+1212)`,

  validatorSuccess: (n, m) => `${n} 个 leads 被验证了。${m} 个有效的电话号码找到。`,
  validatorProgress: (i, total) => `${((i * 100) / total).toFixed()}% leads 验证中。请稍候。`,
  validatorProgressFull: (i, total) => `${((i * 100) / total).toFixed()}% leads 验证。`,

  validatorError: `抱歉，选择的电话号码不可用，并且您的钱包未收费`,
  validatorErrorFileData: `找到无效的国家电话号码。请上传选定国家的电话号码`,
  validatorErrorNoPhonesFound: `找不到电话号码。请重试。`,

  validatorBulkNumbersStart: `lead 验证已开始，很快就会完成。`,

  // url re-director
  redSelectUrl: `请分享您想要缩短和分析的 URL，例如 https://cnn.com`,
  redSelectRandomCustom: `请选择您的选择，随机或自定义链接`,
  redSelectProvider: `选择链接提供商`,
  redSelectCustomExt: `输入自定义后缀`,

  redValidUrl: `请提供一个有效的 URL，例如 https://google.com`,
  redTakeUrl: url => `您的缩短后的 URL 是: ${url}`,
  redIssueUrlBitly: `问题，您的钱包未收费`,
  redIssueSlugCuttly: `您选择的链接名称已被使用，请尝试另一个`,
  redIssueUrlCuttly: `问题`,
  redNewPrice: (price, newPrice) => `价格现在为 $${view(newPrice)} <s>($${price})</s>。请选择支付方式。`,
  customLink: '自定义链接',
  randomLink: '随机链接',
  askShortLinkExtension: '请告诉我们您偏好的短链接扩展名：例如 payer',
  linkAlreadyExist: `链接已存在。请键入 'ok' 尝试另一个。`,
  yourShortendUrl: shortUrl => `您的短链接是：${shortUrl}`,

  availablefreeDomain: (plan, available, s) =>
    `请记住，您的 ${plan} 计划包括 ${available} 个免费的“.sbs”域名${s}。今天就获取您的域名！`,
  shortenedUrlLink: `请分享您希望缩短和分析的URL。例如 https://cnn.com`,
  selectedTrialPlan: `您已选择免费试用计划`,
  userPressedBtn: message => `用户点击了 ${message} 按钮。`,
  userToBlock: userToBlock => `未找到用户 ${userToBlock}。`,
  userBlocked: userToBlock => `用户 ${userToBlock} 已被屏蔽。`,
  checkingDomainAvail: `检查域名可用性...`,
  checkingExistingDomainAvail: `检查现有域名的可用性...`,
  subscribeFirst: `📋 先订阅`,
  notValidHalf: `输入一个有效的后半部分`,
  linkAlreadyExist: `链接已经存在。请尝试其他。`,
  issueGettingPrice: `获取价格时遇到问题`,
  domainInvalid: `域名无效。请尝试其他域名。使用格式 abcpay.com`,
  chooseValidPlan: `请选择一个有效的计划`,
  noDomainFound: `未找到域名`,
  chooseValidDomain: `请选择一个有效的域名`,
  errorDeletingDns: error => `删除DNS记录时出错，${error}，请再次提供值`,
  selectValidOption: `选择有效选项`,
  maxDnsRecord: `最多可以添加4个NS记录，您可以更新或删除以前的NS记录`,
  errorSavingDns: error => `保存DNS记录时出错，${error}，请再次提供值`,
  fileError: `处理文件时出错。`,
  ammountIncorrect: `金额不正确`,
  subscriptionExpire: (subscribedPlan, timeEnd) => `您的 ${subscribedPlan} 订阅已过期 ${timeEnd}`,
  plansSubscripedtill: (subscribedPlan, timeEnd) =>
    `您当前订阅的是 ${subscribedPlan} 计划。您的计划有效期至 ${timeEnd}`,
  planNotSubscriped: `您当前没有任何订阅计划。`,
  noShortenedUrlLink: `您还没有缩短的链接。`,
  shortenedLinkText: linksText => `这是您的缩短链接：\n${linksText}`,

  qrCodeText: `这是您的二维码！`,
  scanQrOrUseChat: chatId => `使用短信营销应用扫描二维码登录。您也可以使用此代码登录：${chatId}`,
  domainPurchasedFailed: (domain, buyDomainError) => `域名购买失败，请尝试其他名称。 ${domain} ${buyDomainError}`,
  noDomainRegistered: '您还没有购买任何域名。',
  registeredDomainList: domainsText => `以下是您购买的域名：\n${domainsText}`,
  comingSoon: `即将推出`,
}

const phoneNumberLeads = ['💰📲 购买电话线索', '✅📲 验证电话线索']

const buyLeadsSelectCountry = Object.keys(areasOfCountry)
const buyLeadsSelectSmsVoice = ['短信 (价格为 20$/1000)', '语音 (价格为 0$/1000)']
const buyLeadsSelectArea = country => Object.keys(areasOfCountry?.[country])
const buyLeadsSelectAreaCode = (country, area) => {
  const codes = areasOfCountry?.[country]?.[area].map(c => format(countryCodeOf[country], c))
  return codes.length > 1 ? ['Mixed Area Codes'].concat(codes) : codes
}
const _buyLeadsSelectAreaCode = (country, area) => areasOfCountry?.[country]?.[area]
const buyLeadsSelectCnam = yesNo
const buyLeadsSelectCarrier = country => carriersOf[country]
const buyLeadsSelectAmount = ['1000', '2000', '3000', '4000', '5000']
const buyLeadsSelectFormat = ['本地格式', '国际格式']

const validatorSelectCountry = Object.keys(areasOfCountry)
const validatorSelectSmsVoice = ['短信 (价格为 20$/1000)', '语音 (价格为 0$/1000)']
const validatorSelectCarrier = country => carriersOf[country]
const validatorSelectCnam = yesNo
const validatorSelectAmount = ['ALL', '1000', '2000', '3000', '4000', '5000']
const validatorSelectFormat = ['本地格式', '国际格式']

const selectFormatOf = {
  '本地格式': 'Local Format',
  '国际格式': 'International Format',
}

//redSelectRandomCustom

const redSelectRandomCustom = ['随机短链接']

const redSelectProvider = ['Bit.ly $10（无试用）', 'Ap1s.net（试用后需要订阅）']

const tickerOf = {
  BTC: 'btc',
  LTC: 'ltc',
  ETH: 'eth',
  'USDT (TRC20)': 'trc20_usdt',
  BCH: 'bch',
  'USDT (ERC20)': 'erc20_usdt',
  DOGE: 'doge',
  TRON: 'trx',
  // Matic: 'polygon_matic',
}

const supportedCrypto = {
  BTC: '₿ 比特币 (BTC)',
  LTC: 'Ł 莱特币 (LTC)',
  DOGE: 'Ð 狗狗币 (DOGE)',
  BCH: 'Ƀ 比特币现金 (BCH)',
  ETH: 'Ξ 以太坊 (ETH)',
  TRON: '🌐 波场 (TRX)',
  'USDT (TRC20)': '₮ 泰达币 (USDT - TRC20)',
  'USDT (ERC20)': '₮ 泰达币 (USDT - ERC20)',
}

/////////////////////////////////////////////////////////////////////////////////////
const _bc = ['返回', '取消']

const payIn = {
  crypto: '加密货币',
  ...(HIDE_BANK_PAYMENT !== 'true' && { bank: '银行 ₦奈拉 + 卡🏦💳' }),
  wallet: '👛 钱包',
}

const tickerViews = Object.keys(tickerOf)
const reverseObject = o => Object.fromEntries(Object.entries(o).map(([key, val]) => [val, key]))
const tickerViewOf = reverseObject(tickerOf)
const supportedCryptoView = reverseObject(supportedCrypto)
const supportedCryptoViewOf = Object.keys(supportedCryptoView)

const kOf = list => ({
  reply_markup: {
    // Handle if there are multiples buttons in a row
    keyboard: [
      ...list.map(a => (Array.isArray(a) ? a : [a])),
      ...(list.some(
        a =>
          Array.isArray(a) &&
          a.some(
            item =>
              typeof item === 'string' &&
              (item.includes(t.backButton) ||
                item.includes(user.backToHostingPlans) ||
                item.includes(user.backToStarterPlanDetails) ||
                item.includes(user.backToPurchaseOptions)),
          ),
      )
        ? []
        : [_bc]),
    ],
  },
  parse_mode: 'HTML',
})
const yes_no = {
  parse_mode: 'HTML',
  reply_markup: {
    keyboard: [yesNo, _bc],
  },
  disable_web_page_preview: true,
}
const k = {
  of: kOf,

  wallet: {
    reply_markup: {
      keyboard: [[u.deposit], [u.withdraw], _bc],
    },
  },

  pay: {
    reply_markup: {
      keyboard: [Object.values(payIn), _bc],
    },
    parse_mode: 'HTML',
  },

  phoneNumberLeads: kOf(phoneNumberLeads),
  buyLeadsSelectCountry: kOf(buyLeadsSelectCountry),
  buyLeadsSelectSmsVoice: kOf(buyLeadsSelectSmsVoice),
  buyLeadsSelectArea: country => kOf(buyLeadsSelectArea(country)),
  buyLeadsSelectAreaCode: (country, area) => kOf(buyLeadsSelectAreaCode(country, area)),
  buyLeadsSelectCarrier: country => kOf(buyLeadsSelectCarrier(country)),
  buyLeadsSelectCnam: kOf(yesNo),
  buyLeadsSelectAmount: kOf(buyLeadsSelectAmount),
  buyLeadsSelectFormat: kOf(buyLeadsSelectFormat),
  // changing here for validatorSelectCountry
  validatorSelectCountry: kOf(validatorSelectCountry),
  validatorSelectSmsVoice: kOf(validatorSelectSmsVoice),
  validatorSelectCarrier: country => kOf(validatorSelectCarrier(country)),
  validatorSelectCnam: kOf(validatorSelectCnam),
  validatorSelectAmount: kOf(validatorSelectAmount),
  validatorSelectFormat: kOf(validatorSelectFormat),

  //url shortening
  redSelectRandomCustom: kOf(redSelectRandomCustom),

  redSelectProvider: kOf(redSelectProvider),
}
const payOpts = HIDE_BANK_PAYMENT !== 'true' ? k.of([u.usd, u.ngn]) : k.of([u.usd])

const adminKeyboard = {
  reply_markup: {
    keyboard: Object.values(admin).map(b => [b]),
  },
}

const userKeyboard = {
  reply_markup: {
    keyboard: [
      [user.cPanelWebHostingPlans],
      [user.pleskWebHostingPlans],
      [user.joinChannel, user.wallet],
      [user.phoneNumberLeads],
      HIDE_SMS_APP === 'true' ? [user.domainNames] : [user.freeTrialAvailable, user.domainNames],
      [user.urlShortenerMain],
      [user.buyPlan, user.viewPlan],
      HIDE_BECOME_RESELLER === 'true'
        ? [user.changeSetting, user.getSupport]
        : [user.changeSetting, user.becomeReseller, user.getSupport],
    ],
  },
  parse_mode: 'HTML',
  disable_web_page_preview: true,
}

const languages = {
  en: '🇬🇧 英语',
  fr: '🇫🇷 法语',
  zh: '🇨🇳 中国人',
  hi: '🇮🇳 印地语',
}
const supportedLanguages = reverseObject(languages)

const languageMenu = {
  reply_markup: {
    keyboard: [[languages.en], [languages.fr], [languages.zh], [languages.hi]],
  },
  parse_mode: 'HTML',
  disable_web_page_preview: true,
}

const l = {
  askPreferredLanguage: `🌍 为了确保一切都符合您的首选语言，请在下面选择一种：
  
  您随时可以在设置中更改您的语言。`,
  askValidLanguage: '请选择一个有效的语言：',
  welcomeMessage: `👋 欢迎来到 ${CHAT_BOT_NAME}！
我们很高兴您来到这里！🎉
让我们帮您快速开始，探索我们提供的所有精彩功能吧！🌟

设置过程简单快捷——让我们开始吧！🚀`,
  askUserEmail: '你的电子邮件是什么？让我们个性化您的体验吧！（例如，davidsen@gmail.com）',
  processUserEmail: `谢谢 😊 我们正在为您设置帐户。
  请稍等片刻，我们正在最终处理细节。 ⏳
   
  我们在后台工作。请按步骤操作！`,
  confirmUserEmail: `✨ 好消息！您的帐户已准备好！ 🎉💃🎉
  
  享受免费试用期的高级功能！`,
  termsAndCond: `📜 进行之前，请查看并接受我们的条款和条件。`,
  acceptTermMsg: `请接受 ${CHAT_BOT_NAME} 的条款和条件以继续使用。`,
  acceptTermButton: '✅ 接受',
  declineTermButton: '❌ 拒绝',
  viewTermsAgainButton: '🔄 查看条款',
  exitSetupButton: '❌ 退出设置',
  acceptedTermsMsg: `✅ 您已成功接受条款和条件！ 🎉
  您已准备好开始使用 ${CHAT_BOT_NAME}。让我们进入有趣的部分！ 🎯`,
  declinedTermsMsg: `⚠️ 您需要接受条款和条件才能继续使用 ${CHAT_BOT_NAME}。 
  请在您准备好的时候再次查看。`,
  userExitMsg: '用户按下了退出按钮。',
  termsAndCondMsg: `<h1>${CHAT_BOT_NAME} 使用条款</h1>
        <p><strong>生效日期：</strong>2022年1月1日</p>
        <p>使用 ${CHAT_BOT_NAME} 即表示您同意这些使用条款。</p>

        <h2>1. 条款接受</h2>
        <p>您必须年满 18 岁或获得监护人同意，并同意这些条款以及我们的隐私政策。</p>

        <h2>2. 提供的服务</h2>
        <p>我们提供域名注册、网站托管以及网站/应用程序设置支持。</p>

        <h2>3. 用户责任</h2>
        <p>提供准确的信息，避免非法活动，并保护您的 Telegram 账户安全。</p>

        <h2>4. 支付条款</h2>
        <p>所有支付均为最终支付，除非另有说明。未支付可能导致服务暂停。</p>

        <h2>5. 服务限制</h2>
        <p>我们可能会施加资源限制或因维护或技术问题而中断服务。</p>

        <h2>6. 终止</h2>
        <p>如有违规或未支付费用，我们可以终止服务。用户可以随时取消，但费用不予退还。</p>

        <h2>7. 责任</h2>
        <p>服务按“现状”提供。我们对数据丢失、中断或用户安全漏洞不承担责任。</p>

        <h2>8. 隐私</h2>
        <p>我们按照隐私政策管理您的数据，仅在法律要求时共享。</p>

        <h2>9. 条款变更</h2>
        <p>我们可能会更新这些条款，继续使用即表示您接受。</p>

        <h2>10. 联系</h2>
        <p>如需支持，请通过 <a href="${APP_SUPPORT_LINK}" target="_blank">${APP_SUPPORT_LINK}</a> 联系我们。</p>

        <p>使用 ${CHAT_BOT_NAME} 即表示您同意这些条款。谢谢！</p>`,
}

const termsAndConditionType = lang => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '查看条款和条件',
          web_app: {
            url: `${SELF_URL}/terms-condition?lang=${lang}`,
          },
        },
      ],
    ],
  },
})

const planOptions = ['每日', '每周', '每月']
const planOptionsOf = {
  每日: 'Daily',
  每周: 'Weekly',
  每月: 'Monthly',
}

const linkOptions = [t.randomLink, t.customLink]

const chooseSubscription = {
  parse_mode: 'HTML',
  reply_markup: {
    keyboard: [...planOptions.map(a => [a]), _bc],
  },
}

const dO = {
  reply_markup: {
    keyboard: [_bc, ['Backup Data'], ['Restore Data']],
  },
}

const bc = {
  parse_mode: 'HTML',
  reply_markup: {
    keyboard: [_bc],
  },
  disable_web_page_preview: true,
}

const dns = {
  parse_mode: 'HTML',
  reply_markup: {
    keyboard: [[t.addDns], [t.updateDns], [t.deleteDns], _bc],
  },
  disable_web_page_preview: true,
}
const dnsRecordType = {
  parse_mode: 'HTML',
  reply_markup: {
    keyboard: [[t.cname], [t.ns], [t.a], _bc],
  },
  disable_web_page_preview: true,
}

const linkType = {
  reply_markup: {
    keyboard: [linkOptions, _bc],
  },
}

const show = domains => ({
  reply_markup: {
    keyboard: [[user.buyDomainName], ...domains.map(d => [d]), _bc],
  },
})

const payBank = url => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '进行支付',
          web_app: {
            url,
          },
        },
      ],
    ],
  },
})

const html = (text = t.successPayment) => {
  return `
        <html>
            <body>
                <p style="font-family: 'system-ui';" >${text}</p>
            </body>
        </html>
    `
}
const plans = hostingType => {
  return {
    starterPlan: {
      name: '入门计划',
      price: HOSTING_STARTER_PLAN_PRICE,
      duration: '30 天',
      storage: '10 GB SSD',
      bandwidth: '100 GB',
      domains: '1 个域名',
      emailAccounts: '5 个邮箱账户',
      databases: '1 个 MySQL 数据库',
      features: `完全访问 ${hostingType} 用于管理文件、数据库、电子邮件等。`,
      idealFor: '个人博客、小型企业网站或作品集。',
    },
    proPlan: {
      name: '专业计划',
      price: HOSTING_PRO_PLAN_PRICE,
      duration: '30 天',
      storage: '50 GB SSD',
      bandwidth: '500 GB',
      domains: '5 个域名',
      emailAccounts: '25 个邮箱账户',
      databases: '10 个 MySQL 数据库',
      features: `完全访问 ${hostingType}，配备高级工具用于备份、安全和分析。`,
      additionalFeatures: '免费网站迁移，每日备份。',
      idealFor: '中小型企业网站、电子商务网站。',
    },
    businessPlan: {
      name: '商务计划',
      price: HOSTING_BUSINESS_PLAN_PRICE,
      duration: '30 天',
      storage: '100 GB SSD',
      bandwidth: '无限制',
      domains: '无限制域名',
      emailAccounts: '无限制邮箱账户',
      databases: '无限制 MySQL 数据库',
      features: `完全访问 ${hostingType}，包括所有高级功能和优先支持。`,
      additionalFeatures: '免费网站迁移，每日备份，测试环境，增强安全功能。',
      idealFor: '大型企业、高流量网站以及需要更高灵活性的开发人员。',
    },
  }
}
const hostingPlansText = {
  plans: plans,
  generatePlanText: (hostingType, planKey) => {
    const plan = plans(hostingType)[planKey]
    return `
    🚀 <b>${plan.name}: $${plan.price}</b>
    
    <b>- 时长:</b> ${plan.duration}
    <b>- 存储空间:</b> ${plan.storage}
    <b>- 带宽:</b> ${plan.bandwidth}
    <b>- 域名:</b> ${plan.domains}
    <b>- 邮箱账户:</b> ${plan.emailAccounts}
    <b>- 数据库:</b> ${plan.databases}
    <b>- 免费 SSL:</b> 是
    <b>- ${hostingType} 功能:</b> ${plan.features}
    ${plan.additionalFeatures ? `<b>- 额外功能:</b> ${plan.additionalFeatures}` : ''}
    <b>- 适合:</b> ${plan.idealFor}`
  },
  generatePlanStepText: step => {
    const commonSteps = {
      buyText: '不错的选择！您需要一个新域名还是想使用现有的？',
      registerNewDomainText: '请输入您要注册的域名（例如：example.com）。',
      domainNotFound: '您输入的域名未找到。请确保输入正确或尝试使用其他域名。',
      useExistingDomainText: '请输入您的现有域名（例如：example.com）。',
      useExistingDomainNotFound: '您输入的域名与您的账户无关联。请检查输入是否正确或联系支持。',
      enterYourEmail: '请提供您的电子邮件地址以创建账户并发送收据。',
      invalidEmail: '请提供一个有效的电子邮件地址。',
      paymentConfirmation: '请确认交易以继续购买。',
      paymentSuccess: `我们正在验证您的付款。一旦确认，您将立即收到通知。感谢您的选择！`,
      paymentFailed: '付款失败，请重试。',
    }

    return `${commonSteps[step]}`
  },

  generateDomainFoundText: (websiteName, price) => `域名 ${websiteName} 可用！费用为 $${price}。`,
  generateExistingDomainText: websiteName => `您选择了 ${websiteName} 作为您的域名。`,
  domainNotFound: websiteName => `域名 ${websiteName} 不可用。`,
  nameserverSelectionText: websiteName => `请选择您想为 ${websiteName} 使用的域名服务器提供商。`,
  confirmEmailBeforeProceeding: email => `您确定要继续使用此电子邮件 ${email} 吗？`,

  generateInvoiceText: payload => `
<b>域名注册</b>
<b>- 域名： </b> ${payload.domainName}
<b>- 费用： </b> $${payload?.existingDomain ? '0（使用现有域名）' : payload.domainPrice}
  
<b>网站托管</b>
<b>- 时长： </b> 1 个月
<b>- 费用： </b> $${payload.hostingPrice}
  
<b>总金额：</b>
<b>- 优惠券折扣： </b> $${payload.couponDiscount}
<b>- USD： </b> $${payload?.couponApplied ? payload.newPrice : payload.totalPrice}
<b>- 税费： </b> $0.00
  
<b>付款条款</b>
这是一份预付款发票。请确保在 1 小时内完成付款，以便激活您的域名和托管服务。收到付款后，我们将立即为您激活服务。
`,

  showCryptoPaymentInfo: (priceCrypto, tickerView, address, plan) => `
请支付 ${priceCrypto} ${tickerView} 至以下地址：
  
<code>${address}</code>
  
请注意，完成加密货币交易可能需要最多 30 分钟。一旦交易确认，您将立即收到通知，并且您的 ${plan} 将顺利激活。
  
此致，
${CHAT_BOT_NAME}`,

  successText: (info, response) =>
    `这是您 ${info.hostingType} 的凭证 ${info.plan} 的信息：

域名： ${info.website_name}
用户名： ${response.username}
电子邮件： ${info.email}
密码： ${response.password}
网址： ${response.url}

<b>名称服务器</b>
- ${response.nameservers.ns1}
- ${response.nameservers.ns2}
  
您的 ${info.hostingType} 凭证已成功发送到您的电子邮件 ${info.email} 中。`,

  support: (plan, statusCode) => `设置过程中出现问题 ${plan} | ${statusCode}. 
                                              请联系支持 ${SUPPORT_USERNAME}.
                                              更多信息 ${TG_HANDLE}.`,

  bankPayDomain: (
    priceNGN,
    plan,
  ) => `请支付 ${priceNGN} NGN 并点击“付款”按钮。交易确认后，您将立即收到通知，并且您的 ${plan} 将无缝激活。

此致，
${CHAT_BOT_NAME}`,
}

const zh = {
  k,
  t,
  u,
  dO,
  bc,
  npl,
  dns,
  kOf,
  user,
  show,
  yesNo,
  html,
  payIn,
  admin,
  payOpts,
  yes_no,
  payBank,
  alcazar,
  planOptionsOf,
  tickerOf,
  linkType,
  tickerViews,
  linkOptions,
  planOptions,
  tickerViewOf,
  dnsRecordType,
  o: userKeyboard,
  phoneNumberLeads,
  aO: adminKeyboard,
  chooseSubscription,
  buyLeadsSelectArea,
  buyLeadsSelectCnam,
  buyLeadsSelectAmount,
  buyLeadsSelectFormat,
  buyLeadsSelectCountry,
  buyLeadsSelectCarrier,
  buyLeadsSelectSmsVoice,
  buyLeadsSelectAreaCode,
  _buyLeadsSelectAreaCode,
  validatorSelectCountry,
  validatorSelectSmsVoice,
  validatorSelectCarrier,
  validatorSelectCnam,
  validatorSelectAmount,
  validatorSelectFormat,
  redSelectRandomCustom,
  redSelectProvider,
  supportedCrypto,
  supportedCryptoView,
  supportedCryptoViewOf,
  languageMenu,
  supportedLanguages,
  l,
  termsAndConditionType,
  hP: hostingPlansText,
  selectFormatOf
}

module.exports = {
  zh,
}
