import { IDrummerConfig } from './model/AppConfigInterface'

declare global {
  interface Window {
    drummerConfig: IDrummerConfig
  }
}
