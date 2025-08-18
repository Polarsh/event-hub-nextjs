type AppConfigType = {
  APP_NAME: string
  APP_DESCRIPTION: string
  API_BASE_URL: string
  DEFAULT_LANGUAGE: string
  ICON_PATH: string
  LOGO_PATH: string
  SUPPORT_EMAIL: string
}

const AppConfig: AppConfigType = {
  APP_NAME: 'EventHub',
  APP_DESCRIPTION: 'EventHub description',
  API_BASE_URL: 'https://api.eventhub.com',
  DEFAULT_LANGUAGE: 'es',
  ICON_PATH: '/svgs/icon.svg',
  LOGO_PATH: '/svgs/logo.svg',
  SUPPORT_EMAIL: 'soporte@eventhub.com'
}

export default AppConfig
