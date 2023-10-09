require('dotenv').config();

const PRICE_DAILY = Number(process.env.PRICE_DAILY_SUBSCRIPTION);
const PRICE_WEEKLY = Number(process.env.PRICE_WEEKLY_SUBSCRIPTION);
const PRICE_MONTHLY = Number(process.env.PRICE_MONTHLY_SUBSCRIPTION);

const priceOf = {
  Daily: PRICE_DAILY,
  Weekly: PRICE_WEEKLY,
  Monthly: PRICE_MONTHLY,
};

const timeOf = {
  Daily: 86400 * 1000,
  Weekly: 7 * 86400 * 1000,
  Monthly: 30 * 86400 * 1000,
};

const subscriptionOptions = ['Daily', 'Weekly', 'Monthly'];
const paymentOptions = ['Crypto', 'Bank ₦aira + Card🌐︎'];
const linkOptions = ['Random Link', 'Custom Link'];

const chooseSubscription = {
  reply_markup: {
    keyboard: [...subscriptionOptions.map(a => [a]), ['Back', 'Cancel']],
  },
};

const t = {
  chooseSubscription: `Select the perfect subscription plan for you:
Daily ${PRICE_DAILY}$  (2 free domain names)
Weekly ${PRICE_WEEKLY}$  (3 free domain names)
Monthly ${PRICE_MONTHLY}$  (5 free domain names)

(offer is only for “.sbs” domain names)`,
};

const tickerOf = {
  BTC: 'btc',
  ETH: 'eth',
  BCH: 'bch',
  LTC: 'ltc',
  DOGE: 'doge',
  'USDT Tron': 'trc20_usdt',
  BUSD: 'bep20_busd',
  POLYGON: 'polygon_matic',
};
const tickerViews = Object.keys(tickerOf);

const aO = {
  reply_markup: {
    keyboard: [['View Analytics'], ['View Users'], ['Block User'], ['Unblock User']],
  },
};

const dO = {
  reply_markup: {
    keyboard: [['Back', 'Cancel'], ['Backup Data'], ['Restore Data']],
  },
};

const o = {
  reply_markup: {
    keyboard: [
      ['🔗 URL Shortener'],
      ['🔍 View Analytics'],
      ['🌐 Buy Domain Names'],
      ['👀 Manage Domain Names'],
      ['📋 Subscribe Here'],
      ['🔍 My Plan'],
      ['🛠️ Get Support'],
    ],
  },
  disable_web_page_preview: true,
};

const rem = {
  reply_markup: {
    remove_keyboard: true,
  },
};

const bc = {
  reply_markup: {
    keyboard: [['Back', 'Cancel']],
  },
  disable_web_page_preview: true,
};

const pay = {
  reply_markup: {
    keyboard: [paymentOptions, ['Back', 'Cancel']],
  },
};
const linkType = {
  reply_markup: {
    keyboard: [linkOptions, ['Back', 'Cancel']],
  },
};

const payBank = url => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Make Payment',
          web_app: {
            url,
          },
        },
      ],
    ],
  },
});

const html = `
        <html>
            <body>
                <h2>Payment Processed Successfully! You can now close this window.</h2>
            </body>
        </html>
    `;

module.exports = {
  t,
  tickerOf,
  tickerViews,
  html,
  linkOptions,
  payBank,
  linkType,
  pay,
  bc,
  rem,
  chooseSubscription,
  subscriptionOptions,
  priceOf,
  paymentOptions,
  aO,
  dO,
  o,
  timeOf,
};
