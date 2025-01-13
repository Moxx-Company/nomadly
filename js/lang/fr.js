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
const APP_SUPPORT_LINK = process.env.APP_SUPPORT_LINK

const PRICE_DAILY = Number(process.env.PRICE_DAILY_SUBSCRIPTION)
const PRICE_WEEKLY = Number(process.env.PRICE_WEEKLY_SUBSCRIPTION)
const PRICE_MONTHLY = Number(process.env.PRICE_MONTHLY_SUBSCRIPTION)
const DAILY_PLAN_FREE_DOMAINS = Number(process.env.DAILY_PLAN_FREE_DOMAINS)
const WEEKLY_PLAN_FREE_DOMAINS = Number(process.env.WEEKLY_PLAN_FREE_DOMAINS)
const FREE_LINKS_HOURS = Number(process.env.FREE_LINKS_TIME_SECONDS) / 60 / 60
const MONTHLY_PLAN_FREE_DOMAINS = Number(process.env.MONTHLY_PLAN_FREE_DOMAINS)

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
  viewAnalytics: '📊 Voir les statistiques',
  viewUsers: '👀 Voir les utilisateurs',
  blockUser: '✋ Bloquer l’utilisateur',
  unblockUser: '👌 Débloquer l’utilisateur',
  messageUsers: '👋 Envoyer un message à tous les utilisateurs',
}

const user = {
  // main keyboards
  cPanelWebHostingPlans: "Plans d'hébergement cPanel privés 🔒",
  pleskWebHostingPlans: "Plans d'hébergement Plesk privés 🔒",
  joinChannel: '📢 Rejoindre le canal',
  phoneNumberLeads: '📲 Pistes SMS HQ',
  wallet: '👛 Mon portefeuille',
  urlShortenerMain: "🔗✂️ Raccourcisseur d'URL",
  buyPlan: '🔔 Souscrire ici',
  domainNames: '🌐 Noms de domaine',
  viewPlan: '🔔 Mon plan',
  becomeReseller: '💼 Devenir revendeur',
  getSupport: "💬 Obtenir de l'aide",
  freeTrialAvailable: '📧🆓 SMS en masse - Essai gratuit',
  changeSetting: '🌍 Modifier les paramètres',

  // Sub Menu 1: urlShortenerMain
  redSelectUrl: '🔀✂️ Rediriger et raccourcir',
  urlShortener: '✂️🌐 Raccourcisseur de domaine personnalisé',
  viewShortLinks: '📊 Voir les analyses des raccourcis',

  // Sub Menu 2: domainNames
  buyDomainName: '🛒🌐 Acheter des noms de domaine',
  viewDomainNames: '📂 Mes noms de domaine',
  dnsManagement: '🔧 Gestion DNS',

  // Sub Menu 3: cPanel/Plesk WebHostingPlansMain
  freeTrial: '💡 Essai gratuit',
  starterPlan: '🔼 Plan de démarrage',
  proPlan: '🔷 Plan Pro',
  businessPlan: '👑 Plan Business',
  contactSupport: '📞 Contacter le support',

  // Free Trial
  freeTrialMenuButton: '🚀 Essai gratuit (12 heures)',
  getFreeTrialPlanNow: "🛒 Obtenir le plan d'essai maintenant",
  continueWithDomainNameSBS: websiteName => `➡️ Continuer avec ${websiteName}`,
  searchAnotherDomain: '🔍 Rechercher un autre domaine',
  privHostNS: '🏢 PrivHost (Hébergement rapide et sécurisé)',
  cloudflareNS: '🛡️ Bouclier Cloudflare (Sécurité et discrétion)',
  backToFreeTrial: "⬅️ Retour à l'essai gratuit",

  // Paid Plans
  buyStarterPlan: '🛒 Acheter le plan de démarrage',
  buyProPlan: '🛒 Acheter le plan Pro',
  buyBusinessPlan: '🛒 Acheter le plan Business',
  viewStarterPlan: '🔷 Voir le plan de démarrage',
  viewProPlan: '🔼 Voir le plan Pro',
  viewBusinessPlan: '👑 Voir le plan Business',
  backToHostingPlans: "⬅️ Retour aux plans d'hébergement",
  registerANewDomain: '🌐 Enregistrer un nouveau domaine',
  useExistingDomain: '🔄 Utiliser un domaine existant',
  backToStarterPlanDetails: '⬅️ Retour aux détails du plan de démarrage',
  backToProPlanDetails: '⬅️ Retour aux détails du plan Pro',
  backToBusinessPlanDetails: '⬅️ Retour aux détails du plan Business',
  continueWithDomain: websiteName => `➡️ Continuer avec ${websiteName}`,
  enterAnotherDomain: '🔍 Entrer un autre domaine',
  backToPurchaseOptions: "⬅️ Retour aux options d'achat",
}

const u = {
  // other key boards
  deposit: '➕💵 Dépôt',
  withdraw: '➖💵 Retirer',

  // wallet
  usd: 'USD',
  ngn: 'NGN',
}
const view = num => Number(num).toFixed(2)
const yesNo = ['Oui', 'Non']

const bal = (usd, ngn) =>
  HIDE_BANK_PAYMENT !== 'true'
    ? `$${view(usd)}
₦${view(ngn)}`
    : `$${view(usd)}`

const t = {
  yes: 'Oui',
  no: 'Non',
  back: 'Retour',
  cancel: 'Annuler',
  skip: 'Ignorer',
  becomeReseller: `Bonjour,

Je vous contacte pour vous offrir une opportunité fantastique de devenir revendeur du puissant logiciel de marketing par SMS et d'hébergement de ${CHAT_BOT_BRAND}Bot.

Détails clés :

Partage des bénéfices : Gagnez une commission compétitive de 65/35 % sur chaque vente.

Frais d'installation : Contactez le support pour plus de détails.

Intéressé ? Contactez-nous à ${SUPPORT_HANDLE} pour en savoir plus sur ce partenariat lucratif.

Dans l'attente d'une éventuelle collaboration avec vous !

Cordialement,

L'équipe ${CHAT_BOT_BRAND}
`,
  resetLoginAdmit: `${CHAT_BOT_BRAND} SMS: You have been successfully logged out of your previous device.Please login now`,
  resetLoginDeny: 'Ok sure. No further action required.',
  resetLogin: `${CHAT_BOT_BRAND}SMS: Are you trying to log out of your previous device?`,
  select: `Veuillez sélectionner une option :`,
  selectPlan: `Veuillez sélectionner un plan :`,
  backButton: '⬅️ Retour',
  yesProceedWithThisEmail: email => `➡️ Continuer avec ${email}`,
  proceedWithPayment: '➡️ Continuer avec le paiement',
  iHaveSentThePayment: `J'ai envoyé le paiement ✅`,
  trialAlreadyUsed: `Vous avez déjà utilisé votre essai gratuit. Si vous avez besoin de plus d'accès, veuillez envisager de souscrire à l'un de nos plans payants.`,
  oneHourLeftToExpireTrialPlan: `Votre plan Freedom expirera dans 1 heure. Si vous souhaitez continuer à utiliser nos services, envisagez de passer à un plan payant !`,
  freePlanExpired: `🚫 Votre plan Freedom a expiré. Nous espérons que vous avez apprécié votre essai. Pour continuer à utiliser nos services, veuillez acheter l'un de nos plans premium.`,
  freeTrialPlanSelected: hostingType => `
- Essayez notre <b>Plan Freedom</b> gratuitement ! Ce plan comprend un domaine gratuit se terminant par .sbs et sera actif pendant 12 heures.

🚀 <b>Plan Freedom :</b>
<b>- Stockage :</b> 1 Go SSD
<b>- Bande passante :</b> 10 Go
<b>- Domaines :</b> 1 domaine gratuit .sbs
<b>- Comptes email :</b> 1 compte email
<b>- Bases de données :</b> 1 base de données MySQL
<b>- SSL gratuit :</b> Oui
<b>- Fonctionnalités ${hostingType} :</b> Accès complet à ${hostingType} pour gérer les fichiers, la base de données et les emails, etc.
<b>- Durée :</b> Actif pendant 12 heures
<b>- Idéal pour :</b> Tests et projets de courte durée.
`,

  getFreeTrialPlan: `Veuillez entrer le nom de domaine souhaité (par exemple, example.sbs) et l'envoyer en tant que message. Ce domaine se terminera par .sbs et est gratuit avec votre plan d'essai.`,
  trialPlanContinueWithDomainNameSBSMatched: websiteName => `Le domaine ${websiteName} est disponible !`,
  trialPlanSBSDomainNotMatched: `Le domaine que vous avez entré est introuvable. Veuillez vérifier le domaine ou en essayer un autre.`,
  trialPlanSBSDomainIsPremium: `Le domaine est à prix premium et uniquement disponible avec un plan payant. Veuillez rechercher un autre domaine.`,
  trialPlanGetNowInvalidDomain: `Veuillez entrer un nom de domaine valide qui se termine par '.sbs'. Le domaine devrait ressembler à 'example.sbs' et est gratuit avec votre plan d'essai.`,
  trialPlanNameserverSelection: websiteName =>
    `Veuillez sélectionner le fournisseur de serveur de noms que vous souhaitez utiliser pour ${websiteName}.`,
  trialPlanDomainNameMatched: `Veuillez fournir votre adresse e-mail pour créer votre compte et recevoir votre reçu.`,
  confirmEmailBeforeProceedingSBS: email =>
    `Êtes-vous sûr de vouloir continuer avec cet e-mail ${email} pour l'abonnement au Plan Freedom ?`,
  trialPlanInValidEmail: `Veuillez fournir une adresse e-mail valide.`,
  trialPlanActivationConfirmation: `Merci ! Votre plan d'essai gratuit sera activé sous peu. Veuillez noter que ce plan sera actif uniquement pendant 12 heures.`,
  trialPlanActivationInProgress: `Votre plan d'essai gratuit est en cours d'activation. Cela peut prendre quelques instants...`,
  what: `Veuillez choisir une option depuis le clavier.`,
  whatNum: `Veuillez choisir un numéro valide.`,
  phoneGenTimeout: `Délai expiré.`,
  phoneGenNoGoodHits: `Veuillez contacter le support ${SUPPORT_HANDLE} ou sélectionner un autre indicatif régional.`,

  subscribeRCS: p =>
    `Abonné ! Désabonnez-vous à tout moment en cliquant sur le <a href="${SELF_URL}/unsubscribe?a=b&Phone=${p}">lien</a>.`,
  unsubscribeRCS: p =>
    `Vous êtes désabonné ! Pour vous abonner à nouveau, cliquez sur le <a href="${SELF_URL}/subscribe?a=b&Phone=${p}">lien</a>.`,
  argsErr: `dev : arguments incorrects envoyés`,
  showDepositNgnInfo:
    ngn => `Veuillez envoyer ${ngn} NGN en cliquant sur “Effectuer le paiement” ci-dessous. Une fois la transaction confirmée, vous serez rapidement notifié, et votre portefeuille sera mis à jour.

Cordialement,  
${CHAT_BOT_NAME}`,
  askEmail: `Veuillez fournir un e-mail pour la confirmation du paiement.`,
  askValidAmount: 'Veuillez fournir un montant valide.',
  askValidEmail: 'Veuillez fournir un e-mail valide.',
  askValidCrypto: 'Veuillez choisir une crypto-monnaie valide.',
  askValidPayOption: 'Veuillez choisir une option de paiement valide.',
  chooseSubscription:
    HIDE_SMS_APP === 'true'
      ? `<b>Élevez votre marque avec nos plans d'abonnement !</b>

- <b>Quotidien :</b> $${PRICE_DAILY} avec ${DAILY_PLAN_FREE_DOMAINS} domaines gratuits ".sbs", raccourcisseur d'URL illimité.  
- <b>Hebdomadaire :</b> $${PRICE_WEEKLY} avec ${WEEKLY_PLAN_FREE_DOMAINS} domaines gratuits ".sbs", raccourcisseur d'URL illimité.  
- <b>Mensuel :</b> $${PRICE_MONTHLY} avec ${MONTHLY_PLAN_FREE_DOMAINS} domaines gratuits ".sbs", raccourcisseur d'URL illimité.  

(Uniquement pour les domaines ".sbs".)`
      : `<b>Élevez votre marque avec nos plans d'abonnement !</b>

- <b>Quotidien :</b> $${PRICE_DAILY} avec ${DAILY_PLAN_FREE_DOMAINS} domaines gratuits ".sbs", raccourcisseur d'URL illimité et SMS en masse illimités.  
- <b>Hebdomadaire :</b> $${PRICE_WEEKLY} avec ${WEEKLY_PLAN_FREE_DOMAINS} domaines gratuits ".sbs", raccourcisseur d'URL illimité et SMS en masse illimités.  
- <b>Mensuel :</b> $${PRICE_MONTHLY} avec ${MONTHLY_PLAN_FREE_DOMAINS} domaines gratuits ".sbs", raccourcisseur d'URL illimité et SMS en masse illimités.  

(Uniquement pour les domaines ".sbs".)`,

  askCoupon: usd =>
    `Le prix est de $${usd}. Souhaitez-vous utiliser un code promo ? Si vous en avez un, veuillez l'entrer maintenant. Sinon, appuyez sur "Passer".`,
  planAskCoupon: `Souhaitez-vous utiliser un code promo ? Si vous en avez un, veuillez l'entrer maintenant. Sinon, appuyez sur "Passer".`,
  enterCoupon: `Veuillez entrer un code promo :`,
  planPrice: (plan, price) =>
    `Le prix de l'abonnement ${plan} est de $${price}. Veuillez choisir une méthode de paiement.`,
  planNewPrice: (plan, price, newPrice) =>
    `Le prix de l'abonnement ${plan} est désormais $${view(
      newPrice,
    )} <s>($${price})</s>. Veuillez choisir une méthode de paiement.`,
  domainPrice: (domain, price) =>
    `Le prix du domaine ${domain} est de $${price} USD. Veuillez choisir une méthode de paiement.`,
  domainNewPrice: (domain, price, newPrice) =>
    `Le prix du domaine ${domain} est désormais $${view(
      newPrice,
    )} <s>($${price})</s>. Veuillez choisir une méthode de paiement.`,
  couponInvalid: `Code promo invalide. Veuillez entrer un autre code promo :`,
  lowPrice: `Prix inférieur au minimum requis.`,
  freeTrialAvailable: `Votre essai gratuit BulkSMS est maintenant activé. Veuillez télécharger l'application Android ${SMS_APP_NAME} ici : ${SMS_APP_LINK}. Besoin de cartes E-sim ? Contactez ${SUPPORT_HANDLE}.`,
  freeTrialNotAvailable: `Vous avez déjà utilisé l'essai gratuit.`,
  planSubscribed:
    HIDE_SMS_APP === 'true'
      ? `Vous vous êtes abonné avec succès au plan {{plan}}. Profitez de nos outils de raccourcissement d'URL et de ${SMS_APP_NAME}. Besoin d'une carte E-sim ? Contactez ${SUPPORT_HANDLE}.`
      : `Vous vous êtes abonné avec succès au plan {{plan}}. Profitez de nos outils de raccourcissement d'URL et de ${SMS_APP_NAME}. Téléchargez l'application ici : ${SMS_APP_LINK}. Besoin d'une carte E-sim ? Contactez ${SUPPORT_HANDLE}.`,
  alreadySubscribedPlan: days => `Votre abonnement est actif et expire dans ${days} jours.`,
  payError: `Session de paiement introuvable. Veuillez réessayer ou contacter l'assistance ${SUPPORT_USERNAME}. Découvrez plus sur ${TG_HANDLE}.`,
  chooseFreeDomainText: `<b>Bonne nouvelle !</b> Ce domaine est disponible gratuitement avec votre abonnement. Souhaitez-vous le réclamer ?`,

  chooseDomainToBuy: text =>
    `<b>Réclamez votre coin du web !</b> Veuillez partager le nom de domaine que vous souhaitez acheter, par exemple "abcpay.com". ${text}`,
  askDomainToUseWithShortener: `Souhaitez-vous utiliser ce domaine avec le raccourcisseur ?`,
  blockUser: `Veuillez partager le nom d'utilisateur de l'utilisateur à bloquer.`,
  unblockUser: `Veuillez partager le nom d'utilisateur de l'utilisateur à débloquer.`,
  blockedUser: `Vous êtes actuellement bloqué d'utiliser le bot. Veuillez contacter le support ${SUPPORT_USERNAME}. Découvrez plus ${TG_HANDLE}.`,
  greet: `Gardez un œil sur cet espace ! Nous nous préparons à lancer notre application de raccourcissement d'URL qui rendra vos liens courts, sucrés et à point. Restez à l'écoute pour notre grande révélation !

Support ${SUPPORT_USERNAME} sur Telegram.`,
  linkExpired: `Votre essai ${CHAT_BOT_BRAND} a pris fin et votre lien raccourci est désactivé. Nous vous invitons à vous abonner pour maintenir l'accès à notre service d'URL et aux noms de domaine gratuits. Choisissez un plan approprié et suivez les instructions pour vous abonner. Veuillez nous contacter pour toute question.
Cordialement,
L'équipe ${CHAT_BOT_BRAND}
Découvrez plus : ${TG_CHANNEL}`,
  successPayment: `Paiement traité avec succès ! Vous pouvez maintenant fermer cette fenêtre.`,
  welcome: `Merci d'avoir choisi ${CHAT_BOT_NAME} ! Veuillez choisir une option ci-dessous :`,
  welcomeFreeTrial: `Bienvenue sur ${CHAT_BOT_BRAND} ! Profitez de notre essai gratuit unique - raccourcissez ${FREE_LINKS} liens, actif pendant ${FREE_LINKS_HOURS} heures. Découvrez la différence ${CHAT_BOT_BRAND} !`,
  unknownCommand: `Commande introuvable. Appuyez sur /start ou veuillez contacter le support ${SUPPORT_USERNAME}. Découvrez plus ${TG_HANDLE}.`,
  support: `Veuillez contacter le support ${SUPPORT_USERNAME}. Découvrez plus ${TG_HANDLE}.`,
  joinChannel: `Veuillez rejoindre la chaîne ${TG_CHANNEL}.`,
  dnsPropagated: `La propagation DNS pour {{domain}} est terminée pour un raccourcissement d'URL illimité.`,
  dnsNotPropagated: `La propagation DNS pour {{domain}} est en cours et vous serez mis à jour une fois terminée. ✅`,
  domainBoughtSuccess: domain => `Le domaine ${domain} est maintenant à vous. Merci de nous avoir choisi.

Cordialement,
${CHAT_BOT_NAME}`,

  domainBought: `Votre domaine {{domain}} est désormais lié à votre compte tandis que la propagation DNS est en cours. Vous serez mis à jour automatiquement très bientôt.🚀`,
  domainLinking: domain =>
    `Lien du domaine avec votre compte. Veuillez noter que la mise à jour DNS peut prendre jusqu'à 30 minutes. Vous pouvez vérifier le statut de votre mise à jour DNS ici : https://www.whatsmydns.net/#A/${domain}`,
  errorSavingDomain: `Erreur lors de l'enregistrement du domaine sur le serveur, veuillez contacter le support ${SUPPORT_USERNAME}. Découvrez plus ${TG_HANDLE}.`,
  chooseDomainToManage: `Veuillez sélectionner un domaine si vous souhaitez gérer ses paramètres DNS.`,
  chooseDomainWithShortener: `Veuillez sélectionner ou acheter le nom de domaine que vous souhaitez relier à votre lien raccourci.`,
  viewDnsRecords: `Voici les enregistrements DNS pour {{domain}}`,
  addDns: `Ajouter un enregistrement DNS`,
  updateDns: `Mettre à jour un enregistrement DNS`,
  deleteDns: `Supprimer un enregistrement DNS`,
  addDnsTxt: `Veuillez sélectionner le type d'enregistrement que vous souhaitez ajouter :`,
  updateDnsTxt: `Veuillez indiquer l'identifiant de l'enregistrement que vous souhaitez mettre à jour. i.e 3`,
  deleteDnsTxt: `Veuillez indiquer l'identifiant de l'enregistrement que vous souhaitez supprimer. i.e 3`,
  confirmDeleteDnsTxt: `Êtes-vous sûr ? Oui ou Non`,
  a: `Enregistrement A`,
  cname: `Enregistrement CNAME`,
  ns: `Enregistrement NS`,
  'Enregistrement A': `A`,
  'Enregistrement CNAME': `CNAME`,
  'Enregistrement NS': `NS`,
  askDnsContent: {
    A: `Veuillez fournir l'enregistrement A. i.e, 108.0.56.98`,
    'Enregistrement A': `Veuillez fournir l'enregistrement A. i.e, 108.0.56.98`,
    CNAME: `Veuillez fournir l'enregistrement CNAME. i.e, abc.hello.org`,
    'Enregistrement CNAME': `Veuillez fournir l'enregistrement CNAME. i.e, abc.hello.org`,
    NS: `Veuillez entrer votre enregistrement NS. i.e., dell.ns.cloudflare.com. Un nouvel enregistrement NS sera ajouté aux existants.`,
    'Enregistrement NS': `Veuillez entrer votre enregistrement NS. i.e., dell.ns.cloudflare.com .Si les N1-N4 existent déjà, veuillez mettre à jour l'enregistrement à la place`,
  },
  askUpdateDnsContent: {
    A: `Veuillez fournir l'enregistrement A. i.e, 108.0.56.98`,
    'Enregistrement A': `Veuillez fournir l'enregistrement A. i.e, 108.0.56.98`,
    CNAME: `Veuillez fournir l'enregistrement CNAME. i.e, abc.hello.org`,
    'Enregistrement CNAME': `Veuillez fournir l'enregistrement CNAME. i.e, abc.hello.org`,
    NS: `Un nouvel enregistrement NS sera mis à jour pour l'identifiant sélectionné. Pour ajouter un nouvel enregistrement, veuillez choisir "Ajouter un enregistrement DNS"`,
    'Enregistrement NS': `Un nouvel enregistrement NS sera mis à jour pour l'identifiant sélectionné. Pour ajouter un nouvel enregistrement, veuillez choisir "Ajouter un enregistrement DNS"`,
  },
  dnsRecordSaved: `Enregistrement ajouté`,
  dnsRecordDeleted: `Enregistrement supprimé`,
  dnsRecordUpdated: `Enregistrement mis à jour`,
  provideLink: `Veuillez fournir une URL valide. ex https://google.com`,
  comingSoonWithdraw: `Retrait bientôt disponible. Contactez le support ${SUPPORT_USERNAME}. Découvrez plus ${TG_HANDLE}.`,
  selectCurrencyToDeposit: `Veuillez sélectionner la devise à déposer`,
  depositNGN: `Veuillez entrer le montant NGN :`,
  askEmailForNGN: `Veuillez fournir un email pour la confirmation du paiement`,
  depositUSD: `Veuillez entrer le montant USD, notez que la valeur minimum est de 6 USD :`,
  selectCryptoToDeposit: `Veuillez choisir une cryptomonnaie :`,
  'bank-pay-plan': (priceNGN, plan) =>
    `Veuillez envoyer ${priceNGN} NGN en cliquant sur "Faire le paiement" ci-dessous. Une fois la transaction confirmée, vous serez notifié immédiatement et votre plan ${plan} sera activé sans encombre.

Cordialement,
${CHAT_BOT_NAME}`,
  bankPayDomain: (priceNGN, domain) =>
    `Veuillez envoyer ${priceNGN} NGN en cliquant sur "Faire le paiement" ci-dessous. Une fois la transaction confirmée, vous serez notifié immédiatement et votre domaine ${domain} sera activé sans encombre.

Cordialement,
${CHAT_BOT_NAME}`,
  showDepositCryptoInfoPlan: (priceCrypto, tickerView, address, plan) =>
    `Veuillez envoyer ${priceCrypto} ${tickerView} à\n\n<code>${address}</code>

Veuillez noter que les transactions cryptographiques peuvent prendre jusqu'à 30 minutes pour être complétées. Une fois la transaction confirmée, vous serez notifié immédiatement et votre plan ${plan} sera activé sans encombre.

Cordialement,
${CHAT_BOT_NAME}`,
  showDepositCryptoInfoDomain: (priceCrypto, tickerView, address, domain) =>
    `Veuillez envoyer ${priceCrypto} ${tickerView} à\n\n<code>${address}</code>

Veuillez noter que les transactions cryptographiques peuvent prendre jusqu'à 30 minutes pour être complétées. Une fois la transaction confirmée, vous serez notifié immédiatement et votre domaine ${domain} sera activé sans encombre.

Cordialement,
${CHAT_BOT_NAME}`,

  showDepositCryptoInfo: (priceCrypto, tickerView, address) =>
    `Veuillez envoyer ${priceCrypto} ${tickerView} à\n\n<code>${address}</code>\n\nVeuillez noter que les transactions cryptographiques peuvent prendre jusqu'à 30 minutes pour être confirmées. Une fois la transaction confirmée, vous serez notifié rapidement et votre portefeuille sera mis à jour.\n\nCordialement,\n${CHAT_BOT_NAME}`,

  confirmationDepositMoney: (amount, usd) =>
    `Votre paiement de ${amount} ($${usd}) est traité. Merci de nous avoir choisi.\nCordialement,\n${CHAT_BOT_NAME}`,

  showWallet: (usd, ngn) => `Solde du portefeuille :\n\n${bal(usd, ngn)}`,

  wallet: (usd, ngn) => `Solde du portefeuille :\n\n${bal(usd, ngn)}\n\nSélectionnez l'option du portefeuille :`,

  walletSelectCurrency: (usd, ngn) =>
    `Veuillez sélectionner la devise pour payer à partir de votre solde de portefeuille :\n\n${bal(usd, ngn)}`,

  walletBalanceLow: `Veuillez recharger votre portefeuille pour continuer`,

  sentLessMoney: (expected, got) =>
    `Vous avez envoyé moins d'argent que prévu, donc nous avons crédité le montant reçu dans votre portefeuille. Nous attendions ${expected} mais nous avons reçu ${got}`,

  sentMoreMoney: (expected, got) =>
    `Vous avez envoyé plus d'argent que prévu, donc nous avons crédité le montant supplémentaire dans votre portefeuille. Nous attendions ${expected} mais nous avons reçu ${got}`,

  buyLeadsError: `Malheureusement, le code régional sélectionné est indisponible et votre portefeuille n'a pas été facturé`,
  buyLeadsProgress: (i, total) => `${((i * 100) / total).toFixed()}% de leads téléchargés. Veuillez patienter.`,

  phoneNumberLeads: `Veuillez sélectionner une option`,

  buyLeadsSelectCountry: `Veuillez sélectionner un pays`,
  buyLeadsSelectSmsVoice: `Veuillez sélectionner SMS / Voix`,
  buyLeadsSelectArea: `Veuillez sélectionner une zone`,
  buyLeadsSelectAreaCode: `Veuillez sélectionner un code régional`,
  buyLeadsSelectCarrier: `Veuillez sélectionner un opérateur`,
  buyLeadsSelectCnam: `Voulez-vous rechercher le nom du propriétaire ? CNAME coûte 15 $ supplémentaires par 1000 leads`,
  buyLeadsSelectAmount: (min, max) =>
    `Combien de leads souhaitez-vous acheter ? Sélectionnez ou saisissez un nombre. Le minimum est de ${min} et le maximum est de ${max}`,

  buyLeadsSelectFormat: `Choisissez le format, par exemple Local (212) ou International (+1212)`,

  buyLeadsSuccess: n => `Félicitations, vos ${n} leads ont été téléchargés.`,

  buyLeadsNewPrice: (leads, price, newPrice) =>
    `Le prix des ${leads} leads est maintenant de $${view(newPrice)} <s>($${price})</s>`,
  buyLeadsPrice: (leads, price) => `Le prix des ${leads} leads est de $${price}.`,

  confirmNgn: (usd, ngn) => `${usd} USD ≈ ${ngn} NGN `,

  walletSelectCurrencyConfirm: `Confirmer ?`,

  validatorSelectCountry: `Veuillez sélectionner un pays`,
  validatorPhoneNumber: `Veuillez coller vos numéros ou télécharger un fichier incluant le code du pays.`,
  validatorSelectSmsVoice: n =>
    `${n} numéros de téléphone trouvés. Veuillez choisir l'option pour la validation des leads par SMS ou appel vocal.`,
  validatorSelectCarrier: `Veuillez sélectionner un opérateur`,
  validatorSelectCnam: `Voulez-vous rechercher le nom du propriétaire ? CNAME coûte 15 $ supplémentaires par 1000 leads`,
  validatorSelectAmount: (min, max) =>
    `Combien de numéros souhaitez-vous valider ? Sélectionnez ou saisissez un nombre. Le minimum est de ${min} et le maximum est de ${max}`,

  validatorSelectFormat: `Choisissez le format, par exemple Local (212) ou International (+1212)`,

  validatorSuccess: (n, m) => `${n} leads sont validés. ${m} numéros de téléphone valides trouvés.`,
  validatorProgress: (i, total) => `${((i * 100) / total).toFixed()}% de leads validés. Veuillez patienter.`,
  validatorProgressFull: (i, total) => `${((i * 100) / total).toFixed()}% de leads validés.`,

  validatorError: `Malheureusement, les numéros de téléphone sélectionnés sont indisponibles et votre portefeuille n'a pas été facturé`,
  validatorErrorFileData: `Numéro de téléphone de pays invalide trouvé. Veuillez télécharger le numéro de téléphone pour le pays sélectionné`,
  validatorErrorNoPhonesFound: `Aucun numéro de téléphone trouvé. Réessayez.`,

  validatorBulkNumbersStart: `La validation des leads a commencé et sera bientôt terminée.`,

  // url re-director
  redSelectUrl: `Veuillez partager l'URL que vous souhaitez raccourcir et analyser. ex : https://cnn.com`,
  redSelectRandomCustom: `Veuillez sélectionner votre choix pour un lien aléatoire ou personnalisé`,
  redSelectProvider: `Choisissez le fournisseur de lien`,
  redSelectCustomExt: `Entrez le suffixe personnalisé`,

  redValidUrl: `Veuillez fournir une URL valide. ex : https://google.com`,
  redTakeUrl: url => `Votre URL raccourcie est : ${url}`,
  redIssueUrlBitly: `Problème, votre portefeuille n'est pas facturé.`,
  redIssueSlugCuttly: `Le nom de lien préféré est déjà pris, essayez un autre.`,
  redIssueUrlCuttly: `Problème`,
  redNewPrice: (price, newPrice) =>
    `Le prix est maintenant de $${view(newPrice)} <s>($${price})</s>. Veuillez choisir la méthode de paiement.`,
  customLink: 'Lien personnalisé',
  randomLink: 'Lien aléatoire',
  askShortLinkExtension: 'Veuillez nous indiquer votre extension de lien court préférée : par exemple payer',
  linkAlreadyExist: `Le lien existe déjà. Veuillez taper 'ok' pour essayer un autre.`,
  yourShortendUrl: shortUrl => `Votre URL raccourcie est : ${shortUrl}`,

  availablefreeDomain: (plan, available, s) =>
    `Rappelez-vous, votre plan ${plan} comprend ${available} domaine ".sbs" gratuit${s}. Obtenez votre domaine dès aujourd'hui !`,
  shortenedUrlLink: `Veuillez partager l'URL que vous souhaitez raccourcir et analyser. e.g https://cnn.com`,
  selectedTrialPlan: `Vous avez sélectionné le plan d'essai gratuit`,
  userPressedBtn: message => `L'utilisateur a appuyé sur le bouton ${message}.`,
  userToBlock: userToBlock => `L'utilisateur ${userToBlock} n'a pas été trouvé.`,
  userBlocked: userToBlock => `L'utilisateur ${userToBlock} a été bloqué.`,
  checkingDomainAvail: `Vérification de la disponibilité du domaine...`,
  checkingExistingDomainAvail: `Vérification de la disponibilité du domaine existant...`,
  subscribeFirst: `📋 Abonnez-vous d'abord`,
  notValidHalf: `Entrez une partie arrière valide`,
  linkAlreadyExist: `Le lien existe déjà. Veuillez en essayer un autre.`,
  issueGettingPrice: `Problème pour obtenir le prix`,
  domainInvalid: `Le nom de domaine est invalide. Veuillez en essayer un autre. Utilisez le format abcpay.com`,
  chooseValidPlan: `Veuillez choisir un plan valide`,
  noDomainFound: `Aucun nom de domaine trouvé`,
  chooseValidDomain: `Veuillez choisir un domaine valide`,
  errorDeletingDns: error =>
    `Erreur lors de la suppression de l'enregistrement DNS, ${error}, Veuillez fournir à nouveau la valeur`,
  selectValidOption: `sélectionnez une option valide`,
  maxDnsRecord: `Un maximum de 4 enregistrements NS peut être ajouté, vous pouvez mettre à jour ou supprimer les enregistrements NS précédents`,
  errorSavingDns: error =>
    `Erreur lors de la sauvegarde de l'enregistrement DNS, ${error}, Veuillez fournir à nouveau la valeur`,
  fileError: `Erreur lors du traitement du fichier.`,
  ammountIncorrect: `Montant incorrect`,
  subscriptionExpire: (subscribedPlan, timeEnd) => `Votre abonnement ${subscribedPlan} est expiré le ${timeEnd}`,
  plansSubscripedtill: (subscribedPlan, timeEnd) =>
    `Vous êtes actuellement abonné au plan ${subscribedPlan}. Votre plan est valide jusqu'au ${timeEnd}`,
  planNotSubscriped: `Vous n'êtes actuellement abonné à aucun plan.`,
  noShortenedUrlLink: `Vous n'avez encore aucun lien raccourci.`,
  shortenedLinkText: linksText => `Voici vos liens raccourcis :\n${linksText}`,
  qrCodeText: `Voici votre code QR !`,
  scanQrOrUseChat: chatId =>
    `Scannez le QR avec l'application de marketing SMS pour vous connecter. Vous pouvez également utiliser ce code pour vous connecter : ${chatId}`,
  domainPurchasedFailed: (domain, buyDomainError) =>
    `Échec de l'achat du domaine, essayez un autre nom. ${domain} ${buyDomainError}`,
}

const phoneNumberLeads = ['💰📲 Buy PhoneLeads', '✅📲 Validate PhoneLeads']

const buyLeadsSelectCountry = Object.keys(areasOfCountry)
const buyLeadsSelectSmsVoice = ['SMS (Price 20$ for 1000)', 'Voice (Price 0$ for 1000)']
const buyLeadsSelectArea = country => Object.keys(areasOfCountry?.[country])
const buyLeadsSelectAreaCode = (country, area) => {
  const codes = areasOfCountry?.[country]?.[area].map(c => format(countryCodeOf[country], c))
  return codes.length > 1 ? ['Mixed Area Codes'].concat(codes) : codes
}
const _buyLeadsSelectAreaCode = (country, area) => areasOfCountry?.[country]?.[area]
const buyLeadsSelectCnam = yesNo
const buyLeadsSelectCarrier = country => carriersOf[country]
const buyLeadsSelectAmount = ['1000', '2000', '3000', '4000', '5000']
const buyLeadsSelectFormat = ['Local Format', 'International Format']

const validatorSelectCountry = Object.keys(areasOfCountry)
const validatorSelectSmsVoice = ['SMS (Price 15$ for 1000)', 'Voice (Price 0$ for 1000)']
const validatorSelectCarrier = country => carriersOf[country]
const validatorSelectCnam = yesNo
const validatorSelectAmount = ['ALL', '1000', '2000', '3000', '4000', '5000']
const validatorSelectFormat = ['Local Format', 'International Format']

//redSelectRandomCustom

const redSelectRandomCustom = ['Lien court aléatoire']

const redSelectProvider = ['Bit.ly 10 $ (Pas d’essai)', 'Ap1s.net (Abonnement requis après essai)']

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
  BTC: '₿ Bitcoin (BTC)',
  LTC: 'Ł Litecoin (LTC)',
  DOGE: 'Ð Dogecoin (DOGE)',
  BCH: 'Ƀ Bitcoin Cash (BCH)',
  ETH: 'Ξ Ethereum (ETH)',
  TRON: '🌐 Tron (TRX)',
  'USDT (TRC20)': '₮ Tether (USDT - TRC20)',
  'USDT (ERC20)': '₮ Tether (USDT - ERC20)',
}

/////////////////////////////////////////////////////////////////////////////////////
const _bc = ['Retour', 'Annuler']

const payIn = {
  crypto: 'Crypto',
  ...(HIDE_BANK_PAYMENT !== 'true' && { bank: 'Banque ₦aira + Carte🏦💳' }),
  wallet: '👛 Portefeuille',
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
  en: '🇬🇧 Anglais',
  fr: '🇫🇷 Français',
  zh: '🇨🇳 Chinois',
  hi: '🇮🇳 Hindi',
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
  askPreferredLanguage: `🌍 Pour garantir que tout est dans votre langue préférée, veuillez en sélectionner une ci-dessous :
  
  Vous pouvez toujours changer votre langue plus tard dans les paramètres.`,
  askValidLanguage: 'Veuillez choisir une langue valide :',
  welcomeMessage: `👋 Bienvenue sur le ${CHAT_BOT_NAME} !
  Nous sommes ravis de vous avoir ici ! 🎉
  Commençons afin que vous puissiez explorer toutes les fonctionnalités passionnantes que nous proposons. 🌟
  
  Ce setup est rapide et facile—plongeons dedans ! 🚀`,
  askUserEmail: 'Quel est votre email ? Personnalisons votre expérience ! (par exemple, davidsen@gmail.com)',
  processUserEmail: ` Merci 😊 Nous configurons votre compte maintenant.
  Veuillez patienter un instant pendant que nous finalisons les détails. ⏳
   
  Nous faisons le travail en arrière-plan. Suivez simplement les étapes !`,
  confirmUserEmail: `✨ Excellente nouvelle ! Votre compte est prêt ! 🎉💃🎉
  
  Profitez des fonctionnalités premium pendant votre période d'essai gratuite !`,
  termsAndCond: `📜 Avant de continuer, veuillez examiner et accepter nos conditions générales.`,
  acceptTermButton: '✅ Accepter',
  declineTermButton: '❌ Refuser',
  viewTermsAgainButton: '🔄 Revoir les termes',
  exitSetupButton: '❌ Quitter le setup',
  acceptedTermsMsg: `✅ Vous avez accepté avec succès les conditions générales ! 🎉
  Vous êtes prêt à commencer à utiliser ${CHAT_BOT_NAME}. Passons à la partie amusante ! 🎯
  
  Vous pouvez revoir les conditions générales à tout moment dans les paramètres de votre profil.`,
  declinedTermsMsg: `⚠️ Vous devez accepter les conditions générales pour continuer à utiliser ${CHAT_BOT_NAME}. 
  Veuillez les revoir quand vous serez prêt.`,
  userExitMsg: 'L’utilisateur a appuyé sur le bouton de sortie.',

  acceptTermMsg: `Veuillez accepter les conditions générales pour continuer à utiliser ${CHAT_BOT_NAME}`,
  termsAndCondMsg: `<h1>Conditions Générales pour ${CHAT_BOT_NAME}</h1>
        <p><strong>Date d’effet :</strong> 01/01/2022</p>
        <p>En utilisant ${CHAT_BOT_NAME}, vous acceptez ces Conditions Générales.</p>

        <h2>1. Acceptation des Conditions</h2>
        <p>Vous devez avoir 18 ans ou plus, ou avoir le consentement d’un tuteur, et accepter ces conditions ainsi que notre Politique de Confidentialité.</p>

        <h2>2. Services Fournis</h2>
        <p>Nous proposons l’enregistrement de domaines, l’hébergement web et le support pour la configuration de sites/applications.</p>

        <h2>3. Responsabilités de l’Utilisateur</h2>
        <p>Fournir des informations exactes, éviter les activités illégales et sécuriser votre compte Telegram.</p>

        <h2>4. Conditions de Paiement</h2>
        <p>Tous les paiements sont définitifs sauf indication contraire. Le non-paiement peut entraîner la suspension des services.</p>

        <h2>5. Limitations des Services</h2>
        <p>Nous pouvons imposer des limites de ressources ou subir des interruptions dues à la maintenance ou à des problèmes techniques.</p>

        <h2>6. Résiliation</h2>
        <p>Nous pouvons résilier les services en cas de violation ou de non-paiement. Les utilisateurs peuvent annuler à tout moment, mais les frais ne sont pas remboursables.</p>

        <h2>7. Responsabilité</h2>
        <p>Les services sont fournis « en l’état ». Nous ne sommes pas responsables des pertes de données, des pannes ou des violations de sécurité des utilisateurs.</p>

        <h2>8. Confidentialité</h2>
        <p>Nous gérons vos données conformément à notre Politique de Confidentialité et ne les partageons que si la loi l’exige.</p>

        <h2>9. Modifications des Conditions</h2>
        <p>Nous pouvons mettre à jour ces conditions, et l’utilisation continue implique votre acceptation.</p>

        <h2>10. Contact</h2>
        <p>Pour toute assistance, contactez-nous à <a href="${APP_SUPPORT_LINK}" target="_blank">${APP_SUPPORT_LINK}</a>.</p>

        <p>En utilisant ${CHAT_BOT_NAME}, vous acceptez ces conditions. Merci !</p>
`,
}

const termsAndConditionType = lang => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Voir les termes et conditions',
          web_app: {
            url: `${SELF_URL}/terms-condition?lang=${lang}`,
          },
        },
      ],
    ],
  },
})

const planOptions = ['Quotidien', 'Hebdomadaire', 'Mensuel']
const planOptionsOf = {
  Quotidien: 'Daily',
  Hebdomadaire: 'Weekly',
  Mensuel: 'Monthly',
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
          text: 'Effectuer le paiement',
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
      name: 'Forfait Starter',
      price: HOSTING_STARTER_PLAN_PRICE,
      duration: '30 jours',
      storage: '10 Go SSD',
      bandwidth: '100 Go',
      domains: '1 domaine',
      emailAccounts: '5 comptes email',
      databases: '1 base de données MySQL',
      features: `Accès complet à ${hostingType} pour gérer les fichiers, bases de données, emails, etc.`,
      idealFor: 'Blogs personnels, sites web de petites entreprises ou portfolios.',
    },
    proPlan: {
      name: 'Forfait Pro',
      price: HOSTING_PRO_PLAN_PRICE,
      duration: '30 jours',
      storage: '50 Go SSD',
      bandwidth: '500 Go',
      domains: '5 domaines',
      emailAccounts: '25 comptes email',
      databases: '10 bases de données MySQL',
      features: `Accès complet à ${hostingType} avec des outils avancés pour les sauvegardes, la sécurité et les analyses.`,
      additionalFeatures: 'Migration de site gratuite, sauvegardes quotidiennes.',
      idealFor: 'Sites web de petites et moyennes entreprises, sites de commerce électronique.',
    },
    businessPlan: {
      name: 'Forfait Business',
      price: HOSTING_BUSINESS_PLAN_PRICE,
      duration: '30 jours',
      storage: '100 Go SSD',
      bandwidth: 'Illimité',
      domains: 'Domaines illimités',
      emailAccounts: 'Comptes email illimités',
      databases: 'Bases de données MySQL illimitées',
      features: `Accès complet à ${hostingType} avec toutes les fonctionnalités avancées, y compris le support prioritaire.`,
      additionalFeatures:
        'Migration de site gratuite, sauvegardes quotidiennes, environnement de test, fonctionnalités de sécurité améliorées.',
      idealFor: 'Grandes entreprises, sites à fort trafic, et développeurs nécessitant plus de flexibilité.',
    },
  }
}
const hostingPlansText = {
  plans: plans,

  generatePlanText: (hostingType, planKey) => {
    const plan = plans(hostingType)[planKey]
    return `
    🚀 <b>${plan.name} : $${plan.price}</b>
    
    <b>- Durée :</b> ${plan.duration}
    <b>- Stockage :</b> ${plan.storage}
    <b>- Bande passante :</b> ${plan.bandwidth}
    <b>- Domaines :</b> ${plan.domains}
    <b>- Comptes email :</b> ${plan.emailAccounts}
    <b>- Bases de données :</b> ${plan.databases}
    <b>- SSL gratuit :</b> Oui
    <b>- Fonctionnalités ${hostingType} :</b> ${plan.features}
    ${plan.additionalFeatures ? `<b>- Fonctionnalités supplémentaires :</b> ${plan.additionalFeatures}` : ''}
    <b>- Idéal pour :</b> ${plan.idealFor}`
  },
  generatePlanStepText: step => {
    const commonSteps = {
      buyText: 'Excellent choix ! Avez-vous besoin d’un nouveau domaine ou souhaitez-vous en utiliser un existant ?',
      registerNewDomainText: 'Veuillez entrer le nom de domaine que vous souhaitez enregistrer (ex. : exemple.com).',
      domainNotFound: 'Le domaine que vous avez entré est introuvable. Veuillez vérifier ou essayer un autre.',
      useExistingDomainText: 'Veuillez entrer le nom de votre domaine existant (ex. : exemple.com).',
      useExistingDomainNotFound:
        'Le domaine que vous avez entré n’est pas associé à votre compte. Veuillez vérifier ou contacter le support.',
      enterYourEmail: 'Veuillez fournir votre adresse email pour créer votre compte et recevoir votre reçu.',
      invalidEmail: 'Veuillez fournir une adresse email valide.',
      paymentConfirmation: 'Veuillez confirmer la transaction pour continuer votre achat.',
      paymentSuccess: `Nous vérifions votre paiement. Vous serez informé dès que celui-ci sera confirmé. Merci de nous avoir choisi !`,
      paymentFailed: 'Le paiement a échoué. Veuillez réessayer.',
    }

    return `${commonSteps[step]}`
  },

  generateDomainFoundText: (websiteName, price) =>
    `Le domaine ${websiteName} est disponible ! Le coût est de $${price}.`,
  generateExistingDomainText: websiteName => `Vous avez sélectionné ${websiteName} comme votre domaine.`,
  domainNotFound: websiteName => `Le domaine ${websiteName} n'est pas disponible.`,
  nameserverSelectionText: websiteName =>
    `Veuillez sélectionner le fournisseur de serveur de noms que vous souhaitez utiliser pour ${websiteName}.`,
  confirmEmailBeforeProceeding: email => `Êtes-vous sûr de vouloir continuer avec cet email : ${email} ?`,

  generateInvoiceText: payload => `
<b>Enregistrement de domaine</b>
<b>- Domaine : </b> ${payload.domainName}
<b>- Prix : </b> $${payload?.existingDomain ? '0 (utilisation d’un domaine existant)' : payload.domainPrice}
  
<b>Hébergement Web</b>
<b>- Durée : </b> 1 mois
<b>- Prix : </b> $${payload.hostingPrice}
  
<b>Montant total dû :</b>
<b>- Réduction par coupon : </b> $${payload.couponDiscount}
<b>- USD : </b> $${payload?.couponApplied ? payload.newPrice : payload.totalPrice}
<b>- Taxe : </b> $0.00
  
<b>Conditions de paiement</b>
Ceci est une facture de prépaiement. Veuillez vous assurer que le paiement est effectué dans l'heure afin d'activer vos services de domaine et d'hébergement. Une fois le paiement reçu, nous procéderons à l'activation de votre service.
`,

  showCryptoPaymentInfo: (priceCrypto, tickerView, address, plan) => `
Veuillez transférer ${priceCrypto} ${tickerView} à l’adresse suivante :
  
<code>${address}</code>
  
Veuillez noter que les transactions en crypto-monnaie peuvent prendre jusqu'à 30 minutes pour être confirmées. Une fois la transaction confirmée, vous serez immédiatement notifié, et votre ${plan} sera activé en toute transparence.
  
Cordialement,
${CHAT_BOT_NAME}`,

  successText: (info, response) =>
    `Voici vos informations d'identification pour ${info.hostingType} pour ${info.plan} :

Domaine : ${info.website_name}
Nom d'utilisateur : ${response.username}
Email : ${info.email}
Mot de passe : ${response.password}
URL : ${response.url}

<b>Serveurs de noms</b>
- ${response.nameservers.ns1}
- ${response.nameservers.ns2}
  
Vos informations d'identification ${info.hostingType} ont été envoyées avec succès à votre email ${info.email}.`,

  support: (
    plan,
    statusCode,
  ) => `Quelque chose s'est mal passé lors de la configuration de votre ${plan} | ${statusCode}. 
                                              Veuillez contacter le support ${SUPPORT_USERNAME}.
                                              Découvrez plus sur ${TG_HANDLE}.`,

  bankPayDomain: (
    priceNGN,
    plan,
  ) => `Veuillez virer ${priceNGN} NGN en cliquant sur “Faire le paiement” ci-dessous. Une fois la transaction confirmée, vous serez immédiatement notifié, et votre ${plan} sera activé sans problème.

Cordialement,
${CHAT_BOT_NAME}`,
}

const fr = {
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
}

module.exports = {
  fr,
}
